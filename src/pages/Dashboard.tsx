import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus
} from "lucide-react";

const Dashboard = () => {
  const [documents] = useState([
    { id: 1, name: "Project Proposal.docx", type: "Document", size: "2.4 MB", date: "2024-01-15" },
    { id: 2, name: "Invoice_001.pdf", type: "PDF", size: "450 KB", date: "2024-01-14" },
    { id: 3, name: "Presentation.pptx", type: "Presentation", size: "5.2 MB", date: "2024-01-13" },
  ]);

  const [orders] = useState([
    { id: "ORD001", service: "Document Typing", status: "Completed", date: "2024-01-15" },
    { id: "ORD002", service: "Printing", status: "In Progress", date: "2024-01-14" },
    { id: "ORD003", service: "Web Development Course", status: "Active", date: "2024-01-10" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-success";
      case "In Progress": return "text-warning";
      case "Active": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
            Welcome back, <span className="text-primary">John!</span>
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
                <p className="font-heading font-bold text-2xl">24</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Documents</p>
                <p className="font-heading font-bold text-2xl">12</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Active Courses</p>
                <p className="font-heading font-bold text-2xl">2</p>
              </div>
              <User className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">Referrals</p>
                <p className="font-heading font-bold text-2xl">5</p>
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
                <Button className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              </div>

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
                        <td className="p-2 font-body">{doc.name}</td>
                        <td className="p-2 font-body text-muted-foreground">{doc.type}</td>
                        <td className="p-2 font-body text-muted-foreground">{doc.size}</td>
                        <td className="p-2 font-body text-muted-foreground">{doc.date}</td>
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
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Order History</h2>
              
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-body font-medium">{order.service}</p>
                      <p className="font-body text-sm text-muted-foreground">
                        Order #{order.id} • {order.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`font-body text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Referral Program</h2>
              
              <div className="bg-gradient-card p-6 rounded-lg mb-6">
                <p className="font-body text-sm text-muted-foreground mb-2">Your Referral Code</p>
                <div className="flex items-center space-x-4">
                  <code className="font-mono text-2xl font-bold">KORA2024JD</code>
                  <Button size="sm" variant="outline">
                    Copy Code
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-body">
                  <strong>5</strong> friends have joined using your code
                </p>
                <p className="font-body">
                  <strong>₦2,500</strong> earned in referral bonuses
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <Card className="p-6">
              <h2 className="font-heading font-semibold text-xl mb-6">Account Settings</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Billing Information
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Dashboard;