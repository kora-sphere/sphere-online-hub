import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Printer, 
  Scan, 
  Package, 
  Truck,
  Code,
  Smartphone,
  Globe,
  Palette,
  Video,
  ArrowRight
} from "lucide-react";

const ServicesOverview = () => {
  const cyberServices = [
    { icon: FileText, title: "Document Typing", description: "Professional document preparation and formatting" },
    { icon: Printer, title: "Printing Services", description: "High-quality printing for all your needs" },
    { icon: Scan, title: "Scanning", description: "Digital conversion of physical documents" },
    { icon: Package, title: "Packaging", description: "Professional packaging solutions" },
    { icon: Truck, title: "Delivery", description: "Fast and reliable delivery services" },
  ];

  const softSkillServices = [
    { icon: Smartphone, title: "Mobile Development", description: "Build powerful mobile applications" },
    { icon: Globe, title: "Web Development", description: "Create stunning websites and web apps" },
    { icon: Palette, title: "Graphic Design", description: "Professional design services" },
    { icon: Video, title: "Video Editing", description: "Expert video production and editing" },
    { icon: Code, title: "Software Solutions", description: "Custom software development" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From document services to professional training, we've got everything you need to succeed in the digital world.
          </p>
        </div>

        {/* Cyber Cafe Services */}
        <div className="mb-16">
          <h3 className="font-heading font-semibold text-2xl mb-8 flex items-center">
            <div className="w-12 h-1 bg-gradient-primary mr-4"></div>
            Cyber Café Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cyberServices.map((service, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">{service.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Soft Skills Services */}
        <div className="mb-12">
          <h3 className="font-heading font-semibold text-2xl mb-8 flex items-center">
            <div className="w-12 h-1 bg-gradient-primary mr-4"></div>
            Soft Skills & Training
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {softSkillServices.map((service, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">{service.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-gradient-primary group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;