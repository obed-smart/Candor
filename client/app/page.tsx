"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/waitlist";
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <p className="text-2xl font-bold text-[#0A0B1E] animate-pulse">Redirecting to waitlist...</p>
    </div>
  );
}
