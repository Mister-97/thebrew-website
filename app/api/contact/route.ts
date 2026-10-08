// Forwards contact form entries to a Google Apps Script web app that appends
// them to a Google Sheet. Set CONTACT_SHEET_WEBHOOK_URL to turn it on.
// Without it the route returns 503 so the form shows its "call us" message
// instead of pretending the message was delivered.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success, store nothing.
  if (body.company) return Response.json({ ok: true });

  const clean = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";
  const entry = {
    name: clean(body.name, 100),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    message: clean(body.message, 2000),
    source: clean(body.source, 40) || "contact",
    achievements: clean(body.achievements, 2000),
    linkedin: clean(body.linkedin, 300),
    instagram: clean(body.instagram, 300),
    publications: clean(body.publications, 1000),
    submittedAt: new Date().toISOString(),
  };

  const missingGuestField = entry.source === "podcast-guest" && !entry.achievements;
  if (!entry.name || !entry.message || missingGuestField || !/^\S+@\S+\.\S+$/.test(entry.email)) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const url = process.env.CONTACT_SHEET_WEBHOOK_URL;
  if (!url) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return Response.json({ error: "Delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
