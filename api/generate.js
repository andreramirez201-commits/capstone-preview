// Meridian AI Proposal Writer — server-side AI proxy.
//
// Zero-config Vercel Node.js function (CommonJS, no package.json/build step,
// matching the rest of this repo). Never exposes ANTHROPIC_API_KEY to the client.
//
// PROMPT STATUS: every entry in STAGES below is a DRAFT PLACEHOLDER written from
// each owner's actual assignment brief (~/Downloads/Meridian_Team_Assignments,
// Aug 30 2026) — not the team's own tested prompt. As of 2026-09-08 every one of
// the five assignment files still has an unfilled "[PASTE YOUR PROMPT HERE]" /
// "[PASTE FINAL PROMPT HERE]" field; the in-class peer-review pass that produces
// the real prompts (Apex-Prompt-Testing-Instructions-Team-Examples.pptx) has not
// happened yet. Swap each stage's `promptTemplate` body for the team's final
// TASK/CONTEXT/REFERENCES/OUTPUT text when it lands — nothing else needs to change.

const DEFAULT_MODEL = 'claude-sonnet-5';
const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_MAX_TOKENS = 1500;
const MAX_FIELD_CHARS = 6000;

// ---- hard spend cap + rate limit (required on every public paid-API app) ----
// Best-effort in-memory counters. On Vercel these live per warm Lambda instance,
// not globally, so this is a floor, not a precise global cap — it stops casual
// abuse and runaway loops during the demo window. For anything longer-lived,
// pair this with Vercel's own deployment protection or a real store (Supabase).
const RATE_LIMIT_PER_IP = 20; // requests / rolling hour / IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const DAILY_REQUEST_CAP = 150; // hard ceiling across all users / UTC day
const ipHits = new Map();
let dailyCounter = { day: null, count: 0 };

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (dailyCounter.day !== today) dailyCounter = { day: today, count: 0 };
  if (dailyCounter.count >= DAILY_REQUEST_CAP) {
    return { ok: false, error: 'Daily demo request limit reached for this deployment. Try again after midnight UTC.' };
  }
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_PER_IP) {
    return { ok: false, error: 'Too many requests from this browser in the last hour. Wait a bit and try again.' };
  }
  hits.push(now);
  ipHits.set(ip, hits);
  dailyCounter.count += 1;
  return { ok: true };
}

const MERIDIAN_CONTEXT =
  'Meridian Consulting Group is a 60-person B2B management consulting firm ' +
  'based in Chicago, serving mid-market manufacturing and logistics clients.';

const SHARED_RULES =
  '- Do not invent facts, numbers, prices, dates, or commitments beyond what is given.\n' +
  '- Label anything unknown or unconfirmed as "Needs Confirmation."\n' +
  '- Output only what is asked for — no preamble, no closing remarks.';

