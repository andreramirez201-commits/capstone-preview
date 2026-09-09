# Meridian Proposal Engine — Prompt Library
**Status as of 2026-09-08.** This is the current, canonical version of the five prompts. It replaces
the earlier draft of this file (Riverbend Logistics scenario, generic un-owned prompts, "Meridian
Proposal Copilot" naming) — that draft is superseded. This version is sourced directly from
`api/generate.js` (the code the live demo actually runs) and from `Meridian_Team_Unedited_Responses.md`
(each owner's own test-and-review write-up, 2026-09-08). Keep this file, `api/generate.js`'s
`STAGES` object, and the demo's in-app `PROMPT_LIBRARY` (`meridian-proposal-writer.html`)
byte-identical for the prompt text — if one changes, update the other two in the same edit.

**What "owner-tested" means here, and what it doesn't:** each prompt below was built, run, and
self-reviewed by its own owner against the shared Apex Manufacturing scenario. The team's testing
instructions (`Apex-Prompt-Testing-Instructions-Team-Examples.pptx`) also assign a *separate* peer
reviewer per stage (Ashley↔Edwin, Ali↔Stephanie, Angelica↔Ali, Stephanie↔Angelica) who is supposed
to independently re-run the same prompt and compare results. **That cross-team peer-review pass is
not confirmed complete as of this writing.** Nothing below is labeled "Approved" — only
"Owner-tested" — until that pass is confirmed and documented.

**Known gap:** Prompt 3 (Stephanie, Proposal Outline Builder) has real output on file for the Apex
scenario, but her own test-and-review write-up (what she checked, what she'd change) is not in the
team's shared testing document — her prompt was supplied directly rather than through that document.
Confirm with Stephanie before presenting this stage as fully reviewed.

---

## Overview — the five stages, in order

The output from one stage becomes the required input to the next. A person reviews and approves
each stage's output before it moves downstream — nothing is auto-chained without that approval.

1. **Client Opportunity Summary** (Ali) — turns raw discovery notes into a structured, factual summary.
2. **Missing Information Detector** (Angelica) — flags what's still unknown and what to ask the client.
3. **Proposal Outline Builder** (Stephanie) — structures the proposal; does not write full prose.
4. **Proposal Writer** (Ashley) — drafts the client-facing proposal from the approved summary + outline.
5. **Follow-Up Prompt** (Edwin) — drafts a 3-message sequence for a proposal that's gone quiet.

The live demo (`meridian-proposal-writer.html`) runs these five prompts through a real AI model
call (Claude, via `api/generate.js`, server-side so the API key never reaches the browser) — it is
not a static mockup. Each stage also has a "Use Saved Demo Output" fallback, wired to each owner's
actual captured test output, for presenting without a live API call.

**How to use these prompts outside the demo:** copy the full prompt text below into Claude or
ChatGPT (whatever Meridian's team already licenses), replace the bracketed placeholder with your
own real input, and run it. This manual, no-new-software use is what's actually proposed for
Meridian's sales team to adopt — the demo is a presentation prototype that proves the workflow
works, not the rollout mechanism itself.

---

## PROMPT 1 — Client Opportunity Summary

**Owner:** Ali · **Status:** Owner-tested, one revision made after self-review

**Purpose:** Turn raw discovery notes, emails, or CRM notes into a clean, structured opportunity
summary — the factual foundation every later stage builds on.

**When to use it:** Right after a discovery call, or whenever new client notes come in, before any
proposal work starts.

**Required input:** Sales opportunity notes — discovery call notes, emails, or CRM notes.

**Full prompt text:**
```
You are assisting Meridian Consulting with reviewing sales opportunity notes.

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
[PASTE DISCOVERY NOTES, EMAILS, OR CRM NOTES HERE]
```

**Expected output:** A 9-section structured summary (Client Organization through Unknown
Information), each field populated only from what's in the notes.

**What testing found:** Ali's first draft correctly avoided inventing facts, but miscategorized an
unstated budget as a "Known Constraint" instead of "Unknown Information." Her revised prompt (above)
explicitly defines what counts as a Known Constraint and tells the AI to route anything undiscussed
to Unknown Information instead. This is a real, documented before/after — see
`Meridian_Team_Unedited_Responses.md`.

---

## PROMPT 2 — Missing Information Detector

**Owner:** Angelica · **Status:** Owner-tested, no revision needed

**Purpose:** Before Meridian writes a proposal, check what's still unknown and generate the
questions a salesperson should ask the client to close those gaps.

**When to use it:** Right after Stage 1's opportunity summary is approved, before building the
proposal outline.

**Required input:** The approved Opportunity Summary from Stage 1.

**Full prompt text:**
```
Analyze the following opportunity details to identify known information and unknown missing information, such as the client's exact problem, desired outcome, budget, decision maker, other stakeholders, timeline, success criteria, scope, and constraints, and then generate a list of actionable questions the salesperson should ask the client to gather those details.

Opportunity details:
[PASTE APPROVED OPPORTUNITY SUMMARY HERE]
```

**Expected output:** Three sections — Information We Know, Information Still Missing, and Questions
the Salesperson Should Ask the Client.

**What testing found:** Angelica's self-review found the AI correctly separated known from unknown
information, generated useful salesperson-facing questions, and invented nothing. No revision made
— "the prompt is fine how it is."

---

## PROMPT 3 — Proposal Outline Builder

**Owner:** Stephanie · **Status:** Owner-tested — output on file; self-review write-up not documented (gap)

**Purpose:** Structure the proposal into sections before anyone writes full prose — organizes the
business case and flags gaps. Does not write the finished proposal.

**When to use it:** After the missing-information review, once the salesperson has confirmed
whatever they can from the client.

**Required input:** The approved Opportunity Summary (Stage 1) and the Missing-Information review /
confirmed answers (Stage 2).

**Full prompt text:**
```
Create a professional consulting proposal outline for the following client opportunity.

For each section, briefly explain what information should be included. Customize the outline to the client's business problem. Do not write the full proposal. Do not invent prices, timelines, statistics, results, or commitments. Clearly label missing information as "Needs Confirmation."

Client opportunity:
[PASTE APPROVED OPPORTUNITY SUMMARY HERE]

[PASTE MISSING-INFORMATION REVIEW / CONFIRMED ANSWERS HERE]

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
Next Steps
```

**Expected output:** A 10-section outline, each section flagged "Needs Confirmation" wherever the
underlying fact isn't yet known.

**What testing found:** A real output exists for the Apex scenario (10 sections, budget and
timeline both correctly marked Needs Confirmation). **Gap:** unlike the other four stages, this
prompt was supplied directly rather than logged through the team's shared testing document, so
there is no written record of what Stephanie checked or would change. Get that write-up from her
before presenting this stage as fully reviewed — don't present it as more validated than it is.

---

## PROMPT 4 — Proposal Writer

**Owner:** Ashley · **Status:** Owner-tested, one revision made after self-review

**Purpose:** Turn the approved client information and outline into a short, client-ready proposal
draft.

**When to use it:** After the outline is approved, before anything goes to the client.

**Required input:** Approved Client Information (Stages 1–2 combined) and the Approved Proposal
Outline (Stage 3).

**Full prompt text:**
```
Role:

You are an expert B2B management consulting proposal writer.

Task:

Using the approved client information and proposal outline provided, write a short, professional, client-specific proposal for Meridian Consulting Group. Focus on the client's business problem and clearly explain Meridian's proposed approach.

Context:

Meridian Consulting Group wants to create strong proposals more efficiently while maintaining professional, natural, accurate, and client-focused communication. Avoid generic, robotic, or unnecessary AI-sounding language. Clearly distinguish confirmed client information from possible areas Meridian may investigate. A Meridian salesperson must review and approve the final proposal before it is sent to the client.

Resource:

Use only the approved client information and approved proposal outline provided. Never invent facts, statistics, prices, dates, timelines, causes, or results. Never guarantee outcomes. Do not present a possible cause or area of investigation as confirmed information. If anything is missing, uncertain, or not approved, clearly label it "Needs Confirmation."

Approved Client Information:
[PASTE APPROVED CLIENT INFORMATION HERE]

Proposal Outline:
[PASTE APPROVED PROPOSAL OUTLINE HERE]
```

**Expected output:** A short client-facing proposal draft covering Client Challenge, Project
Objective, Proposed Approach, Desired Outcome, Budget, Timeline, and Next Steps.

**What testing found:** Ashley's first draft stayed within the given facts and made no guarantees,
but didn't clearly separate a *possible* cause under investigation from a *confirmed* fact. Her
revised prompt (above) adds the explicit instruction to keep those distinct. A real, documented
before/after — see `Meridian_Team_Unedited_Responses.md`.

---

## PROMPT 5 — Follow-Up Prompt

**Owner:** Edwin · **Status:** Owner-tested, no revision needed

**Purpose:** Draft a 3-message follow-up sequence for a lead that's gone quiet after a proposal.

**When to use it:** After a proposal is sent and the client hasn't responded.

**Required input:** Client and proposal information for this engagement, and the sent proposal
(Stage 4 output).

**Full prompt text:**
```
Persona: you are a prompt professional assisting a salesperson from meridian, a b2b business.

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
[PASTE CLIENT AND PROPOSAL INFORMATION HERE]

Sent proposal:
[PASTE SENT PROPOSAL HERE]
```

**Expected output:** Three follow-up messages — a short Day-1-style check-in, a Day-4-style
value-add message, and a Day-9-style final message.

**What testing found:** Edwin's self-review confirmed the messages sounded human, were personalized
to Apex, each had a clear next step, and invented nothing. No revision made — "its good."

---

## Testing summary

| Stage | Owner | Self-tested? | Self-review documented? | Revised after review? | Assigned peer reviewer (per team table) | Peer review confirmed? |
|---|---|---|---|---|---|---|
| 1. Opportunity Summary | Ali | Yes | Yes | Yes — fixed | Stephanie | Not confirmed |
| 2. Missing Information Detector | Angelica | Yes | Yes | No — passed as-is | Ali | Not confirmed |
| 3. Proposal Outline Builder | Stephanie | Yes (output on file) | **No — gap** | Unknown | Angelica | Not confirmed |
| 4. Proposal Writer | Ashley | Yes | Yes | Yes — fixed | Edwin | Not confirmed |
| 5. Follow-Up Prompt | Edwin | Yes | Yes | No — passed as-is | Ashley | Not confirmed |

All five stages are running each owner's actual final-tested prompt in the live demo — none are
placeholder or invented text. What's not yet confirmed is the *cross-team* peer-review pass the
team's own testing instructions call for, and Stephanie's individual self-review write-up.

---

## Superseded content

An earlier draft of this file (and of `team4-content.md`'s Step 4) used a fictional **Riverbend
Logistics** test scenario, generic un-owned prompt text, and the product name **"Meridian Proposal
Copilot."** That draft predates the team's owner-assignment table and Apex-scenario testing
instructions and is no longer what the demo runs. It's kept in `team4-content.md` for the
Implementation & Results Plan's phased-rollout content (Days 1–30/31–60/61–90, training,
feedback process), which doesn't depend on which five prompts were used — but its Step 4 prompt
text specifically should not be presented as current. Flag this to the team before the
Implementation & Results Plan is finalized.

The solution name **"Meridian Proposal Copilot"** used in `team4-content.md` and in earlier
presentation drafts has been retired in favor of **"Meridian Proposal Engine"** — "Copilot" reads as
a Microsoft product name. Recommend the team update `team4-content.md` for consistency before final
submission; not changed here since it's the team's own submitted content, not this library.
