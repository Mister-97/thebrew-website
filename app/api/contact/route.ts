// Forwards form entries to a Google Apps Script web app that appends them to a
// Google Sheet (and saves any resume to Drive). Set CONTACT_SHEET_WEBHOOK_URL
// to turn it on. Without it the route returns 503 so the form shows its "call
// us" message instead of pretending the message was delivered.

const MAX_RESUME_BYTES = 4 * 1024 * 1024; // Vercel request bodies cap at 4.5 MB.

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Check the first bytes so a renamed file cannot slip through as a resume.
function resumeKind(name: string, bytes: Uint8Array): "pdf" | "doc" | "docx" | null {
  const ext = name.toLowerCase().split(".").pop();
  const head = (n: number) => Array.from(bytes.slice(0, n));
  if (ext === "pdf" && String.fromCharCode(...head(4)) === "%PDF") return "pdf";
  if (ext === "docx" && head(2).join() === "80,75") return "docx"; // "PK"
  if (ext === "doc" && head(4).join() === "208,207,17,224") return "doc"; // OLE2
  return null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  let resume: { name: string; type: string; base64: string } | null = null;

  const ct = request.headers.get("content-type") ?? "";
  try {
    if (ct.includes("multipart/form-data")) {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) if (typeof v === "string") body[k] = v;
      const file = fd.get("resume");
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_RESUME_BYTES) {
          return Response.json({ error: "Resume too large" }, { status: 413 });
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const kind = resumeKind(file.name, bytes);
        if (!kind) return Response.json({ error: "Resume must be a PDF, DOC or DOCX" }, { status: 415 });
        resume = {
          name: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
          type: kind,
          base64: Buffer.from(bytes).toString("base64"),
        };
      }
    } else {
      body = await request.json();
    }
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success, store nothing.
  if (body.company) return Response.json({ ok: true });

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
    role: clean(body.role, 80),
    experience: clean(body.experience, 2000),
    authorized: clean(body.authorized, 10),
    employmentType: clean(body.employmentType, 20),
    availability: clean(body.availability, 1000),
    startDate: clean(body.startDate, 20),
    yearsExperience: clean(body.yearsExperience, 20),
    management: clean(body.management, 2000),
    desiredPay: clean(body.desiredPay, 80),
    referral: clean(body.referral, 80),
    references: clean(body.references, 1000),
    resumeName: resume?.name ?? "",
    submittedAt: new Date().toISOString(),
  };

  const isCareers = entry.source === "careers";
  const isManager = /manager/i.test(entry.role);
  const missing =
    !entry.name ||
    !/^\S+@\S+\.\S+$/.test(entry.email) ||
    (!isCareers && !entry.message) ||
    (entry.source === "podcast-guest" && !entry.achievements) ||
    (isCareers &&
      (!entry.role ||
        !entry.phone ||
        !entry.experience ||
        !entry.authorized ||
        !entry.employmentType ||
        !entry.availability ||
        !entry.startDate ||
        !entry.yearsExperience ||
        (isManager && !entry.management)));
  if (missing) return Response.json({ error: "Missing fields" }, { status: 400 });

  const url = process.env.CONTACT_SHEET_WEBHOOK_URL;
  if (!url) return Response.json({ error: "Not configured" }, { status: 503 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, resume }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return Response.json({ error: "Delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
