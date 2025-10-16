import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Conversation {
  id: string;
  user_id: string;
  status: string;
  last_message_at: string;
  user_name?: string;
}

interface Message {
  id: string;
  message: string;
  is_staff: boolean;
  created_at: string;
  sender_id: string;
}

export default function CustomerCare() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      checkStaffRole();
    }
  }, [user]);

  useEffect(() => {
    if (isStaff) {
      loadConversations();
      subscribeToConversations();
    }
  }, [isStaff]);

  useEffect(() => {
    if (selectedConv) {
      loadMessages();
      subscribeToMessages();
    }
  }, [selectedConv]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const checkStaffRole = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .in("role", ["admin", "staff"]);

      if (error) throw error;
      setIsStaff(data && data.length > 0);
    } catch (error: any) {
      console.error("Error checking role:", error);
      toast.error("Access denied");
    }
  };

  const loadConversations = async () => {
    try {
      const { data: convos, error } = await supabase
        .from("conversations")
        .select("*")
        .order("last_message_at", { ascending: false });

      if (error) throw error;

      // Fetch user names separately
      const convosWithNames = await Promise.all(
        (convos || []).map(async (conv) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", conv.user_id)
            .maybeSingle();
          
          return {
            ...conv,
            user_name: profile?.full_name || "User",
          };
        })
      );

      setConversations(convosWithNames);
    } catch (error: any) {
      console.error("Error loading conversations:", error);
    }
  };

  const subscribeToConversations = () => {
    const channel = supabase
      .channel("all-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", selectedConv)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error("Error loading messages:", error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`care-chat-${selectedConv}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${selectedConv}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv) return;

    try {
      const { error } = await supabase.from("chat_messages").insert({
        conversation_id: selectedConv,
        sender_id: user!.id,
        message: newMessage.trim(),
        is_staff: true,
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const closeConversation = async () => {
    if (!selectedConv) return;

    try {
      const { error } = await supabase
        .from("conversations")
        .update({ status: "closed" })
        .eq("id", selectedConv);

      if (error) throw error;
      toast.success("Conversation closed");
      setSelectedConv(null);
      loadConversations();
    } catch (error: any) {
      console.error("Error closing conversation:", error);
      toast.error("Failed to close conversation");
    }
  };

  if (!isStaff) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-screen flex gap-4">
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Active Conversations</h2>
          <p className="text-sm text-muted-foreground">
            {conversations.length} total
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConv === conv.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">
                    {conv.user_name || "User"}
                  </span>
                  <Badge
                    variant={conv.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {conv.status}
                  </Badge>
                </div>
                <p className="text-xs opacity-70">
                  {new Date(conv.last_message_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Conversation</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeConversation}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Close
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      msg.is_staff ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!msg.is_staff && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          U
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] ${
                        msg.is_staff
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.is_staff ? "opacity-70" : "text-muted-foreground"
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    {msg.is_staff && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          ME
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
