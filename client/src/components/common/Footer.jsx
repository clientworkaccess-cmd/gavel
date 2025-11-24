import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { FaGavel } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-border/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <FaGavel className="text-primary text-2xl" />
                            <span className="text-xl font-bold text-foreground">Gavel</span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs">
                            AI-powered interviews that help you shortlist candidates faster and smarter.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/50 my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Gavel. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        {[
                            { icon: Twitter, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Facebook, href: "#" },
                            { icon: Mail, href: "mailto:support@gavel.com" },
                        ].map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
