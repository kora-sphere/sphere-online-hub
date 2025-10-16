import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ChatWidget from "@/components/chat/ChatWidget";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ServicesOverview />
      
      {/* Live Chat Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Need Help?</h2>
            <p className="text-lg text-muted-foreground">
              Chat with our support team in real-time
            </p>
          </div>
          <ChatWidget />
        </div>
      </section>
    </main>
  );
};

export default Home;