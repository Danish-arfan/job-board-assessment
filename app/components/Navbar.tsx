"use client";

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
  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <nav>
        <div className="logo cursor-pointer" onClick={onLogoClick}>
          <div className="logo-mark"></div>
          Job Board by Dev-Danish
        </div>
        <ul className="nav-links">
          <li><a href="#jobs-section">Jobs</a></li>
          <li><a href="#companies-section">Companies</a></li>
          <li onClick={onToggleSaved}>
            <span className={showSavedOnly ? "text-[#3B5BFF] font-bold" : ""}>
              Saved Jobs ({savedCount})
            </span>
          </li>
        </ul>
        <div className="nav-right">
          <a className="for-employers">For employers ▾</a>
          <button className="btn btn-ghost">Login</button>
          <button className="btn btn-solid">Register</button>
        </div>
      </nav>
    </header>
  );
}