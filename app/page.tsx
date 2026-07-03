"use client";
import { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoriesGrid from "./components/CategoriesGrid";
import JobCardsSection, { Job } from "./components/JobCardsSection";
import CompaniesMarquee from "./components/CompaniesMarquee";
import Footer from "./components/Footer";
import JobDetailModal from "./components/JobDetailModal";

import rawJobsData from "./data/jobs.json";

const parsedArray = Array.isArray(rawJobsData)
  ? rawJobsData
  : (rawJobsData as any)?.default || [];

const jobsData: Job[] = parsedArray.map((job: any) => ({
  ...job,
  id: String(job.id),
}));

const categories = [
  { name: "All Jobs", count: "Total Openings", icon: "💼", bg: "#F3F5FC", color: "#3B5BFF" },
  { name: "Remote", count: "12,400+ jobs", icon: "🏠", bg: "#EEF1FF", color: "#3B5BFF" },
  { name: "Onsite", count: "8,900+ jobs", icon: "🏢", bg: "#FFF2E8", color: "#FF7A3C" },
  { name: "Data Science", count: "5,200+ jobs", icon: "📊", bg: "#E9FBF6", color: "#00C2A8" },
  { name: "Engineering", count: "21,000+ jobs", icon: "⚙️", bg: "#F1EEFF", color: "#7C6BFF" },
  { name: "Software", count: "18,600+ jobs", icon: "💻", bg: "#EAF6FF", color: "#0EA5E9" },
  { name: "Fresher", count: "9,300+ jobs", icon: "🎓", bg: "#FFF0F3", color: "#FF4D7A" },
  { name: "Startup", count: "6,800+ jobs", icon: "🚀", bg: "#FFF7E6", color: "#F59E0B" },
];

const companies = ["Atlas Robotics", "Nimbus Cloud", "Verdant Labs", "Orbit Finance", "Kestrel Health"];

export default function JobBoard() {
  const [scrolled, setScrolled] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [experienceTerm, setExperienceTerm] = useState("Select experience");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("devDanish_savedJobs");
      if (saved && saved !== "undefined") setSavedJobs(JSON.parse(saved));
    } catch (error) {
      console.warn("Storage restricted - ignoring saved jobs.");
    }

    try {
      const applied = localStorage.getItem("devDanish_appliedJobs");
      if (applied && applied !== "undefined") setAppliedJobs(JSON.parse(applied));
    } catch (error) {
      console.warn("Storage restricted - ignoring applied jobs.");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = (job.title || "").toLowerCase().includes(searchLower) || (job.company || "").toLowerCase().includes(searchLower);
      
      const locLower = locationTerm.toLowerCase().trim();
      const matchesLocation = locLower === "" || (job.location || "").toLowerCase().includes(locLower);
      
      const catLower = selectedCategory.toLowerCase();
      const matchesCategory = 
        selectedCategory === "All Jobs" || 
        (job.type || "").toLowerCase() === catLower ||
        (selectedCategory === "Fresher" && job.experience?.toLowerCase() === "fresher");
      
      const matchesSaved = !showSavedOnly || savedJobs.includes(job.id);
      const matchesExperience = experienceTerm === "Select experience" || job.experience === experienceTerm;

      return matchesSearch && matchesLocation && matchesCategory && matchesSaved && matchesExperience;
    });
  }, [searchTerm, locationTerm, selectedCategory, showSavedOnly, savedJobs, experienceTerm]);

  const toggleSaveJob = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    const newSaved = savedJobs.includes(jobId) ? savedJobs.filter((id) => id !== jobId) : [...savedJobs, jobId];
    setSavedJobs(newSaved);
    try {
      localStorage.setItem("devDanish_savedJobs", JSON.stringify(newSaved));
    } catch (error) {
      console.warn("Storage restricted - unable to save bookmark locally.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocationTerm("");
    setSelectedCategory("All Jobs");
    setExperienceTerm("Select experience");
    setShowSavedOnly(false);
  };

  return (
    <>
      <div className="field"><div className="orb orb1"></div><div className="orb orb2"></div><div className="orb orb3"></div></div>
      <div className="grain"></div>

      <Navbar
        scrolled={scrolled}
        savedCount={savedJobs.length}
        showSavedOnly={showSavedOnly}
        onLogoClick={handleClearFilters}
        onToggleSaved={() => setShowSavedOnly(!showSavedOnly)}
      />

      <Hero
        searchTerm={searchTerm} 
        locationTerm={locationTerm} 
        experienceTerm={experienceTerm}
        onSearchChange={setSearchTerm} 
        onLocationChange={setLocationTerm} 
        onExperienceChange={setExperienceTerm}
      />

      <CategoriesGrid
        categories={categories}
        selectedCategory={selectedCategory}
        showSavedOnly={showSavedOnly}
        onSelectCategory={setSelectedCategory}
      />

      {/* LOWER Z-INDEX FIX APPLIED HERE */}
      <main style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <JobCardsSection
          jobs={filteredJobs}
          selectedCategory={selectedCategory}
          showSavedOnly={showSavedOnly}
          savedJobs={savedJobs}
          appliedJobs={appliedJobs}
          hasActiveFilters={
            searchTerm !== "" ||
            locationTerm !== "" ||
            selectedCategory !== "All Jobs" ||
            experienceTerm !== "Select experience"
          }
          onSelectJob={setSelectedJob}
          onToggleSaveJob={toggleSaveJob}
          onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
          onClearFilters={handleClearFilters}
        />
      </main>

      <CompaniesMarquee companies={companies} />
      <Footer />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          hasApplied={appliedJobs.includes(selectedJob.id)}
          applySuccess={applySuccess}
          applicantName={applicantName}
          applicantEmail={applicantEmail}
          onNameChange={setApplicantName}
          onEmailChange={setApplicantEmail}
          onSubmit={(e) => {
            e.preventDefault();
            const newApplied = [...appliedJobs, selectedJob.id];
            setAppliedJobs(newApplied);
            try {
              localStorage.setItem("devDanish_appliedJobs", JSON.stringify(newApplied));
            } catch (error) {
              console.warn("Storage restricted - unable to save application locally.");
            }
            setApplySuccess(true);
            setTimeout(() => {
              setApplySuccess(false);
              setSelectedJob(null);
            }, 2000);
          }}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}