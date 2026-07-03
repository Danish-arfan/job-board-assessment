"use client";
import { useEffect } from "react";
import { Job } from "./JobCardsSection";

interface JobDetailModalProps {
  job: Job;
  hasApplied: boolean;
  applySuccess: boolean;
  applicantName: string;
  applicantEmail: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function JobDetailModal({
  job,
  hasApplied,
  applySuccess,
  applicantName,
  applicantEmail,
  onNameChange,
  onEmailChange,
  onSubmit,
  onClose,
}: JobDetailModalProps) {

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1420]/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => !applySuccess && onClose()}
    >
      <div 
        className="bg-white rounded-3xl border border-[#E7E9F2] shadow-2xl max-w-xl w-full overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {applySuccess ? (
          <div className="p-12 text-center my-auto">
            <div className="w-16 h-16 bg-[#EFFAF0] text-[#22A559] rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold text-[#0E1420]">Application Submitted!</h3>
            <p className="text-sm text-[#4B5468] mt-2">
              Your application for <strong className="text-[#0E1420]">{job.title}</strong> has been sent to <strong className="text-[#0E1420]">{job.company}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 md:p-8 bg-[#FBFBFE] border-b border-[#E7E9F2] flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EEF1FF] text-[#3B5BFF] mb-2">
                  {job.type} Role
                </span>
                <h3 className="text-2xl font-extrabold text-[#0E1420]">{job.title}</h3>
                <p className="text-sm font-semibold text-[#4B5468] mt-1">
                  {job.company} • <span className="text-gray-500">{job.location}</span>
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Role Responsibilities</h4>
                <ul className="space-y-2">
                  {job.description.map((desc, i) => (
                    <li key={i} className="text-sm text-[#4B5468] flex items-start gap-2.5">
                      <span className="text-[#00C2A8] font-bold mt-0.5">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>

              {!hasApplied ? (
                <form onSubmit={onSubmit} className="pt-4 border-t border-[#E7E9F2] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1420]">Submit Fast Application</h4>
                  
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5468] mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Danish Arfan Khan" 
                      value={applicantName}
                      onChange={(e) => onNameChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9F2] text-sm text-[#0E1420] outline-none focus:border-[#3B5BFF] transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-[#4B5468] mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@example.com" 
                      value={applicantEmail}
                      onChange={(e) => onEmailChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E9F2] text-sm text-[#0E1420] outline-none focus:border-[#3B5BFF] transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#3B5BFF] to-[#7C6BFF] shadow-lg hover:scale-[1.01] transition-all mt-2"
                  >
                    Submit Application Now
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-[#EFFAF0] border border-[#22A559]/20 text-center">
                  <p className="text-sm font-bold text-[#22A559]">You have already applied for this position.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}