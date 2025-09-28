import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Printer, 
  Scan, 
  Package,
  Truck,
  Mail,
  Camera,
  Smartphone,
  Globe,
  Palette,
  Video,
  Code,
  Monitor,
  ShoppingCart
} from "lucide-react";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("cyber");

  const cyberServices = [
    {
      icon: FileText,
      title: "Document Typing",
      description: "Professional typing services for all document types including academic papers, business proposals, and legal documents.",
      features: ["Fast turnaround", "Formatting included", "Multiple formats"],
      price: "From ₦500"
    },
    {
      icon: Printer,
      title: "Printing Services",
      description: "High-quality color and black & white printing for documents, posters, and marketing materials.",
      features: ["Color printing", "Large format", "Bulk discounts"],
      price: "From ₦50/page"
    },
    {
      icon: Scan,
      title: "Scanning & Digitization",
      description: "Convert physical documents to digital formats with OCR technology for searchable PDFs.",
      features: ["OCR technology", "Cloud storage", "Multiple formats"],
      price: "From ₦100/page"
    },
    {
      icon: Mail,
      title: "Email & Form Services",
      description: "Email setup, management, and assistance with online forms and applications.",
      features: ["Email creation", "Form filling", "Application assistance"],
      price: "From ₦1,000"
    },
    {
      icon: Package,
      title: "Packaging Services",
      description: "Professional packaging for documents, products, and gifts with branded options available.",
      features: ["Custom branding", "Secure packaging", "Gift wrapping"],
      price: "From ₦500"
    },
    {
      icon: Truck,
      title: "Delivery Services",
      description: "Fast and reliable delivery of documents and packages within Lagos and nationwide.",
      features: ["Same-day delivery", "Tracking", "Nationwide coverage"],
      price: "From ₦1,500"
    }
  ];

  const softSkillServices = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Learn to build modern, responsive websites using HTML, CSS, JavaScript, and popular frameworks.",
      features: ["React/Next.js", "Full-stack development", "Portfolio projects"],
      duration: "3-6 months",
      price: "₦150,000"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Master mobile app development for iOS and Android using React Native and Flutter.",
      features: ["Cross-platform apps", "App store deployment", "Real projects"],
      duration: "4-6 months",
      price: "₦200,000"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Professional training in Adobe Creative Suite, Canva, and modern design principles.",
      features: ["Logo design", "Brand identity", "UI/UX basics"],
      duration: "2-3 months",
      price: "₦80,000"
    },
    {
      icon: Video,
      title: "Video & Photo Editing",
      description: "Learn professional video editing with Premiere Pro, After Effects, and photo editing with Photoshop.",
      features: ["Color grading", "Motion graphics", "Photo manipulation"],
      duration: "2-4 months",
      price: "₦100,000"
    },
    {
      icon: Code,
      title: "Product Design",
      description: "Master UI/UX design principles, user research, and prototyping with Figma and Adobe XD.",
      features: ["Design thinking", "Prototyping", "User testing"],
      duration: "3-4 months",
      price: "₦120,000"
    },
    {
      icon: Monitor,
      title: "Software Installation",
      description: "Learn software deployment, system administration, and IT support fundamentals.",
      features: ["OS installation", "Software troubleshooting", "Network basics"],
      duration: "1-2 months",
      price: "₦50,000"
    }
  ];

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of cyber café services and professional training programs
          </p>
        </div>

        {/* Service Categories */}
        <Tabs defaultValue="cyber" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="cyber" onClick={() => setSelectedCategory("cyber")}>
              Cyber Café Services
            </TabsTrigger>
            <TabsTrigger value="skills" onClick={() => setSelectedCategory("skills")}>
              Soft Skills Training
            </TabsTrigger>
          </TabsList>

          {/* Cyber Cafe Services */}
          <TabsContent value="cyber">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cyberServices.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary">{service.price}</Badge>
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{service.description}</p>
                  
                  <ul className="space-y-1 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="font-body text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-gradient-primary group">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order Service
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Soft Skills Training */}
          <TabsContent value="skills">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkillServices.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{service.duration}</Badge>
                      <p className="font-body text-sm font-semibold mt-1">{service.price}</p>
                    </div>
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{service.description}</p>
                  
                  <ul className="space-y-1 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="font-body text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-gradient-primary">
                    Enroll Now
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="p-8 md:p-12 bg-gradient-card max-w-3xl mx-auto">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-4">
              Need a Custom Solution?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              We offer tailored services for businesses and institutions. Contact us to discuss your specific requirements.
            </p>
            <Button size="lg" className="bg-gradient-primary">
              Contact Us for Custom Quote
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Services;