import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

serve(async (req) => {
  // Extrahiere den Origin-Header aus der Anfrage
  const origin = req.headers.get("origin");

  // Liste erlaubter Ursprünge
  const allowedOrigins = [
    "https://wiwodigital.netlify.app",
    "https://svtech-backendserver.rf.gd",
  ];

  // Wenn der Origin fehlt oder nicht erlaubt ist, blockiere die Anfrage
  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response("Unauthorized origin", {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": origin || "",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  // OPTIONS-Anfragen (CORS Preflight) behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  // Anfrage weiterverarbeiten
  try {
    // Body der Anfrage (falls vorhanden) einlesen
    const body = await req.json();

    // Beispielantwort bei erlaubtem Origin
    return new Response(JSON.stringify({ message: "Request successful", data: body }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (_error) {
    // Fehler behandeln, falls die JSON-Verarbeitung fehlschlägt
    return new Response("Invalid JSON", { status: 400 });
  }
});
