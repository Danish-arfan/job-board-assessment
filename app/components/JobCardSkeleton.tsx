"use client";

export default function JobCardSkeleton() {
  return (
    <div className="bg-white border border-[#E7E9F2] rounded-[20px] p-8 shadow-sm flex flex-wrap items-center justify-between gap-6 relative animate-pulse mb-5">
      <div className="flex-1 min-w-[300px] flex flex-col gap-3">
        {/* Badges Skeleton */}
        <div className="flex gap-2 mb-1">
          <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-7 w-24 bg-gray-100 rounded-lg"></div>
        </div>
        
        {/* Title & Company Skeleton */}
        <div>
          <div className="h-7 w-64 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        
        {/* List items Skeleton */}
        <div className="mt-4 space-y-3">
          <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
        </div>
      </div>
      
      {/* Actions Skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gray-200"></div>
        <div className="h-11 w-32 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}