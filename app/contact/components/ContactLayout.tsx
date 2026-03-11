"use client";

import { useState, useEffect, useCallback } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function ContactLayout() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

  
    const generateCaptcha = useCallback(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAnswer("");
    }, []);

    useEffect(() => {
        const initForm = setTimeout(() => {
            generateCaptcha();
        }, 0);
        return () => clearTimeout(initForm);
    }, [generateCaptcha]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(captchaAnswer) !== num1 + num2) {
            setStatus("error");
            setErrorMessage("Incorrect answer. Please try again.");
            generateCaptcha();
            return;
        }

        setStatus("submitting");
        // Simulate API request
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

                {/* Left Side: Contact Form */}
                <div className="lg:col-span-3">
                    <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_10px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
                        <h2 className="text-3xl font-medium text-slate-800 mb-2">Send a Message</h2>
                        <p className="text-slate-500 font-light mb-10">Fill out the form below and we will get back to you shortly.</p>

                        {status === "success" ? (
                            <div className="bg-emerald-50 text-emerald-600 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
                                <p className="font-light">Thank you for reaching out. We&apos;ll be in touch soon.</p>
                                <button
                                    onClick={() => { setStatus("idle"); generateCaptcha(); }}
                                    className="mt-8 text-emerald-700 font-medium hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Company (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                        placeholder="Your Company HQ"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400 resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    ></textarea>
                                </div>

                                {/* Math Captcha */}
                                <div className="pt-4 border-t border-slate-100">
                                    <label className="text-sm font-medium text-slate-700 block mb-3">Spam Prevention</label>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="bg-slate-100 px-6 py-4 rounded-xl text-lg font-medium text-slate-800 flex items-center justify-center min-w-[120px] shadow-inner">
                                            {num1} + {num2} = ?
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            value={captchaAnswer}
                                            onChange={(e) => setCaptchaAnswer(e.target.value)}
                                            className="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium text-lg text-slate-800 transition-all"
                                            placeholder="Your answer"
                                        />
                                    </div>
                                    {status === "error" && (
                                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full mt-6 bg-brand text-white px-8 py-5 rounded-full text-lg font-medium hover:bg-brand-dark transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === "submitting" ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Side: Contact Info & Map */}
                <div className="lg:col-span-2 flex flex-col gap-10">

                    <div className="space-y-8">
                        <h3 className="text-2xl font-medium text-slate-800 tracking-tight">Contact Information</h3>

                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-brand/5 group-hover:bg-brand group-hover:text-white text-brand flex items-center justify-center transition-colors flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-1">Our Office</h4>
                                <p className="text-slate-500 font-light leading-relaxed">
                                    317/4 Joe Daniel Street, <br />Kottar-Parvathipuram Rd, <br /> Nagercoil, Tamil Nadu 629003
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-brand/5 group-hover:bg-brand group-hover:text-white text-brand flex items-center justify-center transition-colors flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-1">Email Us</h4>
                                <p className="text-slate-500 font-light leading-relaxed">
                                    hello@3dots.co<br />
                                    support@3dots.co
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 rounded-full bg-brand/5 group-hover:bg-brand group-hover:text-white text-brand flex items-center justify-center transition-colors flex-shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-1">Call Us</h4>
                                <p className="text-slate-500 font-light leading-relaxed">
                                    +91 9876543210<br />
                                    Mon-Fri, 9am - 7pm IST
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full min-h-[300px] mt-4 rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative group">
                        {/* Google Maps iFrame embedding a stylized location view */}

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.2995801212941!2d77.41448329325391!3d8.18276687067637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f10024e53967%3A0x4a38b2e01fba34e8!2sPicstol%20VFX!5e0!3m2!1sen!2sin!4v1773230787567!5m2!1sen!2sin"
                            className="w-full h-full absolute inset-0 filter grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700"
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}
