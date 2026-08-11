import React from "react";
import { FileText, HelpCircle, Printer, Stethoscope } from "lucide-react";
import { visitSummary, getDateRange, getFormattedToday } from "../data/mockData";

export default function DoctorSummary() {
  function printPage() {
    window.print();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-ink">Doctor visit summary</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">A quick handoff for your visit.</h1>
          <p className="mt-2 text-muted">Structured from the same demo entries shown in the dashboard.</p>
        </div>
        <button onClick={printPage} className="btn-secondary print:hidden"><Printer size={17}/> Print / save PDF</button>
      </div>

      <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-7 sm:flex-row">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-light text-accent"><Stethoscope /></div>
            <div>
              <h2 className="text-xl font-bold">Alex Rivera</h2>
              <p className="mt-1 text-sm text-muted">Patient · Demo record · Updated {getFormattedToday()}</p>
            </div>
          </div>
          <div className="rounded-xl bg-cream px-4 py-3 text-sm"><span className="text-muted">Period</span><br/><strong>{getDateRange()}</strong></div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Section icon={FileText} title="Overview"><p className="text-sm leading-7 text-muted">{visitSummary.overview}</p></Section>
          <Section icon={HelpCircle} title="Duration"><p className="text-sm leading-7 text-muted">Symptoms have been logged over approximately <strong className="text-ink">{visitSummary.duration}</strong>.</p></Section>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold">Key symptoms</h3>
          <ul className="mt-4 space-y-3">
            {visitSummary.keySymptoms.map((x) => <li key={x} className="flex gap-3 text-sm leading-6"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink"/>{x}</li>)}
          </ul>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold">Recent observations</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {visitSummary.observations.map((x) => <div key={x} className="rounded-2xl bg-cream p-4 text-sm leading-6 text-muted">{x}</div>)}
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <h3 className="text-lg font-bold">Questions to discuss</h3>
          <ol className="mt-4 space-y-3">
            {visitSummary.questions.map((x, i) => <li key={x} className="flex gap-3 text-sm leading-6"><span className="font-bold text-ink">{i + 1}.</span>{x}</li>)}
          </ol>
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
          Demo disclaimer: This page contains simulated data and generated content for a product prototype. It is not a medical record and should not be used for clinical decision-making.
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return <div><div className="flex items-center gap-2"><Icon size={18} className="text-ink"/><h3 className="font-bold">{title}</h3></div><div className="mt-3">{children}</div></div>;
}