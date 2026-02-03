'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

export default function WriterPage() {
    const [subject, setSubject] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('Professional');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

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

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
            {/* Input Section */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-white">AI Writer</h1>
                    <p className="text-gray-400">Craft the perfect message with magic.</p>
                </div>

                <div className="glass-panel p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Q1 Partnership Update"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Key Points / Context</label>
                        <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder="What specific details should be included?"
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Professional', 'Friendly', 'Magical'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={clsx(
                                        "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                                        tone === t
                                            ? "bg-purple-500/20 border-purple-500 text-purple-300"
                                            : "bg-black/20 border-white/10 text-gray-400 hover:bg-white/5"
                                    )}
                                >
                                    {t}
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
                            <span className="animate-pulse">Parsing magic...</span>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Generate Draft
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Output Section */}
            <div className="glass-panel relative flex flex-col h-full overflow-hidden border-purple-500/30">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />

                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <span className="text-sm font-medium text-gray-300">Generated Draft</span>
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
                    className="flex-1 w-full bg-transparent border-none focus:ring-0 p-6 resize-none text-gray-200 leading-relaxed font-mono text-sm"
                    placeholder="Your magic content will appear here..."
                />

                {!generatedContent && !isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-gray-600">
                            <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>Ready to generate</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
