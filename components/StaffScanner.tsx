'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, ScanLine, Hash, CheckCircle, Gift, AlertCircle } from 'lucide-react';

interface PunchResult {
  memberName: string;
  punches: number;
  freeSessionEarned: boolean;
  message?: string;
}

export default function StaffScanner() {
  // PIN gate state
  const [pin, setPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const [pinValidated, setPinValidated] = useState(false);

  // Scanner state
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<PunchResult | null>(null);
  const [scanError, setScanError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraSupported, setCameraSupported] = useState(true);
  const [barcodeSupported, setBarcodeSupported] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const stopCamera = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setScanning(false);
  }, []);

  // Validate PIN
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setPinLoading(true);

    try {
      const res = await fetch('/api/loyalty/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput, code: '__validate_pin__' }),
      });

      if (res.ok || res.status === 404) {
        // PIN is valid (404 means pin ok but code not found, which is expected)
        setPin(pinInput);
        setPinValidated(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setPinError(data.error || 'Invalid PIN. Please try again.');
      }
    } catch {
      setPinError('Connection error. Please try again.');
    } finally {
      setPinLoading(false);
    }
  };

  // Process a loyalty code
  const processCode = useCallback(
    async (code: string) => {
      if (submitting || !code.trim()) return;

      setSubmitting(true);
      setScanError('');
      setScanResult(null);

      try {
        const res = await fetch('/api/loyalty/punch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code.trim(), pin }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setScanError(data.error || 'Failed to process punch.');
          return;
        }

        setScanResult({
          memberName: data.member?.name || 'Member',
          punches: data.member?.punches ?? 0,
          freeSessionEarned: data.freeSessionEarned ?? false,
        });

        setManualCode('');

        // Auto-reset after 3 seconds
        resetTimeoutRef.current = setTimeout(() => {
          setScanResult(null);
          setScanError('');
          setSubmitting(false);
        }, 3000);
      } catch {
        setScanError('Connection error. Please try again.');
      } finally {
        if (!resetTimeoutRef.current) {
          setSubmitting(false);
        }
      }
    },
    [pin, submitting]
  );

  // Start camera and barcode detection
  const startCamera = useCallback(async () => {
    // Check BarcodeDetector support
    if (!('BarcodeDetector' in window)) {
      setBarcodeSupported(false);
      return;
    }

    // Check camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraSupported(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
      setScanning(true);

      // Set up BarcodeDetector scanning
      const BarcodeDetectorClass = (window as any).BarcodeDetector;
      const detector = new BarcodeDetectorClass({ formats: ['qr_code'] });

      scanIntervalRef.current = setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState !== 4) return;

        try {
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0) {
            const rawValue = barcodes[0].rawValue;
            if (rawValue) {
              // Extract code from QR - might be a URL or just the code
              let code = rawValue;
              // If it's a URL, extract the code param or last path segment
              try {
                const url = new URL(rawValue);
                const codeParam = url.searchParams.get('code');
                if (codeParam) {
                  code = codeParam;
                } else {
                  const pathParts = url.pathname.split('/').filter(Boolean);
                  if (pathParts.length > 0) {
                    code = pathParts[pathParts.length - 1];
                  }
                }
              } catch {
                // Not a URL, use raw value as code
              }

              stopCamera();
              processCode(code);
            }
          }
        } catch {
          // Detection error, ignore and retry
        }
      }, 500);
    } catch {
      setCameraSupported(false);
    }
  }, [processCode, stopCamera]);

  // Handle manual code submit
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      processCode(manualCode.trim());
    }
  };

  // Render punch card circles
  const renderPunchCard = (punches: number) => {
    const total = 10;
    const filled = punches % total === 0 && punches > 0 ? total : punches % total;
    return (
      <div className="flex flex-wrap gap-2 justify-center my-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              i < filled
                ? 'bg-accent border-accent text-slate-900 scale-110'
                : 'border-slate-600 text-slate-600'
            }`}
          >
            {i < filled ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span className="text-xs font-medium">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // === PIN GATE ===
  if (!pinValidated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hash className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Staff Access</h2>
            <p className="text-slate-400 mt-1">Enter your 4-digit staff PIN</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setPinInput(val);
                  setPinError('');
                }}
                placeholder="••••"
                className="w-full text-center text-3xl tracking-[0.5em] bg-slate-900 text-slate-100 border border-slate-600 rounded-lg px-4 py-4 placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                autoFocus
              />
            </div>

            {pinError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pinInput.length !== 4 || pinLoading}
              className="w-full bg-accent text-slate-900 font-bold py-3 rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {pinLoading ? 'Verifying...' : 'Unlock Scanner'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // === SCANNER INTERFACE ===
  return (
    <div className="space-y-6">
      {/* Scan Result Overlay */}
      {scanResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`bg-slate-800 border-2 rounded-2xl p-8 w-full max-w-md shadow-2xl text-center animate-in fade-in zoom-in duration-300 ${
              scanResult.freeSessionEarned ? 'border-yellow-400' : 'border-accent'
            }`}
          >
            {scanResult.freeSessionEarned ? (
              <div className="mb-4">
                <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                  <Gift className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-3xl font-black text-yellow-400">FREE SESSION EARNED!</h3>
              </div>
            ) : (
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-accent">Punch Recorded!</h3>
              </div>
            )}

            <p className="text-xl font-semibold text-slate-100 mb-2">{scanResult.memberName}</p>
            <p className="text-slate-400 mb-4">
              Punch {scanResult.punches}/10
            </p>

            {renderPunchCard(scanResult.punches)}

            {scanResult.message && (
              <p className="text-slate-300 mt-4 text-sm">{scanResult.message}</p>
            )}

            <p className="text-slate-500 text-xs mt-4">Auto-closing in 3 seconds...</p>
          </div>
        </div>
      )}

      {/* Scanner Error */}
      {scanError && (
        <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{scanError}</span>
          <button
            onClick={() => {
              setScanError('');
              setSubmitting(false);
            }}
            className="ml-auto text-red-300 hover:text-red-100 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Manual Code Entry */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-slate-100">Enter Loyalty Code</h3>
        </div>
        <form onSubmit={handleManualSubmit} className="flex gap-3">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value.toUpperCase())}
            placeholder="e.g. A1B2C3D4"
            maxLength={8}
            className="flex-1 bg-slate-900 text-slate-100 border border-slate-600 rounded-lg px-4 py-3 text-lg font-mono tracking-wider uppercase placeholder:text-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
          <button
            type="submit"
            disabled={manualCode.trim().length === 0 || submitting}
            className="bg-accent text-slate-900 font-bold px-6 py-3 rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <ScanLine className="w-5 h-5" />
            <span>Punch</span>
          </button>
        </form>
      </div>

      {/* Camera Scanner */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-slate-100">Camera Scanner</h3>
          </div>
          {cameraActive && (
            <button
              onClick={stopCamera}
              className="text-sm text-red-400 hover:text-red-300 underline transition-colors"
            >
              Stop Camera
            </button>
          )}
        </div>

        {!barcodeSupported ? (
          <div className="flex items-center gap-3 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">
              Camera scanning not supported in this browser, please enter code manually
            </span>
          </div>
        ) : !cameraSupported ? (
          <div className="flex items-center gap-3 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">
              Camera access unavailable. Please enter the code manually above.
            </span>
          </div>
        ) : !cameraActive ? (
          <button
            onClick={startCamera}
            className="w-full border-2 border-dashed border-slate-600 rounded-xl py-12 flex flex-col items-center gap-3 text-slate-400 hover:border-accent hover:text-accent transition-colors group"
          >
            <Camera className="w-12 h-12 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Tap to start camera</span>
            <span className="text-xs text-slate-500">Point at student&apos;s QR code</span>
          </button>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-black">
            {/* Scanner frame overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-lg"></div>

              {/* Scanning line animation */}
              {scanning && (
                <div className="absolute left-8 right-8 h-0.5 bg-accent/60 animate-pulse top-1/2"></div>
              )}
            </div>

            <video
              ref={videoRef}
              className="w-full aspect-[4/3] object-cover"
              playsInline
              muted
            ></video>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-center gap-2 text-accent text-sm">
                <ScanLine className="w-4 h-4 animate-pulse" />
                <span>Scanning for QR code...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
