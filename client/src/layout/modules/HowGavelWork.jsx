import React from "react";
import { Terminal, Play, CheckCircle, Users, Mic, FileText, Zap } from "lucide-react";
import InterviewDetailDemo from "@/components/common/DummyInterview";
import { Link } from "react-router-dom";

// Default export a React component that renders the "How Gavel Works" page.
// Tailwind classes are used for styling (assumes Tailwind + shadcn setup).
// This component is single-file and production-ready for embedding into a Next.js / Vite app.

export default function HowGavelWorks() {
  const steps = [
    {
      id: 1,
      title: "Admin Setup",
      desc:
        "Create company profiles, add clients and add job positions with question sets. The admin dashboard is the control center.",
      icon: Terminal,
    },
    {
      id: 2,
      title: "Candidate Signup & Verification",
      desc:
        "Candidates sign up with email, verify via OTP and access their dashboard to start the interview.",
      icon: Users,
    },
    {
      id: 3,
      title: "Select Position & Language",
      desc:
        "Candidates choose a job from Legal or Hospitality categories and pick a language (English/Spanish).",
      icon: FileText,
    },
    {
      id: 4,
      title: "AI Voice Interview",
      desc:
        "Click the mic button to start. Gavel's AI conducts a voice interview; press STOP to end. Answers are recorded and uploaded.",
      icon: Mic,
    },
    {
      id: 5,
      title: "AI Analysis & Report",
      desc:
        "Audio is analyzed and a detailed report with recommendations, transcript and skill scores is generated for recruiters.",
      icon: Play,
    },
    {
      id: 6,
      title: "Review & Hire",
      desc:
        "Recruiters review reports, filter candidates and make faster, data-driven hiring decisions.",
      icon: CheckCircle,
    },
  ];

  const features = [
    "AI-powered voice screening",
    "Email OTP verification",
    "Dual industry support: Legal & Hospitality",
    "English & Spanish",
    "Auto-generated interview reports",
    "Scalable for mass hiring",
  ];

  return (
    <div className="p-6 px-8">
      <div className="">
        {/* Hero */}
        <section className="bg-slate-900/40 rounded-2xl shadow-2xl p-4 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full p-3 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs uppercase tracking-wide text-slate-300 font-semibold">How Gavel Works</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                AI Voice Interviews. Faster Hiring. Smarter Decisions.
              </h1>

              <p className="mt-4 text-slate-300 max-w-xl">
                Gavel automates candidate screening with asynchronous, AI-driven voice interviews — built specifically for
                Legal and Hospitality teams. Candidates speak, AI analyzes, and recruiters get rich reports to hire with
                confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/login" className="rounded-full bg-secondary hover:bg-secandory/80 px-5 py-2 text-sm font-semibold shadow">Get Started</Link>
                <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200" ><a href="#interview-detail-demo">See Demo</a> </button>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-gradient-to-b from-[#07102a] to-[#0b1224] p-6 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-400">Interview as</div>
                  <div className="font-semibold">Candidate</div>
                </div>
                <div className="text-xs text-slate-400">Status: Ready</div>
              </div>

              <div className="space-y-3">
                <select className="w-full bg-slate-800 border border-slate-800 rounded-md p-3 text-sm">
                  <option>Choose a position</option>
                  <option>Cook — Hospitality</option>
                  <option>Paralegal — Legal</option>
                </select>

                <select className="w-full bg-slate-800 border border-slate-800 rounded-md p-3 text-sm">
                  <option>English</option>
                  <option>Spanish</option>
                </select>

                <div className="flex items-center justify-center py-4">
                  <button className="rounded-full bg-secondary hover:bg-secandory/80 p-4 shadow-2xl transform active:scale-95">
                    <Mic className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="text-xs text-slate-400">Click the mic to start the AI voice interview. Press STOP to finish.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-slate-900/30 rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">End-to-End Workflow</h2>
            <div className="space-y-4">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="sm:flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-800 ">
                    <div className="flex items-center justify-center gap-2 pb-2" >
                      <span className="p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-secondary ">
                        <Icon className="w-5 h-5 text-white" />
                      </span>
                      <div className="sm:hidden ml-auto text-xs text-slate-400">Step {s.id}</div>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-slate-300 mt-1">{s.desc}</p>
                    </div>
                    <div className="max-sm:hidden ml-auto text-xs text-slate-400">Step {s.id}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="bg-slate-900/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Core Features</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="text-sm text-slate-400 uppercase tracking-wide">Industries</h4>
              <div className="mt-2 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800/40 text-xs">Legal</span>
                <span className="px-3 py-1 rounded-full bg-slate-800/40 text-xs">Hospitality</span>
              </div>
            </div>
          </aside>
        </section>

        <div className="p-8 px-1">
          <InterviewDetailDemo />
        </div>

        {/* CTA */}
        <section className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-secondary text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-xl font-bold">Ready to streamline hiring with voice interviews?</h4>
              <p className="text-sm opacity-90 mt-1">Start a free trial and see how Gavel speeds up your screening process.</p>
            </div>
            <div className="flex gap-3 flex-wrap max-[400px]:justify-center">
              <button className="rounded-full bg-white text-indigo-700 px-5 py-2 font-semibold">Start Free Trial</button>
              <button className="rounded-full border border-white/30 px-5 py-2">Contact Sales</button>
            </div>
          </div>
        </section>

        <footer className="mt-8 text-center text-slate-400 text-sm">© {new Date().getFullYear()} Gavel — AI Interview Platform</footer>
      </div>
    </div>
  );
}
