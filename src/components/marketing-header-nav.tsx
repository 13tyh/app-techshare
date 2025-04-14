'use client';

import {useLoginModal} from '@/features/auth/hooks/use-login-modal';
import {Button} from './ui/button';

const MarketingHeaderNav = () => {
  const {open} = useLoginModal();
  return (
    <nav>
      <Button onClick={open}>ログイン</Button>
    </nav>
  );
};

export default MarketingHeaderNav;
