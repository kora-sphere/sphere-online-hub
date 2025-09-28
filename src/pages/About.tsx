import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    { icon: Heart, title: "Excellence", description: "We deliver top-quality services that exceed expectations" },
    { icon: Users, title: "Customer First", description: "Your satisfaction is our primary goal" },
    { icon: Zap, title: "Innovation", description: "Embracing technology to provide cutting-edge solutions" },
    { icon: Award, title: "Integrity", description: "Transparent and honest in all our dealings" },
  ];

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
            About <span className="text-primary">Kora Sphere</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in digital transformation and professional development
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-20">
          <Card className="p-8 md:p-12 shadow-card">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-6">Our Story</h2>
            <div className="font-body text-muted-foreground space-y-4">
              <p>
                Kora Sphere Global Limited, formerly known as King's Online Cyber Café, was born from a vision to 
                revolutionize how people access digital services and professional training. We recognized the growing 
                need for accessible, high-quality online services that bridge the gap between traditional cyber cafés 
                and modern digital demands.
              </p>
              <p>
                Founded with a commitment to excellence and innovation, we've transformed from a simple cyber café 
                into a comprehensive digital services provider. Today, we serve thousands of students, professionals, 
                businesses, and institutions across Nigeria and beyond, offering everything from document services to 
                advanced technical training.
              </p>
              <p>
                Our journey has been marked by continuous growth, technological advancement, and an unwavering 
                dedication to empowering our clients with the tools and skills they need to succeed in the digital age.
              </p>
            </div>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-primary mr-4" />
                <h3 className="font-heading font-semibold text-2xl">Our Vision</h3>
              </div>
              <p className="font-body text-muted-foreground">
                To be the leading provider of innovative online cyber café and soft-skill services, empowering 
                individuals and organizations to achieve their full potential in the digital era.
              </p>
            </Card>

            <Card className="p-8 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-4" />
                <h3 className="font-heading font-semibold text-2xl">Our Mission</h3>
              </div>
              <p className="font-body text-muted-foreground">
                To provide accessible, affordable, and high-quality digital services and training that enable our 
                clients to excel in their personal and professional endeavors, while fostering a culture of continuous 
                learning and innovation.
              </p>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-card transition-shadow">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">{value.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <Card className="p-8 md:p-12 bg-gradient-card">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-6 text-center">
              Why Choose Kora Sphere?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">24/7 Availability</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Access our services anytime, anywhere. We're always here when you need us.
                </p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">Expert Support</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Our team of professionals is ready to assist you with any challenge.
                </p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">Secure & Reliable</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Your data and transactions are protected with industry-leading security.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default About;