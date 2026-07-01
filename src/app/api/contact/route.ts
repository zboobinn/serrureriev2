import { SITE } from "@/data/site";

/**
 * Handler du formulaire de devis. Envoi d'e-mail via l'API HTTP de Resend
 * (appel `fetch` direct, aucune dépendance npm supplémentaire).
 *
 * Sécurité / RGPD :
 * - `consent` (case RGPD) est revalidé côté serveur, pas seulement dans le formulaire.
 * - Honeypot (`website`) : un bot qui remplit ce champ caché reçoit une
 *   confirmation, mais aucun e-mail n'est envoyé (silencieux, pas d'indice pour le bot).
 * - Le HTML injecté dans l'e-mail est échappé (évite l'injection de contenu).
 */

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  zone?: string;
  consent?: boolean;
  /** Honeypot anti-spam : champ caché, doit rester vide côté humain. */
  website?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isPlausibleEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un humain ne remplit jamais ce champ (masqué en CSS).
  if (payload.website) {
    return Response.json({ ok: true });
  }

  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const zone = payload.zone?.trim();

  if (!name || !phone || !message) {
    return Response.json(
      { error: "Le nom, le téléphone et le message sont obligatoires." },
      { status: 400 },
    );
  }

  if (payload.consent !== true) {
    return Response.json(
      {
        error:
          "Merci d'accepter le traitement de vos données pour l'envoi de votre demande.",
      },
      { status: 400 },
    );
  }

  const validEmail = email && isPlausibleEmail(email) ? email : undefined;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || SITE.email;

  if (!apiKey || !fromEmail) {
    console.error(
      "[api/contact] RESEND_API_KEY ou CONTACT_FROM_EMAIL non configuré(e) — voir .env.local.example.",
    );
    return Response.json(
      {
        error:
          "L'envoi de messages n'est pas encore configuré. Merci de nous appeler directement.",
      },
      { status: 503 },
    );
  }

  const html = `
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    ${validEmail ? `<p><strong>Email :</strong> ${escapeHtml(validEmail)}</p>` : ""}
    ${zone ? `<p><strong>Zone :</strong> ${escapeHtml(zone)}</p>` : ""}
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `.trim();

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: validEmail,
      subject: `Nouvelle demande de devis — ${name}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("[api/contact] Échec de l'envoi Resend:", resendResponse.status, details);
    return Response.json(
      { error: "L'envoi a échoué. Merci de nous appeler directement." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
