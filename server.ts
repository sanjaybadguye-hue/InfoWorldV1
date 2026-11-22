import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
  submittedAt: string;
}

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

const submissions: ContactSubmission[] = [];
const subscribers: NewsletterSubscriber[] = [];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,20}$/;

function createReferenceId(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `IWT-2026-${randomDigits}`;
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      company: 'InfoWorld Technologies (infoworldtech.co.in)',
      location: 'Ganji Peth, Nagpur 440018, India',
      year: 2026,
    });
  });

  app.post('/api/contact', (req, res) => {
    const body = req.body ?? {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const inquiryType = typeof body.inquiryType === 'string' ? body.inquiryType.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2) {
      res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (phone.length > 0 && !PHONE_REGEX.test(phone)) {
      res.status(400).json({ error: 'Please enter a valid phone number or leave it blank.' });
      return;
    }

    if (!inquiryType) {
      res.status(400).json({ error: 'Please select an inquiry type.' });
      return;
    }

    if (message.length < 15) {
      res.status(400).json({ error: 'Please provide brief details about your inquiry (at least 15 characters).' });
      return;
    }

    const record: ContactSubmission = {
      id: createReferenceId(),
      name,
      email,
      phone,
      company,
      inquiryType,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    };

    submissions.push(record);

    res.status(201).json({
      success: true,
      referenceId: record.id,
      submittedAt: record.submittedAt,
      message: 'Inquiry received by InfoWorld Technologies (Attn: Sanjay Badguye). We respond within 1 business day.',
    });
  });

  app.post('/api/newsletter', (req, res) => {
    const body = req.body ?? {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address to subscribe.' });
      return;
    }

    const alreadySubscribed = subscribers.some((sub) => sub.email === email);
    if (!alreadySubscribed) {
      subscribers.push({
        email,
        subscribedAt: new Date().toISOString(),
      });
    }

    res.status(201).json({
      success: true,
      alreadySubscribed,
      message: alreadySubscribed
        ? 'You are already subscribed to InfoWorld Technologies engineering notes.'
        : 'Subscribed to monthly engineering notes from InfoWorld Technologies Nagpur.',
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`InfoWorld Technologies (infoworldtech.co.in) server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
