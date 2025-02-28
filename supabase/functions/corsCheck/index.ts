import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

serve(async (req) => {
  // Hole den Origin-Header der Anfrage
  const origin = req.headers.get("origin");

  // Liste der erlaubten Domains
  const allowedOrigins = [
    "https://wiwodigital.netlify.app",
    "https://svtech-backendserver.rf.gd"
  ];

  // Überprüfe, ob der Origin erlaubt ist
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

  // OPTIONS-Anfragen behandeln (CORS Preflight)
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

  // Anfrage weiterleiten oder eigene Logik ausführen
  try {
    const data = await req.json(); // JSON-Daten aus der Anfrage lesen (falls vorhanden)

    // Beispielantwort
    return new Response(JSON.stringify({ message: "Request successful", data }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
});
