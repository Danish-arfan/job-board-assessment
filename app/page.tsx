"use client";

import { useState, useMemo } from "react";
import jobsDataRaw from "./data/jobs.json";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoriesGrid from "./components/CategoriesGrid";
import JobCardsSection, { Job } from "./components/JobCardsSection";
import JobDetailModal from "./components/JobDetailModal";
import CompaniesMarquee from "./components/CompaniesMarquee";
import Footer from "./components/Footer";

const jobsData: Job[] = jobsDataRaw as Job[];

const categories = [
  { name: "All Jobs", count: "Total Openings", icon: "✨", bg: "#F3F5FC", color: "#3B5BFF" },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Lazy initialization for localStorage to prevent build errors
  const [savedJobs, setSavedJobs] = useState<string[]>(() => 
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("devDanish_savedJobs") || "[]") : []);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(() => 
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("devDanish_appliedJobs") || "[]") : []);
  
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationTerm === "" || job.location.toLowerCase().includes(locationTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Jobs" || job.type.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSaved = !showSavedOnly || savedJobs.includes(job.id);
      return matchesSearch && matchesLocation && matchesCategory && matchesSaved;
    });
  }, [searchTerm, locationTerm, selectedCategory, showSavedOnly, savedJobs]);

  const toggleSaveJob = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    const newSaved = savedJobs.includes(jobId) ? savedJobs.filter((id) => id !== jobId) : [...savedJobs, jobId];
    setSavedJobs(newSaved);
    localStorage.setItem("devDanish_savedJobs", JSON.stringify(newSaved));
  };

  return (
    <>
      <div className="field"><div className="orb orb1"></div><div className="orb orb2"></div><div className="orb orb3"></div></div>
      <div className="grain"></div>
      <Navbar scrolled={false} savedCount={savedJobs.length} showSavedOnly={showSavedOnly} onLogoClick={() => { setSearchTerm(""); setSelectedCategory("All Jobs"); setShowSavedOnly(false); }} onToggleSaved={() => setShowSavedOnly(!showSavedOnly)} />
      <Hero searchTerm={searchTerm} locationTerm={locationTerm} onSearchChange={setSearchTerm} onLocationChange={setLocationTerm} onSearchSubmit={() => document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })} />
      <CategoriesGrid categories={categories} selectedCategory={selectedCategory} showSavedOnly={showSavedOnly} onSelectCategory={setSelectedCategory} />
      <JobCardsSection jobs={filteredJobs} selectedCategory={selectedCategory} showSavedOnly={showSavedOnly} savedJobs={savedJobs} appliedJobs={appliedJobs} hasActiveFilters={true} onSelectJob={setSelectedJob} onToggleSaveJob={toggleSaveJob} onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)} onClearFilters={() => { setSearchTerm(""); setLocationTerm(""); setSelectedCategory("All Jobs"); setShowSavedOnly(false); }} />
      {selectedJob && <JobDetailModal job={selectedJob} hasApplied={appliedJobs.includes(selectedJob.id)} applySuccess={applySuccess} applicantName={applicantName} applicantEmail={applicantEmail} onNameChange={setApplicantName} onEmailChange={setApplicantEmail} onSubmit={(e) => { e.preventDefault(); setAppliedJobs([...appliedJobs, selectedJob.id]); localStorage.setItem("devDanish_appliedJobs", JSON.stringify([...appliedJobs, selectedJob.id])); setApplySuccess(true); setTimeout(() => { setApplySuccess(false); setSelectedJob(null); }, 2000); }} onClose={() => setSelectedJob(null)} />}
      <CompaniesMarquee companies={companies} />
      <Footer />
    </>
  );
}