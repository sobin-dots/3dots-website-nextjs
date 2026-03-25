/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";

export default function JobForm({ 
  job, 
  onSave, 
  onCancel 
}: { 
  job?: any, 
  onSave: () => void,
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    slug: job?.slug || "",
    tag: job?.tag || "ENGINEERING • FULL-TIME",
    type: job?.type || "Full-Time",
    location: job?.location || "Remote / Hybrid",
    description: job?.description || "",
    about: job?.about || "",
    active: job?.active !== undefined ? job.active : true,
    sections: job?.sections || [
      { title: "Responsibilities", items: [""] },
      { title: "Requirements", items: [""] }
    ]
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedSections = formData.sections.map((s: any) => ({
        ...s,
        items: s.items.filter((i: string) => i.trim() !== "")
      })).filter((s: any) => s.title.trim() !== "" && s.items.length > 0);

      const payload = { ...formData, sections: formattedSections };
      if (!payload.slug) delete payload.slug;

      const method = job ? "PUT" : "POST";
      const url = job ? `/api/careers/${job.id}` : "/api/careers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save job");
      onSave();
    } catch (err) {
      alert("Error saving job");
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "", items: [""] }]
    });
  };

  const updateSectionTitle = (index: number, title: string) => {
    const newSections = [...formData.sections];
    newSections[index].title = title;
    setFormData({ ...formData, sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_:any, i:any) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const addSectionItem = (sectionIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items.push("");
    setFormData({ ...formData, sections: newSections });
  };

  const updateSectionItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items[itemIndex] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_:any, i:any) => i !== itemIndex);
    setFormData({ ...formData, sections: newSections });
  };

  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          {job ? "Edit Position" : "Create Position"}
        </h2>
        <button onClick={onCancel} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Job Title *</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800"
              placeholder="e.g. 3D Artist"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">URL Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800"
              placeholder="e.g. 3d-artist"
            />
            <p className="text-xs text-slate-500">Leave blank to auto-generate</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tag *</label>
            <input
              required
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800"
              placeholder="e.g. CREATIVE • FULL-TIME"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Type *</label>
            <input
              required
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800"
              placeholder="e.g. Full-Time"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Location *</label>
            <input
              required
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800"
              placeholder="e.g. Remote / Hybrid"
            />
          </div>
          <div className="space-y-2 flex items-center pt-8">
            <input
              type="checkbox"
              id="activeCheckbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-5 h-5 text-brand bg-[#F4F6FB] border-slate-300 rounded focus:ring-brand accent-brand cursor-pointer"
            />
            <label htmlFor="activeCheckbox" className="ml-3 text-sm font-medium text-slate-700 cursor-pointer">
              Active (Accepting Applications)
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Short Description (for listing) *</label>
          <textarea
            required
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800 resize-none"
            placeholder="A short snippet to show on the positions listing..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">About the Role (Detail page)</label>
          <textarea
            rows={4}
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand text-slate-800 resize-none"
            placeholder="Detailed overview for the job posting..."
          />
        </div>

        <div className="pt-6 border-t border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-slate-800">Detail Sections</h3>
            <button
              type="button"
              onClick={addSection}
              className="text-sm font-medium text-brand flex items-center hover:text-brand-dark transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Section
            </button>
          </div>

          <div className="space-y-8">
            {formData.sections.map((section:any, sIdx:any) => (
              <div key={sIdx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 relative">
                <button
                  type="button"
                  onClick={() => removeSection(sIdx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="mb-4 pr-8">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-brand text-slate-800"
                    placeholder="e.g. Responsibilities"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">List Items</label>
                  {section.items.map((item:any, iIdx:any) => (
                    <div key={iIdx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0"></div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateSectionItem(sIdx, iIdx, e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-brand text-slate-800 text-sm"
                        placeholder="Detail item..."
                      />
                      <button
                        type="button"
                        onClick={() => removeSectionItem(sIdx, iIdx)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addSectionItem(sIdx)}
                    className="text-xs font-medium text-slate-500 hover:text-brand flex items-center transition-colors pt-2"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full text-slate-600 font-medium hover:bg-slate-100 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand text-white px-8 py-2.5 rounded-full font-medium hover:bg-brand-dark transition-all shadow-md shadow-brand/20 disabled:opacity-70 text-sm"
          >
            {loading ? "Saving..." : "Save Position"}
          </button>
        </div>
      </form>
    </div>
  );
}
