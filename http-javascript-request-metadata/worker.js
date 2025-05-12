export default {
  async fetch(request, env, ctx) {
    // Parse User-Agent
    const userAgent = request.headers.get("User-Agent") || "Unknown";
    const browser = parseBrowser(userAgent);
    const os = parseOS(userAgent);
    const device = parseDevice(userAgent);

    // Get language preferences
    const languages = request.headers.get("Accept-Language") || "Unknown";

    // Create response object
    const responseData = {
      device: {
        userAgent: userAgent,
        browser: browser,
        os: os,
        type: device,
      },
      languages: parseLanguages(languages),
    };

    return new Response(JSON.stringify(responseData, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

function parseBrowser(userAgent) {
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) return "Internet Explorer";
  return "Unknown";
}

function parseOS(userAgent) {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "Unknown";
}

function parseDevice(userAgent) {
  if (userAgent.includes("Mobile")) return "Mobile";
  if (userAgent.includes("Tablet")) return "Tablet";
  return "Desktop";
}

function parseLanguages(languages) {
  if (languages === "Unknown") return ["Unknown"];
  return languages.split(",").map((lang) => lang.split(";")[0].trim());
}
