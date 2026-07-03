"use client";

interface HeroProps {
  searchTerm: string;
  locationTerm: string;
  experienceTerm: string;
  selectedCategory?: string;
  onSearchChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onExperienceChange: (val: string) => void;
  onCategoryChange?: (val: string) => void;
}

export default function Hero({
  searchTerm,
  locationTerm,
  experienceTerm,
  onSearchChange,
  onLocationChange,
  onExperienceChange,
}: HeroProps) {
  const handleSearchClick = () => {
    // Smooth scroll down to the results
    document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <span className="eyebrow"><span className="dot"></span> Built by Dev-Danish</span>
      <h1>
        <span className="line"><span>Find your dream job</span></span>
        <span className="line"><span>faster than ever</span></span>
      </h1>
      <p className="sub"><b>5 lakh+</b> jobs updated daily across every major industry.</p>

      <div className="search-wrap">
        <div className="search-bar">
          
          <div className="search-field">
            <svg width="18" height="18" className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              aria-label="Search by skills, designations, or companies"
              placeholder="Enter skills / designations / companies"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="search-field exp">
            <select 
              aria-label="Filter by experience level"
              value={experienceTerm}
              onChange={(e) => onExperienceChange(e.target.value)}
            >
              <option value="Select experience">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          <div className="search-field loc">
            <svg width="18" height="18" className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <input
              type="text"
              aria-label="Search by location"
              placeholder="Enter location"
              value={locationTerm}
              onChange={(e) => onLocationChange(e.target.value)}
            />
          </div>

          <button className="search-submit" onClick={handleSearchClick}>
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="trust-row">
        <span><b>50,000+</b> companies</span>
        <span><b>5L+</b> live openings</span>
        <span><b>2 min</b> average apply time</span>
      </div>
    </section>
  );
}