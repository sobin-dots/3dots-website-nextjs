import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-brand hover:border-brand/50 disabled:opacity-50 disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              currentPage === i + 1
                ? "bg-brand text-white border border-brand"
                : "border border-slate-200 text-slate-600 hover:text-brand hover:border-brand/50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-brand hover:border-brand/50 disabled:opacity-50 disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
