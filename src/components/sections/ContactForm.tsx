"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  arrondissements,
  communesGrandLyon,
  zonesBySecteurGeo,
  SECTEUR_GEO_LABELS,
} from "@/data/zones";

const zonesEstNordIsere = zonesBySecteurGeo("est-nord-isere");
const zonesSudLyonnais = zonesBySecteurGeo("sud-lyonnais");
const zonesSecteurVienne = zonesBySecteurGeo("secteur-vienne");

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulaire de devis. Client Component isolé (le reste de la page /contact
 * reste un Server Component) : seule l'interactivité du formulaire nécessite
 * du JS côté client.
 *
 * RGPD : la case de consentement est obligatoire avant envoi (validée aussi
 * côté serveur dans /api/contact). Le champ `website` est un honeypot
 * anti-spam, masqué visuellement et retiré de l'ordre de tabulation.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      zone: String(data.get("zone") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Impossible d'envoyer votre demande. Merci de nous appeler directement.",
      );
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-card border border-border bg-surface p-6 text-foreground/80" role="status">
        Votre demande a bien été envoyée. Nous vous recontactons rapidement —
        pour une urgence, appelez-nous directement.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot anti-spam : invisible et inaccessible au clavier pour un
          humain. Masqué en place (taille nulle + overflow-hidden), pas de
          décalage hors viewport — un `left: -9999px` peut être ciblé par un
          scrollIntoView (autofill mobile) et provoquer un défilement
          horizontal fantôme de toute la page. */}
      <div
        aria-hidden="true"
        className="absolute size-0 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <label htmlFor="website">Ne pas remplir</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nom *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Téléphone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="zone" className="block text-sm font-medium">
          Zone concernée
        </label>
        <select
          id="zone"
          name="zone"
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
          defaultValue=""
        >
          <option value="">Non précisé</option>
          <optgroup label="Arrondissements de Lyon">
            {arrondissements.map((z) => (
              <option key={z.slug} value={z.nom}>
                {z.nom}
              </option>
            ))}
          </optgroup>
          <optgroup label={SECTEUR_GEO_LABELS["grand-lyon"]}>
            {communesGrandLyon.map((z) => (
              <option key={z.slug} value={z.nom}>
                {z.nom}
              </option>
            ))}
          </optgroup>
          <optgroup label={SECTEUR_GEO_LABELS["est-nord-isere"]}>
            {zonesEstNordIsere.map((z) => (
              <option key={z.slug} value={z.nom}>
                {z.nom}
              </option>
            ))}
          </optgroup>
          <optgroup label={SECTEUR_GEO_LABELS["sud-lyonnais"]}>
            {zonesSudLyonnais.map((z) => (
              <option key={z.slug} value={z.nom}>
                {z.nom}
              </option>
            ))}
          </optgroup>
          <optgroup label={SECTEUR_GEO_LABELS["secteur-vienne"]}>
            {zonesSecteurVienne.map((z) => (
              <option key={z.slug} value={z.nom}>
                {z.nom}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="focus-ring mt-1"
        />
        <label htmlFor="consent" className="text-sm text-foreground/80">
          J&apos;accepte que mes données soient utilisées pour traiter ma
          demande, conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="underline">
            politique de confidentialité
          </Link>
          . *
        </label>
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="focus-ring rounded-pill bg-accent px-6 py-3 font-bold text-accent-foreground shadow-cta transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
