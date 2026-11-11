// Test suite for /api/inquiries
async function runTests() {
  const baseUrl = "http://localhost:3008/api/inquiries";
  let passed = 0;
  let failed = 0;
  let ipCounter = 10;

  async function testCase(name, payload, expectedStatus, expectedCode, customIp) {
    const ip = customIp || `192.168.1.${++ipCounter}`;
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": ip,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      const statusOk = res.status === expectedStatus;
      const codeOk = expectedCode ? data.code === expectedCode : true;

      if (statusOk && codeOk) {
        console.log(`[PASS] ${name} -> Status: ${res.status}, Code: ${data.code || "N/A"}`);
        passed++;
      } else {
        console.error(`[FAIL] ${name} -> Expected Status: ${expectedStatus}, got ${res.status}. Expected Code: ${expectedCode}, got ${data.code}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${name} -> ${err.message}`);
      failed++;
    }
  }

  console.log("--- STARTING API VALIDATION & SECURITY TESTS ---");

  // 1. Missing scope
  await testCase(
    "Missing usage scope",
    {
      usageScope: "",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "test@example.com", privacyConsent: true },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 2. Missing industry for business
  await testCase(
    "Business scope without industry",
    {
      usageScope: "Geschäftlich",
      industry: "   ",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "test@example.com", privacyConsent: true },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 3. Missing tasks
  await testCase(
    "Empty tasks array",
    {
      usageScope: "Privat",
      tasks: [],
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "test@example.com", privacyConsent: true },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 4. Tasks "Sonstiges" without description
  await testCase(
    "Tasks 'Sonstiges' without text",
    {
      usageScope: "Privat",
      tasks: ["Sonstiges"],
      tasksOther: "",
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "test@example.com", privacyConsent: true },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 5. Invalid email format
  await testCase(
    "Invalid email format",
    {
      usageScope: "Privat",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "not-an-email", privacyConsent: true },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 6. Missing privacy consent
  await testCase(
    "Missing privacy consent",
    {
      usageScope: "Privat",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Test User", email: "test@example.com", privacyConsent: false },
    },
    400,
    "VALIDATION_ERROR"
  );

  // 7. Honeypot check: bot payload with hp_website filled
  await testCase(
    "Honeypot bot defense",
    {
      usageScope: "Privat",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Bot User", email: "bot@spam.com", privacyConsent: true },
      hp_website: "http://spam-link.example.com",
    },
    200,
    undefined
  );

  // 8. Valid inquiry with unconfigured backend -> 503 BACKEND_NOT_CONFIGURED
  await testCase(
    "Valid inquiry when Supabase not yet connected",
    {
      usageScope: "Geschäftlich",
      industry: "IT & Software",
      tasks: ["Kundenanfragen beantworten", "E-Mails bearbeiten"],
      tasksOther: null,
      integrations: ["CRM-System", "WhatsApp"],
      integrationsOther: null,
      contact: {
        name: "Max Mustermann",
        email: "max@firma.de",
        phone: "+49 170 1234567",
        privacyConsent: true,
      },
    },
    503,
    "BACKEND_NOT_CONFIGURED"
  );

  // 9. Dedicated Rate Limiting test: 5 requests ok, 6th request blocked
  const floodIp = "10.0.0.99";
  console.log("\n--- TESTING RATE LIMITING FOR A SINGLE IP ---");
  for (let i = 1; i <= 5; i++) {
    await testCase(
      `Flood request #${i}`,
      {
        usageScope: "Privat",
        tasks: ["E-Mails bearbeiten"],
        integrations: ["E-Mail"],
        contact: { name: "Flood Test", email: "flood@example.com", privacyConsent: true },
        hp_website: "bot",
      },
      200,
      undefined,
      floodIp
    );
  }

  await testCase(
    "Flood request #6 (must be 429 RATE_LIMITED)",
    {
      usageScope: "Privat",
      tasks: ["E-Mails bearbeiten"],
      integrations: ["E-Mail"],
      contact: { name: "Flood Test", email: "flood@example.com", privacyConsent: true },
    },
    429,
    "RATE_LIMITED",
    floodIp
  );

  console.log(`\nAll tests completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
