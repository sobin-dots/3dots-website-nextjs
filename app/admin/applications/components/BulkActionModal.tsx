"use client";

import { useState, useEffect } from "react";
import { X, Send, AlertCircle, Calendar, Clock, MapPin, User, Info, Mail, Loader2, CalendarPlus } from "lucide-react";

interface BulkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: BulkActionData) => void;
  selectedCount: number;
  mode: "update" | "schedule";
}

export interface BulkActionData {
  status: string;
  interviewStatus: string;
  remark: string;
  sendEmail: boolean;
  emailDetails?: {
    interviewDate?: string;
    interviewTime?: string;
    interviewMode?: string;
    interviewLocation?: string;
    interviewerName?: string;
    requirements?: string;
    notes?: string;
  };
}

export default function BulkActionModal({ isOpen, onClose, onConfirm, selectedCount, mode }: BulkActionModalProps) {
  const [status, setStatus] = useState("PENDING");
  const [interviewStatus, setInterviewStatus] = useState("NOT_SCHEDULED");
  const [remark, setRemark] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [emailDetails, setEmailDetails] = useState({
    interviewDate: "",
    interviewTime: "10:00 AM",
    interviewMode: "VIDEO",
    interviewLocation: "",
    interviewerName: "",
    requirements: "",
    notes: ""
  });

  useEffect(() => {
    setErrors({}); // Clear errors when mode or open state changes
    if (mode === "schedule") {
      setStatus("SHORTLISTED");
      setInterviewStatus("SCHEDULED");
      setSendEmail(true);
      setRemark("Scheduled interview via bulk action.");
    } else {
      setStatus("PENDING");
      setInterviewStatus("NOT_SCHEDULED");
      setSendEmail(false);
      setRemark("");
    }
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate Remark in Update Mode
    if (mode === "update" && !remark.trim()) {
      newErrors.remark = "Please provide an internal remark for this change.";
    }

    // Validate Interview Details
    if (mode === "schedule" || (sendEmail && interviewStatus === "SCHEDULED")) {
      if (!emailDetails.interviewDate) newErrors.interviewDate = "Date is required";
      if (!emailDetails.interviewTime) newErrors.interviewTime = "Time is required";
      if (!emailDetails.interviewLocation.trim()) {
        const modeLabel = emailDetails.interviewMode === "VIDEO" ? "Meeting Link" : emailDetails.interviewMode === "IN_PERSON" ? "Location" : "Phone Number";
        newErrors.interviewLocation = `${modeLabel} is required`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onConfirm({
      status,
      interviewStatus,
      remark,
      sendEmail,
      emailDetails: (sendEmail && interviewStatus === "SCHEDULED") ? emailDetails : undefined
    });
  };

  const isScheduleMode = mode === "schedule";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in duration-300">
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${isScheduleMode ? 'bg-[#5BA8A0] shadow-[#5BA8A0]/20' : 'bg-slate-800 shadow-slate-800/20'}`}>
              {isScheduleMode ? <CalendarPlus className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                {isScheduleMode ? "Schedule Interviews" : "Bulk Update Status"}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 font-medium">
                Applying to <span className={`${isScheduleMode ? 'text-[#5BA8A0]' : 'text-slate-800'} font-bold`}>{selectedCount}</span> selected candidates.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all hover:shadow-sm">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[75vh]">
          <div className="p-10 space-y-8">
            {/* Core Settings - Only show dropdowns in Update Mode */}
            {!isScheduleMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Application Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-slate-800 transition-all font-medium text-slate-700"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWING">Reviewing</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="BLACKLISTED">Blacklisted</option>
                    <option value="FUTURE_REFERENCE">Future Reference</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Interview Status</label>
                  <select
                    value={interviewStatus}
                    onChange={(e) => setInterviewStatus(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-slate-800 transition-all font-medium text-slate-700"
                  >
                    <option value="NOT_SCHEDULED">Not Scheduled</option>
                    <option value="SCHEDULED">Schedule Interview</option>
                    <option value="PASSED">Passed</option>
                    <option value="FAILED">Failed</option>
                    <option value="CLEARED_BUDGET_PENDING">Cleared (Budget Pending)</option>
                  </select>
                </div>
              </div>
            )}

            {!isScheduleMode && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Reason / Remark (Internal)</label>
                <textarea
                  placeholder="Enter reason for this status change..."
                  value={remark}
                  onChange={(e) => {
                    setRemark(e.target.value);
                    if (errors.remark) setErrors(prev => {
                      const next = { ...prev };
                      delete next.remark;
                      return next;
                    });
                  }}
                  rows={2}
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all font-medium text-slate-700 resize-none ${errors.remark ? 'border-red-500 bg-red-50/30' : 'border-slate-100 focus:border-slate-800'}`}
                />
                {errors.remark && <p className="text-[10px] text-red-500 font-bold pl-1 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.remark}</p>}
              </div>
            )}

            {!isScheduleMode && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-5 h-5 rounded-lg border-slate-300 text-slate-800 focus:ring-slate-800"
                />
                <label htmlFor="sendEmail" className="flex flex-col cursor-pointer">
                  <span className="text-sm font-bold text-slate-700">Send Email Notifications</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide font-medium">Auto-send updates to candidates</span>
                </label>
              </div>
            )}

            {/* Premium Schedule Fields - Always show in schedule mode or if toggle enabled in update mode */}
            {((sendEmail && interviewStatus === "SCHEDULED") || isScheduleMode) && (
              <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                <div className="h-px bg-slate-100"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={emailDetails.interviewDate}
                        onChange={(e) => {
                          setEmailDetails({ ...emailDetails, interviewDate: e.target.value });
                          if (errors.interviewDate) setErrors(prev => {
                            const next = { ...prev };
                            delete next.interviewDate;
                            return next;
                          });
                        }}
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all font-medium text-slate-700 pr-12 ${errors.interviewDate ? 'border-red-500 bg-red-50/30' : 'border-slate-100 focus:border-[#5BA8A0]'}`}
                      />
                      <Calendar className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.interviewDate ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                    {errors.interviewDate && <p className="text-[10px] text-red-500 font-bold pl-1 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.interviewDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Time</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="10:00 AM"
                        value={emailDetails.interviewTime}
                        onChange={(e) => {
                          setEmailDetails({ ...emailDetails, interviewTime: e.target.value });
                          if (errors.interviewTime) setErrors(prev => {
                            const next = { ...prev };
                            delete next.interviewTime;
                            return next;
                          });
                        }}
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all font-medium text-slate-700 pr-12 ${errors.interviewTime ? 'border-red-500 bg-red-50/30' : 'border-slate-100 focus:border-[#5BA8A0]'}`}
                      />
                      <Clock className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.interviewTime ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                    {errors.interviewTime && <p className="text-[10px] text-red-500 font-bold pl-1 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.interviewTime}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["VIDEO", "IN_PERSON", "PHONE"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setEmailDetails({ ...emailDetails, interviewMode: m })}
                        className={`py-4 px-4 text-xs font-bold rounded-2xl border transition-all ${
                          emailDetails.interviewMode === m
                            ? "bg-[#5BA8A0]/10 text-[#5BA8A0] border-[#5BA8A0]/30 shadow-sm"
                            : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                        }`}
                      >
                        {m === "IN_PERSON" ? "In-Person" : m === "VIDEO" ? "Video Call" : "Phone"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">
                    {emailDetails.interviewMode === "VIDEO" ? "Meeting Link" : emailDetails.interviewMode === "IN_PERSON" ? "Location" : "Phone Number"}
                  </label>
                  <input
                    type="text"
                    placeholder={emailDetails.interviewMode === "VIDEO" ? "https://meet.google.com/..." : emailDetails.interviewMode === "IN_PERSON" ? "Office address" : "+91 ..."}
                    value={emailDetails.interviewLocation}
                    onChange={(e) => {
                      setEmailDetails({ ...emailDetails, interviewLocation: e.target.value });
                      if (errors.interviewLocation) setErrors(prev => {
                        const next = { ...prev };
                        delete next.interviewLocation;
                        return next;
                      });
                    }}
                    className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all font-medium text-slate-700 ${errors.interviewLocation ? 'border-red-500 bg-red-50/30' : 'border-slate-100 focus:border-[#5BA8A0]'}`}
                  />
                  {errors.interviewLocation && <p className="text-[10px] text-red-500 font-bold pl-1 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.interviewLocation}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Interviewer (Optional)</label>
                  <input
                    type="text"
                    placeholder="Name of the interviewer"
                    value={emailDetails.interviewerName}
                    onChange={(e) => setEmailDetails({ ...emailDetails, interviewerName: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-[#5BA8A0] transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Requirements (What to prepare)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Bring a portfolio, prepare a 5-minute project walkthrough..."
                    value={emailDetails.requirements}
                    onChange={(e) => setEmailDetails({ ...emailDetails, requirements: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-[#5BA8A0] transition-all font-medium text-slate-700 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Anything else the candidate should know"
                    value={emailDetails.notes}
                    onChange={(e) => setEmailDetails({ ...emailDetails, notes: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-[#5BA8A0] transition-all font-medium text-slate-700 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-10 py-4 text-white rounded-full text-sm font-bold transition-all flex items-center justify-center gap-3 shadow-xl ${isScheduleMode ? 'bg-[#5BA8A0] hover:bg-[#4d8e87] shadow-[#5BA8A0]/20' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/20'}`}
            >
              {isScheduleMode ? <CalendarPlus className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {isScheduleMode ? "Send Interview Invites" : `Apply to ${selectedCount} Candidates`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
