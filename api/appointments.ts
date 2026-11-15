import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

interface VercelReq {
  method?: string;
  body?: Record<string, unknown>;
}

interface VercelRes {
  status: (code: number) => VercelRes;
  json: (payload: unknown) => void;
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', branch: 'Baner, Pune' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body ?? {};
    const name = cleanString(body.name, 120);
    const phone = cleanString(body.phone, 24);
    const email = cleanString(body.email, 160);
    const treatment = cleanString(body.treatment, 120);
    const preferredDate = cleanString(body.preferredDate, 32);
    const preferredTime = cleanString(body.preferredTime, 48);
    const message = cleanString(body.message, 1000);

    const digits = phone.replace(/\D/g, '');
    if (name.length < 2 || digits.length < 10 || digits.length > 13 || !treatment || !preferredDate || !preferredTime) {
      return res.status(400).json({ ok: false, error: 'Please complete all required appointment fields.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const referenceId = `TSW-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const record = {
      referenceId,
      name,
      phone,
      email,
      treatment,
      preferredDate,
      preferredTime,
      message,
      branch: 'Baner, Pune (Tulip Tower)',
      createdAt: new Date().toISOString(),
    };

    const tempFile = path.join('/tmp', 'tsw-appointments.json');
    let existing: unknown[] = [];
    try {
      const raw = await fs.readFile(tempFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed;
    } catch {
      existing = [];
    }
    existing.push(record);
    await fs.writeFile(tempFile, JSON.stringify(existing, null, 2), 'utf-8');

    return res.status(201).json({
      ok: true,
      referenceId,
      createdAt: record.createdAt,
      summary: { name, treatment, preferredDate, preferredTime },
    });
  } catch {
    return res.status(500).json({
      ok: false,
      error: 'Serverless booking storage unavailable. Please use WhatsApp to confirm your visit.',
    });
  }
}
