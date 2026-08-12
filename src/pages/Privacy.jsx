import React from "react";
import Logo from "../components/Logo";

export default function Privacy({ goHome }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-5">
          <button onClick={goHome} className="hover:opacity-80 transition">
            <Logo size="sm" />
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 sm:px-5 py-8 sm:py-12">
        <div className="mb-10 border-b border-line pb-6">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-ink">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted">Effective Date: June 21, 2026</p>
        </div>

        <section className="space-y-4 text-muted leading-7">
          <p>
            Welcome to <strong className="text-ink">Pre-Appointment 1 (P1)</strong>. This Privacy Policy outlines how your information is collected, used, and protected when you use our mobile application and related services.
          </p>
          <div className="rounded-2xl bg-accent-light border border-accent/20 p-4 sm:p-5 my-6 text-sm sm:text-base leading-7">
            <strong className="text-ink">Core Principle:</strong> Medical data is highly sensitive. While our ultimate vision is a fully decentralized, self-hosted model where you own your server, the current MVP version of Pre-Appointment 1 stores your data securely on our centralized cloud servers to facilitate testing and development.
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-ink">1. Information We Collect</h2>
          <p className="mt-3 text-muted leading-7">To assist in preparing your medical appointments, the Pre-Appointment 1 agent may collect the following data locally on your device:</p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li><strong className="text-ink">Self-Reported Check-ins:</strong> Symptoms, pain levels, mood, and sleep patterns.</li>
            <li><strong className="text-ink">Media:</strong> Photos of evolving conditions (e.g., wounds, skin, swelling, posture) taken within the app.</li>
            <li><strong className="text-ink">Health Metrics:</strong> Data pulled from your device and connected sources (e.g., steps, heart rate, sleep data, temperature entries), provided you grant the necessary permissions.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-ink">2. How Data is Stored (Current MVP Version)</h2>
          <p className="mt-3 text-muted leading-7">While the long-term architecture of Pre-Appointment 1 relies on a self-deployed backend model, <strong className="text-ink">the current version operates using a centralized cloud backend</strong> (hosted securely on Google Cloud Platform).</p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>Your data is synced to our central API server to allow the application to function during this beta phase.</li>
            <li>We treat this data with the utmost confidentiality, but it is currently stored on our infrastructure, not yours.</li>
            <li>Future versions will introduce the one-click self-deployment feature, allowing you to migrate to a fully private instance.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-ink">3. Cloud Analysis Agents</h2>
          <p className="mt-3 text-muted leading-7">To generate the final briefing for your physician, Pre-Appointment 1 offers specialized cloud analysis agents (powered by AI models, such as Gemini).</p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>These agents securely access the data collected by the app <strong className="text-ink">only with your explicit consent</strong>.</li>
            <li>Access is restricted exclusively to the follow-up period you authorize.</li>
            <li>The agents process the data solely to produce daily micro-reports and the final physician briefing.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-ink">4. Data Deletion and Control</h2>
          <p className="mt-3 text-muted leading-7">You maintain control over your medical data, even while it is hosted on our infrastructure.</p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>You can request the deletion of your data at any time by contacting us.</li>
            <li>Upon request, your records will be completely and permanently wiped from our central database.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-ink">5. Changes to This Privacy Policy</h2>
          <p className="mt-3 text-muted leading-7">We may update our Privacy Policy from time to time. Any changes will be reflected on this page with a revised "Effective Date".</p>
        </section>

        <section className="mt-8 mb-12">
          <h2 className="text-xl font-bold text-ink">6. Contact Us</h2>
          <p className="mt-3 text-muted leading-7">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:contact@livingpatientmemory.com" className="text-accent hover:underline">contact@livingpatientmemory.com</a>.</p>
        </section>
      </main>
    </div>
  );
}
