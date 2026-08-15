import React, { useState } from "react";
import {
  Activity,
  Mic,
  MicOff,
  Sparkles,
  MoveRight,
  Camera,
  MapPin,
  Smartphone,
  Download,
  ShieldCheck,
  Zap,
  QrCode,
  ExternalLink
} from "lucide-react";
import CheckInMannequin3D from "../components/CheckInMannequin3D";

export default function Demo({ onSummary }) {
  const [activeMode, setActiveMode] = useState("bodymap"); // 'bodymap' | 'voice'
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Living Timeline matching APK
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

  function handle3DCommit({ pain, temp, zones, photosCount }) {
    const regionText = zones.length > 0 ? zones.join(", ") : "General";
    const newEntry = {
      id: Date.now(),
      time: "Just now",
      part: regionText,
      pain: Number(pain),
      temp: Number(temp.toFixed(1)),
      note: `3D Check-in recorded for ${regionText}. Pain: ${pain}/10, Temp: ${temp.toFixed(1)}°C.`,
      type: "3D Mannequin HUD",
      photo: photosCount > 0
    };
    setEvents([newEntry, ...events]);
  }

  function handleVoiceCommit() {
    if (!voiceTranscript) return;
    const newEntry = {
      id: Date.now(),
      time: "Just now",
      part: "Temporal zone",
      pain: 4,
      temp: 37.5,
      note: voiceTranscript,
      type: "Voice Logger",
      photo: false
    };
    setEvents([newEntry, ...events]);
    setVoiceTranscript("");
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark mb-2">
            <Sparkles size={14} /> Jetpack Compose 3D Spatial Simulator
          </div>
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Pre-Appointment 1 Interactive Demo
          </h1>
          <p className="mt-1 text-muted text-sm sm:text-base">
            Faithful port of the Android Jetpack Compose 3D Robot Mannequin, HUD instruments, and Speech Logger.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.preappointment1.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-3 shadow-md flex items-center gap-2"
          >
            <Smartphone size={16} /> Get on Google Play <ExternalLink size={14} />
          </a>
          <button
            onClick={onSummary}
            className="btn-secondary shrink-0 text-sm px-4 py-3 shadow-sm flex items-center gap-1.5"
          >
            Doctor Briefing <MoveRight size={15} />
          </button>
        </div>
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
              <Activity size={16} /> 3D Robot Mannequin Spatial HUD
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
            <div>
              <CheckInMannequin3D onCommit={handle3DCommit} />
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
                  onClick={handleVoiceCommit}
                  className="btn-primary mt-6 w-full py-3 text-sm font-bold"
                >
                  Commit Voice Note to Timeline
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Living Patient Timeline & App Download Box */}
        <div className="space-y-6">
          {/* HIGH-CONVERTING NATIVE APP DOWNLOAD CTA CARD */}
          <div className="rounded-3xl border-2 border-sage/40 bg-gradient-to-br from-sage-dark to-[#0E1C19] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-mint/10 blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mint mb-2">
              <Smartphone size={15} /> Official Android App (v1.0.14)
            </div>

            <h3 className="text-xl font-black tracking-tight text-white">
              Get the Full App on Google Play
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Take complete control of your medical preparation with real-time on-device Room DB, continuous voice logging, and offline security.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-mint shrink-0" />
                <span><strong>100% Offline & Private</strong> (On-device database)</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap size={14} className="text-mint shrink-0" />
                <span><strong>Zero-latency 3D Engine</strong> with Ghost Photo Overlay</span>
              </li>
              <li className="flex items-center gap-2">
                <QrCode size={14} className="text-mint shrink-0" />
                <span><strong>Instant Physician PDF</strong> with Encrypted QR Sync</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="https://play.google.com/store/apps/details?id=com.preappointment1.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-mint py-3 text-xs font-black uppercase tracking-wider text-mint-dark shadow-lg hover:bg-white active:scale-[0.99] transition"
              >
                <Smartphone size={16} /> Download on Google Play
              </a>

              <a
                href="https://github.com/Group-Hackathon/p1-design-sandbox/releases/tag/v1.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 py-2.5 text-xs font-bold text-white/90 hover:bg-white/10 transition"
              >
                <Download size={14} /> Direct APK Download (.apk)
              </a>
            </div>
          </div>

          {/* Living Patient Timeline */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
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
            <div className="mt-6 space-y-4 max-h-[360px] overflow-y-auto pr-1">
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