// Each stage assembles a single TASK/CONTEXT/REFERENCES/OUTPUT prompt from only
// the fields it actually needs. The five stages and their owners match the
// authoritative table: Ali -> Angelica -> Stephanie -> Ashley -> Edwin.
const STAGES = {
  'opportunity-summary': {
    name: 'Client Opportunity Summary',
    owner: 'Ali',
    order: 1,
    promptStatus: 'draft-placeholder',
    requires: ['opportunityNotes'],
    promptTemplate: ({ opportunityNotes }) => `TASK:
You are a sales operations analyst for Meridian Consulting Group. Turn the
discovery notes below into a short, organized summary of the sales opportunity.

[DRAFT PLACEHOLDER — Ali's assignment brief, not her tested prompt. Replace
with her final TASK/CONTEXT/REFERENCES/OUTPUT text once the team has tested
and peer-reviewed it.]

CONTEXT:
- ${MERIDIAN_CONTEXT}
- This is Stage 1 of a five-stage chained workflow; its output becomes the
  required input to Stage 2 (Missing Information Detector).
- Only use what is explicitly stated in the notes provided.

REFERENCES:
Discovery notes:
${opportunityNotes}

OUTPUT REQUIREMENTS:
Identify: Client organization; Industry; Main business problem; Desired
outcome; Key pain points; Stakeholders; Timeline; Known constraints;
Information that is unknown.
${SHARED_RULES}`,
  },

  'missing-information': {
    name: 'Missing Information Detector',
    owner: 'Angelica',
    order: 2,
    promptStatus: 'draft-placeholder',
    requires: ['approvedSummary'],
    promptTemplate: ({ approvedSummary }) => `TASK:
You are a sales operations analyst for Meridian Consulting Group. Before a
proposal is written, identify what the salesperson still needs to learn from
the client.

[DRAFT PLACEHOLDER — Angelica's assignment brief, not her tested prompt.
Replace with her final TASK/CONTEXT/REFERENCES/OUTPUT text once the team has
tested and peer-reviewed it.]

CONTEXT:
- ${MERIDIAN_CONTEXT}
- Previous step: an approved opportunity summary (Stage 1).
- A human will confirm or leave unresolved every item you flag — do not guess
  on their behalf.

REFERENCES:
Approved opportunity summary:
${approvedSummary}

OUTPUT REQUIREMENTS:
Check for missing: Client's exact problem; Desired outcome; Budget; Decision
maker; Other stakeholders; Timeline; Success criteria; Scope; Constraints.
Clearly separate KNOWN facts (already confirmed) from UNKNOWN facts (missing).
Suggest specific questions the salesperson could ask the client for each
unknown item.
${SHARED_RULES}`,
  },

  'proposal-outline': {
    name: 'Proposal Outline Builder',
    owner: 'Stephanie',
    order: 3,
    promptStatus: 'draft-placeholder',
    requires: ['approvedSummary', 'approvedMissingInfo'],
    promptTemplate: ({ approvedSummary, approvedMissingInfo }) => `TASK:
You are an expert B2B consulting proposal writer for Meridian Consulting
Group. Build a proposal outline — the STRUCTURE only, not the finished
proposal — from the client information provided.

[DRAFT PLACEHOLDER — Stephanie's assignment brief, not her tested prompt.
Replace with her final TASK/CONTEXT/REFERENCES/OUTPUT text once the team has
tested and peer-reviewed it.]

CONTEXT:
- ${MERIDIAN_CONTEXT}
- Previous steps: an approved opportunity summary (Stage 1) and its missing-
  information review with any confirmed answers (Stage 2).
- You are not writing the entire proposal.

REFERENCES:
Approved opportunity summary:
${approvedSummary}

Missing-information review and confirmed answers:
${approvedMissingInfo}

OUTPUT REQUIREMENTS:
Create an outline reflecting this specific client's problem. Possible
sections: Executive Summary; Client Challenge; Objectives; Recommended
Approach; Scope of Work; Deliverables; Timeline; Expected Outcomes;
Investment; Next Steps. Do not invent prices, timelines, results, or
commitments that were not provided.
${SHARED_RULES}`,
  },

  'proposal-writer': {
    name: 'Proposal Writer',
    owner: 'Ashley',
    order: 4,
    promptStatus: 'draft-placeholder',
    requires: ['approvedClientInfo', 'approvedOutline'],
    promptTemplate: ({ approvedClientInfo, approvedOutline }) => `TASK:
You are an expert B2B consulting proposal writer for Meridian Consulting
Group. Turn the approved client information and outline into professional
proposal content.

[DRAFT PLACEHOLDER — Ashley's assignment brief, not her tested prompt.
Replace with her final TASK/CONTEXT/REFERENCES/OUTPUT text once the team has
tested and peer-reviewed it.]

CONTEXT:
- ${MERIDIAN_CONTEXT}
- Previous steps: approved client information (Stage 1 + Stage 2) and an
  approved proposal outline (Stage 3).

REFERENCES:
Approved client information:
${approvedClientInfo}

Approved proposal outline:
${approvedOutline}

OUTPUT REQUIREMENTS:
Write professionally. Focus on the client's actual business problem. Explain
Meridian's proposed approach clearly. Avoid unnecessary AI-sounding language.
Never guarantee results. Clearly mark any information that still needs
confirmation.
${SHARED_RULES}`,
  },

  'follow-up': {
    name: 'Follow-Up Prompt',
    owner: 'Edwin',
    order: 5,
    promptStatus: 'draft-placeholder',
    requires: ['approvedProposal', 'approvedClientInfo'],
    promptTemplate: ({ approvedProposal, approvedClientInfo }) => `TASK:
You are a sales communication specialist for Meridian Consulting Group.
Create three follow-up messages for the salesperson to send after this
proposal.

[DRAFT PLACEHOLDER — Edwin's assignment brief, not his tested prompt. Replace
with his final TASK/CONTEXT/REFERENCES/OUTPUT text once the team has tested
and peer-reviewed it.]

CONTEXT:
- ${MERIDIAN_CONTEXT}
- Previous steps: approved client information and the approved proposal
  (Stage 4).

REFERENCES:
Approved proposal:
${approvedProposal}

Approved client information:
${approvedClientInfo}

OUTPUT REQUIREMENTS:
Message 1: short follow-up after the initial conversation/proposal.
Message 2: follow-up if the client hasn't responded.
Message 3: final professional follow-up.
Each message should sound human, be concise, reference the client's problem,
give a clear next step, avoid being pushy, and avoid making promises.
${SHARED_RULES}`,
  },
};

