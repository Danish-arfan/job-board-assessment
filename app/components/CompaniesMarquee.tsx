"use client";

interface CompaniesMarqueeProps {
  companies: string[];
}

export default function CompaniesMarquee({ companies }: CompaniesMarqueeProps) {
  return (
    <>
      <section id="companies-section" className="section-title">Top companies hiring now</section>
      <p className="section-sub">Trusted by teams shipping real products, every single day.</p>

      <div className="marquee">
        <div className="marquee-track" id="marqueeTrack">
          {[...companies, ...companies].map((name, index) => (
            <div key={`${name}-${index}`} className="co-chip">
              <span className="co-dot"></span>{name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}