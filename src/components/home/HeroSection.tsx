import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Code, Palette } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d7000f' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Animation */}
          <div className="mb-8 inline-block">
            <div className="h-24 w-24 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center animate-pulse shadow-card">
              <span className="text-primary-foreground font-heading font-bold text-4xl">KS</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Kora Sphere
            <span className="text-primary block mt-2">Global Limited</span>
          </h1>

          {/* Slogan */}
          <p className="font-body text-xl sm:text-2xl text-muted-foreground mb-8">
            Empowering You, Everywhere
          </p>

          {/* Description */}
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Your complete online cyber café and soft-skill services provider. Access professional document services, 
            printing, scanning, and expert training from anywhere in the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="font-semibold">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <FileText className="h-4 w-4 text-primary" />
              <span className="font-body text-sm font-medium">Document Services</span>
            </div>
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Code className="h-4 w-4 text-primary" />
              <span className="font-body text-sm font-medium">Tech Training</span>
            </div>
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Palette className="h-4 w-4 text-primary" />
              <span className="font-body text-sm font-medium">Design Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;