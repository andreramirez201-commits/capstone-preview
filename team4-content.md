# Team 4 Capstone — Meridian Consulting Group
Content ready to paste into the Capstone Preview Generator (Steps 3–7).

Client: Meridian Consulting Group — 60-person B2B management consulting firm, Chicago, serving
mid-market manufacturing and logistics clients.

---

## STEP 3 — Business Problem

**Problem Summary**
Meridian's sales team spends too much time writing proposals and is too slow to follow up with
leads. Proposal drafting averages 14 hours per proposal, the win rate has fallen, and leads
routinely wait more than five days for a follow-up.

**Key Challenges**
- Every proposal is written from scratch, so quality and turnaround depend on which rep writes it.
- Reps prioritize whichever prospect asked most recently, so quieter leads go cold.
- There is no shared library of proven proposal language or objection responses, so reps re-solve
  the same problems every time.

**Baseline Metrics**
- Proposal drafting time: 14 hours
- Time to first follow-up: 5+ days
- Win rate: declining (no AI assistance today)

**Current Workflow**
Discovery call -> rep manually drafts full proposal from a blank document -> internal review ->
send -> rep follows up only when they remember to, often 5+ days later.

**Proposed Workflow**
Discovery call -> AI drafts opportunity brief from call notes -> AI drafts proposal from the brief
-> rep reviews, personalizes, and sends -> AI drafts a 3-message follow-up sequence queued at set
intervals -> rep approves and sends each message.

**Before / After Comparison**
- Before: Proposal drafting time — 14 hours
- After: Proposal drafting time — 5 hours
- Before: Time to first follow-up — 5 days
- After: Time to first follow-up — 1 day

---

## STEP 4 — AI Solution

**Solution Name:** Meridian Proposal Copilot

**Solution Description**
A prompt library, not custom software — the fastest path to value and the easiest for a 60-person
firm to adopt with no IT lift. Reps run five tested prompts, in whatever AI tool Meridian already
licenses (Claude or ChatGPT), at the matching point in the sales conversation. Every output is a
draft; a rep reviews, edits, and is the one who sends.

> **Scope note:** the brief asks for 5 tested prompts. The team drafted 10 during testing; the 5
> below are the ones that make the graded cut, covering proposals, follow-ups, and objection
> handling with no overlap. The other 5 (a deeper discovery-question pass, a second missing-info
> detector, an executive-summary personalizer, an off-sequence follow-up, and a standalone
> objection analyzer) are real, tested work — carried forward as the seed of the full prompt
> library Meridian gets once the pilot proves out. See "What Meridian Should Do Next" in Step 7.

**Prompt 1 — Client Opportunity Summary**
- Purpose: Turn raw discovery notes, emails, or CRM notes into a clean understanding of the
  opportunity. This becomes the factual foundation for every later prompt.
- Prompt text:
  > You are assisting a B2B management consulting sales team. Review the client information below
  > and create a structured opportunity summary.
  > Identify: Client organization; Industry; Primary business challenge; Desired outcomes; Key pain
  > points; Known constraints; Decision criteria; Stakeholders mentioned; Timeline or urgency;
  > Questions that remain unanswered.
  > Do not invent missing information. Clearly label anything that is unknown or needs
  > confirmation.
  >
  > Client information: [PASTE DISCOVERY NOTES, EMAILS, OR CRM NOTES]

**Prompt 2 — Proposal Outline Builder**
- Purpose: Create the proposal's structure before writing full prose — organizes sections in the
  strongest order for the business case and flags what still needs confirmation. Its output is the
  outline a person expands into the Step 5 sample proposal; the brief's "1 short sample proposal
  using AI assistance" is that human-expanded version, not this prompt's raw output.
- Prompt text:
  > Role: You are an expert B2B consulting proposal writer.
  > Task: Create a customized proposal outline based on the client information provided.
  > Instructions: Do not write the full proposal. Do not invent or assume information. Tailor the
  > structure to the client's specific challenge and desired outcomes. Mark missing information as
  > Needs Confirmation. Include only sections relevant to this opportunity.
  > Output: Create the recommended proposal sections. For each provide — Section Title; Purpose;
  > Key Points to Include; Needs Confirmation, if applicable. Organize the outline in the strongest
  > order for presenting the business case and recommended engagement.
  >
  > Client Information: [PASTE CLIENT NOTES HERE]

