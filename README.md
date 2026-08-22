# Capstone Preview Generator

A single-file web app that turns any capstone team's deliverables into a polished,
consulting-deck-style preview, live, in the browser. Built for the ClimbHire AI Fundamentals
capstone's 5 fixed deliverable roles (business problem, AI solution, sample proposal, testing,
implementation) — any team fills in their own names, no coding or GitHub account needed.

This tool doesn't call any AI model itself — it just formats what the team already wrote.

## How it's organized

The wizard is one step per real deliverable, not one step per generic topic. Each team member
works through their own step — the fields map directly to a real capstone deliverable — then pastes
or types their answers in and uploads their own slide images if they built them. Everything combines
into one HTML presentation automatically.

| Step | Whose deliverable | What's in it |
|---|---|---|
| 1. Upload Your Document | Whole team | Upload the instructor brief; auto-fills what it can |
| 2. Team & Project Basics | Whole team | Team number, 6 names/roles, client, objective, logo |
| 3. Business Problem | Team Member 3 | Problem summary, key challenges, baseline metrics, current vs. proposed workflow, before/after — plus their slides |
| 4. AI Solution | Team Member 2 | Solution name/description, the 5 tested prompts — plus their slides |
| 5. Sample Proposal & Follow-Up | Team Member 4 | Sample proposal, 3-message follow-up, proposal quality review, Responsible AI risks/safeguards, human review — plus their slides |
| 6. Testing & Measurement | Team Member 5 | Testing criteria (rubric), test results & revisions, 3 success measures — plus their slides |
| 7. Implementation Plan | Team Member 6 | Pilot, training, handoff points, adoption risks, feedback process, measure & improve, scale decision, final recommendation — plus their slides |
| 8. Review & Export | Whole team | Save & Get Link, Export HTML |

Team Member 1 (Team Lead / Project Manager) doesn't get their own content section — that role is
pure coordination (meetings, schedule, tracking deliverables), not a content deliverable.

## Saving and sharing — no files to pass around

Click **Save & Get Link** on Step 8 (or any time) and the tool saves the whole project — every
field, the logo, and everyone's slide images — to the cloud and shows a link. Send that link to a
teammate; opening it loads the project exactly as it was left, ready to keep editing. No JSON file,
no email attachment, no GitHub account on their end.

Saving again reuses the same link and just updates it in place — the link never changes for a given
project. Anyone with the link can open and edit it; there's no login and no passcode, so only share
the link with your own team.

Work also **autosaves in this browser** as a safety net against an accidental refresh or closed tab
— that's separate from Save & Get Link and doesn't carry across computers or browsers on its own.

**Export HTML** downloads a finished, standalone HTML copy of the preview — for submitting to your
instructor. It's not editable back into the form; use Save & Get Link for that.

## What it does

