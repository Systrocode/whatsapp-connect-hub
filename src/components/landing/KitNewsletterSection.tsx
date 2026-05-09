import { useEffect, useRef } from 'react';

const KIT_FORM_UID = '78a8d72db0';
const KIT_SCRIPT_URL = `https://avelo.kit.com/${KIT_FORM_UID}/index.js`;

export const KitNewsletterSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (wrapper.querySelector('script[data-uid]')) return;

    const script = document.createElement('script');
    script.src = KIT_SCRIPT_URL;
    script.async = true;
    script.setAttribute('data-uid', KIT_FORM_UID);
    wrapper.appendChild(script);
  }, []);

  return (
    <section className="w-full relative overflow-hidden py-16 px-4">

      {/* Background image — blurred at ~10% (2px) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/newsletter-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: 'scale(1.06)', // slightly scale to hide blur edges
          zIndex: 0,
        }}
      />

      {/* Subtle dark overlay so form stays readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 1,
        }}
      />

      {/* Kit form — left aligned, responsive */}
      <div
        ref={wrapperRef}
        className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24"
        style={{ maxWidth: '780px', zIndex: 2 }}
      />

    </section>
  );
};
