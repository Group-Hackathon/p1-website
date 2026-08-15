import React, { useState } from "react";
import {
  Activity,
  Mic,
  MicOff,
  Camera,
  CheckCircle,
  Thermometer,
  Shield,
  Sparkles,
  MoveRight,
  RotateCcw,
  Clock,
  MapPin,
  Calendar,
  FileText,
  UserCheck
} from "lucide-react";

const BODY_PARTS = [
  { id: "head", label: "Head & Cranial", x: 50, y: 15 },
  { id: "neck", label: "Cervical & Neck", x: 50, y: 25 },
  { id: "chest", label: "Thoracic / Chest", x: 50, y: 38 },
  { id: "shoulder", label: "Shoulders", x: 30, y: 33 },
  { id: "abdomen", label: "Abdominal Zone", x: 50, y: 50 },
  { id: "lower_back", label: "Lumbar / Lower Back", x: 50, y: 60 },
  { id: "knee", label: "Knee Joint", x: 42, y: 78 },
  { id: "ankle", label: "Ankle & Foot", x: 40, y: 92 },
];

export default function Demo({ onSummary }) {
  const [activeMode, setActiveMode] = useState("bodymap"); // 'bodymap' | 'voice'
  const [selectedPart, setSelectedPart] = useState("head");
  const [painLevel, setPainLevel] = useState(4);
  const [temperature, setTemperature] = useState(37.4);
  const [note, setNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Timeline State
  const [events, setEvents] = useState([
    {
      id: 1,
      time: "Yesterday, 18:30",
      part: "Head & Cranial",
      pain: 5,
      temp: 37.8,
      note: "Pulsing headache after 4 hours on screen.",
      type: "3D HUD Check-in"
    },
    {
      id: 2,
      time: "2 days ago, 09:15",
      part: "Lumbar / Lower Back",
      pain: 3,
      temp: 36.8,
      note: "Stiffness upon waking up, eased with walking.",
      type: "Voice Logger"
    }
  ]);

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
        setVoiceTranscript("I woke up with moderate pressure in my head and slight temperature spike around 37.5°C.");
        setIsRecording(false);
      }, 2000);
    }
  }

  function handleCommitCheckIn(e) {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      time: "Just now",
      part: BODY_PARTS.find((p) => p.id === selectedPart)?.label || "General",
      pain: Number(painLevel),
      temp: Number(temperature),
      note: activeMode === "voice" && voiceTranscript ? voiceTranscript : (note || "Daily check-in logged via 3D HUD."),
      type: activeMode === "voice" ? "Voice Check-in" : "3D HUD Check-in"
    };

    setEvents([newEntry, ...events]);
    setNote("");
    if (activeMode === "voice") setVoiceTranscript("");
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark mb-2">
            <Sparkles size={14} /> Interactive APK Simulator
          </div>
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Pre-Appointment 1 Demo
          </h1>
          <p className="mt-1 text-muted text-sm sm:text-base">
            Test the 3D Robot HUD, Hands-Free Voice Logger, and deterministic clinical timeline — exactly like the Android app.
          </p>
        </div>
        <button
          onClick={onSummary}
          className="btn-primary shrink-0 text-sm px-5 py-3 shadow-md"
        >
          View Doctor Briefing PDF <MoveRight size={16} />
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
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
              <Activity size={16} /> 3D Robot Anatomy HUD
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
                  <h2 className="text-lg font-bold text-ink">3D Robot Anatomical Map</h2>
                  <p className="text-xs text-muted">Tap on an anatomical coordinate to pinpoint pain</p>
                </div>
                <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-mint-dark">
                  Target: {BODY_PARTS.find((p) => p.id === selectedPart)?.label}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 items-center">
                {/* Robot HUD Mannequin SVG */}
                <div className="relative mx-auto w-full max-w-[240px] aspect-[1/2] rounded-2xl bg-[#0D1A14] border-2 border-sage/40 p-4 flex items-center justify-center shadow-inner">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D524A15_1px,transparent_1px),linear-gradient(to_bottom,#2D524A15_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />

                  {/* Robot Body Silhouette */}
                  <svg viewBox="0 0 100 200" className="w-full h-full">
                    {/* Head */}
                    <rect x="40" y="10" width="20" height="22" rx="6" fill="#1D3B34" stroke="#3DDC84" strokeWidth="1.5" />
                    {/* Visor */}
                    <rect x="44" y="18" width="12" height="4" rx="2" fill="#3DDC84" opacity="0.9" />
                    {/* Neck */}
                    <rect x="46" y="32" width="8" height="8" rx="2" fill="#2D524A" />
                    {/* Torso / Chest */}
                    <rect x="30" y="40" width="40" height="45" rx="8" fill="#1D3B34" stroke="#2D524A" strokeWidth="1.5" />
                    <circle cx="50" cy="55" r="5" fill="#3DDC84" opacity="0.6" />
                    {/* Arms */}
                    <rect x="18" y="42" width="10" height="40" rx="5" fill="#1D3B34" />
                    <rect x="72" y="42" width="10" height="40" rx="5" fill="#1D3B34" />
                    {/* Pelvis */}
                    <rect x="34" y="85" width="32" height="18" rx="4" fill="#2D524A" />
                    {/* Legs */}
                    <rect x="34" y="105" width="13" height="70" rx="6" fill="#1D3B34" />
                    <rect x="53" y="105" width="13" height="70" rx="6" fill="#1D3B34" />

                    {/* Interactive Coordinates */}
                    {BODY_PARTS.map((part) => {
                      const isSelected = selectedPart === part.id;
                      return (
                        <g key={part.id} onClick={() => setSelectedPart(part.id)} className="cursor-pointer">
                          <circle
                            cx={part.x}
                            cy={part.y}
                            r={isSelected ? 6 : 4}
                            fill={isSelected ? "#3DDC84" : "#456F65"}
                            stroke="#FFF"
                            strokeWidth={isSelected ? 2 : 1}
                            className="transition-all hover:scale-125"
                          />
                          {isSelected && (
                            <circle cx={part.x} cy={part.y} r={10} fill="none" stroke="#3DDC84" strokeWidth="1" className="animate-ping" />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Telemetry Controls */}
                <div className="space-y-5">
                  {/* Pain Scale */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-ink">Pain Intensity</span>
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
                      <span>0 No pain</span>
                      <span>5 Moderate</span>
                      <span>10 Severe</span>
                    </div>
                  </div>

                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-ink flex items-center gap-1">
                        <Thermometer size={15} className="text-sage" /> Body Temperature
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

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted tracking-wider">
                      Observation Note
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Throbbing sensation, worse in morning"
                      className="mt-1.5 w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-sage focus:bg-white"
                    />
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
                No tedious forms. Tap the mic, speak your observations, and P1 automatically extracts telemetry.
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
                <p className="text-xs font-bold uppercase text-muted tracking-wider mb-2">Live Transcript</p>
                <p className="text-sm font-medium text-ink leading-relaxed">
                  {voiceTranscript || "Press the microphone above and speak your symptoms..."}
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
                Readiness: 78%
              </div>
            </div>

            {/* Timeline Nodes */}
            <div className="mt-6 space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {events.map((ev, idx) => (
                <div key={ev.id} className="relative pl-6 pb-2 border-l-2 border-mint-dark/30 last:border-transparent">
                  <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-sage ring-4 ring-mint" />
                  <div className="rounded-2xl border border-line bg-cream p-3.5 transition hover:bg-white hover:shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted mb-1">
                      <span className="font-semibold text-ink flex items-center gap-1">
                        <MapPin size={12} className="text-sage" /> {ev.part}
                      </span>
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-3 my-1.5">
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                        style={{ backgroundColor: getPainColor(ev.pain) }}
                      >
                        Pain {ev.pain}/10
                      </span>
                      <span className="font-mono text-xs font-bold text-sage-dark bg-mint px-2 py-0.5 rounded">
                        {ev.temp}°C
                      </span>
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
