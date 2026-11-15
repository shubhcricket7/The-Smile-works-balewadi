import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.join(__dirname, 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');

interface AppointmentRecord {
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  branch: string;
  createdAt: string;
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

function isValidEmail(email: string): boolean {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function persistAppointment(record: AppointmentRecord): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: AppointmentRecord[] = [];
  try {
    const raw = await fs.readFile(APPOINTMENTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/appointments/health', (_req, res) => {
    res.json({ status: 'ok', branch: 'Baner, Pune' });
  });

  app.post('/api/appointments', async (req, res) => {
    try {
      const name = cleanString(req.body?.name, 120);
      const phone = cleanString(req.body?.phone, 24);
      const email = cleanString(req.body?.email, 160);
      const treatment = cleanString(req.body?.treatment, 120);
      const preferredDate = cleanString(req.body?.preferredDate, 32);
      const preferredTime = cleanString(req.body?.preferredTime, 48);
      const message = cleanString(req.body?.message, 1000);

      if (name.length < 2) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid patient name.' });
      }
      if (!isValidPhone(phone)) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid 10-digit phone number.' });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid email address or leave it blank.' });
      }
      if (!treatment) {
        return res.status(400).json({ ok: false, error: 'Please select a preferred treatment.' });
      }
      if (!preferredDate) {
        return res.status(400).json({ ok: false, error: 'Please choose a preferred date.' });
      }
      if (!preferredTime) {
        return res.status(400).json({ ok: false, error: 'Please choose a preferred time window.' });
      }

      const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
      const record: AppointmentRecord = {
        referenceId: `TSW-${suffix}`,
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

      await persistAppointment(record);

      return res.status(201).json({
        ok: true,
        referenceId: record.referenceId,
        createdAt: record.createdAt,
        summary: {
          name: record.name,
          treatment: record.treatment,
          preferredDate: record.preferredDate,
          preferredTime: record.preferredTime,
        },
      });
    } catch (error) {
      console.error('Failed to record appointment request:', error);
      return res.status(500).json({
        ok: false,
        error: 'Unable to save the request on the server right now. Please send your request via WhatsApp or call +91 89998 00571.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '7d' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Smile Works server running at http://localhost:${PORT}`);
  });
}

startServer();
