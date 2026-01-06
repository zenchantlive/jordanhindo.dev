"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Github, Loader2, CheckCircle2, XCircle } from "lucide-react";

/**
 * Form state type for tracking submission status
 */
type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact Section Component
 * Contact form with Resend integration and social links
 */
export function ContactSection() {
    // Form field state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Submission state
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Handle form submission
     * Sends data to /api/contact endpoint
     */
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to send message");
            }

            // Success - clear form and show success state
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");

            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Something went wrong"
            );

            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        }
    }

    return (
        <section id="contact" className="py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-card rounded-2xl p-8 md:p-12">
                    {/* Section header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Let&apos;s <span className="text-gradient">Connect</span>
                        </h2>
                        <p className="text-gray-400">
                            I&apos;m always shipping new things. Reach out if you want to
                            talk AI, Agents, or Infrastructure.
                        </p>
                    </div>

                    {/* Contact form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-400 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={status === "submitting"}
                                    className="w-full bg-slate-800/50 border border-gray-700 rounded-lg 
                             px-4 py-3 text-white focus:outline-none focus:border-purple-500 
                             focus:ring-1 focus:ring-purple-500 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-400 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === "submitting"}
                                    className="w-full bg-slate-800/50 border border-gray-700 rounded-lg 
                             px-4 py-3 text-white focus:outline-none focus:border-purple-500 
                             focus:ring-1 focus:ring-purple-500 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Message textarea */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                disabled={status === "submitting"}
                                className="w-full bg-slate-800/50 border border-gray-700 rounded-lg 
                           px-4 py-3 text-white focus:outline-none focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500 transition-colors resize-none
                           disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Hey Jordan, I saw Asset Hatch..."
                            />
                        </div>

                        {/* Submit button with status states */}
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                         font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 
                         transition-all hover:scale-[1.02] disabled:opacity-50 
                         disabled:cursor-not-allowed disabled:hover:scale-100
                         flex items-center justify-center gap-2"
                        >
                            {status === "submitting" && (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Sending...
                                </>
                            )}
                            {status === "success" && (
                                <>
                                    <CheckCircle2 className="h-5 w-5" />
                                    Message Sent!
                                </>
                            )}
                            {status === "error" && (
                                <>
                                    <XCircle className="h-5 w-5" />
                                    Failed to Send
                                </>
                            )}
                            {status === "idle" && "Send Message"}
                        </button>

                        {/* Error message display */}
                        {status === "error" && errorMessage && (
                            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                        )}
                    </form>

                    {/* Social links */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-gray-400">
                        <Link
                            href="mailto:jordanlive121@gmail.com"
                            className="hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Mail className="h-5 w-5" />
                            jordanlive121@gmail.com
                        </Link>
                        <Link
                            href="https://github.com/zenchantlive"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Github className="h-5 w-5" />
                            @zenchantlive
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
