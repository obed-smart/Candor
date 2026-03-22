"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Mail,
    ArrowRight,
    ShieldCheck,
    Lock,
    CheckCircle2,
    Copy,
    Check
} from "lucide-react";

export default function WaitlistPage() {
    const [isJoined, setIsJoined] = useState(false);
    const [email, setEmail] = useState("");
    const [referralCode] = useState("kola88");
    const [copied, setCopied] = useState(false);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setIsJoined(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`taxco.ng/ref/${referralCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isJoined) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-[DM_Sans] flex flex-col items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md flex flex-col items-center">
                    {/* Success Icon */}
                    <div className="relative mb-8 pt-4">
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-100">
                            <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                                <Check className="text-white w-10 h-10" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-[#0A0B1E] mb-3 text-center">You&apos;re on the list!</h1>
                    <p className="text-[#64748B] text-center mb-10 leading-relaxed max-w-[320px]">
                        We&apos;ll notify you the moment Candor is ready for you.
                    </p>

                    <div className="bg-[#EEF2FF] px-4 py-2 rounded-full flex items-center gap-2 mb-12 border border-[#E0E7FF]">
                        <div className="bg-amber-400 p-1 rounded-full">
                            <div className="bg-amber-500 w-2 h-2 rounded-full" />
                        </div>
                        <span className=" font-semibold text-[#3730A3]">Points Earned: <span className="text-[#0A0B1E]">10</span></span>
                    </div>

                    {/* Referral Card */}
                    <div className="bg-white w-full rounded-3xl px-6 py-8 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden">
                        <h2 className="text-xl font-bold text-[#0A0B1E] text-center mb-2">Move up the line</h2>
                        <p className=" tracking-widest font-bold text-gray-400 text-center mb-8 uppercase">Invite friends & earn priority access</p>

                        <div className="relative mb-8">
                            <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between">
                                <span className="text-[#64748B] font-[Liberation_Mono] font-medium">candor.ng/ref/{referralCode}</span>
                                <button
                                    onClick={copyToClipboard}
                                    className="bg-[#0A0B1E] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#1A1B3E] transition-all"
                                >
                                    {copied ? "Copied" : "Copy"}
                                    <Copy size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-gray-100 flex-1"></div>
                            <span className=" font-bold text-gray-400 uppercase tracking-wider">Share directly</span>
                            <div className="h-px bg-gray-100 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { name: "WhatsApp", icon: "/svg/whatsapp.svg", color: "#ECFDF5" },
                                { name: "X", icon: "/svg/x.svg", color: "#F8FAFC" },
                                { name: "LinkedIn", icon: "/svg/linkedin.svg", color: "#EFF6FF" }
                            ].map((social) => (
                                <div key={social.name} className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center  dark:border-gray-800 cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: social.color }}>

                                        <div className="w-6 h-6 relative rounded-sm"> <Image src={social.icon} alt={social.name} fill className="object-cover" /></div>
                                    </div>
                                    <span className="text font-medium text-gray-500">{social.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsJoined(false)}
                        className="mt-12 text-[#64748B] font-medium hover:text-[#0A0B1E] transition-colors"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-[#0A0B1E] font-[DM_Sans] font-sans selection:bg-indigo-100">
            <header className="w-full max-w-2xl mx-auto py-5 px-6 ">
                <div className="flex gap-2">
                    <div className="flex w-8 h-8 rounded-sm justify-center items-center bg-[#050048] text-white text-2xl font-semibold">
                        C
                    </div>
                    <div className="text-[#050048] text-2xl font-bold">
                        CANDOR
                    </div>

                </div>
            </header>
            <main className="max-w-screen-xl mx-auto px-6 pt-8 pb-24 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 bg-[#EEF2FF] px-4 py-1.5 rounded-full mb-10 border border-[#E0E7FF]">
                    <div className="w-2 h-2 bg-[#3730A3] rounded-full animate-pulse" />
                    <span className="text-sm font-bold tracking-wider text-[#3730A3] uppercase">Waitlist Open</span>
                </div>

                {/* Hero Content */}
                <div className="text-center max-w-3xl ">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                        Tax season is coming. <br />
                        <span className="text-[#64748B]">Be ready with Candor.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#64748B] leading-relaxed max-w-lg mx-auto mb-10">
                        Automate your bookkeeping and never worry about tax status again. Join <span className="text-[#0A0B1E] font-bold">5,000+ Nigerians</span> on the waitlist.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleJoin} className="relative max-w-xl mx-auto group">
                        <div className="relative bg-white border border-gray-200 rounded-2xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                            <div className="flex items-center gap-3 px-4 py-3">
                                <Mail className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-300 text-lg"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#03045E] hover:bg-[#020344] text-white py-5 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
                            >
                                Join the Waitlist
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                    <p className="text text-stone-400 mt-6">We respect your privacy. No spam, ever.</p>
                </div>

                {/* Divider */}
                <div className="w-full max-w-xl h-px bg-gray-100 my-12" />

                {/* Trust Badges */}
                <div className="w-full max-w-xl mb-10 text-center">
                    <p className=" tracking-widest font-black text-stone-500 uppercase mb-8">Trusted Security</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white border border-gray-100 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                            <ShieldCheck className="text-[#03045E]" size={18} />
                            <span className="text-sm font-semibold text-[#03045E]">Bank-Grade Security</span>
                        </div>
                        <div className="bg-white border border-gray-100 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                            <Lock className="text-[#03045E]" size={18} />
                            <span className="text-sm font-semibold text-[#03045E]">Encrypted Data</span>
                        </div>
                        <div className="bg-white border border-gray-100 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                            <div className="flex gap-0.5">
                                <div className="w-1.5 h-3 bg-[#03045E] rounded-full"></div>
                                <div className="w-1.5 h-5 bg-[#03045E] rounded-full -mt-1"></div>
                                <div className="w-1.5 h-3 bg-[#03045E] rounded-full"></div>
                            </div>
                            <span className="text-sm font-semibold text-[#03045E]">NDPR Compliant</span>
                        </div>
                    </div>
                </div>

                {/* Phone Mockup Section */}
                <div className="relative w-full max-w-3xl mx-auto">
                    <div className="absolute -inset-10 bg-indigo-50/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div className="relative rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-700">
                        <div className="aspect-[5/5] relative rounded-[32px] overflow-hidden bg-gray-50">
                            <Image
                                src="/illustration.png"
                                alt="Tax Status Mockup"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-20 left-20 w-full max-w-3/4 mx-auto p-4 flex flex-col gap-2 bg-white border-l-3 border-[#000000] rounded-sm">
                        <h4>Tax Status</h4>
                        <div className="flex gap-2 items-center ">
                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                            <div>
                                Compliant
                            </div>
                        </div>

                        <div className="w-full h-3 bg-gray-100 rounded-full">
                            <div className="w-5/6 rounded-full h-full bg-[#050048]" />
                        </div>
                        <div className="text-end text-stone-300 ">
                            85% Automated
                        </div>


                        <div className="bg-stone-300 p-2 absolute top-4 right-4 ">
                            2023 FY
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
