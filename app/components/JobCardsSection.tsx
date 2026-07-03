"use client";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string[];
}

interface JobCardsSectionProps {
  jobs: Job[];
  selectedCategory: string;
  showSavedOnly: boolean;
  savedJobs: string[];
  appliedJobs: string[];
  hasActiveFilters: boolean;
  onSelectJob: (job: Job) => void;
  onToggleSaveJob: (e: React.MouseEvent, jobId: string) => void;
  onToggleSavedOnly: () => void;
  onClearFilters: () => void;
}

export default function JobCardsSection({
  jobs,
  selectedCategory,
  showSavedOnly,
  savedJobs,
  appliedJobs,
  hasActiveFilters,
  onSelectJob,
  onToggleSaveJob,
  onToggleSavedOnly,
  onClearFilters,
}: JobCardsSectionProps) {
  return (
    <section id="jobs-section" style={{ maxWidth: "1160px", margin: "80px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
      {/* Section Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "24px", borderBottom: "1px solid #E7E9F2" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0E1420", fontFamily: "'Sora', sans-serif" }}>
            {showSavedOnly
              ? "💖 Your Bookmarked Roles"
              : selectedCategory === "All Jobs"
              ? "Latest Job Openings"
              : `${selectedCategory} Roles`}
          </h2>
          <p style={{ fontSize: "14px", color: "#4B5468", marginTop: "4px", fontWeight: 500 }}>
            Showing <strong style={{ color: "#0E1420" }}>{jobs.length}</strong> available position{jobs.length === 1 ? "" : "s"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {savedJobs.length > 0 && (
            <button
              onClick={onToggleSavedOnly}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 700,
                border: showSavedOnly ? "1px solid #FF5A3C" : "1px solid #E7E9F2",
                background: showSavedOnly ? "#FF5A3C" : "#fff",
                color: showSavedOnly ? "#fff" : "#4B5468",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {showSavedOnly ? "← View All Jobs" : `💖 Saved (${savedJobs.length})`}
            </button>
          )}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                background: "#F3F5FC",
                color: "#3B5BFF",
                border: "1px solid #E7E9F2",
                cursor: "pointer"
              }}
            >
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "32px", paddingBottom: "80px" }}>
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const isSaved = savedJobs.includes(job.id);
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                style={{
                  background: "#ffffff",
                  border: "1px solid #E7E9F2",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 12px 30px -10px rgba(29,35,74,0.06)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "24px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 20px 45px -12px rgba(59,91,255,0.15)";
                  e.currentTarget.style.borderColor = "#3B5BFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(29,35,74,0.06)";
                  e.currentTarget.style.borderColor = "#E7E9F2";
                }}
              >
                {/* Left Column: Job Details */}
                <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                    <span style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: "#EEF1FF", color: "#3B5BFF" }}>
                      {job.type}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#4B5468", background: "#FBFBFE", padding: "6px 12px", borderRadius: "8px", border: "1px solid #E7E9F2" }}>
                      📍 {job.location}
                    </span>
                    {hasApplied && (
                      <span style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: "#EFFAF0", color: "#22A559" }}>
                        ✓ Applied
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0E1420", fontFamily: "'Sora', sans-serif" }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#4B5468", marginTop: "4px" }}>
                      {job.company}
                    </p>
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
                    {job.description.map((desc, i) => (
                      <li key={i} style={{ fontSize: "14px", color: "#4B5468", display: "flex", alignItems: "flex-start", gap: "10px", lineHeight: "1.5" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B5BFF", flexShrink: 0, marginTop: "8px" }}></span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <button
                    onClick={(e) => onToggleSaveJob(e, job.id)}
                    title={isSaved ? "Remove from bookmarks" : "Save this role"}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: isSaved ? "1px solid #FF4D7A" : "1px solid #E7E9F2",
                      background: isSaved ? "#FFF0F3" : "#fff",
                      color: isSaved ? "#FF4D7A" : "#98A0B3",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                  >
                    {isSaved ? "♥" : "♡"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectJob(job);
                    }}
                    style={{
                      padding: "14px 28px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: hasApplied ? "#6B7280" : "#ffffff",
                      background: hasApplied ? "#F3F4F6" : "linear-gradient(135deg, #3B5BFF, #7C6BFF)",
                      border: hasApplied ? "1px solid #E5E7EB" : "none",
                      boxShadow: hasApplied ? "none" : "0 10px 24px -6px rgba(59,91,255,0.45)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <span>{hasApplied ? "View Details" : "Apply Now"}</span>
                    {!hasApplied && <span style={{ fontSize: "16px" }}>→</span>}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ background: "#fff", border: "1px solid #E7E9F2", borderRadius: "24px", padding: "48px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "#F3F5FC", color: "#3B5BFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 16px" }}>
              🔍
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0E1420", fontFamily: "'Sora', sans-serif" }}>No matching roles found</h3>
            <p style={{ fontSize: "14px", color: "#4B5468", marginTop: "6px", maxWidth: "400px", margin: "6px auto 0" }}>
              {showSavedOnly
                ? "You haven't saved any roles yet. Click the heart icon on any job card to bookmark it here!"
                : "Try broadening your search criteria or resetting your category filters to see all available positions."}
            </p>
            <button
              onClick={onClearFilters}
              style={{ marginTop: "24px", padding: "12px 24px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, background: "#3B5BFF", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}