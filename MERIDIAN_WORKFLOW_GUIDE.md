# Meridian Proposal Engine — Workflow Operating Guide

**Audience:** any Meridian salesperson, including one who was not on the team that built this —
this document is written so they can pick up the workflow, use it correctly, and keep it correct
without asking the original team.

**Status as of 2026-09-08.** This guide describes what actually exists today: a five-prompt library
plus one working demonstration prototype. Where something hasn't been tested, confirmed, or built,
this guide says so directly rather than describing it as done.

---

## 1. Purpose

Meridian's sales team spends too long writing proposals (about 14 hours each) and is too slow to
follow up with leads (5+ days). This workflow is five short, chained AI prompts that a salesperson
runs manually in whatever AI tool Meridian already licenses (Claude or ChatGPT) — no new software,
no IT purchase. AI drafts each stage; a person reviews, corrects, and decides whether to approve it
before the next stage runs. Nothing goes to a client without a person reading it first.

This is a **prompt library**, not an autonomous system. It does not write proposals or send
messages on its own.

---

## 2. What you're given

| File | What it is |
|---|---|
| `meridian-prompt-library.md` | The five prompts — full text, purpose, required input, expected output, and testing status for each. This is the file to copy prompts from for day-to-day manual use. |
| `meridian-proposal-writer.html` | An interactive demo prototype. Walks all five stages, can call a real AI model live or show a saved real example, and includes an in-app copy of the prompt library (the "Prompt Library" button). Built for presenting the workflow, not for Meridian's sales team to run day-to-day traffic through — see §9. |
| `MERIDIAN_WORKFLOW_GUIDE.md` | This document. |
| `api/generate.js` | The server-side code behind the demo's live AI calls. Only relevant if someone is maintaining or redeploying the demo itself. |

**A note on what this guide is and isn't:** this is a **workflow operating guide** — written
instructions and preserved context, in a plain Markdown file, so a person can pick up the process
correctly later. It is not connected to any AI tool's memory. Claude, ChatGPT, or any other AI does
not read this file automatically, and saving decisions here does not make an AI "remember" them
between sessions. If a prompt or a decision changes, someone has to update this file by hand — that
update is what keeps the next person's instructions current, the same way updating a written
runbook does. This is the underlying idea from ICM (a documentation method for keeping instructions,
decisions, and approved context in one place a successor can navigate) applied at a small scale:
preserve the "why," not just the "what," so this workflow doesn't have to be re-derived from scratch
by the next person who touches it.

---

## 3. The five stages, in order

Each stage's output becomes the next stage's required input. Run them in order — later stages are
written to refuse to run without the earlier stage's approved output.

1. **Client Opportunity Summary** (owner: Ali) — turns discovery notes into a structured summary.
2. **Missing Information Detector** (owner: Angelica) — flags what's still unknown and what to ask.
3. **Proposal Outline Builder** (owner: Stephanie) — structures the proposal; no full prose yet.
4. **Proposal Writer** (owner: Ashley) — drafts the client-facing proposal.
5. **Follow-Up Prompt** (owner: Edwin) — drafts a 3-message sequence if the client goes quiet.

The full prompt text for each stage is in `meridian-prompt-library.md` — copy it from there, not
from memory or a paraphrase, so you're always running the actual tested wording.

---

## 4. Step-by-step: running the workflow manually

