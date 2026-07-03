"use client";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  scrolled: boolean;
  savedCount: number;
  showSavedOnly: boolean;
  onLogoClick: () => void;
  onToggleSaved: () => void;
}

export default function Navbar({
  scrolled,
  savedCount,
  showSavedOnly,
  onLogoClick,
  onToggleSaved,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <nav>
        <div className="logo cursor-pointer" onClick={onLogoClick}>
          <div className="logo-mark"></div>
          Job Board by Dev-Danish
        </div>
        
        {/* Desktop Navigation */}
        <ul className="nav-links hidden md:flex">
          <li><Link href="/#jobs-section">Jobs</Link></li>
          <li><Link href="/#companies-section">Companies</Link></li>
          <li onClick={onToggleSaved}>
            <span className={showSavedOnly ? "text-[#3B5BFF] font-bold" : ""}>
              Saved Jobs ({savedCount})
            </span>
          </li>
        </ul>
        
        {/* Desktop Buttons - FIXED HYDRATION MISMATCH */}
        <div className="nav-right hidden md:flex">
          <Link href="/coming-soon" className="for-employers">For employers →</Link>
          <Link href="/coming-soon" className="btn btn-ghost flex items-center justify-center">
            Login
          </Link>
          <Link href="/coming-soon" className="btn btn-solid flex items-center justify-center">
            Register
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-[#0E1420]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu - FIXED HYDRATION MISMATCH */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E7E9F2] px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-[100%]">
          <Link href="/#jobs-section" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-[#4B5468]">Jobs</Link>
          <Link href="/#companies-section" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-[#4B5468]">Companies</Link>
          <div 
            onClick={() => {
              onToggleSaved();
              setIsMobileMenuOpen(false);
            }} 
            className={`font-semibold cursor-pointer ${showSavedOnly ? "text-[#3B5BFF]" : "text-[#4B5468]"}`}
          >
            Saved Jobs ({savedCount})
          </div>
          <hr className="border-[#E7E9F2]" />
          <Link href="/coming-soon" className="font-semibold text-[#3B5BFF]">For employers →</Link>
          <div className="flex gap-3 mt-2">
            <Link href="/coming-soon" className="btn btn-ghost flex-1 text-center">Login</Link>
            <Link href="/coming-soon" className="btn btn-solid flex-1 text-center">Register</Link>
          </div>
        </div>
      )}
    </header>
  );
}