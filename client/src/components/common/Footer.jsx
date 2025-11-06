/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { FaGavel } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 text-gray-700 bg-linear-to-r from-secondary/30 to-gray-200 mt-4 rounded-xl">
            <div className="px-6 lg:px-8 py-12">
                {/* Top Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {/* Logo + Description */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 pb-4">
                            <FaGavel className="text-blue-600 text-2xl" />
                            <span className="text-xl font-bold text-blue-600">Gavel</span>
                        </Link>
                        <p className="text-gray-600 max-w-xs">
                            AI-powered interviews that help you shortlist candidates faster and smarter.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link to="/about" className="hover:text-secondary transition">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-secondary transition">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link to="/help" className="hover:text-secondary transition">Help Center</Link></li>
                            </ul>
                        </div>

                    </div>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-10" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Gavel. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-5">
                        {[
                            { icon: Facebook, href: "#" },
                            { icon: Twitter, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Mail, href: "mailto:support@gavelapp.com" },
                        ].map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-secondary hover:text-white transition-colors"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
