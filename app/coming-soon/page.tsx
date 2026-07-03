// app/coming-soon/page.tsx
import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
      {/* Background elements to match your theme */}
      <div className="field"><div className="orb orb1"></div><div className="orb orb2"></div></div>
      <div className="grain"></div>

      <div className="bg-white border border-[#E7E9F2] rounded-3xl p-10 md:p-16 max-w-xl shadow-2xl relative z-10">
        <div className="w-20 h-20 bg-[#F3F5FC] text-[#3B5BFF] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
          🚀
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0E1420] font-['Sora'] mb-4 tracking-tight">
          Feature in Development
        </h1>
        <p className="text-[#4B5468] text-lg font-medium mb-8 leading-relaxed">
          The Authentication and Employer portals are currently being crafted for V2 of the Job Board. Stay tuned!
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#3B5BFF] to-[#7C6BFF] shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all"
        >
          <span>←</span> Back to Job Board
        </Link>
      </div>
    </main>
  );
}