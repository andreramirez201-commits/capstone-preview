# Meridian Proposal Copilot — Prompt Library
Restructured to match the format the teacher's example uses: TASK / CONTEXT / REFERENCES / OUTPUT
REQUIREMENTS per prompt, explicitly chained (each prompt names what it needs from the one before
it, and refuses to run without it), plus a companion "how to use" instruction document.

This is the same 5 prompts as `team4-content.md` — same content, same test case (Riverbend
Logistics) — restructured for rigor, not replaced. If the wording of a prompt changes here, update
`team4-content.md` to match, and vice versa, so the two files never drift apart.

---

## INSTRUCTIONS — HOW TO USE THE MERIDIAN PROPOSAL COPILOT PROMPTS

### OVERVIEW

Five prompts that work together to turn a discovery call into a sent proposal, a follow-up
sequence, and a ready objection response:

- **Step 1: Summarize the opportunity** (Prompt 1) — turns raw notes into a clean, structured brief.
- **Step 2: Build the outline** (Prompt 2) — structures the proposal; a person expands it into full prose.
- **Step 3: Review before sending** (Prompt 3) — the mandatory quality and risk checkpoint.
- **Step 4: Follow up** (Prompt 4) — a 3-message sequence if the client goes quiet.
- **Step 5: Handle objections** (Prompt 5) — a ready first draft for any pushback.

---

### STEP 1: OPPORTUNITY SUMMARY

**HOW TO USE:**
1. Choose your AI tool: Claude or ChatGPT — whatever Meridian's team already licenses.
2. Copy and paste Prompt 1 into your AI chat tool.
3. Paste your discovery call notes, emails, or CRM notes where indicated.
4. Press Enter.
5. Copy the completed summary.
6. Keep this summary for Step 2.

---

### STEP 2: PROPOSAL OUTLINE

**HOW TO USE:**
1. Copy and paste Prompt 2 into your AI chat tool.
2. Paste the Step 1 summary where indicated.
3. Press Enter.
4. Copy the outline.
5. A person expands the outline into a full proposal draft, in the client's own language and
   Meridian's voice.
6. Keep both the outline and the expanded draft for Step 3.

---

### STEP 3: QUALITY & RISK REVIEW

**SETUP REQUIRED:** Have the full, human-expanded proposal draft ready — this prompt is written to
refuse an outline alone; it needs finished prose to check.

**HOW TO USE:**
1. Copy and paste Prompt 3 into your AI chat tool.
2. Paste the full proposal draft where indicated.
3. Press Enter.
4. Read every flagged item. Fix anything flagged before sending.
5. Do not send until the Final Human Review Decision is "Approved" or "Approved with Minor
   Revisions" and any revisions are made.

---

### STEP 4: FOLLOW-UP SEQUENCE

**HOW TO USE:**
1. Copy and paste Prompt 4 into your AI chat tool.
2. Paste the opportunity summary and the sent proposal where indicated.
3. Press Enter.
4. Review each message before sending — check tone, and confirm no fact was invented.
5. Send Message 1 on Day 1, Message 2 on Day 4, Message 3 on Day 9 if there's still no response.

---

### STEP 5: OBJECTION RESPONSE

**HOW TO USE:**
1. Copy and paste Prompt 5 into your AI chat tool.
2. Paste the client's exact objection and the relevant proposal/client information.
3. Press Enter.
4. Confirm the response doesn't concede price or scope on its own — that decision stays with the rep.
5. Edit for voice, then send.

---

### TROUBLESHOOTING

**"The AI invents information I didn't give it"**
Stop and restart the prompt with the missing detail added — never let the rep fill the gap by
guessing either.

**"Prompt 3 doesn't flag anything, but the proposal still feels off"**
Prompt 3 checks against a fixed checklist — it won't catch a tone or strategy problem outside that
checklist. That judgment stays with the rep.

**"The follow-up sequence sounds like a template"**
Add more specific detail from the opportunity summary into the prompt's context — the more
specific the input, the less generic the output.

**"Prompt 5 concedes on price without being asked"**
Re-run it — the prompt is instructed not to do this. If it recurs, flag the exact response to the
team lead.

---

### QUICK EXAMPLE

Need: Riverbend Logistics — a WMS rollout at risk of the same adoption failure as a past change
effort.

1. Run Prompt 1 → paste discovery notes → get the opportunity summary.
2. Run Prompt 2 → paste the summary → get the outline → a person expands it into a full proposal.
3. Run Prompt 3 → paste the full proposal → get the review → fix the flagged items → send.
4. If no response by Day 9 → Run Prompt 4 → paste summary + sent proposal → get 3 messages → send
   on schedule.
5. If an objection comes in → Run Prompt 5 → paste the objection → get a drafted response → edit
   for voice → send.

---

## PROMPT 1: Client Opportunity Summary

**TASK:**
You are a sales operations analyst for Meridian Consulting Group, a B2B management consulting firm
serving mid-market manufacturing and logistics clients. Turn the discovery notes below into a
structured opportunity summary. Do not provide any other comment before or after the summary.

**CONTEXT:**
- Company: Meridian Consulting Group, a 60-person B2B management consulting firm based in Chicago.
- This is Step 1 of a five-step chained workflow — its output becomes the required input to Prompt 2.
- Only use what is explicitly stated in the notes provided.

