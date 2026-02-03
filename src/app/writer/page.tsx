'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import { useSettings } from '@/context/SettingsContext';

export default function WriterPage() {
    const [subject, setSubject] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState<'Professional' | 'Friendly' | 'Magical'>('Professional');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const { t, theme } = useSettings();

    const handleGenerate = async () => {
        if (!subject) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, context, tone }),
            });
            const data = await res.json();
            setGeneratedContent(data.content);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tones = [
        { key: 'Professional', label: t.writer.tones.professional },
        { key: 'Friendly', label: t.writer.tones.friendly },
        { key: 'Magical', label: t.writer.tones.magical },
    ];

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
            {/* Input Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{t.writer.title}</h1>
                    <p className="text-gray-400">{t.writer.subtitle}</p>
                </div>

                <div className="glass-panel p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.writer.labels.subject}</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder={t.writer.placeholders.subject}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.writer.labels.context}</label>
                        <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder={t.writer.placeholders.context}
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.writer.labels.tone}</label>
                        <div className="grid grid-cols-3 gap-2">
                            {tones.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setTone(item.key as any)}
                                    className={clsx(
                                        "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                                        tone === item.key
                                            ? (theme === 'daker' ? "bg-black text-white border-black" : "bg-purple-500/20 border-purple-500 text-purple-300")
                                            : "bg-black/20 border-white/10 text-gray-400 hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !subject}
                        className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
                    >
                        {isGenerating ? (
                            <span className="animate-pulse">{t.writer.button.generating}</span>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                {t.writer.button.generate}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Output Section */}
            <div className={clsx(
                "glass-panel relative flex flex-col h-full overflow-hidden",
                theme !== 'daker' && "border-purple-500/30"
            )}>
                {theme !== 'daker' && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                )}

                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <span className="text-sm font-medium text-gray-300">{t.writer.output.title}</span>
                    {generatedContent && (
                        <button
                            onClick={copyToClipboard}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                        </button>
                    )}
                </div>

                <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="flex-1 w-full bg-transparent border-none focus:ring-0 p-6 resize-none transition-colors leading-relaxed font-mono text-sm"
                    placeholder={t.writer.output.placeholder}
                    style={{ color: 'var(--foreground)' }}
                />

                {!generatedContent && !isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-gray-600">
                            <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>{t.writer.output.ready}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to avoid TS error with 'tema' typo above
const tema = 'magic'; 
