"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Info,
  Send,
} from "lucide-react";
import type { StructuredInquiryPayload } from "@/app/api/inquiries/route";

type UsageScope = "Privat" | "Geschäftlich" | "Beides" | "";

const PACKAGE_OPTIONS = [
  {
    name: "KI-Assistent (1.000 €)",
    desc: "Persönliche Assistenz, Recherche & Büroorganisation",
  },
  {
    name: "KI-Agent 24/7 (ab 3.000 €)",
    desc: "Autonomer 24/7-Serverbetrieb, Dashboard, Telegram",
  },
  {
    name: "KI-Unternehmenslösungen (ab 10.000 €)",
    desc: "Prozessoptimierung, Multi-Agenten-Systeme & Integration",
  },
  {
    name: "Noch unentschieden / Beratung gewünscht",
    desc: "Alp Arsalan analysiert deinen Bedarf und empfiehlt die passende Option",
  },
] as const;

const USAGE_OPTIONS: Array<"Privat" | "Geschäftlich" | "Beides"> = [
  "Privat",
  "Geschäftlich",
  "Beides",
];

const TASK_OPTIONS = [
  "Kundenanfragen beantworten",
  "E-Mails bearbeiten",
  "Termine organisieren",
  "Dokumente erstellen",
  "Kundendaten verwalten",
  "Recherchen durchführen",
  "Wiederkehrende Aufgaben automatisieren",
  "Sonstiges",
] as const;

const INTEGRATION_OPTIONS = [
  "Gmail / Google Workspace",
  "Outlook / Microsoft 365",
  "CRM-System",
  "Datenbank",
  "Website / Web-App",
  "Shopify / Onlineshop",
  "Google Kalender",
  "Google Drive / Cloud-Speicher",
  "WhatsApp Business",
  "Telegram / Slack",
  "Noch keine",
  "Sonstiges",
] as const;