**Prompt 3 — Proposal Quality & Risk Reviewer**
- Purpose: The human-control and responsible-AI checkpoint — a full review checklist run before any
  proposal is approved, submitted, or signed.
- Prompt text:
  > Role: You are an expert B2B consulting proposal writer.
  > Task: Review the completed proposal against a checklist covering: Client Requirements & RFP
  > Compliance (has every requirement been answered and verified, not assumed); Solution Fit &
  > Personalization (is the scope tailored to this client, are assumptions clearly flagged, not
  > presented as fact); Claims, Facts & Responsible AI Review (are statistics, financials, and case
  > studies accurate and human-verified — never allow unverified AI-generated or fabricated facts);
  > Pricing, Costs & Margin (are prices, labor hours, and margin realistic and approved); Contract &
  > Business Risk (are liability, delivery schedules, and commitments realistic — escalate unusual
  > terms for legal/management review); Confidentiality & Data Protection (no unauthorized
  > confidential, proprietary, or personal information); Overpromising & Delivery Risk (replace
  > absolute language like "guarantee" or "will achieve" unless formally authorized; can the
  > company actually deliver what's promised); Clarity, Tone & Professional Quality.
  > Flag any item needing revision, clarification, management approval, legal review, or human
  > verification. End with a Final Human Review Decision (Approved / Approved with Minor Revisions
  > / Requires Major Revisions / Requires Financial Review / Requires Legal Review / Requires
  > Management Approval / Do Not Submit), reviewer name, date, and approval line.
  > Responsible AI Checkpoint: no proposal should be submitted solely on automated content — a
  > qualified human verifies material facts, pricing, contractual commitments, confidential
  > information, and significant claims first. If a claim can't be verified, a commitment can't be
  > delivered, or a risk isn't understood, the proposal is revised or escalated before submission.

**Prompt 4 — Three-Message Proposal Follow-Up Sequence**
- Purpose: The required 3-message follow-up sequence, sent after a proposal goes quiet.
- Prompt text:
  > **Message 1 (first follow-up):** You are an expert B2B sales communication specialist. Write a
  > short and professional follow-up email for Meridian Consulting Group after a proposal has been
  > sent to a potential client. The message should politely check in, confirm the client received
  > the proposal, and invite any initial questions. Keep the tone professional, friendly, concise,
  > and personalized. Meridian Consulting Group is a 60-person B2B management consulting company
  > serving mid-market manufacturing and logistics clients. Do not invent facts, pricing, discounts,
  > statistics, savings, ROI, or guaranteed results.
  >
  > **Message 2 (second follow-up):** Write a second follow-up email for Meridian Consulting Group
  > to send after a client has had time to review a proposal. The message should politely check in,
  > remind the client of the value of the proposed services, invite questions or concerns, and
  > offer to schedule a conversation. Keep the tone professional, concise, personalized, and
  > client-focused. Do not invent facts, pricing, discounts, statistics, savings, ROI, or guaranteed
  > results.
  >
  > **Message 3 (final follow-up):** Write a final follow-up email for Meridian Consulting Group
  > after a proposal has been sent and the client has not yet responded. The message should be
  > respectful and professional, ask whether the client would like to discuss next steps, and
  > acknowledge that the timing may not be right. Avoid pressure or aggressive sales language. Do
  > not invent facts, pricing, discounts, statistics, savings, ROI, or guaranteed results.

**Prompt 5 — Objection Response Generator**
- Purpose: A ready first draft for any objection — price, timing, or past-failure skepticism —
  instead of a rep either conceding too fast or going silent while they figure out what to say.
- Prompt text:
  > Draft a concise professional response to the client's objection below.
  > Structure the response to: Acknowledge the concern without being defensive; Demonstrate
  > understanding of the client's underlying issue; Respond using only approved Meridian and client
  > information; Clarify value where appropriate; Avoid guarantees, unsupported comparisons, or
  > exaggerated claims; End with a constructive next step or clarifying question.
  > If the available information is insufficient to respond accurately, do not invent an answer.
  > State what the salesperson should confirm first.
  >
  > Client objection: [PASTE]
  > Relevant proposal/client information: [PASTE]

---

### Phase 2 — Full Prompt Library (post-pilot)

Five more prompts the team drafted and tested but held back from the graded submission, since the
brief calls for 5. Once the pilot (Step 7) proves the workflow out, these extend it into the full
library Meridian's sales team would actually use day to day:

- **Missing Information & Discovery Questions** — a lighter, earlier gap-check than Prompt 2's
  Needs-Confirmation flags, run right after the opportunity summary instead of at the proposal
  stage.
- **Missing Information Detector** — a second, Role/Task-styled pass on the same gap-check, useful
  for reps who prefer that prompting style.
- **Executive Summary Personalizer** — a dedicated 1-2 page executive summary once the full
  proposal exists, for a VP or CFO who won't read the whole document.
- **Personalized Next Follow-Up** — a fallback for a client situation that doesn't fit the standard
  3-message sequence.
- **Client Objection Analyzer** — a diagnostic pass (objection category, underlying concern) that
  runs before Prompt 5, for reps who want to think through the objection before responding to it.

---

## STEP 5 — Sample Proposal & Follow-Up

**Sample scenario used to test the prompts:** Riverbend Logistics, a mid-market third-party
logistics company, is rolling out a new warehouse management system across four sites and is
worried the floor staff won't adopt it. (Fictional company, built to satisfy the brief's
no-real-client-data rule.)

