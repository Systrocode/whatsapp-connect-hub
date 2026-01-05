import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, CheckCircle, Users, Clock, TrendingUp, Send, Calendar, Instagram, Facebook, MessageCircle, Phone, Check, MoreHorizontal, ArrowDown, Sparkles, Heart, Zap, Megaphone, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookDemoDialog } from '@/components/landing/BookDemoDialog';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { FloatingWidget } from '@/components/landing/FloatingWidget';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Index = () => {
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#00E785] blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-[#00E785] blur-3xl" />
        </div>

        <div className="container mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.15] tracking-tight">
              Grow your business
              <br />
              on{' '}
              <span className="relative inline-block px-4 py-2 mx-2">
                <span className="absolute inset-0 bg-[#00E785] rounded-lg -rotate-2 transform" />
                <span className="relative text-black">WhatsApp</span>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The complete platform for WhatsApp Business API. <br className="hidden sm:block" />
              Automate marketing, sales, and support in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">

              <a
                href="https://calendly.com/systrocode/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-[#00E785] hover:bg-[#00d176] text-black font-bold text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Demo
                </Button>
              </a>
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="xl"
                  className="h-14 px-8 rounded-xl border-2 text-lg font-medium"
                >
                  Request a Quote
                </Button>
              </Link>
            </div>

            {/* Trusted By Strip */}
            <div className="border-t border-border pt-10">
              <p className="text-sm text-muted-foreground font-medium mb-6 uppercase tracking-wider">Trusted by 10,000+ businesses</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos */}
                {/* The LaLiT Logo */}
                {/* Indigo Logo */}
                <div className="h-[52px] w-48 flex items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <img
                    src="/logos/indigo-airlines-logo.svg"
                    alt="Indigo"
                    className="h-full w-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 dark:invert dark:hue-rotate-180"
                  />
                </div>
                {/* Adani Logo */}
                <div className="h-[52px] w-48 flex items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <img
                    src="/logos/adani.svg"
                    alt="Adani"
                    className="h-full w-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 dark:invert dark:hue-rotate-180"
                  />
                </div>
                {/* Vivo Logo */}
                <div className="h-[52px] w-48 flex items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <img
                    src="/logos/vivo.svg"
                    alt="Vivo"
                    className="h-full w-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 dark:invert dark:hue-rotate-180"
                  />
                </div>
                {/* Stake Logo */}
                <div className="h-[52px] w-48 flex items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <img
                    src="/logos/stake logo.png"
                    alt="Stake"
                    className="h-full w-full object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 dark:invert dark:hue-rotate-180"
                  />
                </div>

              </div>
            </div>
          </motion.div>



          {/* WhatsApp Core Section */}
          <div className="mt-16 md:mt-32 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-32">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                WhatsApp at the core. <br />
                <span className="text-whatsapp">Conversations everywhere.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Start with WhatsApp and naturally extend to every channel your customers love.
                Manage website chat, Instagram, Facebook, SMS, calls and other social channels
                from one unified inbox.
              </p>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                Learn more about Integrations
              </Button>
            </motion.div>

            {/* Orbit Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center scale-[0.6] md:scale-100 origin-center mt-12 md:mt-0"
            >
              {/* Central Pulse */}
              <div className="absolute w-[300px] h-[300px] bg-green-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute w-[200px] h-[200px] bg-green-500/10 rounded-full blur-2xl" />

              {/* Animated Ripples */}
              <div className="absolute w-[140px] h-[140px] border border-green-500/20 rounded-full animate-ping [animation-duration:3s]" />
              <div className="absolute w-[180px] h-[180px] border border-green-500/20 rounded-full animate-ping [animation-duration:4s]" />

              {/* Central Logo */}
              <div className="relative z-20 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border-4 border-green-50 dark:border-green-900/30">
                {/* WhatsApp Icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-whatsapp">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>

              {/* Orbit Ring */}
              <div className="absolute w-[350px] h-[350px] border border-green-100 dark:border-green-900 rounded-full" />

              {/* Icons positioned by exact angles */}

              {/* Meta (Top) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(-90deg) translate(200px) rotate(90deg)' }}>
                <img src="/logos/meta.svg" alt="Meta" className="w-8 h-8 object-contain" />
                <span className="absolute -bottom-4 text-[10px] font-bold text-gray-500">Ads</span>
              </div>

              {/* Messenger (Top Right) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(-40deg) translate(200px) rotate(40deg)' }}>
                <img src="/logos/messenger.svg" alt="Messenger" className="w-8 h-8 object-contain" />
              </div>

              {/* Google Ads (Right) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(10deg) translate(200px) rotate(-10deg)' }}>
                <img src="/logos/google-ads.svg" alt="Google Ads" className="w-7 h-7 object-contain" />
                <span className="absolute -bottom-4 text-[10px] font-bold text-gray-500">Ads</span>
              </div>

              {/* Instagram (Bottom Right) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(60deg) translate(200px) rotate(-60deg)' }}>
                <img src="/logos/instagram.svg" alt="Instagram" className="w-8 h-8 object-contain" />
              </div>

              {/* RCS (Bottom Left) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(120deg) translate(200px) rotate(-120deg)' }}>
                <img src="/logos/rcs.svg" alt="RCS" className="w-8 h-8 object-contain" />
              </div>

              {/* Facebook (Left) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(180deg) translate(200px) rotate(-180deg)' }}>
                <img src="/logos/facebook.svg" alt="Facebook" className="w-8 h-8 object-contain" />
              </div>

              {/* Phone (Top Left) */}
              <div className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ transform: 'rotate(225deg) translate(200px) rotate(-225deg)' }}>
                <Phone className="w-7 h-7 text-green-500" />
              </div>

            </motion.div>
          </div>

          {/* AI Performance Section */}
          <div className="mt-16 md:mt-32 mb-16 md:mb-32">
            <div className="text-center mb-16">
              <span className="text-blue-500 font-bold tracking-wide uppercase text-sm">AI @ WHATSAPP CONNECT</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                10X your performance with <span className="text-blue-600">WhatsApp Connect AI</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Let our AI handle work for you, so your teams can drive meaningful conversations that build relationships and revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">

              {/* Background Glows */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

              {/* Inbound Intelligence Agent Card (Pink) */}
              <motion.div
                whileHover={{ y: -8 }}
                className="rounded-[2.5rem] border border-pink-200/60 bg-white/60 dark:bg-card/40 backdrop-blur-xl p-8 relative overflow-hidden flex flex-col items-center text-center shadow-xl shadow-pink-100/20 dark:shadow-none h-full"
              >
                {/* Floating Elements Layout */}
                <div className="w-full relative h-[380px] mb-8">
                  {/* Top Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-6 py-3 rounded-full shadow-lg shadow-pink-100/50 border border-pink-100 flex items-center gap-4 whitespace-nowrap z-10">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Qualify & Convert Leads</span>
                    <span className="text-3xl font-bold text-pink-500">24/7</span>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="absolute top-20 left-4 md:left-10 bg-white dark:bg-card p-4 rounded-xl rounded-tl-none shadow-md border border-neutral-100 max-w-[240px] text-left transform -rotate-2 z-0">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Hey, we're evaluating your product for a 20-member team.</p>
                  </div>

                  <div className="absolute top-40 right-4 md:right-10 bg-pink-500 text-white p-4 rounded-xl rounded-tr-none shadow-lg shadow-pink-200 dark:shadow-none max-w-[260px] text-left transform rotate-1 z-10">
                    <p className="text-sm">Hi there! Thanks for considering us. May I ask what key features are most important for your team?</p>
                  </div>

                  {/* Lead Card Mockup */}
                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white dark:bg-card w-[90%] p-4 rounded-2xl shadow-xl border border-pink-100 flex flex-col gap-2 z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-xl">🔥</div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-gray-900 dark:text-gray-100">Alex Johnson</div>
                        <div className="text-xs text-muted-foreground">NovaTech Inc.</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-gray-500">Score</div>
                        <div className="font-bold text-xl text-green-600">92</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-medium px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">Intent Detected</span>
                      <span className="bg-gray-900 text-white text-[10px] font-medium px-2 py-1 rounded-full">Demo Scheduled</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto z-10 relative">
                  <h3 className="text-2xl font-bold mb-3">Inbound Intelligence Agent</h3>
                  <p className="text-muted-foreground mb-8 text-lg">Build agents that qualify leads, uncover intent, and close sales on chat – all in no time.</p>
                  <Button variant="outline" size="lg" className="rounded-full px-10 py-6 text-base border-2 border-pink-200 hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-all font-bold">
                    Build Agent
                  </Button>
                </div>
              </motion.div>

              {/* AI Support Agent Card (Blue) */}
              <motion.div
                whileHover={{ y: -8 }}
                className="rounded-[2.5rem] border border-blue-200/60 bg-white/60 dark:bg-card/40 backdrop-blur-xl p-8 relative overflow-hidden flex flex-col items-center text-center shadow-xl shadow-blue-100/20 dark:shadow-none h-full"
              >
                {/* Floating Elements Layout */}
                <div className="w-full relative h-[380px] mb-8">
                  {/* Top Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-2 pl-6 py-3 rounded-full shadow-lg shadow-blue-100/50 border border-blue-100 flex items-center gap-2 whitespace-nowrap z-10">
                    <span className="text-4xl font-extrabold text-blue-500">60%</span>
                    <div className="text-left leading-tight pr-4">
                      <div className="font-bold text-gray-700 dark:text-gray-200">queries</div>
                      <div className="text-muted-foreground text-xs">answered instantly!</div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  {/* Chat Bubbles */}
                  <div className="absolute top-16 right-4 md:right-12 bg-blue-50 dark:bg-blue-900/20 p-4 px-5 rounded-2xl rounded-tr-none shadow-sm border border-blue-100 max-w-[260px] text-left transform rotate-2 z-0">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">How do I reset my password?</p>
                  </div>

                  <div className="absolute top-36 left-4 md:left-12 bg-white dark:bg-card p-4 rounded-xl rounded-tl-none shadow-md border border-blue-100 max-w-[280px] text-left transform -rotate-1 z-10">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">To reset your password, click <span className="font-semibold text-blue-500">'Forgot password'</span> on the login page.</p>
                  </div>

                  <div className="absolute top-64 right-8 bg-blue-50 dark:bg-blue-900/20 p-4 px-5 rounded-2xl rounded-tr-none shadow-sm border border-blue-100 max-w-[260px] text-left transform rotate-1 z-0">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Thanks! That worked perfectly.</p>
                  </div>

                  {/* Resolution Card Mockup */}
                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white dark:bg-card w-[90%] p-4 rounded-2xl shadow-xl border border-blue-100 flex items-center justify-between gap-3 z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-xl text-green-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 dark:text-gray-100">Ticket Solved</div>
                        <div className="text-xs text-muted-foreground">Automated by AI Agent</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">CSAT</div>
                      <div className="font-bold text-lg text-blue-600">5.0 ★</div>
                    </div>
                  </div>

                </div>

                <div className="mt-auto z-10 relative">
                  <h3 className="text-2xl font-bold mb-3">AI Support Agent</h3>
                  <p className="text-muted-foreground mb-8 text-lg">Train your AI support agent in minutes, and let it deflect up to 60% of customer queries.</p>
                  <Button variant="outline" size="lg" className="rounded-full px-10 py-6 text-base border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all font-bold">
                    Build Agent
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Marketing & Buyer Journey Section */}
          <div className="mt-32 mb-32">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-5xl mx-auto leading-tight">
                Turn conversations into revenue across your entire customer journey
              </h2>
            </div>

            <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">

              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">WHATSAPP-FIRST MARKETING</span>

                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                    From ad click to purchase—automate your growth at scale
                  </h3>

                  <div className="space-y-4">
                    {[
                      "Capture leads instantly: Turn Facebook & Instagram clicks directly into qualified WhatsApp subscribers.",
                      "Retarget & Recover: Automatically nudge customers who abandoned carts with personalized offers.",
                      "Broadcast with impact: Send campaigns that get read, not ignored, with rich media and interactive buttons.",
                      "Analyze & Optimize: Track every open, click, and sale to maximize your campaign ROI in real-time."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="mt-1 min-w-5 min-h-5 flex items-center justify-center">
                          <img src="https://img.icons8.com/fluency/48/checked.png" alt="Check" className="w-5 h-5" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 md:gap-6 py-6 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="text-2xl md:text-4xl font-bold text-blue-500 mb-1">98%</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider leading-tight">OPEN RATE</div>
                    </div>
                    <div className="border-l border-slate-200 dark:border-slate-800 pl-3 md:pl-6">
                      <div className="text-2xl md:text-4xl font-bold text-blue-500 mb-1">3X</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider leading-tight">MORE<br className="md:hidden" /> CONVERSIONS</div>
                    </div>
                    <div className="border-l border-slate-200 dark:border-slate-800 pl-3 md:pl-6">
                      <div className="text-2xl md:text-4xl font-bold text-blue-500 mb-1">45%</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider leading-tight">LOWER<br className="md:hidden" /> AD COST</div>
                    </div>
                  </div>

                  <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    Start Driving Sales
                  </Button>
                </div>

                {/* Right Visual */}
                <div className="relative">
                  {/* Ad Card Mockup */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 max-w-sm mx-auto relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* Flow Badges (Left Aligned) */}
                    <div className="hidden md:flex gap-2 absolute -top-10 left-0 items-center text-[10px] font-bold text-white z-10">
                      {['CLICK', 'CONNECT', 'CONVERT', 'REPEAT'].map((step, i, arr) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="bg-blue-400 px-3 py-1 rounded-full shadow-sm">{step}</span>
                          {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-blue-300" />}
                        </div>
                      ))}
                    </div>

                    {/* Meta Icon Floating */}
                    <div className="absolute -left-4 top-1/4 bg-white p-2 rounded-xl shadow-lg z-20">
                      <img src="/logos/meta.svg" alt="Meta" className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">US</div>
                      <div>
                        <div className="text-xs font-bold">Urban Styles</div>
                        <div className="text-[10px] text-slate-500">Sponsored</div>
                      </div>
                      <MoreHorizontal className="w-4 h-4 ml-auto text-slate-400" />
                    </div>

                    <div className="rounded-xl overflow-hidden mb-3 relative bg-slate-100 h-56 group">
                      {/* Placeholder Fashion Image - Using CSS Gradient logic or generic placeholder */}
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>

                      {/* Overlay Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <div className="flex items-end justify-between gap-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="text-white font-bold truncate">Summer Collection Drop ☀️</div>
                            <div className="text-white/80 text-xs truncate">Get 20% off your first order!</div>
                          </div>
                          <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg cursor-pointer hover:bg-green-600 transition-colors flex-shrink-0">
                            <MessageCircle className="w-3 h-3 fill-current" />
                            Shop on WhatsApp
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-slate-500">Shop Now</div>
                        <div className="text-xs font-bold text-blue-500">Learn More</div>
                      </div>
                    </div>

                    {/* Google Icon Floating */}
                    <div className="absolute -right-4 bottom-1/4 bg-white p-2 rounded-xl shadow-lg border border-slate-100 z-20">
                      <img src="/logos/google-ads.svg" alt="Google Ads" className="w-6 h-6 object-contain" />
                    </div>
                  </div>

                  {/* Chat Bubbles (Below Ad) */}
                  <div className="mt-8 space-y-4 max-w-xs mx-auto relative">
                    {/* Ripple Effect BG */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-2xl -z-10 animate-pulse"></div>

                    <div className="bg-green-100 text-green-900 p-3 rounded-2xl rounded-tr-none text-sm shadow-sm transform -translate-x-4 border border-green-200">
                      Wow! love that Denim Jacket! 😍 Do you have it in Medium?
                    </div>

                    <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-none text-sm shadow-lg border border-slate-100 transform translate-x-4 relative">
                      <div className="absolute -right-2 -top-2 text-blue-400">✨</div>
                      <span className="font-bold block mb-1">Urban Styles Bot</span>
                      Yes! 🙌 We have 3 left in Medium. Want me to add it to your cart with the 20% discount applied?
                      <div className="mt-2 flex gap-2">
                        <span className="text-blue-500 font-bold text-xs bg-blue-50 px-2 py-1 rounded cursor-pointer">Yes, add it!</span>
                        <span className="text-slate-500 text-xs bg-slate-50 px-2 py-1 rounded cursor-pointer">Show sizing</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Connector: Marketing to Sales */}
          <div className="flex flex-col items-center justify-center -mt-12 mb-4 relative z-10">
            <div className="h-16 w-0.5 bg-slate-100/50 dark:bg-slate-800 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-50"
                animate={{ top: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative z-10">
              <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 animate-pulse rounded-full"></div>
              <div className="w-14 h-14 bg-white dark:bg-card border-4 border-slate-50 dark:border-slate-800 rounded-full shadow-xl flex items-center justify-center relative z-20 transform hover:scale-110 transition-transform duration-300">
                <img src="https://img.icons8.com/fluency/48/lightning-bolt.png" alt="Zap" className="w-8 h-8" />
              </div>
            </div>

            <div className="h-16 w-0.5 bg-slate-100/50 dark:bg-slate-800 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-50"
                animate={{ top: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </div>
          </div>

          {/* Sales Pipeline Section */}
          <div className="mt-0 mb-32 relative">
            <div className="w-[95%] max-w-[1440px] mx-auto bg-[#FFF5FD] dark:bg-pink-950/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">

              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100/60 dark:bg-pink-900/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>

              <div className="grid lg:grid-cols-2 gap-16 lg:gap-40 items-start lg:items-center">

                {/* Left Visual - Flow Diagram */}
                <div className="relative w-full flex flex-col items-center order-2 lg:order-1 mt-8 lg:mt-0">

                  {/* Top Process Pills - Single line on mobile */}
                  <div className="w-full flex items-center justify-start gap-0.5 md:gap-3 px-0.5 mb-6 md:mb-8 overflow-hidden md:overflow-visible">
                    {['ENGAGE', 'QUALIFY', 'ASSIGN', 'WIN'].map((step, i) => (
                      <div key={step} className="flex items-center min-w-fit">
                        <span className="bg-[#FFD6F8] text-[#D845C2] px-1 sm:px-4 md:px-6 py-0.5 sm:py-2 rounded-full text-[7px] sm:text-[10px] md:text-xs font-bold shadow-sm whitespace-nowrap tracking-tight">{step}</span>
                        {i < 3 && <ArrowRight className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-pink-300 mx-[0px] sm:mx-1 md:mx-2 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>

                  {/* Action Chips - Wrap on mobile - Updated Design */}
                  <div className="w-full flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
                    {[
                      { label: 'See Offer', icon: '🏷️' },
                      { label: 'Follow-up scheduled', icon: '📅' },
                      { label: 'View Catalog', icon: '📖' },
                      { label: 'Rate Us', icon: '⭐' },
                      { label: 'Book Appointment', icon: '🗓️' }
                    ].map((chip) => (
                      <div key={chip.label} className="bg-white dark:bg-card border border-pink-200 dark:border-pink-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm text-[10px] md:text-xs font-bold flex items-center gap-1.5 transform hover:scale-105 transition-transform cursor-pointer text-slate-800 dark:text-slate-200">
                        <span className="whitespace-nowrap">{chip.label}</span>
                        <span className="text-black dark:text-white text-xs opacity-100 grayscale">{chip.icon}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Interface Layered */}
                  <div className="w-full max-w-sm md:max-w-md mx-auto relative">
                    {/* Connecting Line from Chips to Chat (Visual Cue) */}
                    <div className="absolute left-1/2 -top-10 h-10 w-px bg-gradient-to-b from-pink-200 to-transparent"></div>

                    {/* User Message - Pastel Green */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-[#D9FDD3] text-slate-900 p-3 md:p-4 px-5 md:px-6 rounded-2xl rounded-tl-none shadow-sm max-w-[90%] text-xs md:text-sm font-medium leading-relaxed relative z-10 border border-green-100/50"
                    >
                      I'd like to schedule a product walkthrough.
                    </motion.div>

                    {/* Agent Reply - Gradient Border */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mr-auto pointer-events-none relative max-w-[95%] group mt-4 md:mt-6"
                    >
                      <div className="p-[1px] rounded-2xl rounded-tl-none bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 shadow-lg">
                        <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl rounded-tl-none h-full w-full">
                          <div className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                            Happy to set up. Please let me know if I should add anyone else who'd be involved in taking a decision.
                          </div>
                        </div>
                      </div>

                      {/* Annotation - Text below */}
                      <div className="mt-2 text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 font-medium flex gap-1 justify-start w-full px-1">
                        <span>Collecting <span className="text-pink-600 dark:text-pink-400 font-bold">qualification information</span> before confirming meeting.</span>
                      </div>

                      {/* Sparkles */}
                      <div className="absolute -right-3 -top-3 text-lg md:text-xl animate-pulse text-indigo-400">✨</div>
                    </motion.div>

                    {/* Bot Action - Gradient Border */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mr-auto relative max-w-[95%] text-left mt-4 md:mt-6"
                    >
                      <div className="inline-block p-[1px] rounded-2xl rounded-tl-none bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 shadow-lg text-left">
                        <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl rounded-tl-none h-full w-full">
                          <div className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium">
                            Thanks! I have shared the invite and forwarded your details to my sales team.
                          </div>
                        </div>
                      </div>

                      {/* Annotation */}
                      <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 justify-start w-max mr-auto px-1">
                        <span>Ticket routed to Keith by <span className="text-indigo-500 font-bold">Aibo(bot)</span> for <span className="font-bold text-slate-700 dark:text-slate-300">demo scheduling</span>.</span>
                      </div>
                      {/* Sparkles */}
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-lg md:text-xl animate-pulse delay-700 text-cyan-400">✨</div>
                    </motion.div>


                  </div>

                </div>

                {/* Right Content - Order 1 on mobile to show text first */}
                <div className="space-y-6 md:space-y-8 text-left order-1 lg:order-2">
                  <span className="inline-block py-1 px-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-[10px] md:text-xs font-extrabold tracking-widest text-pink-600 uppercase mb-2">
                    WHATSAPP CONNECT FOR SALES
                  </span>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] md:leading-[1.15] -tracking-[0.02em]">
                    Accelerate pipeline,<br className="inline lg:hidden" /> increase conversions,<br className="inline lg:hidden" /> and shorten sales cycles.
                  </h3>

                  <div className="space-y-4 md:space-y-5">
                    {[
                      "One single workspace for all your sales reps to collaborate, communicate, and convert leads",
                      "Ensure no sales-ready leads slip through the cracks with real-time, instant qualification",
                      "Manage high lead volume easily on WhatsApp with Connect AI automation",
                      "Monitor customer chats ensures high-quality customer experience"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 md:gap-4 items-start group">
                        <div className="mt-1 min-w-5 min-h-5 md:min-w-6 md:min-h-6 flex items-center justify-center">
                          <img src="https://img.icons8.com/fluency/48/checked.png" alt="Check" className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 border-t border-pink-200 dark:border-pink-900/30">
                    <div>
                      <div className="text-2xl md:text-4xl font-extrabold text-pink-500 mb-1">30%</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">Reduction in<br />Sales Cycle</div>
                    </div>
                    <div className="border-l-2 border-pink-100 dark:border-pink-900/30 pl-4 md:pl-8">
                      <div className="text-2xl md:text-4xl font-extrabold text-pink-500 mb-1">3X</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">Faster<br />Responses</div>
                    </div>
                    <div className="border-l-2 border-pink-100 dark:border-pink-900/30 pl-4 md:pl-8">
                      <div className="text-2xl md:text-4xl font-extrabold text-pink-500 mb-1">20%</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">Revenue<br />Growth</div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full sm:w-auto rounded-full px-10 bg-pink-600 hover:bg-pink-700 text-white font-bold h-12 md:h-14 shadow-lg shadow-pink-200 dark:shadow-none hover:-translate-y-1 transition-all text-base">
                    Chat with a Rep
                  </Button>
                </div>

              </div>
            </div>
          </div>

          {/* Connector: Sales to Support */}
          <div className="flex flex-col items-center justify-center -mt-12 mb-4 relative z-10">
            <div className="h-16 w-0.5 bg-slate-100/50 dark:bg-slate-800 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-50"
                animate={{ top: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative z-10">
              <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-20 animate-pulse rounded-full"></div>
              <div className="w-14 h-14 bg-white dark:bg-card border-4 border-slate-50 dark:border-slate-800 rounded-full shadow-xl flex items-center justify-center relative z-20 transform hover:scale-110 transition-transform duration-300">
                <img src="https://img.icons8.com/fluency/48/like.png" alt="Heart" className="w-7 h-7" />
              </div>
            </div>

            <div className="h-16 w-0.5 bg-slate-100/50 dark:bg-slate-800 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-50"
                animate={{ top: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </div>
          </div>

          {/* Support Section (Yellow Theme) */}
          <div className="mt-0 mb-32 relative">
            <div className="w-[95%] max-w-[1440px] mx-auto bg-[#FFFDEB] dark:bg-yellow-950/20 rounded-[3rem] px-4 pt-8 pb-8 md:px-16 md:pt-16 md:pb-6 relative overflow-hidden">

              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-100/60 dark:bg-yellow-900/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="grid lg:grid-cols-2 gap-16 lg:gap-40 items-start">

                {/* Left Content (Text) */}
                <div className="space-y-6 md:space-y-8 text-left order-2 lg:order-1">
                  <span className="inline-block py-1 px-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-[10px] md:text-xs font-extrabold tracking-widest text-yellow-600 uppercase mb-2">
                    WHATSAPP CONNECT FOR SUPPORT
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] md:leading-[1.15] -tracking-[0.02em]">
                    Delight customers and handle questions at scale – Work in perfect harmony with WhatsApp Connect AI
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    {[
                      "Provide instant, accurate answers grounded in your knowledge base 24/7 and resolve most queries without human involvement",
                      "Intelligently route complex conversations to the right human agent by setting advanced routing rules",
                      "Collaborate better with a unified Team Inbox for all messaging platforms, with tags, contact attributes, history, and more",
                      "Enhance your support operations with data-driven insights on response time, resolutions, and agent-wise performance"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 md:gap-4 items-start group">
                        <div className="mt-1 min-w-5 min-h-5 md:min-w-6 md:min-h-6 flex items-center justify-center">
                          <img src="https://img.icons8.com/fluency/48/checked.png" alt="Check" className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 border-t border-yellow-200 dark:border-yellow-900/30">
                    <div>
                      <div className="text-2xl md:text-4xl font-extrabold text-yellow-500 mb-1">40%</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">Less<br />Workload</div>
                    </div>
                    <div className="border-l-2 border-yellow-100 dark:border-yellow-900/30 pl-4 md:pl-8">
                      <div className="text-2xl md:text-4xl font-extrabold text-yellow-500 mb-1">80%</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">FAQs Resolved<br />By AI</div>
                    </div>
                    <div className="border-l-2 border-yellow-100 dark:border-yellow-900/30 pl-4 md:pl-8">
                      <div className="text-2xl md:text-4xl font-extrabold text-yellow-500 mb-1">40%</div>
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-500 tracking-wider uppercase">Faster<br />Resolutions</div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full sm:w-auto rounded-full px-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 md:h-14 shadow-lg shadow-yellow-200 dark:shadow-none hover:-translate-y-1 transition-all text-base">
                    Test AI Support
                  </Button>
                </div>

                {/* Right Visual (Mockup) */}
                <div className="relative w-full flex flex-col items-center order-1 lg:order-2 mb-12 lg:mb-0">
                  {/* Process Pills */}
                  <div className="w-full flex flex-wrap justify-center lg:justify-end gap-2 mb-8 md:mb-12">
                    {['INQUIRY', 'RESPOND', 'ESCALATE', 'RESOLVE'].map((step, i) => (
                      <div key={step} className="flex items-center gap-1">
                        <span className="bg-[#FFF4C5] text-[#D8A700] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-sm">{step}</span>
                        {i < 3 && <ArrowRight className="w-3 h-3 text-yellow-300" />}
                      </div>
                    ))}
                  </div>

                  {/* Chat Mockup */}
                  <div className="relative w-full max-w-md mx-auto">
                    {/* User Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-[#D9FDD3] p-4 rounded-2xl rounded-tr-none shadow-sm mb-6 relative z-10 border border-green-100 max-w-[85%] ml-auto"
                    >
                      <p className="text-sm font-medium text-slate-800">I can't access my account and was charged twice for my subscription.</p>
                    </motion.div>

                    {/* Bot Reply */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white p-6 rounded-2xl rounded-tl-none shadow-xl border border-blue-100 relative max-w-[95%]"
                    >
                      <div className="absolute -right-2 -top-2 text-blue-400">✨</div>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">
                        Hi! Your login issue is due to a password reset—please reset by clicking the button. The extra charge is being refunded; you'll get an update in 1–2 days.
                      </p>
                    </motion.div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8 justify-center">
                      <span className="bg-blue-300 text-blue-900 text-[10px] md:text-xs font-bold px-3 py-1 rounded shadow-sm border-2 border-black">MULTILINGUAL</span>
                      <span className="bg-yellow-300 text-yellow-900 text-[10px] md:text-xs font-bold px-3 py-1 rounded shadow-sm border-2 border-black">CONTEXTUAL</span>
                      <span className="bg-pink-300 text-pink-900 text-[10px] md:text-xs font-bold px-3 py-1 rounded shadow-sm border-2 border-black">EMPATHETIC</span>
                    </div>

                    {/* Background Pulse/Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-100/50 rounded-full blur-3xl -z-10"></div>
                  </div>

                  {/* Extra Visuals to fill length - Metrics & Team */}
                  <div className="w-full max-w-md mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                    {/* CSAT Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white dark:bg-card p-4 rounded-2xl shadow-lg border border-yellow-100 dark:border-yellow-900/30 flex flex-col items-center"
                    >
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">CSAT Score</div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">4.9</span>
                        <span className="text-yellow-400 text-lg">★</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[98%]"></div>
                      </div>
                    </motion.div>

                    {/* Speed Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white dark:bg-card p-4 rounded-2xl shadow-lg border border-yellow-100 dark:border-yellow-900/30 flex flex-col items-center"
                    >
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Reply Time</div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">⚡ 45s</span>
                      </div>
                      <div className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full">
                        ▼ 12% vs last week
                      </div>
                    </motion.div>

                    {/* Active Agents (Spanning) */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="col-span-full bg-white/50 dark:bg-card/50 backdrop-blur-sm p-3 rounded-2xl border border-yellow-100/50 flex items-center justify-between px-6"
                    >
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-yellow-${i * 100 + 200} flex items-center justify-center text-[10px] font-bold text-yellow-800`}>
                            AG
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Team Inbox Active</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </motion.div>

                    {/* Integrations Row to Fill Space */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="col-span-2 pt-2 border-t border-yellow-200 dark:border-yellow-900/30"
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">Seamless Integration</div>
                      <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="font-bold text-slate-500 text-xs flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>HubSpot</div>
                        <div className="font-bold text-slate-500 text-xs flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Salesforce</div>
                        <div className="font-bold text-slate-500 text-xs flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Zendesk</div>
                      </div>
                    </motion.div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Integrations Ecosystem Section */}
          <div className="py-24 bg-slate-950 relative overflow-hidden mx-2 md:mx-4 rounded-[40px] md:rounded-[60px]">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full"></div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            </div>
            <div className="container mx-auto px-4 text-center mb-16 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Connect WhatsApp with your<br />team's existing stack
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Connect your tools, connect your teams. With over 100 apps already available in our directory, your team's favorite tools are just a click away.
              </p>
            </div>

            {/* Desktop Visual */}
            <div className="hidden md:flex relative max-w-7xl mx-auto h-[500px] justify-center items-center">

              {/* SVG Connector Lines with Neural Network Animation */}
              <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60">
                <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Left Lines & Animations */}
                  <path id="L1" d="M 600 250 C 450 250, 300 110, 150 110" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#60A5FA" filter="url(#glow)"><animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1"><mpath href="#L1" /></animateMotion></circle>

                  <path id="L2" d="M 600 250 C 450 250, 450 175, 300 175" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle r="3" fill="#34D399" filter="url(#glow)"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#L2" /></animateMotion></circle>

                  <path id="L3" d="M 600 250 C 450 250, 300 260, 150 260" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#A78BFA" filter="url(#glow)"><animateMotion dur="2.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#L3" /></animateMotion></circle>

                  <path id="L4" d="M 600 250 C 450 250, 450 350, 300 350" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle r="3" fill="#F472B6" filter="url(#glow)"><animateMotion dur="3.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#L4" /></animateMotion></circle>

                  <path id="L5" d="M 600 250 C 450 250, 300 440, 150 440" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#60A5FA" filter="url(#glow)"><animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#L5" /></animateMotion></circle>

                  {/* Right Lines & Animations */}
                  <path id="R1" d="M 600 250 C 750 250, 900 110, 1050 110" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#FBBF24" filter="url(#glow)"><animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#R1" /></animateMotion></circle>

                  <path id="R2" d="M 600 250 C 750 250, 750 175, 900 175" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle r="3" fill="#34D399" filter="url(#glow)"><animateMotion dur="5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#R2" /></animateMotion></circle>

                  <path id="R3" d="M 600 250 C 750 250, 900 260, 1050 260" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#F87171" filter="url(#glow)"><animateMotion dur="2.8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#R3" /></animateMotion></circle>

                  <path id="R4" d="M 600 250 C 750 250, 750 350, 900 350" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
                  <circle r="3" fill="#A78BFA" filter="url(#glow)"><animateMotion dur="3.8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#R4" /></animateMotion></circle>

                  <path id="R5" d="M 600 250 C 750 250, 900 440, 1050 440" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle r="3" fill="#FBBF24" filter="url(#glow)"><animateMotion dur="4.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#R5" /></animateMotion></circle>
                </svg>
              </div>

              {/* Central Hub Logo */}
              <div className="relative z-20 w-32 h-32 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <div className="w-20 h-20 bg-[#25D366] rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-inner">
                  <MessageSquare className="w-10 h-10 text-white fill-current" />
                </div>
                <div className="absolute -inset-8 bg-green-500/10 blur-3xl -z-10 rounded-full animate-pulse"></div>
              </div>

              {/* ================================================================================== */}
              {/*  📍 LEFT SIDE CRM LOGOS - ADD YOUR LOGOS HERE                                     */}
              {/* ================================================================================== */}
              <div className="absolute left-[8%] top-[12%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/zendesk.svg" alt="Zendesk" className="w-14 h-14 object-contain" /></div>
              <div className="absolute left-[20%] top-[25%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/salesforce.svg" alt="Salesforce" className="w-14 h-14 object-contain" /></div>
              <div className="absolute left-[10%] top-[42%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/woocommerce.svg" alt="WooCommerce" className="w-14 h-14 object-contain" /></div>
              <div className="absolute left-[22%] top-[60%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/zoho.svg" alt="Zoho" className="w-14 h-14 object-contain" /></div>
              <div className="absolute left-[8%] top-[78%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/pipedrive.svg" alt="Pipedrive" className="w-14 h-14 object-contain" /></div>

              {/* ================================================================================== */}
              {/*  📍 RIGHT SIDE CRM LOGOS - ADD YOUR LOGOS HERE                                    */}
              {/* ================================================================================== */}
              <div className="absolute right-[8%] top-[12%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/hubspot.svg" alt="HubSpot" className="w-14 h-14 object-contain" /></div>
              <div className="absolute right-[20%] top-[25%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/shopify-logo.svg" alt="Shopify" className="w-14 h-14 object-contain" /></div>
              <div className="absolute right-[10%] top-[42%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/zapier.svg" alt="Zapier" className="w-14 h-14 object-contain" /></div>
              <div className="absolute right-[22%] top-[60%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/odoo.svg" alt="Odoo" className="w-14 h-14 object-contain" /></div>
              <div className="absolute right-[8%] top-[78%] p-6 bg-white dark:bg-card shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 transition-transform"><img src="/logos/google-ads.svg" alt="Google Ads" className="w-14 h-14 object-contain" /></div>

            </div>

            {/* Mobile Grid Fallback */}
            <div className="grid grid-cols-3 gap-3 px-4 md:hidden">
              {[
                { name: 'Salesforce', logo: '/logos/salesforce.svg' },
                { name: 'HubSpot', logo: '/logos/hubspot.svg' },
                { name: 'Shopify', logo: '/logos/shopify-logo.svg' },
                { name: 'Zoho', logo: '/logos/zoho.svg' },
                { name: 'Zapier', logo: '/logos/zapier.svg' },
                { name: 'WooCommerce', logo: '/logos/woocommerce.svg' },
                { name: 'Google Ads', logo: '/logos/google-ads.svg' },
                { name: 'Zendesk', logo: '/logos/zendesk.svg' },
                { name: 'Pipedrive', logo: '/logos/pipedrive.svg' },
                { name: 'Odoo', logo: '/logos/odoo.svg' }
              ].map((item) => (
                <div key={item.name} className="aspect-square bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  <img src={item.logo} alt={item.name} className="w-14 h-14 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative"
          >
            {/* Green Light Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/20 blur-[120px] -z-10 rounded-full"></div>

            <div className="relative bg-card rounded-3xl border border-border/50 shadow-[0_30px_60px_-15px_rgba(34,197,94,0.2)] overflow-hidden ring-1 ring-white/10">
              <div className="h-12 bg-muted/50 flex items-center gap-2 px-6 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 bg-gradient-to-b from-card to-muted/20">
                {/* Reusing existing dashboard content structure but could be simplified */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Broadcast Campaign</h3>
                        <p className="text-muted-foreground">Sent to 1,204 customers • 98% Open Rate</p>
                      </div>
                      <div className="ml-auto text-green-600 font-bold">+24%</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                        <div className="text-muted-foreground mb-2">Active Contacts</div>
                        <div className="text-3xl font-bold">4,291</div>
                      </div>
                      <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                        <div className="text-muted-foreground mb-2">Messages Sent</div>
                        <div className="text-3xl font-bold">128k</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between">
                    <div className="font-semibold mb-4">Live Chat</div>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">JD</div>
                        <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">Hi, I need help with...</div>
                      </div>
                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-[#00E785] text-black flex items-center justify-center text-xs font-bold">AI</div>
                        <div className="bg-[#00E785]/20 p-3 rounded-2xl rounded-tr-none text-sm text-foreground">Sure! I can help you with that using our new AI features.</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="h-10 bg-muted rounded-xl w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Features */}
      < section className="py-24 px-6 bg-muted/20" >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Powerful features built for growth
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Team Inbox',
                description: 'One inbox for your entire team. Assign chats, add labels, and collaborate seamlessly.',
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                iconUrl: 'https://img.icons8.com/3d-fluency/94/chat-message.png'
              },
              {
                title: 'Broadcast & Bulk',
                description: 'Send personalized campaigns to thousands of customers with just a few clicks.',
                bg: 'bg-purple-50 dark:bg-purple-900/20',
                iconUrl: 'https://img.icons8.com/3d-fluency/94/megaphone.png'
              },
              {
                title: 'Automated Chatbots',
                description: 'Build no-code chatbots to handle support queries and qualify leads 24/7.',
                bg: 'bg-green-50 dark:bg-green-900/20',
                iconUrl: 'https://img.icons8.com/3d-fluency/94/robot-2.png'
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${feature.bg} p-8 rounded-3xl border border-transparent hover:border-border transition-all`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-background shadow-sm flex items-center justify-center mb-6`}>
                  <img src={feature.iconUrl} alt={feature.title} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >



      {/* Footer */}
      < LandingFooter />

      <BookDemoDialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen} />
      <FloatingWidget />
    </div >
  );
};

export default Index;