function withTimeout(promise, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, timer, promise: promise(controller.signal) };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const rate = checkRateLimit(getClientIp(req));
  if (!rate.ok) {
    res.status(429).json({ error: rate.error });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'Request body must be valid JSON.' });
      return;
    }
  }
  body = body || {};

  const { stage, context } = body;
  const stageConfig = STAGES[stage];
  if (!stageConfig) {
    res.status(400).json({ error: `Unknown stage: "${stage}".` });
    return;
  }

  const missing = stageConfig.requires.filter((key) => !context || !String(context[key] || '').trim());
  if (missing.length) {
    res.status(400).json({ error: `Missing required field(s) for this stage: ${missing.join(', ')}.` });
    return;
  }

  const oversized = stageConfig.requires.filter((key) => String(context[key] || '').length > MAX_FIELD_CHARS);
  if (oversized.length) {
    res.status(400).json({ error: `Field(s) too long (max ${MAX_FIELD_CHARS} characters): ${oversized.join(', ')}.` });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server is not configured with an AI provider API key. Set ANTHROPIC_API_KEY.' });
    return;
  }

  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
  const timeoutMs = Number(process.env.REQUEST_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  const prompt = stageConfig.promptTemplate(context);

  const { timer, promise } = withTimeout(
    (signal) =>
      fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal,
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: DEFAULT_MAX_TOKENS,
          messages: [{ role: 'user', content: prompt }],
        }),
      }),
    timeoutMs
  );

  try {
    const response = await promise;
    clearTimeout(timer);

    if (!response.ok) {
      let detail = 'The AI provider returned an error.';
      try {
        const errBody = await response.json();
        detail = errBody?.error?.message || detail;
      } catch {
        // ignore parse failure, keep generic detail
      }
      res.status(response.status >= 400 && response.status < 600 ? response.status : 502).json({ error: detail });
      return;
    }

    const data = await response.json();
    const text = (data.content || []).map((block) => block.text || '').join('\n').trim();

    res.status(200).json({
      output: text,
      stage: stageConfig.name,
      owner: stageConfig.owner,
      promptStatus: stageConfig.promptStatus,
      model,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      res.status(504).json({ error: `Request to the AI provider timed out after ${timeoutMs}ms.` });
      return;
    }
    res.status(502).json({ error: 'Could not reach the AI provider. Check server connectivity and try again.' });
  }
};

module.exports.STAGES = STAGES;
module.exports.config = { maxDuration: 30 };
