'use client';

import Container from '@/components/container';
import Logo from '@/components/logo';
import MarketingHeaderNav from '@/components/marketing-header-nav';

const MarketingHeader = () => {
  return (
    <header className="fixed top-0 w-full bg-white z-10 border-b border-netural-200 mb-16">
      <Container className="flex items-center justify-between h-16">
        <Logo />
        <MarketingHeaderNav />
      </Container>
    </header>
  );
};

export default MarketingHeader;
