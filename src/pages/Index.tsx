import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, CheckCircle, Users, Clock, TrendingUp, Send, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookDemoDialog } from '@/components/landing/BookDemoDialog';

const Index = () => {
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">WA Business</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/auth">
              <Button variant="whatsapp">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-whatsapp blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-whatsapp blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp-light text-whatsapp-dark text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              Trusted by 10,000+ businesses
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your complete{' '}
              <span className="text-gradient">WhatsApp Business</span>{' '}
              dashboard
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Manage all your WhatsApp Business conversations, automate responses, 
              track analytics, and grow your customer relationships from one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button variant="whatsapp" size="xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" onClick={() => setIsDemoDialogOpen(true)}>
                <Calendar className="w-5 h-5" />
                Book a Demo
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-3xl" />
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              <div className="h-8 bg-muted flex items-center gap-2 px-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-whatsapp/50" />
              </div>
              <div className="p-6 bg-gradient-to-b from-background to-muted/30">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Conversations', value: '1,284', icon: MessageSquare, color: 'text-whatsapp' },
                    { label: 'Contacts', value: '3,721', icon: Users, color: 'text-primary' },
                    { label: 'Avg Response', value: '2.4m', icon: Clock, color: 'text-amber-500' },
                    { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-emerald-500' },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="h-24 rounded-xl bg-card border border-border p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-48 rounded-xl bg-card border border-border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-foreground">Recent Conversations</span>
                      <span className="text-xs text-muted-foreground">View all</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Sarah J.', msg: 'Hi, I wanted to ask about your product...', time: '2m' },
                        { name: 'Mike C.', msg: 'Thank you for the quick response!', time: '15m' },
                        { name: 'Emma W.', msg: 'Can you help me with my order?', time: '1h' },
                      ].map((conv, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {conv.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{conv.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{conv.msg}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-48 rounded-xl bg-card border border-border p-4">
                    <span className="text-sm font-medium text-foreground">Quick Actions</span>
                    <div className="mt-3 space-y-2">
                      {['Send Message', 'New Contact', 'Templates'].map((action, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                          <Send className="w-3 h-3" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed to help you manage and grow your business on WhatsApp.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart Inbox',
                description: 'Manage all conversations in one unified inbox with smart filters and labels.',
              },
              {
                title: 'Auto Responses',
                description: 'Set up automated replies for common questions to respond 24/7.',
              },
              {
                title: 'Analytics',
                description: 'Track message performance, response times, and customer engagement.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-dark rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-whatsapp blur-3xl" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-whatsapp blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">
                Ready to transform your business?
              </h2>
              <p className="text-sidebar-foreground/70 mb-8 max-w-lg mx-auto">
                Join thousands of businesses already using our platform to connect with their customers.
              </p>
              <Link to="/auth">
                <Button variant="whatsapp" size="xl" className="animate-pulse-glow">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-primary flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">WA Business</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 WA Business Dashboard. All rights reserved.
          </p>
        </div>
      </footer>

      <BookDemoDialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen} />
    </div>
  );
};

export default Index;
