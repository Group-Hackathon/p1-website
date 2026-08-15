import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Mic,
  MicOff,
  Sparkles,
  MoveRight,
  RotateCcw,
  Thermometer,
  MapPin,
  Camera,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  Layers
} from "lucide-react";

export default function Demo({ onSummary }) {
  const [activeMode, setActiveMode] = useState("bodymap"); // 'bodymap' | 'voice'
  const [selectedRegions, setSelectedRegions] = useState(["head"]);
  const [selectedLabels, setSelectedLabels] = useState(["Head"]);
  const [viewSide, setViewSide] = useState("front"); // 'front' | 'back'
  const [painLevel, setPainLevel] = useState(4);
  const [temperature, setTemperature] = useState(37.4);
  const [note, setNote] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const iframeRef = useRef(null);

  // Dynamic Living Timeline
  const [events, setEvents] = useState([
    {
      id: 1,
      time: "Yesterday, 18:30",
      part: "Head & Cervical",
      pain: 5,
      temp: 37.8,
      note: "Pulsing tension headache after screen work.",
      type: "3D Mannequin HUD",
      photo: false
    },
    {
      id: 2,
      time: "2 days ago, 09:15",
      part: "Lower back",
      pain: 3,
      temp: 36.8,
      note: "Stiffness upon waking up, eased with stretching.",
      type: "Voice Logger",
      photo: true
    }
  ]);

  // Listen to postMessage from the 3D Bodymap iframe
  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;
      if (event.data.type === "selection") {
        if (event.data.regions && event.data.regions.length > 0) {
          setSelectedRegions(event.data.regions);
          setSelectedLabels(event.data.labels || event.data.regions);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function toggleViewSide(side) {
    setViewSide(side);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "set_view", view: side }, "*");
    }
  }

  function reset3DSelection() {
    setSelectedRegions([]);
    setSelectedLabels([]);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "reset" }, "*");
    }
  }

  function getPainColor(level) {
    if (level <= 3) return "#2E7D32"; // PainLow
    if (level <= 6) return "#D97706"; // PainMedium
    if (level <= 8) return "#DC2626"; // PainHigh
    return "#991B1B"; // PainExtreme
  }

  function handleVoiceToggle() {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setVoiceTranscript("Listening...");
      setTimeout(() => {
        setVoiceTranscript("Moderate throbbing sensation localized in the temporal zone with a mild fever of 37.5°C.");
        setIsRecording(false);
      }, 1800);
    }
  }

  function handleCommitCheckIn(e) {
    e.preventDefault();
    const regionText = selectedLabels.length > 0 ? selectedLabels.join(", ") : "General";
    const newEntry = {
      id: Date.now(),
      time: "Just now",
      part: regionText,
      pain: Number(painLevel),
      temp: Number(temperature),
      note: activeMode === "voice" && voiceTranscript ? voiceTranscript : (note || `Check-in recorded for ${regionText}.`),
      type: activeMode === "voice" ? "Voice Check-in" : "3D Mannequin HUD",
      photo: hasPhoto
    };

    setEvents([newEntry, ...events]);
    setNote("");
    setHasPhoto(false);
    if (activeMode === "voice") setVoiceTranscript("");
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark mb-2">
            <Sparkles size={14} /> Official 3D Engine & APK Simulator
          </div>
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Pre-Appointment 1 Interactive Demo
          </h1>
          <p className="mt-1 text-muted text-sm sm:text-base">
            Featuring the exact 3D Clinical Mannequin, Hands-Free Speech Logger, and living timeline from the Android app.
          </p>
        </div>
        <button
          onClick={onSummary}
          className="btn-primary shrink-0 text-sm px-5 py-3 shadow-md"
        >
          View Doctor Briefing PDF <MoveRight size={16} />
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
        {/* Left Column: Interactive Check-in Engine */}
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex rounded-2xl bg-cream border border-line p-1.5">
            <button
              onClick={() => setActiveMode("bodymap")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition ${
                activeMode === "bodymap"
                  ? "bg-white text-sage shadow-sm border border-line"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Activity size={16} /> 3D Clinical Mannequin HUD
            </button>
            <button
              onClick={() => setActiveMode("voice")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition ${
                activeMode === "voice"
                  ? "bg-white text-sage shadow-sm border border-line"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Mic size={16} /> Hands-Free Voice Logger
            </button>
          </div>

          {/* Mode 1: 3D Robot HUD */}
          {activeMode === "bodymap" && (
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-ink">Interactive 3D Anatomical Picker</h2>
                  <p className="text-xs text-muted">Drag to rotate 360° • Tap body regions to mark pain telemetry</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleViewSide(viewSide === "front" ? "back" : "front")}
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-cream px-3 py-1.5 text-xs font-bold text-ink hover:bg-white transition"
                  >
                    <Eye size={13} /> {viewSide === "front" ? "View Back" : "View Front"}
                  </button>
                  <button
                    onClick={reset3DSelection}
                    className="rounded-xl border border-line bg-cream p-1.5 text-muted hover:text-ink transition"
                    title="Reset selection"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-[1.1fr_.9fr] items-center">
                {/* 3D Mannequin Embedded Frame */}
                <div className="relative mx-auto w-full h-[380px] rounded-2xl bg-[#0D1A14] border-2 border-sage/40 overflow-hidden shadow-inner flex items-center justify-center">
                  {/* Grid Lines Ambient HUD */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D524A12_1px,transparent_1px),linear-gradient(to_bottom,#2D524A12_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

                  {/* 3D Bodymap Canvas Iframe */}
                  <iframe
                    ref={iframeRef}
                    src="/bodymap.html"
                    title="3D Mannequin HUD"
                    className="w-full h-full border-none relative z-0"
                  />

                  {/* Floating Selection Badge */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex justify-center">
                    <span className="rounded-full bg-sage/90 backdrop-blur border border-mint/30 px-3 py-1 text-[11px] font-bold text-mint shadow-lg">
                      Target: {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Tap Mannequin"}
                    </span>
                  </div>
                </div>

                {/* Telemetry Controls Panel */}
                <div className="space-y-4">
                  {/* Pain Scale */}
                  <div className="rounded-2xl border border-line bg-cream p-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-ink">Pain Ladder</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: getPainColor(painLevel) }}
                      >
                        Level {painLevel}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={painLevel}
                      onChange={(e) => setPainLevel(Number(e.target.value))}
                      className="mt-3 w-full h-2 rounded-lg bg-gray-200 accent-sage cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-muted mt-1">
                      <span>0 Mild</span>
                      <span>5 Moderate</span>
                      <span>10 Severe</span>
                    </div>
                  </div>

                  {/* Temperature Slider */}
                  <div className="rounded-2xl border border-line bg-cream p-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-ink flex items-center gap-1">
                        <Thermometer size={15} className="text-sage" /> Body Temp
                      </span>
                      <span className="font-mono font-bold text-sage-dark bg-mint px-2 py-0.5 rounded-lg text-xs">
                        {temperature.toFixed(1)}°C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="36.0"
                      max="40.0"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="mt-3 w-full h-2 rounded-lg bg-gray-200 accent-sage cursor-pointer"
                    />
                  </div>

                  {/* Photo & Note Attachment */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Observation note..."
                      className="flex-1 rounded-xl border border-line bg-cream px-3 py-2 text-xs text-ink outline-none focus:border-sage focus:bg-white"
                    />
                    <button
                      onClick={() => setHasPhoto(!hasPhoto)}
                      className={`rounded-xl border p-2 text-xs font-bold transition flex items-center gap-1 ${
                        hasPhoto
                          ? "bg-mint border-mint-dark text-mint-dark"
                          : "border-line bg-cream text-muted hover:text-ink"
                      }`}
                      title="Simulate photo capture"
                    >
                      <Camera size={15} />
                    </button>
                  </div>

                  <button
                    onClick={handleCommitCheckIn}
                    className="btn-primary w-full py-3 text-sm font-bold shadow-sm"
                  >
                    Commit to Living Timeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Voice Check-In */}
          {activeMode === "voice" && (
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card text-center">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-mint-dark">
                Hands-Free Speech Logger
              </span>
              <h2 className="mt-3 text-xl font-bold text-ink">Dictate your symptoms naturally</h2>
              <p className="mt-1 text-sm text-muted max-w-md mx-auto">
                Tap the microphone, speak freely, and Gemini structures observations into clinical parameters.
              </p>

              {/* Pulsing Mic Button */}
              <div className="my-8 flex justify-center">
                <button
                  onClick={handleVoiceToggle}
                  className={`grid h-24 w-24 place-items-center rounded-full transition-all duration-300 shadow-xl ${
                    isRecording
                      ? "bg-red-500 text-white animate-pulse scale-110"
                      : "bg-sage text-white hover:bg-sage-dark hover:scale-105"
                  }`}
                >
                  {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
                </button>
              </div>

              {/* Live Transcript Box */}
              <div className="rounded-2xl border border-line bg-cream p-5 text-left min-h-[100px]">
                <p className="text-xs font-bold uppercase text-muted tracking-wider mb-2">Live Speech Recognition</p>
                <p className="text-sm font-medium text-ink leading-relaxed">
                  {voiceTranscript || "Press the microphone above to simulate voice logging..."}
                </p>
              </div>

              {voiceTranscript && !isRecording && (
                <button
                  onClick={handleCommitCheckIn}
                  className="btn-primary mt-6 w-full py-3 text-sm font-bold"
                >
                  Commit Voice Note to Timeline
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Living Patient Timeline */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-7 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-bold text-ink">Living Chronology</h3>
                <p className="text-xs text-muted">Active File: Patient 1</p>
              </div>
              <div className="rounded-xl bg-mint px-3 py-1 text-xs font-bold text-mint-dark">
                Readiness: 85%
              </div>
            </div>

            {/* Timeline Nodes */}
            <div className="mt-6 space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {events.map((ev) => (
                <div key={ev.id} className="relative pl-6 pb-2 border-l-2 border-mint-dark/30 last:border-transparent">
                  <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-sage ring-4 ring-mint" />
                  <div className="rounded-2xl border border-line bg-cream p-3.5 transition hover:bg-white hover:shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted mb-1">
                      <span className="font-semibold text-ink flex items-center gap-1">
                        <MapPin size={12} className="text-sage" /> {ev.part}
                      </span>
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2 my-1.5 flex-wrap">
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                        style={{ backgroundColor: getPainColor(ev.pain) }}
                      >
                        Pain {ev.pain}/10
                      </span>
                      <span className="font-mono text-xs font-bold text-sage-dark bg-mint px-2 py-0.5 rounded">
                        {ev.temp}°C
                      </span>
                      {ev.photo && (
                        <span className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-ink flex items-center gap-0.5">
                          <Camera size={10} /> Photo
                        </span>
                      )}
                      <span className="text-[10px] text-muted ml-auto font-medium">{ev.type}</span>
                    </div>
                    <p className="text-xs text-ink/80 mt-1 leading-relaxed">{ev.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-line">
              <button
                onClick={onSummary}
                className="btn-secondary w-full py-2.5 text-xs font-bold"
              >
                Compile into Doctor Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
