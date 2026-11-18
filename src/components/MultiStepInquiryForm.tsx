"use client";

import { useState } from "react";
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
    1: "Einsatzbereich",
    2: "Gewünschte Aufgaben",
    3: "Integrationen & Schnittstellen",
    4: "Kontaktdaten für die Warteliste",
  };

  return (
    <section
      id="warteliste"
      aria-labelledby="waitlist-heading"
      className="relative px-4 sm:px-6 py-10"
    >
      {/* Abwärtskompatibler Anker für bestehende Links */}
      <span id="anfrage" className="sr-only" aria-hidden="true" />
      <div className="max-w-3xl mx-auto">
        <div className="hud-panel rounded-2xl border border-zinc-800/90 p-5 sm:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.75)]">
          {submitState.status === "saved" ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
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
              <div className="rounded-xl p-4 sm:p-5 bg-[#190e08]/95 border border-[#ff6b2b]/45 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#ff8c42] shrink-0 mt-0.5" />
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
                  <span>Angaben bearbeiten</span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Formular zurücksetzen
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Unsichtbares Honeypot-Feld zur Spam- und Bot-Abwehr */}
              <div style={{ display: "none" }} aria-hidden="true">
                <label htmlFor="inquiry-hp-field">Website</label>
                <input
                  id="inquiry-hp-field"
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
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8c42] block">
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
                    className="px-3 py-1 rounded-full bg-zinc-900 border border-[#ff8c42]/40 font-mono text-xs font-semibold text-zinc-100 shrink-0"
                  >
                    {step}/4
                  </div>
                </div>

                {/* 4-Step Segmented Progress Bar */}
                <div
                  aria-hidden="true"
                  className="grid grid-cols-4 gap-2 pt-1"
                >
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-colors duration-300 ${
                        idx <= step
                          ? "bg-gradient-to-r from-[#ff6b2b] to-[#ff9457] shadow-[0_0_8px_rgba(255,107,43,0.35)]"
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

              {/* STEP 1: Einsatzbereich */}
              {step === 1 && (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Wofür möchtest du deinen KI-Agenten einsetzen?
                  </p>

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
                          className={`min-h-[54px] px-4 py-3.5 rounded-xl border text-left sm:text-center font-medium text-sm transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                            active
                              ? "bg-[#ff6b2b]/15 border-[#ff6b2b] text-white shadow-[0_0_18px_rgba(255,107,43,0.18)]"
                              : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span>{option}</span>
                          {active && (
                            <Check className="w-4 h-4 text-[#ff8c42] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isBusinessUsage && (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor="inquiry-industry"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Branche <span className="text-[#ff6b2b]">*</span>
                      </label>
                      <input
                        id="inquiry-industry"
                        type="text"
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value);
                          setStepError("");
                        }}
                        placeholder="z. B. Immobilien, Handwerk, E-Commerce, Kanzlei, Agentur …"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Gewünschte Aufgaben */}
              {step === 2 && (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Welche Aufgaben soll dein KI-Agent übernehmen? (Mehrfachauswahl möglich)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TASK_OPTIONS.map((option) => {
                      const active = tasks.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            toggleMultiOption(tasks, setTasks, option)
                          }
                          aria-pressed={active}
                          className={`min-h-[50px] px-4 py-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            active
                              ? "bg-[#ff6b2b]/15 border-[#ff6b2b] text-white shadow-[0_0_16px_rgba(255,107,43,0.14)]"
                              : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span className="leading-snug">{option}</span>
                          <span
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? "bg-[#ff6b2b] border-[#ff6b2b] text-white"
                                : "border-zinc-700 bg-zinc-950/60"
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5" />}
                          </span>
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
                        Weitere gewünschte Aufgaben{" "}
                        <span className="text-[#ff6b2b]">*</span>
                      </label>
                      <textarea
                        id="inquiry-tasks-other"
                        rows={3}
                        value={tasksOther}
                        onChange={(e) => {
                          setTasksOther(e.target.value);
                          setStepError("");
                        }}
                        placeholder="Beschreibe hier frei deine gewünschten Aufgaben oder Abläufe …"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl p-3.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60 resize-y"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Integrationen */}
              {step === 3 && (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Welche bestehenden Programme oder Kanäle sollen angebunden werden? (Mehrfachauswahl möglich)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {INTEGRATION_OPTIONS.map((option) => {
                      const active = integrations.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            toggleMultiOption(
                              integrations,
                              setIntegrations,
                              option
                            )
                          }
                          aria-pressed={active}
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                            active
                              ? "bg-[#ff6b2b]/15 border-[#ff6b2b] text-white shadow-[0_0_16px_rgba(255,107,43,0.14)]"
                              : "bg-zinc-900/75 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span className="leading-snug">{option}</span>
                          <span
                            className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? "bg-[#ff6b2b] border-[#ff6b2b] text-white"
                                : "border-zinc-700 bg-zinc-950/60"
                            }`}
                          >
                            {active && <Check className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bedingte Eingabefelder für ausgewählte Schnittstellen */}
                  {hasAnyConditionalDetail && (
                    <div className="rounded-xl p-4 sm:p-5 bg-zinc-950/70 border border-zinc-800 space-y-3.5 pt-3.5">
                      <div className="pb-1 border-b border-zinc-800/80">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff8c42] block">
                          Konkrete Angaben zu deinen Systemen (optional)
                        </span>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Hilft uns, die technische Machbarkeit vorab exakt abzustimmen.
                        </p>
                      </div>

                      {hasEmail && (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="detail-email"
                            className="block text-xs font-mono text-zinc-300"
                          >
                            E-Mail-Postfach / Provider
                          </label>
                          <input
                            id="detail-email"
                            type="text"
                            value={detailEmail}
                            onChange={(e) => setDetailEmail(e.target.value)}
                            placeholder="z. B. Google Workspace / Gmail, Microsoft 365, eigener IMAP/Exchange …"
                            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff8c42]/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff8c42]/60"
                          />
                        </div>
                      )}

                      {hasCrm && (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="detail-crm"
                            className="block text-xs font-mono text-zinc-300"
                          >
                            Welches CRM-System nutzt du?
                          </label>
                          <input
                            id="detail-crm"
                            type="text"
                            value={detailCrm}
                            onChange={(e) => setDetailCrm(e.target.value)}
                            placeholder="z. B. HubSpot, Salesforce, Pipedrive, Zoho, OnOffice, Eigenentwicklung …"
                            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff8c42]/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff8c42]/60"
                          />
                        </div>
                      )}

                      {hasDatabase && (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="detail-database"
                            className="block text-xs font-mono text-zinc-300"
                          >
                            Welche Datenbank oder Datenquelle?
                          </label>
                          <input
                            id="detail-database"
                            type="text"
                            value={detailDatabase}
                            onChange={(e) => setDetailDatabase(e.target.value)}
                            placeholder="z. B. PostgreSQL, Supabase, MySQL, Notion, Airtable, REST-API …"
                            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff8c42]/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff8c42]/60"
                          />
                        </div>
                      )}

                      {hasWebsite && (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="detail-website"
                            className="block text-xs font-mono text-zinc-300"
                          >
                            Website-URL &amp; CMS / System
                          </label>
                          <input
                            id="detail-website"
                            type="text"
                            value={detailWebsite}
                            onChange={(e) => setDetailWebsite(e.target.value)}
                            placeholder="z. B. https://deine-domain.de (WordPress, Webflow, Next.js, Custom) …"
                            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff8c42]/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff8c42]/60"
                          />
                        </div>
                      )}

                      {hasShop && (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="detail-shop"
                            className="block text-xs font-mono text-zinc-300"
                          >
                            Shop-System &amp; Plattform
                          </label>
                          <input
                            id="detail-shop"
                            type="text"
                            value={detailShop}
                            onChange={(e) => setDetailShop(e.target.value)}
                            placeholder="z. B. Shopify, WooCommerce, Shopware, Magento …"
                            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff8c42]/70 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff8c42]/60"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {hasIntegrationsOther && (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor="inquiry-integrations-other"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Weitere Systeme, Programme oder Integrationswünsche{" "}
                        <span className="text-[#ff6b2b]">*</span>
                      </label>
                      <textarea
                        id="inquiry-integrations-other"
                        rows={3}
                        value={integrationsOther}
                        onChange={(e) => {
                          setIntegrationsOther(e.target.value);
                          setStepError("");
                        }}
                        placeholder="Trage hier beliebige Programme, Schnittstellen oder Tools ein …"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl p-3.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60 resize-y"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Kontaktdaten */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Wie dürfen wir dich für die Warteliste kontaktieren?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        Name <span className="text-[#ff6b2b]">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setStepError("");
                        }}
                        placeholder="Vor- und Nachname"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                      >
                        E-Mail-Adresse <span className="text-[#ff6b2b]">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setStepError("");
                        }}
                        placeholder="name@beispiel.de"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                    >
                      Telefonnummer{" "}
                      <span className="text-zinc-500">(optional)</span>
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+49 …"
                      className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/70 rounded-xl px-4 py-3 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => {
                          setPrivacyConsent(e.target.checked);
                          setStepError("");
                        }}
                        className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 accent-[#ff6b2b] cursor-pointer shrink-0"
                      />
                      <span className="text-xs text-zinc-400 leading-relaxed">
                        Ich willige ein, dass meine Angaben aus diesem Formular zur
                        Bearbeitung meiner Anfrage verarbeitet werden. Weitere
                        Informationen in der{" "}
                        <Link
                          href="/datenschutz"
                          className="text-zinc-200 hover:text-[#ff8c42] underline underline-offset-2"
                        >
                          Datenschutzerklärung
                        </Link>
                        . <span className="text-[#ff6b2b]">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Bar: Zurück & Weiter / Absenden */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className="metallic-button min-h-[46px] px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white inline-flex items-center justify-center gap-2 disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück</span>
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ember-button min-h-[46px] px-6 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Weiter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ember-button min-h-[46px] px-6 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting ? "Wird eingetragen …" : "Auf die Warteliste setzen"}
                    </span>
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
