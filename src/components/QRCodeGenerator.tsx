import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Wifi, 
  Globe, 
  Mail, 
  Type, 
  Palette,
  Sparkles
} from 'lucide-react';

type QRMode = 'url' | 'text' | 'wifi' | 'email';

export const QRCodeGenerator: React.FC = () => {
  const [mode, setMode] = useState<QRMode>('url');
  const [urlInput, setUrlInput] = useState<string>('https://google.com');
  const [textInput, setTextInput] = useState<string>('Welcome to PulseHub!');
  const [wifiSsid, setWifiSsid] = useState<string>('CoffeeShop_5G');
  const [wifiPassword, setWifiPassword] = useState<string>('SuperSecret123');
  const [wifiEncryption, setWifiEncryption] = useState<string>('WPA');
  const [emailInput, setEmailInput] = useState<string>('hello@example.com');
  const [emailSubject, setEmailSubject] = useState<string>('Inquiry');

  // Styling options
  const [fgColor, setFgColor] = useState<string>('#06b6d4'); // Cyan
  const [bgColor, setBgColor] = useState<string>('#030712'); // Very dark slate
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copied, setCopied] = useState<boolean>(false);
  const [copyImageSuccess, setCopyImageSuccess] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getPayload = (): string => {
    switch (mode) {
      case 'url':
        return urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;
      case 'text':
        return textInput;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      case 'email':
        return `mailto:${emailInput}?subject=${encodeURIComponent(emailSubject)}`;
    }
  };

  const payload = getPayload();

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        payload || 'https://pulsehub.app',
        {
          width: 256,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorCorrection,
        },
        error => {
          if (error) console.error('QR rendering error:', error);
        }
      );
    }
  }, [payload, fgColor, bgColor, errorCorrection]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `pulsehub-qr-${mode}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async blob => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopyImageSuccess(true);
        setTimeout(() => setCopyImageSuccess(false), 2000);
      });
    } catch {
      // Fallback: copy payload text
      navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const COLOR_PRESETS = [
    { name: 'Cyan Neon', fg: '#06b6d4', bg: '#030712' },
    { name: 'Purple Cyber', fg: '#a855f7', bg: '#030712' },
    { name: 'Emerald High-Tech', fg: '#10b981', bg: '#030712' },
    { name: 'Pure Contrast', fg: '#ffffff', bg: '#000000' },
    { name: 'Inverted Light', fg: '#000000', bg: '#ffffff' },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-all hover:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">QR Code Generator</h3>
            <p className="text-xs text-slate-400">High-resolution QR with custom colors and instant export</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40">
          <Sparkles className="h-3 w-3" />
          <span>Vector Precision</span>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="mt-4 grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mode === 'url' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Website</span> URL
        </button>
        <button
          type="button"
          onClick={() => setMode('text')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mode === 'text' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Type className="h-3.5 w-3.5" />
          <span>Text</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('wifi')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mode === 'wifi' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wifi className="h-3.5 w-3.5" />
          <span>WiFi</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('email')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mode === 'email' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Email</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Form Inputs (Left side 7 cols) */}
        <div className="md:col-span-7 space-y-3">
          {mode === 'url' && (
            <div>
              <label htmlFor="qr-url" className="text-xs font-medium text-slate-300 block mb-1">Target Website / URL</label>
              <input
                id="qr-url"
                type="url"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-cyan-300 font-mono focus:border-cyan-500/60 focus:outline-none"
              />
            </div>
          )}

          {mode === 'text' && (
            <div>
              <label htmlFor="qr-text" className="text-xs font-medium text-slate-300 block mb-1">Plain Text Content</label>
              <textarea
                id="qr-text"
                rows={3}
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Enter secret message, serial number, or note..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
              />
            </div>
          )}

          {mode === 'wifi' && (
            <div className="space-y-2">
              <div>
                <label htmlFor="wifi-ssid" className="text-xs font-medium text-slate-300 block mb-1">Network Name (SSID)</label>
                <input
                  id="wifi-ssid"
                  type="text"
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="e.g. MyWiFi_5G"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="wifi-pwd" className="text-xs font-medium text-slate-300 block mb-1">Password</label>
                  <input
                    id="wifi-pwd"
                    type="text"
                    value={wifiPassword}
                    onChange={e => setWifiPassword(e.target.value)}
                    placeholder="WiFi Password"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="wifi-enc" className="text-xs font-medium text-slate-300 block mb-1">Security</label>
                  <select
                    id="wifi-enc"
                    value={wifiEncryption}
                    onChange={e => setWifiEncryption(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {mode === 'email' && (
            <div className="space-y-2">
              <div>
                <label htmlFor="qr-email" className="text-xs font-medium text-slate-300 block mb-1">Recipient Email</label>
                <input
                  id="qr-email"
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="qr-subject" className="text-xs font-medium text-slate-300 block mb-1">Subject Line</label>
                <input
                  id="qr-subject"
                  type="text"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-sm text-slate-200 focus:border-cyan-500/60 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Color & Aesthetic Palette Selector */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
              <Palette className="h-3 w-3" />
              <span>Color Themes:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFgColor(preset.fg);
                    setBgColor(preset.bg);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-all cursor-pointer ${
                    fgColor === preset.fg && bgColor === preset.bg
                      ? 'border-cyan-400 bg-slate-800 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full border border-slate-700"
                    style={{ backgroundColor: preset.fg }}
                  />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Canvas Preview (Right side 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center rounded-xl bg-slate-950 p-4 border border-slate-800">
          <div className="overflow-hidden rounded-lg p-2 shadow-inner bg-slate-900 border border-slate-800">
            <canvas ref={canvasRef} className="h-44 w-44 rounded-md" />
          </div>

          <div className="mt-4 flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-3 py-2 text-xs font-semibold text-white shadow hover:from-purple-500 hover:to-cyan-500 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download High-Res PNG</span>
            </button>
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={handleCopyImage}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              >
                {copyImageSuccess ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copyImageSuccess ? 'Image Copied!' : 'Copy Image'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(payload);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Text Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
