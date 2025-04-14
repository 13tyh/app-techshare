import CallToAction from '@/components/call-to-action';
import Features from '@/components/features';
import Hero from '@/components/hero';
import MarketingHeader from '@/components/marketing-header';

const MarketingPage = () => {
  return (
    <main className="min-h-screen">
      <MarketingHeader />
      <Hero />
      <Features />
      <CallToAction />
      {/* <Footer /> */}
    </main>
  );
};

export default MarketingPage;
