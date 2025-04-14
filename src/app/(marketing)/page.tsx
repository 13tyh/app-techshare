import CallToAction from '@/components/call-to-action';
import Features from '@/components/features';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import MarketingHeader from '@/components/marketing-header';
import {LoginModal} from '@/features/auth/components/login-modal';

const MarketingPage = () => {
  return (
    <main className="min-h-screen">
      <LoginModal />
      <MarketingHeader />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default MarketingPage;
