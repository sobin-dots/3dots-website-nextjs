/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { Link2, Download, RefreshCw, Layers, ZoomIn, Palette, ScanLine, Share2, Squircle, Circle, Square } from "lucide-react";

export default function QRGeneratorPage() {
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
  const [logoRatio, setLogoRatio] = useState(1);
  
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with canvas
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
          imageSize: logoSize / 100, // percentage in this lib
          margin: 2
        };
      } else {
        updateOptions.image = "";
      }

      qrCode.update(updateOptions);
    }
  }, [qrCode, text, fgColor, bgColor, dotStyle, size, includeMargin, showLogo, logoUrl, logoSize]);

  const updateLogoRatio = (src: string) => {
    const img = new Image();
    img.onload = () => {
      setLogoRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = src;
  };

  useEffect(() => {
    updateLogoRatio(logoUrl);
  }, [logoUrl]);

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
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight">
          QR Code <span className="font-medium">Designer</span>
        </h1>
        <p className="text-slate-500 font-light text-sm mt-1">Create high-end, custom-styled QR codes for production.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="space-y-4 relative z-10">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5" /> Destination Content
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or plain text..."
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-6 py-5 outline-none transition-all text-sm min-h-[100px] resize-none"
              />
            </div>

            {/* Pixel / Granules Styles */}
            <div className="space-y-4 relative z-10">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Squircle className="w-3.5 h-3.5" /> Pixel / Granule Styles
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { id: "square", label: "Classic Matrix", icon: Square },
                        { id: "dots", label: "Circular Granules", icon: Circle },
                        { id: "rounded", label: "Smooth Pixels", icon: Squircle },
                        { id: "extra-rounded", label: "Liquid Flow", icon: Circle },
                        { id: "classy", label: "Glass Shards", icon: Square },
                        { id: "classy-rounded", label: "Elegant Edge", icon: Squircle }
                    ].map((style) => (
                        <button 
                            key={style.id}
                            onClick={() => setDotStyle(style.id as any)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                                dotStyle === style.id 
                                ? "bg-slate-800 text-white border-slate-800 shadow-lg" 
                                : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-white hover:border-slate-300 shadow-xs"
                            }`}
                        >
                            <style.icon className={`w-5 h-5 ${dotStyle === style.id ? 'text-brand' : 'opacity-40'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{style.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5" /> Color Palette
                </label>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] text-slate-400 ml-1">Dots Color</span>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2">
                      <input 
                        type="color" 
                        value={fgColor} 
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" 
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
                    <span className="text-[10px] text-slate-400 ml-1">Bg Color</span>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2">
                      <input 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" 
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

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ZoomIn className="w-3.5 h-3.5" /> Resolution
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 ml-1">Canvas Size: {size}px</span>
                    <input 
                       type="range" 
                       min="256" 
                       max="1024" 
                       step="64"
                       value={size}
                       onChange={(e) => setSize(Number(e.target.value))}
                       className="accent-brand w-24"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium">Safe Margins</span>
                      <button 
                        onClick={() => setIncludeMargin(!includeMargin)}
                        className={`w-10 h-5 rounded-full relative ml-auto transition-all ${includeMargin ? 'bg-brand' : 'bg-slate-300'}`}
                      >
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${includeMargin ? 'left-5.5' : 'left-0.5'}`}></div>
                      </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Controls */}
            <div className="space-y-6 pt-6 border-t border-slate-50 relative z-10">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Share2 className="w-3.5 h-3.5" /> Logo Overlay
                    </label>
                    <button 
                      onClick={() => setShowLogo(!showLogo)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        showLogo ? "bg-brand/10 border-brand text-brand" : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {showLogo ? "Logo Enabled" : "Enable Logo"}
                    </button>
                </div>

                {showLogo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase tracking-widest">Logo Configuration</span>
                            
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 cursor-pointer hover:bg-slate-100 transition-colors group">
                                    <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-brand transition-colors">
                                        <Download className="w-4 h-4 rotate-180" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[11px] font-bold text-slate-600 truncate">Upload Custom Logo</p>
                                        <p className="text-[9px] text-slate-400">Fixed Aspect Ratio</p>
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
                                    <button onClick={() => setLogoUrl("/3dots-logo-1.png")} className="text-[9px] px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 transition-colors uppercase font-bold text-slate-500">Reset to 3Dots Logo</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 ml-1 font-bold uppercase tracking-widest">Logo Scale: {logoSize}%</span>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="50" 
                                    value={logoSize}
                                    onChange={(e) => setLogoSize(Number(e.target.value))}
                                    className="accent-brand w-20"
                                />
                            </div>
                            <p className="text-[9px] text-slate-400 font-light leading-relaxed">Scaling beyond 30% may interfere with QR readability depending on the data density.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 flex items-center gap-4 relative z-10 border-t border-slate-50">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Factory Reset
                </button>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-md flex flex-col items-center justify-center relative group min-h-[440px]">
            <div className="absolute top-4 left-4">
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-emerald-100">
                <ScanLine className="w-3 h-3" /> Designer View
              </span>
            </div>
            
            <div 
               ref={qrRef}
               className="p-8 rounded-3xl bg-white shadow-inner border border-slate-50 group-hover:scale-[1.02] transition-transform duration-500 qr-wrapper"
            >
              {/* QR Code Canvas rendered here by library */}
            </div>

            <div className="mt-10 w-full space-y-3">
              <button 
                onClick={downloadQR}
                className="w-full bg-brand text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg hover:-translate-y-1 duration-300"
              >
                <Download className="w-5 h-5" /> Download Production File
              </button>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-4xl text-white shadow-xl relative overflow-hidden">
             <Layers className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5" />
             <h4 className="text-lg font-medium mb-3 relative z-10">Styling Guide</h4>
             <p className="text-sm font-light text-slate-300 leading-relaxed mb-4 relative z-10">
               Use <strong className="text-white">Circular Granules</strong> for a modern, tech-focused look. For premium physical printing, <strong className="text-brand">Elegant Edge</strong> provides the cleanest scan-ability at high densities.
             </p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .qr-wrapper canvas {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 1rem;
        }
      `}} />
    </div>
  );
}
