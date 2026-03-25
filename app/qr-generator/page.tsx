"use client";

import { useState, useRef, useEffect } from "react";
import { Link2, Download, RefreshCw, Layers, ZoomIn, Palette, ScanLine, Share2, Squircle, Circle, Square } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QRGeneratorPublicPage() {
  const [qrCode, setQrCode] = useState<any>(null);
  const [text, setText] = useState("https://3dots.co");
  const [size, setSize] = useState(320);
  const [dotStyle, setDotStyle] = useState<"square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded">("square");
  const [fgColor, setFgColor] = useState("#258c7b");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [includeMargin, setIncludeMargin] = useState(true);
  
  // Logo State
  const [showLogo, setShowLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/3dots-logo-1.png");
  const [logoSize, setLogoSize] = useState(40);
  
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("qr-code-styling").then((QRCodeStyling) => {
      const qr = new QRCodeStyling.default({
        width: size,
        height: size,
        data: text,
        margin: includeMargin ? 20 : 0,
        dotsOptions: {
          color: fgColor,
          type: dotStyle as any,
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
        },
      });
      setQrCode(qr);
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
    });
  }, []);

  useEffect(() => {
    if (qrCode) {
      const updateOptions: any = {
        data: text,
        width: size,
        height: size,
        margin: includeMargin ? 20 : 0,
        dotsOptions: {
          color: fgColor,
          type: dotStyle,
        },
        backgroundOptions: {
          color: bgColor,
        },
      };

      if (showLogo && logoUrl) {
        updateOptions.image = logoUrl;
        updateOptions.imageOptions = {
          hideBackgroundDots: true,
          imageSize: logoSize / 100,
          margin: 2
        };
      } else {
        updateOptions.image = "";
      }

      qrCode.update(updateOptions);
    }
  }, [qrCode, text, fgColor, bgColor, dotStyle, size, includeMargin, showLogo, logoUrl, logoSize]);

  const downloadQR = () => {
    if (qrCode) {
      qrCode.download({
        name: `3dots-qr-${Date.now()}`,
        extension: "png",
      });
    }
  };

  const handleReset = () => {
    setText("https://3dots.co");
    setDotStyle("square");
    setFgColor("#258c7b");
    setBgColor("#FFFFFF");
    setShowLogo(false);
    setLogoUrl("/3dots-logo-1.png");
  };

  return (
    <main className="min-h-screen bg-[#F4F6FB] pt-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-light text-slate-800 tracking-tight">
            Premium <span className="font-medium text-brand">QR Designer</span>
          </h1>
          <p className="text-slate-500 font-light text-lg max-w-2xl mx-auto">
            Design production-ready, branded QR codes with advanced pixel styles and custom overlays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="space-y-4 relative z-10">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Link2 className="w-3.5 h-3.5" /> Destination Content
                </label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your URL or text here..."
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-6 py-5 outline-none transition-all text-sm min-h-[100px] resize-none shadow-inner"
                />
              </div>

              {/* Pixel Styles */}
              <div className="space-y-4 relative z-10">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <Squircle className="w-3.5 h-3.5" /> Granule Aesthetics
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                          { id: "square", label: "Classic Matrix", icon: Square },
                          { id: "dots", label: "Circular", icon: Circle },
                          { id: "rounded", label: "Smooth", icon: Squircle },
                          { id: "extra-rounded", label: "Liquid", icon: Circle },
                          { id: "classy", label: "Shards", icon: Square },
                          { id: "classy-rounded", label: "Elegant", icon: Squircle }
                      ].map((style) => (
                          <button 
                              key={style.id}
                              onClick={() => setDotStyle(style.id as any)}
                              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
                                  dotStyle === style.id 
                                  ? "bg-slate-800 text-white border-slate-800 shadow-xl scale-[1.02]" 
                                  : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-white hover:border-slate-300 shadow-sm"
                              }`}
                          >
                              <style.icon className={`w-6 h-6 ${dotStyle === style.id ? 'text-brand' : 'opacity-30'}`} />
                              <span className="text-[10px] font-bold uppercase tracking-wider">{style.label}</span>
                          </button>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 pt-4 border-t border-slate-50">
                {/* Colors */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <Palette className="w-3.5 h-3.5" /> Brand Colors
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] text-slate-400 ml-1">Primary</span>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                        <input 
                          type="color" 
                          value={fgColor} 
                          onChange={(e) => setFgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0" 
                        />
                        <input 
                          type="text" 
                          value={fgColor} 
                          onChange={(e) => setFgColor(e.target.value)}
                          className="bg-transparent text-[11px] font-mono outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] text-slate-400 ml-1">Canvas</span>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                        <input 
                          type="color" 
                          value={bgColor} 
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0" 
                        />
                        <input 
                          type="text" 
                          value={bgColor} 
                          onChange={(e) => setBgColor(e.target.value)}
                          className="bg-transparent text-[11px] font-mono outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resolution */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                    <ZoomIn className="w-3.5 h-3.5" /> High-Res Export
                  </label>
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Standard</span>
                        <span>4K Ready</span>
                      </div>
                      <input 
                         type="range" 
                         min="256" 
                         max="2048" 
                         step="64"
                         value={size}
                         onChange={(e) => setSize(Number(e.target.value))}
                         className="accent-brand w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
                      />
                      <div className="text-[10px] text-brand font-medium text-center">Output: {size} x {size} pixels</div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                        <span className="text-[11px] text-slate-600 font-bold uppercase tracking-widest">Border Margins</span>
                        <button 
                          onClick={() => setIncludeMargin(!includeMargin)}
                          className={`w-12 h-6 rounded-full relative ml-auto transition-all ${includeMargin ? 'bg-brand' : 'bg-slate-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${includeMargin ? 'left-7' : 'left-1'}`}></div>
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Controls */}
              <div className="space-y-8 pt-8 border-t border-slate-50 relative z-10 w-full">
                  <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                          <Share2 className="w-3.5 h-3.5" /> Center Alignment Branding
                      </label>
                      <button 
                        onClick={() => setShowLogo(!showLogo)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all border-2 ${
                          showLogo ? "bg-brand/10 border-brand text-brand" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {showLogo ? "Logo Active" : "Add Logo Overlay"}
                      </button>
                  </div>

                  {showLogo && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                          <div className="space-y-4">
                              <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase tracking-widest">Brand Mark</span>
                              
                              <div className="flex flex-col gap-4">
                                  <label className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-2xl p-4 cursor-pointer hover:bg-slate-900 transition-all group shadow-xl">
                                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                          <Download className="w-5 h-5 rotate-180" />
                                      </div>
                                      <div className="flex-1 overflow-hidden">
                                          <p className="text-xs font-bold text-white tracking-wide">Upload Custom Image</p>
                                          <p className="text-[10px] text-slate-400">Maintains proportions</p>
                                      </div>
                                      <input 
                                          type="file" 
                                          className="hidden" 
                                          accept="image/*"
                                          onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                  const reader = new FileReader();
                                                  reader.onload = (event) => setLogoUrl(event.target?.result as string);
                                                  reader.readAsDataURL(file);
                                              }
                                          }}
                                      />
                                  </label>
                                  <div className="flex gap-2">
                                      <button onClick={() => setLogoUrl("/3dots-logo-1.png")} className="flex-1 text-[9px] py-2.5 bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-all font-bold uppercase tracking-widest text-slate-500 shadow-sm">Use 3Dots Icon</button>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-6">
                              <div className="flex flex-col gap-4">
                                  <div className="flex items-center justify-between">
                                      <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase tracking-widest">Overlay Scale: {logoSize}%</span>
                                  </div>
                                  <input 
                                      type="range" 
                                      min="10" 
                                      max="45" 
                                      value={logoSize}
                                      onChange={(e) => setLogoSize(Number(e.target.value))}
                                      className="accent-brand w-full"
                                  />
                                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-[10px] text-amber-600 font-medium leading-relaxed">
                                      Tip: Below 30% is recommended for complex URLs to ensure seamless scanning.
                                    </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>

              <div className="pt-6 flex items-center gap-4 relative z-10 border-t border-slate-50">
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-[0.1em]"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset Factory Settings
                  </button>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32">
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col items-center justify-center relative group min-h-[520px]">
              <div className="absolute top-6 left-6">
                <span className="bg-brand text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-brand/20">
                  <ScanLine className="w-3.5 h-3.5" /> High-Fidelity
                </span>
              </div>
              
              <div 
                 ref={qrRef}
                 className="p-10 rounded-[2rem] bg-white shadow-inner border border-slate-50 group-hover:scale-105 transition-transform duration-700 ease-out qr-wrapper"
              >
              </div>

              <div className="mt-12 w-full space-y-4">
                <button 
                  onClick={downloadQR}
                  className="w-full bg-brand text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-2xl shadow-brand/20 hover:-translate-y-1.5 active:translate-y-0 duration-300"
                >
                  <Download className="w-6 h-6" /> Export PNG File
                </button>
                <div className="text-center">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.1em]">Ready for 4K Commercial Printing</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
               <Layers className="absolute -right-12 -bottom-12 w-48 h-48 text-brand/10 transition-transform group-hover:scale-110 duration-700" />
               <h4 className="text-xl font-medium mb-4 relative z-10 flex items-center gap-3">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                 Commercial Usage
               </h4>
               <p className="text-sm font-light text-slate-400 leading-relaxed relative z-10">
                 All codes generated are royalty-free and static. Once downloaded, they belong to you forever and will never expire, regardless of scan volume.
               </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .qr-wrapper canvas {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 1.5rem;
            box-shadow: 0 20px 50px -12px rgb(0 0 0 / 0.1);
        }
      `}} />
    </main>
  );
}
