// Test suite for /api/chat
async function runChatTests() {
  const baseUrl = "http://localhost:3008/api/chat";
  let passed = 0;
  let failed = 0;
  let ipCounter = 20;

  async function testCase(name, payload, expectedStatus, customIp) {
    const ip = customIp || `192.168.2.${++ipCounter}`;
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

      if (statusOk) {
        console.log(`[PASS] ${name} -> Status: ${res.status}`);
        passed++;
      } else {
        console.error(`[FAIL] ${name} -> Expected Status: ${expectedStatus}, got ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${name} -> ${err.message}`);
      failed++;
    }
  }

  console.log("--- STARTING CHAT API TESTS ---");

  // 1. Empty message
  await testCase("Empty message check", { message: "" }, 400);

  // 2. Normal question without API key -> Returns 200 with fallback text
  await testCase("Normal question without key (fallback text)", { message: "Welche Pakete bietet ihr an?" }, 200);

  // 3. Rate limiting test
  const floodIp = "10.0.0.88";
  console.log("\n--- TESTING CHAT RATE LIMITING ---");
  for (let i = 1; i <= 8; i++) {
    await testCase(`Chat flood request #${i}`, { message: `Frage ${i}` }, 200, floodIp);
  }

  // 9th request must be rate limited (429)
  await testCase("Chat flood request #9 (must be 429 RATE_LIMITED)", { message: "Zu viel" }, 429, floodIp);

  console.log(`\nChat tests completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runChatTests();