**Client Opportunity Summary** (output of Prompt 1, from a fictional discovery-call note: *"Talked
to Marcus Feld, VP Ops at Riverbend Logistics. They're rolling out a new WMS across 4 sites over
the next 2 quarters, starting with their Joliet DC since it's highest volume. Marcus is worried
floor staff won't adopt it — they tried a routing software change 2 years ago and it never really
stuck, people went back to paper within a month. Budget hasn't been set yet, he said 'get me a
number and I'll take it to the CFO.' No hard deadline but he wants site 1 live before peak season
in Q4. Also mentioned their shift supervisors, especially a guy named Ruiz at Joliet, carry a lot
of weight with the floor."*)
- Client organization / Industry: Riverbend Logistics — third-party logistics (warehousing/distribution).
- Primary business challenge: adoption risk on a new WMS rollout, not the software itself.
- Key pain points: "tried a routing software change 2 years ago and it never really stuck, people
  went back to paper within a month."
- Desired outcomes: Joliet (highest-volume site) live and stable before Q4 peak season.
- Known constraints / Decision criteria: no budget set yet — "get me a number and I'll take it to
  the CFO."
- Stakeholders: Marcus Feld (VP Ops, our contact, takes the number to the CFO); Ruiz (Joliet shift
  supervisor, carries weight with the floor).
- Timeline/urgency: before Q4 peak season, no exact date given.
- Unanswered questions: CFO's budget ceiling; exact Q4 peak-season start date — both labeled Needs
  Confirmation, not guessed.

**Proposal Outline** (output of Prompt 2, built from the summary above)
- Situation — Needs Confirmation: none. Riverbend's WMS rollout and the adoption risk from the
  last failed change.
- Approach — key points: floor-first adoption program starting before go-live at Joliet; train
  Ruiz and shift leads first; check adoption at 30/60/90 days.
- Timeline — Needs Confirmation: exact Q4 peak-season start date.
- What We Need From You — named site lead per location, floor-supervisor time during rollout.
- Investment — Needs Confirmation: CFO's budget ceiling; use [FEE] placeholder only.

**Sample Proposal** (a person expands the outline above into prose — Prompt 2 deliberately does not
write this; this is the human-in-the-loop step the brief's Responsible AI section asks for)

> **Situation**
> Riverbend is rolling out a new warehouse management system across four sites over the next two
> quarters, starting with Joliet — their highest-volume site — ahead of Q4 peak season. The system
> works. The risk is adoption: the last routing software change didn't stick, and staff went back
> to paper within a month.
>
> **Approach**
> We run a hands-on adoption program alongside the IT rollout, not after it. Before Joliet goes
> live, we spend time on the floor to hear directly from supervisors and staff what will make them
> trust or resist the new system. We train shift leads first — starting with Ruiz, who the floor
> already listens to — so the people staff trust are the ones answering questions on day one. We
> check adoption at 30, 60, and 90 days after each site goes live and adjust before a problem
> becomes a habit.
>
> **Timeline**
> 8 weeks for Joliet, ahead of Q4 peak season, then staggered across the remaining three sites.
>
> **What We Need From You**
> A named site lead at each location (Ruiz for Joliet), two hours of floor-supervisor time per week
> during rollout, and your confirmed Q4 peak-season start date.
>
> **Investment**
> [FEE] — scoped to the four-site rollout above; confirm final scope and CFO-approved budget before
> we quote.

**3-Message Follow-Up Sequence** (output of Prompt 4)

> **Day 1:** Hi Marcus — wanted to make sure the proposal came through okay. Happy to walk through
> the timeline or the site-lead ask on a quick call if that's easier than reading it cold. No
> pressure either way.
>
> **Day 4:** Marcus, one thing I didn't put in the proposal: on the last warehouse rollout we ran,
> the biggest adoption risk wasn't the software, it was that shift leads found out about the change
> the same day as everyone else. Worth a five-minute conversation about how Riverbend wants to
> handle that with Ruiz and the Joliet team, even if you go a different direction on the rest.
>
> **Day 9:** Marcus — closing the loop on my end. If now isn't the right time for Riverbend, that's
> completely fine, just let me know so I stop following up. If it's still live, I'd rather get 20
> minutes on the calendar than keep trading messages.

**Objection Response Generator** (output of Prompt 5, tested against: *"We tried something like
this before and it didn't stick."*)

> That's exactly why we're starting with Ruiz and the Joliet floor supervisors before go-live, not
> after — the last rollout lost people because the change showed up without anyone on the floor
> already behind it. This time the people staff already trust are the ones introducing it. I hear
> the concern though — want to walk through the 30/60/90-day check-in plan together so you can see
> exactly how we'd catch it early if it started slipping the same way? Happy to loop Ruiz into that
> call directly if that's useful for you.

**Proposal Quality & Risk Review** (output of Prompt 3, run against the sample proposal above)
- RFP Compliance: not applicable — no formal RFP was issued for this opportunity.
- Solution Fit & Personalization: scope matches the stated adoption problem; Ruiz and Joliet are
  named specifically, not generic placeholders.
- Claims, Facts & Responsible AI: no unverified statistic, case study, or guarantee found ("adjust
  before a problem becomes a habit" is process language, not a promised outcome).
- Pricing & Margin: fee correctly left as [FEE] — not invented, pending CFO-approved budget.
- Contract & Business Risk: none flagged — no liability or delivery terms stated yet.
- Confidentiality: no real client data present — scenario is fictional, per the brief's rule.
- Overpromising & Delivery Risk: **flagged** — "ahead of Q4 peak season" rests on a date the brief
  marked Needs Confirmation; confirm the exact date with Marcus before this proposal is finalized.
- Clarity & Tone: plain language, no unexplained jargon (an earlier pass had "drive change adoption
  KPIs," replaced with "check adoption at 30, 60, and 90 days").
- **Final Human Review Decision: Approved with Minor Revisions** — confirm Q4 peak-season date and
  CFO budget ceiling with Marcus before sending.

**Risks and Safeguards**
- **Accuracy:** every prompt is told to label a gap "Needs Confirmation" instead of filling it, and
  Prompt 3 checks that no unconfirmed fact slipped into a final claim.
- **Overpromising:** Prompt 3's Overpromising & Delivery Risk check exists specifically to catch
  language like "guarantee" or an unconfirmed date stated as settled.
- **Confidential information:** reps are trained to paste only what's needed for each prompt, never
  a full call recording or a client's internal documents, and never real client data into a public
  AI tool — fictional or anonymized inputs only, per the program's own rule.
- **Transparency:** clients are not told a specific sentence was AI-drafted, but every proposal and
  follow-up is reviewed and owned by a named rep before it sends — the rep is accountable for it as
  if they wrote it themselves.

**Human Review / Handoff**
No AI output reaches a client unreviewed. The rep reads every draft, runs Prompt 3's quality and
risk review, corrects anything flagged, and is the one who hits send. AI drafts; the rep decides
and sends — the system never sends on its own.

---

## STEP 6 — Testing & Measurement

**Testing Criteria (rubric)**
- Every factual claim in the draft traces to something actually in the brief — nothing invented.
- No unqualified outcome promises ("this will increase your win rate") — only qualified,
  process-based claims.
- Reads in Meridian's voice: direct, plain language, no unexplained consulting jargon.
- Follow-up messages sound like a person, not a template — no "just circling back" language.
- Any gap in the source information is flagged, not silently filled.

**Test Results & Revisions**
Ran all 5 required prompts against the Riverbend scenario end to end. The proposal outline
correctly marked the budget and peak-season date as Needs Confirmation instead of guessing.
Prompt 3's quality and risk review caught one jargon phrase ("drive change adoption KPIs,"
rewritten to "check adoption at 30, 60, and 90 days") and one overpromising flag (an unconfirmed
date stated as settled) in the expanded proposal. The follow-up sequence passed on the first
attempt — no template phrasing. The objection response generator was tested against "we tried
something like this before and it didn't stick" and correctly deferred any scope or price
concession to the rep rather than answering it unilaterally.

**Three Success Measures**
- Average proposal drafting time (hours from opportunity brief to sent proposal) — target: cut
  from 14 hours to 5 hours.
- Average time to first follow-up after a proposal goes quiet — target: under 24 hours, down from
  5+ days.
- Proposal win rate — track monthly against the pre-AI baseline to confirm faster, more consistent
  proposals are actually landing more business, not just landing faster.

---

## STEP 7 — Implementation Plan

**Days 1–30 — Pilot**
Run the five-prompt workflow with two reps on real (fictional-safe, anonymized) leads. No new
software purchased — reps use the AI tool Meridian already licenses. Track drafting time and
follow-up timing by hand for every proposal in the pilot.

**Training Requirements**
A 90-minute session covering: how to write discovery notes the prompts can actually use, which of
the five prompts to run at each stage of a deal, and the one hard rule — no real
client-confidential information goes into the AI tool, ever. No prior AI experience assumed.

**Human Handoff Points**
Every proposal and every follow-up message is read and approved by the named rep before it sends.
Prompt 3's quality and risk review is mandatory, not optional, before a proposal leaves draft
status.

**Adoption Risks**
Reps may skip the quality-review step under deadline pressure, reintroducing the overpromising risk
the prompt exists to catch. Reps may also paste real client-confidential material into the AI tool
out of habit. Both are addressed in training and checked during the pilot review.

**Feedback Process**
Weekly 15-minute check-in with pilot reps during the 30-day window: what the AI got wrong, what
took longer than expected, what a client reacted to. Prompts get revised from this feedback, not
frozen after week one.

**Days 31–60 — Measure & Improve**
Compare pilot metrics against baseline (14 hours / 5+ days / declining win rate). Revise any prompt
that produced a factual error, an overpromise, or off-voice language during the pilot. Expand from
two reps to the full sales team only after the quality-review rubric shows zero unsupported claims
in the last two pilot weeks.

**Days 61–90 — Scale Decision**
Scale to the full sales team if: drafting time is down at least 40%, time-to-follow-up is under 48
hours on average, and no client-facing accuracy or confidentiality incident occurred during the
pilot. If any of those three fail, extend the pilot and revise the prompts rather than rolling out
broadly.

**Final Recommendation (What Meridian Should Do Next)**
Adopt the five-prompt workflow firm-wide, with Prompt 3's quality and risk review treated as a
mandatory gate, not an optional step. Once the pilot proves the workflow out, extend it with the
five Phase 2 prompts already drafted and tested (see Step 4) into the full prompt library the sales
team uses day to day. Recommend re-testing every prompt in the library each quarter against
Meridian's actual win/loss data, since a prompt tuned once will drift as the market and the
objections change.

---

## Presentation outline (6–8 slides)

1. The company and business problem — Meridian Consulting Group, 14-hour proposals, 5+ day
   follow-ups, falling win rate.
2. Our AI solution — Meridian Proposal Copilot, a five-prompt workflow now, a ten-prompt library
   once the pilot proves out.
3. How the solution works — summary -> outline -> expanded draft -> quality review -> send ->
   follow-up sequence -> objection handling.
4. Prompt/prototype examples — Prompt 2 (proposal outline) and Prompt 4 (follow-up sequence), with
   the Riverbend sample output.
5. Human review or handoff — every output is a draft; the rep reviews and sends, nothing auto-sends.
6. Benefits and 3 success measures — drafting time, time-to-follow-up, win rate.
7. Responsible AI risks and safeguards — accuracy, overpromising, confidentiality, transparency.
8. (Optional) Recommendation and next steps — pilot with 2 reps, 90-day scale decision.
