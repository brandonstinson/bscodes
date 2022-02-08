import { useEffect, useState } from 'react';

import favB from '../../public/favicons/faviconB.ico';
import favS from '../../public/favicons/faviconS.ico';
import favU from '../../public/favicons/faviconU.ico';

const favicons = [favB, favS, favU];

export const AnimatedFavicon = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector('link[rel=icon]')?.remove();
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = favicons[count % favicons.length].src;
      document.querySelector('head')?.appendChild(link);
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return <></>;
};