**Stage 1 — Client Opportunity Summary (Ali's prompt)**
1. Open Claude or ChatGPT.
2. Copy Prompt 1 in full from `meridian-prompt-library.md`.
3. Replace `[PASTE DISCOVERY NOTES, EMAILS, OR CRM NOTES HERE]` with your actual discovery notes —
   fictional or anonymized only if this is a demo or a test; real client details are fine here once
   the workflow is in real use, subject to §7's confidentiality rule.
4. Run it. Read the output.
5. **Human checkpoint:** does every fact trace back to something you actually wrote in your notes?
   Is anything the AI wasn't sure about labeled "Needs Confirmation" rather than stated as fact?
   Fix or re-run if not. Once it looks right, this is your **approved Opportunity Summary** —
   keep it for Stage 2.

**Stage 2 — Missing Information Detector (Angelica's prompt)**
1. Copy Prompt 2. Paste your approved Opportunity Summary where indicated.
2. Run it. You'll get three sections: what's known, what's missing, and questions to ask the
   client.
3. **Human checkpoint:** go ask the client the questions that matter for this deal. Write down
   their answers.
4. Keep the missing-information review **and** whatever answers you actually got — that combined
   package is the required input to Stage 3. Anything the client didn't answer stays
   "Needs Confirmation"; never fill it in with a guess.

**Stage 3 — Proposal Outline Builder (Stephanie's prompt)**
1. Copy Prompt 3. Paste the approved Opportunity Summary and the Stage 2 package (review +
   confirmed answers) where indicated.
2. Run it. You'll get a 10-section outline — structure only, not finished prose.
3. **Human checkpoint:** does the outline match this specific client's actual problem, not a
   generic template? Is every section without a confirmed fact marked "Needs Confirmation"? This
   is your **approved Proposal Outline**.

**Stage 4 — Proposal Writer (Ashley's prompt)**
1. Copy Prompt 4. Paste the approved client information (Stages 1–2 combined) and the approved
   outline where indicated.
2. Run it. You'll get a short draft proposal.
3. **Human checkpoint — this is the most important one in the whole workflow.** Read every claim.
   Would you be comfortable putting your name on this if a client asked you about any sentence in
   it? Check specifically for:
   - Any price, date, or statistic that wasn't actually confirmed.
   - Any outcome stated as guaranteed rather than as an intended goal.
   - Any "possible cause" written as though it were an established fact.
   Edit anything wrong. This becomes the proposal you actually send — the AI draft is a starting
   point, not the final word.

**Stage 5 — Follow-Up Prompt (Edwin's prompt)** — only after the proposal above has been sent and
the client has gone quiet.
1. Copy Prompt 5. Paste the client/proposal information and the sent proposal where indicated.
2. Run it. You'll get three messages.
3. **Human checkpoint:** read each message. Generating these messages does **not** send them and
   does **not** guarantee they'll go out on time. You still have to:
   - Decide when to send each one (the team's target is Message 1 within 24 hours of the proposal
     going quiet — see §6).
   - Set your own reminder or calendar hold for each send date.
   - Actually send it yourself.
   - Note the date you sent it, so drafting time and follow-up time can be measured (§6).

---

## 5. What "Needs Confirmation" means, and the one hard rule about it

Every prompt in this library is instructed to label anything it doesn't know as **"Needs
Confirmation"** rather than guess. When you see that label:

- **Never replace it with a guess** — not even an educated one, not even under deadline pressure.
- Either go find the real answer (ask the client, check the CRM, ask a colleague) and replace the
  label with the confirmed fact, or leave the label in place if you genuinely don't know yet.
- A proposal can go out with "Needs Confirmation" items still in it (e.g., "final investment to be
  confirmed pending scope sign-off") — that is honest. A proposal cannot go out with a guessed
  number dressed up as a fact.

If you ever see an AI output state something as fact that you know isn't confirmed, that's a
prompt failure worth reporting (see §10) — it means the instruction not to invent information
didn't hold for that run.

---

## 6. Success measures — what's a target vs. what's measured

Three numbers this workflow is meant to move. All three are currently **targets**, not achieved
results — there is no live pilot data yet.

| Measure | Baseline (today) | Target | What starts and ends the clock |
|---|---|---|---|
| Proposal drafting time | ~14 hours | ~7 hours | Starts when discovery notes are ready to summarize (Stage 1 input). Ends when the human-reviewed proposal (Stage 4 output, after your edits) is sent to the client. |
| Time to first follow-up | 5+ days | Under 24 hours | Starts when the sent proposal goes quiet (no client reply). Ends when Message 1 (Stage 5) is actually sent — not when it's generated. |
| Proposal win rate | Declining | Track monthly | Whether faster, more consistent proposals are actually landing more business, not just going out faster. |

**A scope note worth reading carefully:** the original course brief describes leads waiting 5+ days
for follow-up in general — it doesn't say whether that's the time to first respond to a brand-new
inquiry, or the time to follow up after a proposal has already been sent and gone quiet. Edwin's own
prompt describes Message 1 as following "the initial conversation," which could be read either way.
**This workflow, as built, is scoped to post-proposal follow-up** (Stage 5 runs after Stage 4's
proposal is sent). If Meridian actually means the 5+ day number is about the very first response to
a new lead, that's a different, earlier problem this workflow doesn't currently address — confirm
which one the team means before quoting the "under 24 hours" target to Meridian as if it covers both.

**Generating a message is not sending it.** The prototype's follow-up tracker (in
`meridian-proposal-writer.html`) can record a simulated "sent" and "followed up" timestamp for
demo purposes, entirely in that browser's local storage — it does not send an email, text, or
anything else, and it does not remind anyone automatically. In real use, the salesperson is the one
who reviews the drafted message, decides when to send it, sets their own reminder, sends it, and
writes down when they did.

---

## 7. Confidentiality

- **Never paste real, unpublished, or personally identifiable client information into a public AI
  tool** unless Meridian has specifically confirmed that tool's enterprise/data-handling terms
  permit it. When in doubt, anonymize: swap the real company name for a placeholder, strip names of
  individuals, round or omit exact figures that aren't needed for the prompt to work.
- The demo prototype (`meridian-proposal-writer.html`) is explicitly a presentation tool — its own
  on-page notice says not to enter confidential information into it, and that notice should stay
  true even after this project is handed off.
- All example data in this guide, the prompt library, and the demo (Apex Manufacturing) is
  **fictional** — built specifically so the team could test without touching real client data. Do
  not treat "Apex Manufacturing" as a real prospect.

---

## 8. Rules against inventing pricing, timelines, facts, or outcomes

Every one of the five prompts includes an explicit instruction not to invent information, and to
label gaps "Needs Confirmation" instead. That instruction is necessary but not sufficient — AI
output still needs a human reader applying the same rule on the way out:

- **Never state a price the client or Meridian hasn't actually agreed to.** Use a placeholder like
  "Needs Confirmation" or "[FEE]" until a real number exists.
- **Never state a date as fixed if it hasn't actually been set.** "This year" is not "Q4" is not
  "November 15" — don't tighten a vague client statement into a specific one.
- **Never present a suspected or possible cause as a confirmed fact.** ("We believe scheduling may
  be contributing" is not the same claim as "scheduling is causing the delays.")
- **Never guarantee an outcome.** "This is designed to reduce delays" is defensible; "this will cut
  your delays by 40%" is not, unless that number is something Meridian has actually committed to
  and can back up.

---

## 9. The demo prototype vs. the actual proposed workflow — don't conflate these

- **What Meridian is being asked to adopt:** the five prompts in `meridian-prompt-library.md`, run
  manually by reps inside whatever AI tool Meridian already licenses. No new software purchase, no
  IT project, no ongoing hosting cost. This is genuinely low-lift to adopt.
- **What `meridian-proposal-writer.html` is:** a built prototype used to demonstrate that the
  five-stage chain works end to end, including a live call to a real AI model through a small
  server-side function (`api/generate.js`). It requires hosting (currently on Vercel), an API key,
  and a small per-request cost — it has a hard spend cap and rate limit specifically because it's a
  paid API behind a public link. **This is a presentation tool, not the thing Meridian is being
  asked to run day-to-day.** If Meridian later wants an actual internal tool instead of a manual
  copy/paste workflow, that's a separate, larger scope decision — don't present the demo's
  existence as proof that "no IT lift" already includes hosting a live app.

---

## 10. Testing status and known limitations (as of 2026-09-08)

- All five prompts have a real, owner-tested version running in the demo — none are placeholder or
  invented text.
- Four of five stages (Ali, Angelica, Ashley, Edwin) have a documented self-test-and-review
  write-up in `Meridian_Team_Unedited_Responses.md`. Two of those four (Ali, Ashley) resulted in a
  real, documented prompt revision after the owner found a problem; two (Angelica, Edwin) needed no
  change.
- **Gap:** Stephanie's stage (Proposal Outline Builder) has real output on file for the Apex
  scenario but no documented self-review write-up — get that from her before presenting this stage
  as fully reviewed.
- **All review so far has been self-review** — each owner tested and reviewed their own prompt. The
  team's own testing instructions (`Apex-Prompt-Testing-Instructions-Team-Examples.pptx`) call for a
  separate **cross-team peer review** on top of that (a named reviewer per stage independently
  re-runs the same prompt and compares results). **That peer-review pass is not confirmed complete.**
  Don't describe any stage as "peer-reviewed" or "approved" until it is.
- No live pilot has run yet — the 7-hour and 24-hour numbers in §6 are targets, not measurements.
- The follow-up-timing scope question in §6 (initial-inquiry response vs. post-proposal follow-up)
  is not resolved — confirm with the team or with Meridian which one they actually mean.

---

## 11. How to update a prompt, and keep everything in sync

There are three places the same prompt text lives. **If you change one, change all three in the
same sitting:**

1. `meridian-prompt-library.md` — the human-readable reference copy.
2. `api/generate.js` — the `STAGES` object's `promptTemplate` function for that stage (this is what
   actually runs in the live demo).
3. `meridian-proposal-writer.html` — the `PROMPT_LIBRARY` array (the in-app library shown by the
   "Prompt Library" button).

When you change a prompt:
- Note what changed and why, directly in `meridian-prompt-library.md`'s entry for that stage (the
  "What testing found" line is the place for this).
- If the change came from a new test, add the test note the same way Ali's and Ashley's revisions
  are documented — what was tried, what was wrong, what changed.
- Don't mark a prompt "Approved" (as opposed to "Owner-tested") unless the cross-team peer review
  for that specific stage has actually happened and someone can point to where it's recorded.

---

## 12. Maintenance responsibilities

| Responsibility | Owner |
|---|---|
| Keeping the five prompts' wording in sync across the three files (§11) | To be assigned |
| Running and documenting the outstanding cross-team peer-review pass | To be assigned |
| Getting Stephanie's self-review write-up documented | To be assigned |
| Confirming the follow-up-timing scope question (§6) with the course brief or instructor | To be assigned |
| Re-testing the prompt library each quarter against real win/loss data, once in real use | To be assigned |
| Maintaining the demo prototype (`api/generate.js`, hosting, API key rotation) if it continues past the presentation | To be assigned |

This table is intentionally incomplete. Fill in an owner for each row before treating any of this
as a settled, maintained system rather than a one-time capstone deliverable.
