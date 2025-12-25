import { Link } from "react-router-dom";
import { MessageSquare, Twitter, Linkedin, Facebook, Instagram, Send } from "lucide-react";

export function LandingFooter() {
    return (
        <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">WA Business</span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            The complete WhatsApp Business dashboard for modern teams.
                            Automate support, drive sales, and grow your business with the official WhatsApp API.
                        </p>

                        <div className="flex items-center gap-4">
                            {/* Meta Tech Partner Badge */}
                            <a
                                href="https://www.facebook.com/business/partner-directory"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                title="Verified Meta Tech Partner"
                            >
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Meta Tech Partner</span>
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link to="/features/whatsapp-broadcasting" className="text-muted-foreground hover:text-primary transition-colors text-sm">Broadcasting</Link></li>
                            <li><Link to="/features/ai-whatsapp-chatbot" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI Chatbot</Link></li>
                            <li><Link to="/features/whatsapp-forms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Flow Builder</Link></li>
                            <li><Link to="/integrations/shopify" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shopify Integration</Link></li>
                            <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link></li>
                            <li><Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm">Case Studies</Link></li>
                            <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">Help Center</Link></li>
                            <li><Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors text-sm">API Docs</Link></li>
                            <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors text-sm">Community</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
                            <li><Link to="/partner/become-partner" className="text-muted-foreground hover:text-primary transition-colors text-sm">Partners</Link></li>
                            <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">Careers</Link></li>
                            <li><Link to="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-border my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} WA Business. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <SocialLink href="https://twitter.com" icon={Twitter} />
                        <SocialLink href="https://linkedin.com" icon={Linkedin} />
                        <SocialLink href="https://instagram.com" icon={Instagram} />
                        <SocialLink href="https://facebook.com" icon={Facebook} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
        <Icon className="w-4 h-4" />
    </a>
);
