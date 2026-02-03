'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Contact } from '@/lib/contact-parser';
import { Check, ArrowRight, Zap, Shield, Star } from 'lucide-react';

interface LandingPageProps {
    contact: Contact;
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function StaggeredText({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");
    return (
        <div className={`flex flex-wrap gap-x-2 ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}

export default function LandingPagePreview({ contact }: LandingPageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    // Parallax background
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-y-auto bg-white rounded-lg relative scroll-smooth text-gray-900 font-sans"
        >
            {/* Progress Bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="sticky top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
            />

            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
                <motion.div
                    style={{ y: yBg }}
                    className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"
                />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 text-center p-8 max-w-2xl"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium"
                    >
                        Exclusive Offer for {contact.company || 'You'}
                    </motion.div>
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">
                        Hi {contact.name}, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Welcome to the Future
                        </span>
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                    >
                        Get Started <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </div>

            {/* Features Section - Staggered Reveal */}
            <div className="py-20 px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold text-center mb-12">Why {contact.company ? `${contact.company} Needs Us` : 'Choose Us'}</h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance." },
                            { icon: Shield, title: "Secure", desc: "Enterprise-grade protection for your data." },
                            { icon: Star, title: "Premium", desc: "Award-winning design and aesthetic." }
                        ].map((feature, i) => (
                            <ScrollReveal delay={i * 0.2} key={i}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full"
                                >
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-500">{feature.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Message Section */}
            <div className="py-20 px-8 bg-white">
                <div className="max-w-3xl mx-auto flex gap-8 items-center">
                    <div className="flex-1">
                        <StaggeredText
                            text="We have prepared a special personalized plan just for you. Unlock your potential today."
                            className="text-3xl font-bold leading-tight text-gray-900"
                        />
                        <ScrollReveal delay={0.5}>
                            <p className="mt-4 text-lg text-gray-500">
                                Join thousands of others who have transformed their workflow.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Pricing / CTA */}
            <div className="py-20 px-8 bg-gray-900 text-white text-center">
                <ScrollReveal>
                    <h2 className="text-3xl font-bold mb-8">Ready to dive in?</h2>
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl max-w-md mx-auto border border-white/20">
                        <p className="text-gray-400 mb-2">Pro Plan</p>
                        <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-500">/mo</span></div>
                        <ul className="text-left space-y-3 mb-8 text-gray-300">
                            <li className="flex items-center gap-2"><Check className="text-green-400" size={16} /> All Features</li>
                            <li className="flex items-center gap-2"><Check className="text-green-400" size={16} /> 24/7 Support</li>
                            <li className="flex items-center gap-2"><Check className="text-green-400" size={16} /> Unlimited Magic</li>
                        </ul>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-bold"
                        >
                            Start Free Trial
                        </motion.button>
                    </div>
                </ScrollReveal>
            </div>

            <footer className="py-8 text-center text-gray-500 text-sm bg-black">
                © 2024 Magic AI for {contact.name}. All rights reserved.
            </footer>
        </div>
    );
}
