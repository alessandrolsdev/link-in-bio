const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface TrackEvent {
  event_name: string;
  metadata?: Record<string, any>;
}

/**
 * Envia telemetria para o Supabase via REST (Mais leve que o SDK).
 * Fire-and-forget: Não trava a navegação do usuário.
 */
export const track = async ({ event_name, metadata = {} }: TrackEvent) => {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  try {
    // Usamos fetch com 'keepalive: true' para garantir que o request
    // termine mesmo se o usuário mudar de página imediatamente.
    fetch(`${SUPABASE_URL}/rest/v1/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ApiKey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal", // Não precisamos de resposta, economiza banda
      },
      body: JSON.stringify({
        event_name,
        metadata: {
          ...metadata,
          path: window.location.pathname, // Rastreia onde ocorreu
        },
        // O Supabase preenche 'created_at' automaticamente
      }),
      keepalive: true, 
    });
  } catch (err) {
    // Silently fail em analytics para não incomodar o usuário
    console.warn("Analytics error", err);
  }
};