export default function MultiStepInquiryForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Persistent state across all 4 steps
  const [selectedPackage, setSelectedPackage] = useState<string>(
    "KI-Assistent (1.000 €)"
  );
  const [usageScope, setUsageScope] = useState<UsageScope>("");
  const [industry, setIndustry] = useState("");

  const [tasks, setTasks] = useState<string[]>([]);
  const [tasksOther, setTasksOther] = useState("");

  const [integrations, setIntegrations] = useState<string[]>([]);
  const [integrationsOther, setIntegrationsOther] = useState("");

  // Bedingte Detailfelder für konkrete Integrationen
  const [detailEmail, setDetailEmail] = useState("");
  const [detailCrm, setDetailCrm] = useState("");
  const [detailDatabase, setDetailDatabase] = useState("");
  const [detailWebsite, setDetailWebsite] = useState("");
  const [detailShop, setDetailShop] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Submission & validation states
  const [stepError, setStepError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "saved"; message: string }
    | {
        status: "unconfigured";
        message: string;
        inquiry: StructuredInquiryPayload;
      }
  >({ status: "idle" });

  // Event-Listener für Paketauswahl aus der Pricing-Sektion
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      const pkg = custom.detail || "";
      if (pkg.includes("Assistent")) {
        setSelectedPackage("KI-Assistent (1.000 €)");
      } else if (pkg.includes("24/7")) {
        setSelectedPackage("KI-Agent 24/7 (ab 3.000 €)");
      } else if (pkg.includes("Unternehmenslösungen") || pkg.includes("Enterprise")) {
        setSelectedPackage("KI-Unternehmenslösungen (ab 10.000 €)");
      }
    };
    window.addEventListener("select-package", handler);
    return () => window.removeEventListener("select-package", handler);
  }, []);

  const isBusinessUsage =
    usageScope === "Geschäftlich" || usageScope === "Beides";
  const hasTasksOther = tasks.includes("Sonstiges");
  const hasIntegrationsOther = integrations.includes("Sonstiges");

  // Erkennung für bedingte Detailfelder
  const hasEmail = integrations.some(
    (i) => i.includes("Gmail") || i.includes("Outlook") || i.includes("E-Mail")
  );
  const hasCrm = integrations.includes("CRM-System");
  const hasDatabase = integrations.includes("Datenbank");
  const hasWebsite = integrations.some((i) => i.includes("Website"));
  const hasShop = integrations.some(
    (i) => i.includes("Shopify") || i.includes("Onlineshop")
  );
  const hasAnyConditionalDetail =
    hasEmail || hasCrm || hasDatabase || hasWebsite || hasShop;

  const toggleMultiOption = (
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setStepError("");
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const validateCurrentStep = (): boolean => {
    setStepError("");

    if (step === 1) {
      if (!selectedPackage) {
        setStepError("Bitte wähle ein gewünschtes Leistungspaket aus.");
        return false;
      }
      if (!usageScope) {
        setStepError("Bitte wähle einen Einsatzbereich aus.");
        return false;
      }
      if (isBusinessUsage && !industry.trim()) {
        setStepError("Bitte gib deine Branche ein.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (tasks.length === 0) {
        setStepError("Bitte wähle mindestens eine gewünschte Aufgabe aus.");
        return false;
      }
      if (hasTasksOther && !tasksOther.trim()) {
        setStepError("Bitte beschreibe unter „Sonstiges“ deine Wünsche.");
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (integrations.length === 0) {
        setStepError(
          "Bitte wähle mindestens eine Integration (oder „Noch keine“) aus."
        );
        return false;
      }
      if (hasIntegrationsOther && !integrationsOther.trim()) {
        setStepError(
          "Bitte trage unter „Sonstiges“ deine gewünschten Systeme oder Programme ein."
        );
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!name.trim()) {
        setStepError("Bitte gib deinen Namen ein.");
        return false;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setStepError("Bitte gib eine gültige E-Mail-Adresse ein.");
        return false;
      }
      if (!privacyConsent) {
        setStepError(
          "Bitte bestätige die erforderliche Datenschutzeinwilligung."
        );
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStepError("");
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    setStepError("");
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
      return;
    }
    if (!validateCurrentStep() || !usageScope) return;

    const integrationDetails: Record<string, string> = {};
    if (detailEmail.trim()) integrationDetails.email = detailEmail.trim();
    if (detailCrm.trim()) integrationDetails.crm = detailCrm.trim();
    if (detailDatabase.trim()) integrationDetails.database = detailDatabase.trim();
    if (detailWebsite.trim()) integrationDetails.website = detailWebsite.trim();
    if (detailShop.trim()) integrationDetails.shop = detailShop.trim();
    if (hasIntegrationsOther && integrationsOther.trim()) {
      integrationDetails.other = integrationsOther.trim();
    }

    const payload: StructuredInquiryPayload = {
      selectedPackage,
      usageScope,
      industry: isBusinessUsage ? industry.trim() : null,
      tasks,
      tasksOther: hasTasksOther ? tasksOther.trim() : null,
      integrations,
      integrationsOther: hasIntegrationsOther ? integrationsOther.trim() : null,
      integrationDetails:
        Object.keys(integrationDetails).length > 0 ? integrationDetails : undefined,
      contact: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        privacyConsent,
      },
      submittedAt: new Date().toISOString(),
      hp_website: honeypot || undefined,
    };

    setIsSubmitting(true);
    setStepError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.saved === true) {
        setSubmitState({
          status: "saved",
          message:
            data.message ||
            "Vielen Dank! Du stehst erfolgreich auf der Warteliste von YY-AI-Agent.",
        });
      } else if (data.code === "BACKEND_NOT_CONFIGURED") {
        setSubmitState({
          status: "unconfigured",
          message:
            data.message ||
            "Aktuell ist noch keine Backend-Anbindung aktiv. Deine Angaben wurden zwischengespeichert.",
          inquiry: data.inquiry || payload,
        });
      } else {
        setStepError(
          data.message ||
            "Die Anmeldung zur Warteliste konnte nicht gespeichert werden. Bitte prüfe deine Angaben."
        );
      }
    } catch {
      setStepError(
        "Verbindungsfehler: Deine Anmeldung konnte nicht übermittelt werden."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setSelectedPackage("KI-Assistent (1.000 €)");
    setUsageScope("");
    setIndustry("");
    setTasks([]);
    setTasksOther("");
    setIntegrations([]);
    setIntegrationsOther("");
    setDetailEmail("");
    setDetailCrm("");
    setDetailDatabase("");
    setDetailWebsite("");
    setDetailShop("");
    setName("");
    setEmail("");
    setPhone("");
    setPrivacyConsent(false);
    setHoneypot("");
    setStepError("");
    setSubmitState({ status: "idle" });
  };

  const stepTitles: Record<1 | 2 | 3 | 4, string> = {
    1: "Leistungspaket & Einsatzbereich",
    2: "Gewünschte Aufgaben",
    3: "Integrationen & Schnittstellen",
    4: "Kontaktdaten für die Warteliste",
  };

  return (
    <section
      id="warteliste"
      aria-labelledby="waitlist-heading"
      className="relative px-4 sm:px-6 py-12"
    >
      <span id="anfrage" className="sr-only" aria-hidden="true" />
      <div className="max-w-4xl lg:max-w-5xl mx-auto font-mono">
        <div className="hud-panel rounded-2xl border border-zinc-800/90 p-6 sm:p-9 shadow-[0_16px_56px_rgba(0,0,0,0.8)]">
          {submitState.status === "saved" ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#3ECF8E]/15 border border-[#3ECF8E]/40 text-[#3ECF8E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Du stehst auf der Warteliste
                </h2>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  {submitState.message}
                </p>
                <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                  Wir analysieren deine Anforderungen und melden uns persönlich per E-Mail bei dir, sobald dein Platz im Onboarding bereitsteht.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="metallic-button px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                Weitere Person auf die Warteliste setzen
              </button>
            </div>
          ) : submitState.status === "unconfigured" ? (
            <div className="space-y-6">
              <div className="rounded-xl p-4 sm:p-5 bg-[#06140e]/95 border border-[#3ECF8E]/45 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#3ECF8E] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    Noch keine Backend-Anbindung aktiv – Anfrage nicht übermittelt
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {submitState.message}
                  </p>
                </div>
              </div>

              {/* Structured Inquiry Overview */}
              <div className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-800/80">
                  Zusammengefasste strukturierte Anfrage
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                  <dt className="text-zinc-500">Paket</dt>
                  <dd className="sm:col-span-2 text-zinc-100 font-medium">
                    {submitState.inquiry.selectedPackage || "Standard"}
                  </dd>

                  <dt className="text-zinc-500">Einsatzbereich</dt>
                  <dd className="sm:col-span-2 text-zinc-100 font-medium">
                    {submitState.inquiry.usageScope}
                    {submitState.inquiry.industry
                      ? ` · Branche: ${submitState.inquiry.industry}`
                      : ""}
                  </dd>

                  <dt className="text-zinc-500">Aufgaben</dt>
                  <dd className="sm:col-span-2 text-zinc-100">
                    {submitState.inquiry.tasks.join(", ")}
                    {submitState.inquiry.tasksOther
                      ? ` (${submitState.inquiry.tasksOther})`
                      : ""}
                  </dd>

                  <dt className="text-zinc-500">Integrationen</dt>
                  <dd className="sm:col-span-2 text-zinc-100">
                    {submitState.inquiry.integrations.join(", ")}
                    {submitState.inquiry.integrationsOther
                      ? ` (${submitState.inquiry.integrationsOther})`
                      : ""}
                  </dd>

                  <dt className="text-zinc-500">Kontakt</dt>
                  <dd className="sm:col-span-2 text-zinc-100">
                    {submitState.inquiry.contact.name} ·{" "}
                    {submitState.inquiry.contact.email}
                    {submitState.inquiry.contact.phone
                      ? ` · ${submitState.inquiry.contact.phone}`
                      : ""}
                  </dd>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSubmitState({ status: "idle" })}
                  className="metallic-button px-5 py-3 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück zum Formular</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="hp_website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Top Header & Progress Indicator 1/4 to 4/4 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#3ECF8E] block">
                      Warteliste &amp; Onboarding
                    </span>
                    <h2
                      id="waitlist-heading"
                      className="text-lg sm:text-xl font-bold text-white mt-0.5"
                    >
                      {stepTitles[step]}
                    </h2>
                  </div>

                  <div
                    aria-label={`Schritt ${step} von 4`}
                    className="px-3 py-1 rounded-full bg-zinc-900 border border-[#3ECF8E]/40 font-mono text-xs font-semibold text-zinc-100 shrink-0"
                  >
                    {step}/4
                  </div>
                </div>

                {/* 4-Step Segmented Progress Bar in Supabase-Grün */}
                <div
                  aria-hidden="true"
                  className="grid grid-cols-4 gap-2 pt-1"
                >
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-colors duration-300 ${
                        idx <= step
                          ? "bg-gradient-to-r from-[#3ECF8E] to-[#6ee7b7] shadow-[0_0_8px_rgba(62,207,142,0.35)]"
                          : "bg-zinc-800/90"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Validation Error Notice */}
              {stepError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-950/45 border border-red-800/70 text-red-200 text-xs sm:text-sm flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}

              {/* STEP 1: Paketauswahl & Einsatzbereich */}
              {step === 1 && (
                <div className="space-y-5">
                  {/* 1. Paketauswahl */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Gewünschtes Leistungspaket <span className="text-[#3ECF8E]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PACKAGE_OPTIONS.map((pkg) => {
                        const active = selectedPackage === pkg.name;
                        return (
                          <button
                            key={pkg.name}
                            type="button"
                            onClick={() => {
                              setSelectedPackage(pkg.name);
                              setStepError("");
                            }}
                            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                              active
                                ? "bg-[#3ECF8E]/15 border-[#3ECF8E] text-white shadow-[0_0_18px_rgba(62,207,142,0.18)]"
                                : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs sm:text-sm font-bold">
                                {pkg.name}
                              </span>
                              {active && (
                                <Check className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                              )}
                            </div>
                            <span className="text-[11px] text-zinc-400 mt-1 leading-snug">
                              {pkg.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Einsatzbereich */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/70">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Einsatzbereich <span className="text-[#3ECF8E]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {USAGE_OPTIONS.map((option) => {
                        const active = usageScope === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setUsageScope(option);
                              setStepError("");
                            }}
                            aria-pressed={active}
                            className={`min-h-[50px] px-4 py-3 rounded-xl border text-left sm:text-center font-medium text-xs sm:text-sm transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                              active
                                ? "bg-[#3ECF8E]/15 border-[#3ECF8E] text-white shadow-[0_0_18px_rgba(62,207,142,0.18)]"
                                : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            <span>{option}</span>
                            {active && (
                              <Check className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isBusinessUsage && (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor="inquiry-industry"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Branche <span className="text-[#3ECF8E]">*</span>
                      </label>
                      <input
                        id="inquiry-industry"
                        type="text"
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value);
                          setStepError("");
                        }}
                        placeholder="z. B. Kfz-Gutachter, Kanzlei, Praxis, E-Commerce, Handwerk ..."
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Aufgaben */}
              {step === 2 && (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Welche Aufgaben soll dein KI-Agent eigenständig übernehmen? (Mehrfachauswahl möglich)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TASK_OPTIONS.map((task) => {
                      const active = tasks.includes(task);
                      return (
                        <button
                          key={task}
                          type="button"
                          onClick={() => toggleMultiOption(tasks, setTasks, task)}
                          aria-pressed={active}
                          className={`p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            active
                              ? "bg-[#3ECF8E]/15 border-[#3ECF8E] text-white shadow-[0_0_18px_rgba(62,207,142,0.18)]"
                              : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span>{task}</span>
                          {active && (
                            <Check className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {hasTasksOther && (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor="inquiry-tasks-other"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Sonstige Aufgaben beschreiben <span className="text-[#3ECF8E]">*</span>
                      </label>
                      <textarea
                        id="inquiry-tasks-other"
                        rows={3}
                        value={tasksOther}
                        onChange={(e) => {
                          setTasksOther(e.target.value);
                          setStepError("");
                        }}
                        placeholder="Beschreibe kurz die individuellen Aufgaben oder Workflows ..."
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Integrationen */}
              {step === 3 && (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Mit welchen Programmen und Systemen soll dein KI-Agent vernetzt werden?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {INTEGRATION_OPTIONS.map((option) => {
                      const active = integrations.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            toggleMultiOption(integrations, setIntegrations, option)
                          }
                          aria-pressed={active}
                          className={`p-3 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            active
                              ? "bg-[#3ECF8E]/15 border-[#3ECF8E] text-white shadow-[0_0_18px_rgba(62,207,142,0.18)]"
                              : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span className="truncate">{option}</span>
                          {active && (
                            <Check className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Bedingte Detailfelder */}
                  {hasAnyConditionalDetail && (
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3 pt-3">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#3ECF8E] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
                        <span>Spezifische Integrationsdetails (optional)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {hasEmail && (
                          <div>
                            <label className="text-[11px] text-zinc-300 block mb-1">
                              E-Mail-System:
                            </label>
                            <input
                              type="text"
                              value={detailEmail}
                              onChange={(e) => setDetailEmail(e.target.value)}
                              placeholder="z. B. Google Workspace, Microsoft 365 ..."
                              className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-lg p-2.5 text-zinc-100 text-xs font-mono focus:outline-none"
                            />
                          </div>
                        )}

                        {hasCrm && (
                          <div>
                            <label className="text-[11px] text-zinc-300 block mb-1">
                              CRM-System:
                            </label>
                            <input
                              type="text"
                              value={detailCrm}
                              onChange={(e) => setDetailCrm(e.target.value)}
                              placeholder="z. B. HubSpot, Salesforce, Pipedrive ..."
                              className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-lg p-2.5 text-zinc-100 text-xs font-mono focus:outline-none"
                            />
                          </div>
                        )}

                        {hasDatabase && (
                          <div>
                            <label className="text-[11px] text-zinc-300 block mb-1">
                              Datenbank:
                            </label>
                            <input
                              type="text"
                              value={detailDatabase}
                              onChange={(e) => setDetailDatabase(e.target.value)}
                              placeholder="z. B. PostgreSQL, MySQL, Supabase ..."
                              className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-lg p-2.5 text-zinc-100 text-xs font-mono focus:outline-none"
                            />
                          </div>
                        )}

                        {hasWebsite && (
                          <div>
                            <label className="text-[11px] text-zinc-300 block mb-1">
                              Website / Web-App:
                            </label>
                            <input
                              type="text"
                              value={detailWebsite}
                              onChange={(e) => setDetailWebsite(e.target.value)}
                              placeholder="z. B. WordPress, Next.js, Custom Web-App ..."
                              className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-lg p-2.5 text-zinc-100 text-xs font-mono focus:outline-none"
                            />
                          </div>
                        )}

                        {hasShop && (
                          <div>
                            <label className="text-[11px] text-zinc-300 block mb-1">
                              Shop-System:
                            </label>
                            <input
                              type="text"
                              value={detailShop}
                              onChange={(e) => setDetailShop(e.target.value)}
                              placeholder="z. B. Shopify, WooCommerce, Shopware ..."
                              className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-lg p-2.5 text-zinc-100 text-xs font-mono focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {hasIntegrationsOther && (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor="inquiry-integrations-other"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Sonstige Schnittstellen eintragen <span className="text-[#3ECF8E]">*</span>
                      </label>
                      <input
                        id="inquiry-integrations-other"
                        type="text"
                        value={integrationsOther}
                        onChange={(e) => {
                          setIntegrationsOther(e.target.value);
                          setStepError("");
                        }}
                        placeholder="z. B. DATEV, Lexware, Asana, Notion ..."
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Kontaktdaten */}
              {step === 4 && (
                <div className="space-y-5">
                  {/* Übersicht der bisherigen Angaben */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs font-mono space-y-1.5 text-zinc-300">
                    <div className="text-[10px] text-[#3ECF8E] uppercase tracking-wider mb-1">
                      Übersicht deiner Auswahl
                    </div>
                    <div>&bull; Paket: <span className="text-white font-semibold">{selectedPackage}</span></div>
                    <div>&bull; Einsatzbereich: <span className="text-white font-semibold">{usageScope} {industry ? `(${industry})` : ""}</span></div>
                    <div>&bull; Aufgaben: <span className="text-zinc-400">{tasks.join(", ")}</span></div>
                    <div>&bull; Integrationen: <span className="text-zinc-400">{integrations.join(", ")}</span></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Vor- und Nachname <span className="text-[#3ECF8E]">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setStepError("");
                        }}
                        placeholder="Max Mustermann"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        E-Mail-Adresse <span className="text-[#3ECF8E]">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setStepError("");
                        }}
                        placeholder="max@unternehmen.de"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                    >
                      Telefonnummer (optional für direkten Rückruf)
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setStepError("");
                      }}
                      placeholder="+49 170 1234567"
                      className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => {
                          setPrivacyConsent(e.target.checked);
                          setStepError("");
                        }}
                        className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#3ECF8E] focus:ring-[#3ECF8E] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-xs text-zinc-400 leading-relaxed font-mono">
                        Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage und Kontaktaufnahme gespeichert und verarbeitet werden. Weitere Hinweise findest du in unserer{" "}
                        <Link
                          href="/datenschutz"
                          className="text-[#3ECF8E] hover:underline"
                        >
                          Datenschutzerklärung
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Bar */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-800/80">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="metallic-button px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono text-zinc-500">
                    Schritt 1 von 4
                  </span>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="supabase-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#060709] inline-flex items-center gap-1.5 cursor-pointer ml-auto font-mono"
                  >
                    <span>Weiter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="supabase-button px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#060709] inline-flex items-center gap-2 cursor-pointer ml-auto disabled:opacity-40 disabled:pointer-events-none font-mono"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Wird eingetragen …" : "Unverbindlich eintragen"}</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
