import { useEffect } from 'react';

import { gtm } from '/home/jamel_s/projects/Capstone-SDI18-SupraDev/ui/src/libs/gtm';

export const usePageView = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
};