- **Upload your project brief** (Step 1) and it automatically pulls in Client Name, Problem
  Summary, Objective, and Responsible AI topics — only what's actually written in the document,
  nothing invented. It also finds the specific numbers inside the problem statement (e.g. "14
  hours", "more than five days") and pre-fills them into Baseline Metrics, and starts the
  Before/After Comparison with a "Before:" line for each one.
- **Team & Project Basics (Step 2)** is where you type in your own 6 names, roles, and
  responsibilities. Team Members 2-6 each own one of the 5 fixed deliverable steps — the hint next
  to each name field says which step.
- **Upload your team roles & responsibilities doc (Step 2, optional)** and it fills in all 6
  names, roles, and responsibilities automatically — reads either a heading-per-person doc (a
  "### Name" heading, a Role line, and an "Owns:" list, like this project's own CONTEXT.md) or a
  plain "Name — Role" list (like a CLAUDE.md-style team list). Only overwrites what the document
  actually contains; anything not found is left as-is for you to fill in or edit.
- **Every deliverable step shows its real owner.** Whatever name is typed into that member's Step 2
  field shows up as the **Owner: [Name]** tag on the matching slide(s) — live, as you type.
- **Each person's step has its own slide upload.** If someone already built their own slide(s)
  elsewhere (Google Slides, PowerPoint, Canva), export as PNG/JPG and upload it right in their own
  section — it's embedded directly into the deck immediately after their own content, not lumped
  into one dump at the end. Skip it and Export HTML still generates the full deck automatically from
  the text fields.
- **Testing is split into rubric + results.** Testing Criteria (the rubric — what outputs were
  scored against) and Test Results & Revisions (what was found and changed) render as two labeled
  parts of the same slide.
- **Implementation is a real phased plan, not a vague "next steps" list.** Days 1-30 Pilot,
  Training Requirements, Human Handoff Points, Adoption Risks, Feedback Process, Days 31-60
  Measure & Improve, Days 61-90 Scale Decision, then a Final Recommendation — each is its own
  field, walking through building an actual rollout plan one piece at a time.
- **Every step shows the actual question your brief asks.** If the uploaded brief has a section
  like "Answer these questions...", the exact questions are pulled out and shown, in quotes, next
  to the field that answers each one.
- **Before / After Comparison automatically becomes a bar chart** when every line has a real,
  comparable number (it understands common units like hours/minutes/days). If anything doesn't
  cleanly compare, it falls back to a plain list instead of showing something misleading.
- **Need help with this?** buttons on content fields open guiding questions and a worked example —
  static, built-in guidance, not an AI call.
- **Team / Company Logo** (Step 2, optional) — embedded directly, travels with Save & Get Link and
  Export HTML.
- The preview is styled like a minimal MBB/Big-Four consulting deck — a cover slide with logo and
  confidentiality line, an **Agenda** listing only the sections actually filled in, an
  **Executive Summary**, and a numbered slide for every section, each with a page number and
  confidentiality footer.
- **Headlines, not labels.** Where a section has a clear point to make, its slide title is the
  actual first sentence of what was written — pulled and trimmed, never rewritten or invented.
- Sections and fields left blank never show up in the preview — no empty placeholders.
- A workflow line like `Sales Notes -> Opportunity Brief -> Proposal Draft -> Human Review` turns
  into connected workflow boxes automatically.
- **Clear** wipes the form and browser autosave (asks to confirm first).

## How to open it

Just open the published link (see "Where to find it" below) — no install, no account, nothing to
download. It also still works as a plain local file: double-click `index.html` and it opens in your
default browser, with everything except Save & Get Link working fully offline.

## How to use it

1. Open the link (or `index.html`).
2. **Step 1 — Upload Your Document.** Upload the instructor's project brief (`.txt` or `.md` works
   best, or paste the text). No document handy? Click **Skip — I'll fill this in myself**.
3. **Step 2 — Team & Project Basics.** Type in your team number, all 6 names, and check the roles —
   edit if your team splits work differently. Or upload your team roles & responsibilities doc to
   fill all 6 in automatically. Fill in your team name, the client, the objective, and a logo
   (optional).
4. **Step 3** — Problem Summary, Key Challenges, Baseline Metrics, Current Workflow, Proposed
   Workflow (both `Step 1 -> Step 2 -> Step 3`, arrows), Before/After Comparison (`Before: ...` /
   `After: ...`, one per line). Upload slides if that person built any.
5. **Step 4** — Solution Name/Description, then the 5 numbered prompt slots (Purpose + Text each —
   e.g. Opportunity Brief, Proposal Draft, Proposal Quality Review, Follow-Up Sequence, Objection
   Handling). Upload slides if built.
6. **Step 5** — Sample Proposal, the 3 Follow-Up Messages, Proposal Quality Review, Risks and
   Safeguards, Human Review / Handoff. Upload slides if built.
7. **Step 6** — Testing Criteria (the rubric, one per line), Test Results & Revisions, Three Success
   Measures (pick 3, one per line). Upload slides if built.
8. **Step 7** — Days 1-30 Pilot, Training Requirements, Human Handoff Points, Adoption Risks,
   Feedback Process, Days 31-60 Measure & Improve, Days 61-90 Scale Decision, Final Recommendation.
   Upload slides if built.
9. **Step 8 — Review & Export.** Check the live preview on the right at any point. Click
   **Save & Get Link** for a shareable cloud checkpoint — send the link to a teammate to hand off.
   Click **Export HTML** for the finished, standalone copy to submit.

You can move Back and Next between steps at any time — nothing is locked in until export. Special
characters, long paragraphs, and multi-line text are all safe to paste in — the tool escapes
everything so it can't break the page.

### About the document upload

Because this is a single self-contained HTML file with no external libraries, no server, and no
AI API calls, it can only reliably read plain text — `.txt` and `.md` files, or pasted text. It
cannot parse `.docx` or `.pdf` directly; copy the text out and paste it in instead. It never
guesses or invents content — only what's actually in the document gets filled in.

### About slide uploads

Each step has its own upload widget — up to 10 images, 3MB each, 10MB total per step. Export slides
as PNG or JPG from Google Slides, PowerPoint, or Canva, then upload them in order in that step.
They're embedded directly into the preview, Export HTML output, and Save & Get Link, right after
that step's own content — so flipping through the final deck reads as one continuous flow.

### About the logo and design

The logo is embedded directly. Keep it under ~500KB so it doesn't bloat Save & Get Link or autosave.

The layout is styled after the minimal house style shared by MBB and Big Four consulting decks —
not a copy of any specific firm's proprietary template: a cover slide, an Agenda, one idea per
slide with a page number and confidentiality line, and headline titles that state a conclusion
instead of just naming a topic. The **Executive Summary** appears once a Problem Summary, a
Solution, or Success Measures are entered — it doesn't invent anything, it re-displays those three
pieces together. The Agenda and the numbered slides that follow are always built from the same
underlying list, so they can never drift out of sync, and blank sections are skipped so numbering
stays consecutive.

### A note on autosave vs. Save & Get Link

Autosave only remembers work in the one browser, on the one computer, where it was typed — it's a
safety net against an accidental refresh or closed tab, not a substitute for **Save & Get Link**.
Click **Save & Get Link** after your section so the next teammate can open the link and continue —
autosave alone won't carry across machines or browsers.

### How this maps to the capstone submission

| Requirement | Field(s) | Step |
|---|---|---|
| Team number and members | Step 2 | Whole team |
| Company and business problem | Problem Summary, Key Challenges, Baseline Metrics | Step 3 |
| Current vs. proposed workflow | Current Workflow, Proposed Workflow | Step 3 |
| Before/after comparison | Before / After Comparison | Step 3 |
| Recommended AI solution and why | Solution Name, Solution Description | Step 4 |
| 5 tested prompts | Prompt 1-5 Purpose + Text | Step 4 |
| Sample proposal | Sample Proposal | Step 5 |
| 3-message follow-up sequence | Follow-Up Message 1, 2, 3 | Step 5 |
| Quality review of proposal outputs | Proposal Quality Review | Step 5 |
| Responsible AI risks and safeguards | Risks and Safeguards | Step 5 |
| Human review / handoff | Human Review / Handoff | Step 5 |
| Testing rubric and results | Testing Criteria, Test Results & Revisions | Step 6 |
| 3 success measures | Three Success Measures | Step 6 |
| Pilot recommendation | Days 1-30 — Pilot | Step 7 |
| Training requirements | Training Requirements | Step 7 |
| Human handoff points (rollout) | Human Handoff Points | Step 7 |
| Adoption risks | Adoption Risks | Step 7 |
| Feedback process | Feedback Process | Step 7 |
| Measure & improve | Days 31-60 — Measure & Improve | Step 7 |
| Scale/no-scale decision criteria | Days 61-90 — Scale Decision | Step 7 |
| Recommendation | Final Recommendation | Step 7 |
| Full slide deck | Each step's own slide upload, or let Export HTML build it automatically | Everyone |

## Where to find it

Published on GitHub Pages so anyone can open it with just a link — no GitHub account, no install:
`https://<username>.github.io/<repository-name>/` (fill in once published).

The tool runs entirely in the visitor's browser. Only **Save & Get Link** talks to a server (the
Supabase project below) — everything else stays local to the tab.

