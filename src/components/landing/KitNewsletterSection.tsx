import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Bell, TrendingUp } from 'lucide-react';

const KIT_FORM_UID = '78a8d72db0';
const KIT_SCRIPT_URL = `https://avelo.kit.com/${KIT_FORM_UID}/index.js`;

export const KitNewsletterSection = () => {
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (scriptInjected.current) return;

    // Remove any existing Kit script first to avoid duplicates
    const existing = document.querySelector(`script[data-uid="${KIT_FORM_UID}"]`);
    if (existing) {
      scriptInjected.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = KIT_SCRIPT_URL;
    script.async = true;
    script.setAttribute('data-uid', KIT_FORM_UID);
    document.body.appendChild(script);
    scriptInjected.current = true;
  }, []);

  const perks = [
    { icon: <TrendingUp className="w-4 h-4" />, text: 'WhatsApp growth tips' },
    { icon: <Bell className="w-4 h-4" />, text: 'Product updates first' },
    { icon: <Mail className="w-4 h-4" />, text: 'No spam, ever' },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00E785]/10 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-green-500/5 blur-[80px] rounded-full" />
      </div>

      {/* Decorative border top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E785]/40 to-transparent" />

      <div className="container mx-auto max-w-3xl relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#00E785]/10 border border-[#00E785]/30 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-[#00E785]" />
            <span className="text-sm font-bold text-[#00E785] tracking-wide">
              AVELO NEWSLETTER
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-foreground leading-tight mb-5"
        >
          Stay ahead of the{' '}
          <span className="relative inline-block px-3 mx-1">
            <span className="absolute inset-0 bg-[#00E785] rounded-lg -rotate-1 transform" />
            <span className="relative text-black">WhatsApp</span>
          </span>{' '}
          curve
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-8"
        >
          Get expert WhatsApp marketing tips, platform updates, and exclusive growth strategies — delivered straight to your inbox.
        </motion.p>

        {/* Perks Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {perks.map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 border border-border px-4 py-2 rounded-full"
            >
              <span className="text-[#00E785]">{perk.icon}</span>
              {perk.text}
            </div>
          ))}
        </motion.div>

        {/* Kit Form Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="kit-form-wrapper rounded-3xl overflow-hidden shadow-2xl shadow-[#00E785]/10 border border-[#00E785]/20 bg-card/60 backdrop-blur-sm p-2"
        >
          {/* The Kit script will inject the form inside this div */}
          <div data-uid={KIT_FORM_UID} className="kit-embed-target" />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-5"
        >
          Join 10,000+ businesses. Unsubscribe anytime. 🔒 We respect your privacy.
        </motion.p>
      </div>

      {/* Decorative border bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E785]/40 to-transparent" />
    </section>
  );
};
