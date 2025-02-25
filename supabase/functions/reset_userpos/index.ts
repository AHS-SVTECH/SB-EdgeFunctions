import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

console.log("Edge Function gestartet");

const supabaseUrl = Deno.env.get('PROJECT_URL')!;
const supabaseKey = Deno.env.get('SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async () => {
  // Aktualisiere das Feld 'There' in der Tabelle 'UserData' für alle Nutzer mit Rolle 'Schüler'
  const { data, error } = await supabase
    .from('UserData')
    .update({ There: 'Heute nicht gesetzt' })
    .eq('role', 'Schüler');

  if (error) {
    console.error("Fehler beim Aktualisieren des Feldes 'There':", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  console.log("Feld 'There' erfolgreich aktualisiert");
  return new Response(JSON.stringify({ message: 'Update erfolgreich', data }), { status: 200 });
});