**REFERENCES:**
- Discovery notes: [PASTE DISCOVERY NOTES, EMAILS, OR CRM NOTES HERE]
- If no notes are provided, ignore all other instructions and respond only with: "Please paste the
  discovery notes, emails, or CRM notes for this opportunity before I can build a summary."

**OUTPUT REQUIREMENTS:**
Create a structured summary with these fields: Client organization; Industry; Primary business
challenge; Desired outcomes; Key pain points (verbatim quotes where possible); Known constraints;
Decision criteria; Stakeholders mentioned; Timeline or urgency; Questions that remain unanswered.
- Do not invent missing information.
- Label anything unknown as "Needs Confirmation."
- This summary becomes the required input to Prompt 2.

---

## PROMPT 2: Proposal Outline Builder

**TASK:**
You are an expert B2B consulting proposal writer for Meridian Consulting Group. Build a customized
proposal outline from the opportunity summary provided — structure only, not the finished
proposal. Do not provide any other comment besides the outline.

**CONTEXT:**
- Company: Meridian Consulting Group, serving mid-market manufacturing and logistics clients.
- Previous step: an opportunity summary has been produced (Prompt 1).
- A person expands this outline into full prose; that expanded draft becomes the required input to
  Prompt 3.

**REFERENCES:**
- Opportunity summary: [PASTE OUTPUT OF PROMPT 1]
- If no summary is provided, ignore all other instructions and respond only with: "Please paste the
  opportunity summary from Prompt 1 before I can build a proposal outline."

**OUTPUT REQUIREMENTS:**
For each section, provide: Section Title; Purpose; Key Points to Include; Needs Confirmation (if
applicable).
- Do not write the full proposal.
- Do not invent or assume information beyond the summary.
- Tailor the structure to the client's specific challenge, not a generic template.
- Organize sections in the strongest order for the business case.

---

## PROMPT 3: Proposal Quality & Risk Reviewer

**TASK:**
You are the responsible-AI checkpoint for Meridian Consulting Group's proposal process. Review the
human-expanded proposal draft against a fixed checklist before it is approved for sending. Do not
provide any other comment besides the completed checklist.

**CONTEXT:**
- Company: Meridian Consulting Group.
- Previous steps: a proposal has been drafted from the Prompt 2 outline and expanded into full
  prose by a person.
- This is the mandatory gate — nothing proceeds to Prompt 4 or Prompt 5 without this review.

**REFERENCES:**
- Proposal draft: [PASTE THE HUMAN-EXPANDED PROPOSAL]
- If no draft is provided, ignore all other instructions and respond only with: "Please paste the
  proposal draft before I can run the quality and risk review."

**OUTPUT REQUIREMENTS:**
Review against: Client Requirements & RFP Compliance; Solution Fit & Personalization; Claims, Facts
& Responsible AI (never allow an unverified or fabricated fact); Pricing, Costs & Margin; Contract
& Business Risk; Confidentiality & Data Protection; Overpromising & Delivery Risk; Clarity, Tone &
Professional Quality.
- Flag every item needing revision, quoting the exact sentence.
- End with a Final Human Review Decision: Approved / Approved with Minor Revisions / Requires
  Major Revisions / Requires Financial Review / Requires Legal Review / Requires Management
  Approval / Do Not Submit.
- If a category has no issue, say so plainly — do not invent one to seem thorough.

---

## PROMPT 4: Three-Message Follow-Up Sequence

**TASK:**
You are an expert B2B sales communication specialist for Meridian Consulting Group. Write a
3-message follow-up sequence to send after a reviewed proposal goes quiet. Do not provide any other
comment besides the three messages.

**CONTEXT:**
- Company: Meridian Consulting Group, a 60-person B2B management consulting firm serving
  mid-market manufacturing and logistics clients.
- Previous step: the proposal has passed Prompt 3's review and has been sent.

**REFERENCES:**
- Opportunity summary and sent proposal: [PASTE FROM PROMPT 1 AND THE SENT PROPOSAL]
- If no context is provided, ignore all other instructions and respond only with: "Please paste the
  opportunity summary and sent proposal before I can draft the follow-up sequence."

**OUTPUT REQUIREMENTS:**
- Message 1 (Day 1): short, no pressure, confirm receipt, invite questions.
- Message 2 (Day 4): add one piece of new value, not just "checking in."
- Message 3 (Day 9): direct close-or-defer question, respectful, no pressure.
- Do not invent facts, pricing, discounts, statistics, savings, ROI, or guaranteed results.
- Each message under 100 words, written like a person.

---

## PROMPT 5: Objection Response Generator

**TASK:**
You are an expert B2B sales communication specialist for Meridian Consulting Group. Draft a
response to a specific client objection. Do not provide any other comment besides the response.

**CONTEXT:**
- Company: Meridian Consulting Group.
- Previous steps: a proposal has been sent and reviewed; the client has now raised a specific
  objection.

**REFERENCES:**
- Client objection, exact words: [PASTE]
- If no objection is provided, ignore all other instructions and respond only with: "Please paste
  the client's exact objection before I can draft a response."
- Relevant proposal/client information: [PASTE]
- If this is not provided, note in the response what the salesperson should confirm first, rather
  than inventing an answer.

**OUTPUT REQUIREMENTS:**
- Acknowledge the concern without being defensive.
- Respond using only approved Meridian and client information.
- Avoid guarantees, unsupported comparisons, or exaggerated claims.
- Do not concede price or scope — flag that decision for the rep instead.
- End with a constructive next step or clarifying question.
