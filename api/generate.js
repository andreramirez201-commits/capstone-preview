// Meridian AI Proposal Writer — server-side AI proxy.
//
// Zero-config Vercel Node.js function (CommonJS, no package.json/build step,
// matching the rest of this repo). Never exposes ANTHROPIC_API_KEY to the client.
//
// PROMPT STATUS (2026-09-08): four of five stages run each owner's actual
// final-tested prompt (Ali, Angelica, Stephanie, Ashley, Edwin — sourced from
// Meridian_Team_Unedited_Responses.md and, for Stephanie, sent directly by
// André since that doc only had her AI response, not her prompt). These are
// each owner's own tested prompt, not necessarily the cross-team peer-
// reviewed final version (Apex-Prompt-Testing-Instructions-Team-Examples.pptx
// describes a later peer-review pass whose completion is unconfirmed) — see
// each stage's `promptStatus` ('team-tested', not 'approved'). Every stage
// currently has a real tested prompt; none are draft placeholders as of this
// date.

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
  // Ali's actual final-tested prompt, from Meridian_Team_Unedited_Responses.md
  // (2026-09-08). Wording preserved verbatim; only the hardcoded Apex example
  // notes at the end were swapped for the live ${opportunityNotes} input.
  'opportunity-summary': {
    name: 'Client Opportunity Summary',
    owner: 'Ali',
    order: 1,
    promptStatus: 'team-tested',
    requires: ['opportunityNotes'],
    promptTemplate: ({ opportunityNotes }) => `You are assisting Meridian Consulting with reviewing sales opportunity notes.

Analyze the notes provided and create a short, organized Opportunity Summary using only the information contained in the notes.

Include the following sections:

1. Client Organization
2. Industry
3. Main Business Problem
4. Desired Outcome
5. Key Pain Points
6. Stakeholders
7. Timeline
8. Known Constraints
9. Unknown Information

Follow these rules:

Use only information supported by the notes.
Do not make up, assume, or infer facts that are not provided.
Preserve uncertainty. If the notes describe something as possible, suspected, or believed, do not present it as a confirmed fact.
A Known Constraint must be an actual limitation or restriction stated in the notes, such as a fixed budget, deadline, staffing limitation, regulatory requirement, or technology restriction.
If information was not discussed or provided, such as an unspecified budget or deadline, list it under Unknown Information, not Known Constraints.
If there are no known constraints, state "None identified in the provided notes."
Do not repeat the same information in multiple sections unless necessary for clarity.
Keep the summary concise and easy for a salesperson or consultant to review.

Sales Opportunity Notes:
${opportunityNotes}`,
  },

  // Angelica's tested prompt (unchanged after her own review — "the prompt is
  // fine how it is"), from Meridian_Team_Unedited_Responses.md (2026-09-08).
  // Her file has no separate REFERENCES placeholder, so the approved summary
  // is appended below her instruction exactly as it was pasted during testing.
  'missing-information': {
    name: 'Missing Information Detector',
    owner: 'Angelica',
    order: 2,
    promptStatus: 'team-tested',
    requires: ['approvedSummary'],
    promptTemplate: ({ approvedSummary }) => `Analyze the following opportunity details to identify known information and unknown missing information, such as the client's exact problem, desired outcome, budget, decision maker, other stakeholders, timeline, success criteria, scope, and constraints, and then generate a list of actionable questions the salesperson should ask the client to gather those details.

Opportunity details:
${approvedSummary}`,
  },

  // Stephanie's actual prompt, sent directly by André 2026-09-08 (not in
  // Meridian_Team_Unedited_Responses.md, which only had her AI response).
  // Wording preserved verbatim; her fixed "Client opportunity" paragraph was
  // written for the Apex test case, so the live approved summary + missing-
  // information review are substituted in as that same block.
  'proposal-outline': {
    name: 'Proposal Outline Builder',
    owner: 'Stephanie',
    order: 3,
    promptStatus: 'team-tested',
    requires: ['approvedSummary', 'approvedMissingInfo'],
    promptTemplate: ({ approvedSummary, approvedMissingInfo }) => `Create a professional consulting proposal outline for the following client opportunity.

For each section, briefly explain what information should be included. Customize the outline to the client's business problem. Do not write the full proposal. Do not invent prices, timelines, statistics, results, or commitments. Clearly label missing information as "Needs Confirmation."

Client opportunity:
${approvedSummary}

${approvedMissingInfo}

Create an appropriate consulting proposal outline that may include:
Executive Summary
Client Challenge
Objectives
Recommended Approach
Scope of Work
Deliverables
Timeline
Expected Outcomes
Investment
Next Steps`,
  },

  // Ashley's actual final-tested prompt, from Meridian_Team_Unedited_Responses.md
  // (2026-09-08). Wording preserved verbatim; her Role/Task/Context/Resource
  // structure already has the two input slots this stage needs.
  'proposal-writer': {
    name: 'Proposal Writer',
    owner: 'Ashley',
    order: 4,
    promptStatus: 'team-tested',
    requires: ['approvedClientInfo', 'approvedOutline'],
    promptTemplate: ({ approvedClientInfo, approvedOutline }) => `Role:

You are an expert B2B management consulting proposal writer.

Task:

Using the approved client information and proposal outline provided, write a short, professional, client-specific proposal for Meridian Consulting Group. Focus on the client's business problem and clearly explain Meridian's proposed approach.

Context:

Meridian Consulting Group wants to create strong proposals more efficiently while maintaining professional, natural, accurate, and client-focused communication. Avoid generic, robotic, or unnecessary AI-sounding language. Clearly distinguish confirmed client information from possible areas Meridian may investigate. A Meridian salesperson must review and approve the final proposal before it is sent to the client.

Resource:

Use only the approved client information and approved proposal outline provided. Never invent facts, statistics, prices, dates, timelines, causes, or results. Never guarantee outcomes. Do not present a possible cause or area of investigation as confirmed information. If anything is missing, uncertain, or not approved, clearly label it "Needs Confirmation."

Approved Client Information:
${approvedClientInfo}

Proposal Outline:
${approvedOutline}`,
  },

  // Edwin's actual final-tested prompt, from Meridian_Team_Unedited_Responses.md
  // (2026-09-08), unchanged after his own review ("its good"). His prompt has
  // no explicit paste slot for this specific engagement's details, so the
  // approved proposal and client info are appended below it, clearly labeled,
  // exactly as the workflow's chained inputs require.
  'follow-up': {
    name: 'Follow-Up Prompt',
    owner: 'Edwin',
    order: 5,
    promptStatus: 'team-tested',
    requires: ['approvedProposal', 'approvedClientInfo'],
    promptTemplate: ({ approvedProposal, approvedClientInfo }) => `Persona: you are a prompt professional assisting a salesperson from meridian, a b2b business.

Context: the number of clients are dropping due to delays in your responses after clients initial messages. All clients initiates conversion but its been over a week since and the salesperson has yet to answer. The salesperson does not want to lose anymore customers and potentially gain new customers.

Task: create three messages to increase efficiency of the transaction. Messages should be about:

MESSAGE 1: Short follow-up after the initial conversation.
MESSAGE 2: follow-up if the client hasn't responded.
MESSAGE 3: Final professional follow-up

Messages should:
- Sound human
- Be concise
- Reference the client's problem
- Provide a clear next step
- Avoid being pushy
- Avoid making promises
- Never invent client information

Client and proposal information for this engagement:
${approvedClientInfo}

Sent proposal:
${approvedProposal}`,
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
