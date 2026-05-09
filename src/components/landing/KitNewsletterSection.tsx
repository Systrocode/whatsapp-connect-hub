import { useEffect, useRef } from 'react';

const KIT_FORM_UID = '78a8d72db0';
const KIT_SCRIPT_URL = `https://avelo.kit.com/${KIT_FORM_UID}/index.js`;

export const KitNewsletterSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Avoid duplicate injection
    if (wrapper.querySelector('script[data-uid]')) return;

    const script = document.createElement('script');
    script.src = KIT_SCRIPT_URL;
    script.async = true;
    script.setAttribute('data-uid', KIT_FORM_UID);

    // Inject script INSIDE the wrapper so Kit renders the form here, not at body end
    wrapper.appendChild(script);
  }, []);

  return (
    <section
      style={{ backgroundColor: '#ffffff' }}
      className="w-full py-16 px-4 border-t border-gray-100"
    >
      <div
        ref={wrapperRef}
        className="mx-auto w-full"
        style={{ maxWidth: '680px' }}
      />
    </section>
  );
};
