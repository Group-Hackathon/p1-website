import React, { useState } from "react";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import HealthSummary from "./pages/HealthSummary";
import DoctorSummary from "./pages/DoctorSummary";
import Demo from "./pages/Demo";
import Privacy from "./pages/Privacy";

export default function App() {
  const [page, setPage] = useState("landing");

  function openDemo() {
    setPage("demo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setPage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (page === "privacy") return <Privacy goHome={goHome} />;
  if (page === "landing") return <Landing onDemo={openDemo} onPrivacy={() => setPage("privacy")} />;

  return (
    <Layout page={page} setPage={setPage} goHome={goHome}>
      {page === "dashboard" && <Dashboard onGenerate={() => setPage("summary")} />}
      {page === "summary" && <HealthSummary onDoctor={() => setPage("doctor")} />}
      {page === "doctor" && <DoctorSummary />}
      {page === "demo" && <Demo onSummary={() => setPage("summary")} />}
    </Layout>
  );
}
