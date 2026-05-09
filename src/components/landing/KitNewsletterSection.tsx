import { useEffect } from 'react';

const KIT_FORM_UID = '78a8d72db0';
const KIT_SCRIPT_URL = `https://avelo.kit.com/${KIT_FORM_UID}/index.js`;

export const KitNewsletterSection = () => {
  useEffect(() => {
    // Avoid injecting duplicate scripts
    if (document.querySelector(`script[data-uid="${KIT_FORM_UID}"]`)) return;

    const script = document.createElement('script');
    script.src = KIT_SCRIPT_URL;
    script.async = true;
    script.setAttribute('data-uid', KIT_FORM_UID);
    document.body.appendChild(script);
  }, []);

  return <div data-uid={KIT_FORM_UID} />;
};
