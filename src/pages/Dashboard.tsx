import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import EditProfileDialog from "@/components/dashboard/EditProfileDialog";
import ChangePasswordDialog from "@/components/dashboard/ChangePasswordDialog";
import BillingInfoDialog from "@/components/dashboard/BillingInfoDialog";
import { 
  User, 
  FileText, 
  ShoppingBag, 
  Users, 
  Settings,
  Upload,
  Download,
  Trash2,
  Eye,
  Share2,
  Plus,
  Copy
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [referralStats, setReferralStats] = useState({
    referralCode: "",
    referredCount: 0,
    qualifiedReferrals: 0,
    totalEarned: 0,
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDocuments: 0,
    activeOrders: 0,
    totalReferrals: 0,
  });

  // Dialog states
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [billingInfoOpen, setBillingInfoOpen] = useState(false);

  // Generate referral code based on user's signup year and name initials
  const generateReferralCode = (profile: any) => {
    if (!profile || !user) return "";
    
    const year = new Date(user.created_at || Date.now()).getFullYear();
    const fullName = profile.full_name || profile.username || "";
    const names = fullName.trim().split(" ");
    
    let initials = "";
    if (names.length >= 2) {
      initials = (names[0][0] || "") + (names[1][0] || "");
    } else if (names.length === 1) {
      initials = names[0].substring(0, 2);
    }
    
    return `KORA-${year}-${initials.toUpperCase()}`;
  };

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    setProfile(data);
    
    // Update or set referral code if needed
    const generatedCode = generateReferralCode(data);
    if (data && (!data.referral_code || data.referral_code !== generatedCode)) {
      await supabase
        .from("profiles")
        .update({ referral_code: generatedCode })
        .eq("id", user.id);
      
      setProfile({ ...data, referral_code: generatedCode });
    }
  };

  // Fetch documents
  const fetchDocuments = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("saved_documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDocuments(data);
      setStats(prev => ({ ...prev, totalDocuments: data.length }));
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        services (name, category)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
      const activeOrders = data.filter(order => 
        order.status === "in_progress" || order.status === "pending"
      ).length;
      
      setStats(prev => ({ 
        ...prev, 
        totalOrders: data.length,
        activeOrders: activeOrders
      }));
    }
  };

  // Fetch referral statistics
  const fetchReferralStats = async () => {
    if (!user || !profile) return;

    // Get users who used this user's referral code
    const { data: referredUsers, error: referredError } = await supabase
      .from("profiles")
      .select("id")
      .eq("referred_by", user.id);

    if (referredError) {
      console.error("Error fetching referrals:", referredError);
      return;
    }

    const referredCount = referredUsers?.length || 0;

    // Check which referred users have made qualifying transactions (₦5,000+)
    let qualifiedReferrals = 0;
    if (referredUsers && referredUsers.length > 0) {
      const referredUserIds = referredUsers.map(u => u.id);
      
      const { data: payments } = await supabase
        .from("payments")
        .select("user_id, amount")
        .in("user_id", referredUserIds)
        .eq("payment_status", "completed");

      // Group payments by user and check if they've reached ₦5,000
      const userPayments = new Map();
      payments?.forEach(payment => {
        const current = userPayments.get(payment.user_id) || 0;
        userPayments.set(payment.user_id, current + Number(payment.amount));
      });

      userPayments.forEach(total => {
        if (total >= 5000) {
          qualifiedReferrals++;
        }
      });
    }

    const totalEarned = qualifiedReferrals * 5000;

    setReferralStats({
      referralCode: profile.referral_code || generateReferralCode(profile),
      referredCount,
      qualifiedReferrals,
      totalEarned,
    });

    setStats(prev => ({ ...prev, totalReferrals: referredCount }));
  };

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProfile();
      await Promise.all([
        fetchDocuments(),
        fetchOrders(),
      ]);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  // Fetch referral stats after profile is loaded
  useEffect(() => {
    if (profile && user) {
      fetchReferralStats();
    }
  }, [profile, user]);

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to document changes
    const documentsChannel = supabase
      .channel('documents-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'saved_documents',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchDocuments();
        }
      )
      .subscribe();

    // Subscribe to order changes
    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(documentsChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "in_progress": return "text-warning";
      case "pending": return "text-primary";
      case "cancelled": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralStats.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleDeleteDocument = async (docId: string) => {
    const { error } = await supabase
      .from("saved_documents")
      .delete()
      .eq("id", docId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      fetchDocuments();
    }
  };

  const handleUploadDocument = () => {
    // This would open a file upload dialog
    toast({
      title: "Info",
      description: "File upload feature coming soon!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
            Welcome back, <span className="text-primary">{profile?.full_name || profile?.username || "User"}!</span>
          </h1>
          <p className="font-body text-muted-foreground">
            Manage your documents, orders, and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Total Orders</p>
                <p className="font-heading font-bold text-2xl">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Documents</p>
                <p className="font-heading font-bold text-2xl">{stats.totalDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Active Orders</p>
                <p className="font-heading font-bold text-2xl">{stats.activeOrders}</p>
              </div>
              <User className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Referrals</p>
                <p className="font-heading font-bold text-2xl">{stats.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl">My Documents</h2>
                <Button className="bg-gradient-primary" onClick={handleUploadDocument}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              </div>

              {documents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No documents uploaded yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-body font-medium p-2">Name</th>
                        <th className="text-left font-body font-medium p-2">Type</th>
                        <th className="text-left font-body font-medium p-2">Size</th>
                        <th className="text-left font-body font-medium p-2">Date</th>
                        <th className="text-right font-body font-medium p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b">
                          <td className="p-2 font-body">{doc.file_name}</td>
                          <td className="p-2 font-body text-muted-foreground">{doc.file_type || "Document"}</td>
                          <td className="p-2 font-body text-muted-foreground">
                            {doc.file_size ? `${(doc.file_size / 1024 / 1024).toFixed(2)} MB` : "N/A"}
                          </td>
                          <td className="p-2 font-body text-muted-foreground">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center justify-end space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-destructive"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No orders placed yet
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-body font-medium">
                          {order.services?.name || "Service"}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          Order #{order.id.slice(0, 8)} • {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`font-body text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status?.replace("_", " ").charAt(0).toUpperCase() + order.status?.slice(1).replace("_", " ")}
                        </span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Referral Program</h2>
              
              <div className="bg-gradient-card p-6 rounded-lg mb-6">
                <p className="font-body text-sm text-muted-foreground mb-2">Your Referral Code</p>
                <div className="flex items-center space-x-4">
                  <code className="font-mono text-2xl font-bold">{referralStats.referralCode}</code>
                  <Button size="sm" variant="outline" onClick={copyReferralCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-body">
                  <strong>{referralStats.referredCount}</strong> friends have joined using your code
                </p>
                <p className="font-body">
                  <strong>{referralStats.qualifiedReferrals}</strong> qualified referrals (₦5,000+ transaction)
                </p>
                <p className="font-body">
                  <strong>₦{referralStats.totalEarned.toLocaleString()}</strong> earned in referral bonuses
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="font-body text-sm">
                    <strong>How it works:</strong> When 5 friends sign up with your code and each makes a transaction of ₦5,000 or more, you earn ₦5,000!
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Account Settings</h2>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setEditProfileOpen(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setChangePasswordOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setBillingInfoOpen(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Billing Information
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <EditProfileDialog 
          open={editProfileOpen} 
          onOpenChange={setEditProfileOpen}
          profile={profile}
          onProfileUpdate={() => {
            fetchProfile();
            fetchReferralStats();
          }}
        />
        <ChangePasswordDialog 
          open={changePasswordOpen} 
          onOpenChange={setChangePasswordOpen}
        />
        <BillingInfoDialog 
          open={billingInfoOpen} 
          onOpenChange={setBillingInfoOpen}
        />
      </div>
    </main>
  );
};

export default Dashboard;