## The Supabase project behind Save & Get Link

One small free Supabase project backs Save & Get Link — no logins, since teams need zero setup on
their end. The project URL and its public "anon" key are embedded directly in `index.html` (the
anon key is meant to be public — Supabase's real access control is row-level security policy, not
key secrecy).

Two objects back this:

- **Table `capstone_projects`** — `code` (share code, primary key), `data` (jsonb — every field plus
  image URLs), `updated_at`. Public read/insert/update policies (no logins).
- **Storage bucket `capstone-slides`** — logo and slide images, uploaded under `<code>/...` paths.
  Public read/insert/update policies. Keeping images in Storage instead of the jsonb row keeps the
  free tier's 500MB database limit a non-issue; the 1GB Storage / 2GB bandwidth free-tier caps are
  more than enough for a cohort of small teams.

Setup SQL (run once in the Supabase SQL editor if this project is ever recreated):

```sql
create table capstone_projects (
  code text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table capstone_projects enable row level security;
create policy "public read" on capstone_projects for select using (true);
create policy "public write" on capstone_projects for insert with check (true);
create policy "public update" on capstone_projects for update using (true);
```

Then create the `capstone-slides` Storage bucket (public), with public insert/select/update storage
policies for that bucket.

If the project ever needs to be recreated, re-run the SQL above, recreate the bucket, and swap the
`SUPABASE_URL` / `SUPABASE_ANON_KEY` constants near the top of the cloud-save `<script>` block in
`index.html` — everyone's next Save & Get Link just starts a fresh project (old links stop
resolving).

## Publishing it with GitHub Pages

1. Create a repository on GitHub and upload `index.html` (and this `README.md`).
2. In the repository, go to **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main`
   branch and the `/ (root)` folder, then save.
4. Wait a minute or two, then refresh the Pages settings — GitHub shows the live URL, usually
   `https://<username>.github.io/<repository-name>/`.
5. Share that URL with the cohort. Opening it works exactly like the local file, plus Save & Get
   Link now works for anyone with the link.
