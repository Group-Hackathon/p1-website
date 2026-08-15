import React from "react";
import { FileText, HelpCircle, Printer, Stethoscope, CheckCircle2, QrCode, Sparkles } from "lucide-react";
import { visitSummary, getDateRange, getFormattedToday } from "../data/mockData";

export default function DoctorSummary() {
  function printPage() {
    window.print();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark mb-2">
            <Sparkles size={14} /> Gemini Clinical Synthesis
          </div>
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Physician Briefing Report
          </h1>
          <p className="mt-1 text-muted text-sm sm:text-base">
            Deterministic clinical summary compiled from longitudinal patient telemetry for consultation day.
          </p>
        </div>
        <button onClick={printPage} className="btn-primary print:hidden text-sm px-5 py-3 shadow-sm">
          <Printer size={16}/> Print / Save PDF
        </button>
      </div>

      <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
        {/* Header Clinical Badge */}
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-sage text-white shadow-md">
              <Stethoscope size={30} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-ink">Patient 1 (Alex Rivera)</h2>
                <span className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-mint-dark">Active File #P1-2026</span>
              </div>
              <p className="mt-1 text-sm text-muted">Preparation Period: <strong>{getDateRange()}</strong> · Generated {getFormattedToday()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream p-3 text-sm">
            <QrCode size={36} className="text-sage" />
            <div className="text-xs">
              <span className="font-bold text-ink">Scan for Live EHR Data</span>
              <p className="text-muted">Time-limited encrypted link</p>
            </div>
          </div>
        </div>

        {/* Clinical Synthesis Sections */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-cream p-5">
            <div className="flex items-center gap-2 text-sage-dark font-bold text-sm">
              <FileText size={18} className="text-sage" /> Clinical Synthesis Overview
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{visitSummary.overview}</p>
          </div>

          <div className="rounded-2xl border border-line bg-cream p-5">
            <div className="flex items-center gap-2 text-sage-dark font-bold text-sm">
              <HelpCircle size={18} className="text-sage" /> Telemetry & Duration
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Active telemetry recorded over <strong className="text-ink font-bold">{visitSummary.duration}</strong> with consistent daily adherence (85% completion rate). Zero high-grade safety threshold alerts triggered.
            </p>
          </div>
        </div>

        {/* Key Symptoms & Vitals Curves */}
        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold text-ink">Telemetry & Symptom Trends</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line p-4">
              <span className="text-xs font-bold uppercase text-muted">Max Pain Score</span>
              <p className="text-2xl font-extrabold text-[#D97706] mt-1">5 / 10</p>
              <p className="text-xs text-muted mt-1">Peaked 4 days ago</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <span className="text-xs font-bold uppercase text-muted">Average Temp</span>
              <p className="text-2xl font-extrabold text-sage mt-1">37.2°C</p>
              <p className="text-xs text-muted mt-1">Normal baseline</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <span className="text-xs font-bold uppercase text-muted">Attached Photos</span>
              <p className="text-2xl font-extrabold text-sage-dark mt-1">3 Photos</p>
              <p className="text-xs text-muted mt-1">Ghost overlay calibrated</p>
            </div>
          </div>
        </div>

        {/* Observations list */}
        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold text-ink">Chronological Observations Log</h3>
          <ul className="mt-4 space-y-3">
            {visitSummary.keySymptoms.map((x) => (
              <li key={x} className="flex gap-3 text-sm leading-6 text-ink/90">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage" />
                {x}
              </li>
            ))}
          </ul>
        </div>

        {/* Questions to Discuss */}
        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold text-ink">Clinician Discussion Points</h3>
          <ol className="mt-4 space-y-3">
            {visitSummary.questions.map((x, i) => (
              <li key={x} className="flex gap-3 text-sm leading-6 text-ink/90">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-xs font-bold text-mint-dark">
                  {i + 1}
                </span>
                {x}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 rounded-2xl border border-mint-dark/20 bg-mint/50 p-4 text-xs leading-5 text-mint-dark">
          <strong>Deterministic Clinical Synthesis Note:</strong> Compiled under strictly validated medical protocol parameters using Google Gemini 1.5/2.0 Flash. Designed for briefing facilitation; does not substitute clinical diagnostics.
        </div>
      </div>
    </div>
  );
}