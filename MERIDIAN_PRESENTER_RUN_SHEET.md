# Meridian Proposal Engine — Presenter Run Sheet
**Final Presentation: September 15, 2026.**

**Time limit:** the course brief (`AI Fundamentals Capstone Project Team 4.md`) states the final
presentation is **about 10 minutes**. The times below add to roughly that — adjust freely, this is
a suggested pacing, not a fixed script. The brief also recommends 6–8 slides; this deck runs 10 to
cover the added Prompt Library / Workflow Guide deliverables and the honest testing-status detail —
if time is tight, slides 6 and 9 are the easiest to compress or merge into their neighbors.

**Format:** one deck (`meridian-pitch-deck.html`), one live demo (`meridian-proposal-writer.html`).
André drives the deck and the demo from one laptop; each teammate speaks to their own slide when it
comes up, then hands back.

---

## Before you walk in

- [ ] Confirm `ANTHROPIC_API_KEY` is set in whatever environment you're presenting from, **or**
      decide now that you're presenting on saved outputs only (see Fallback Plan below) — don't
      find out live.
- [ ] Open `meridian-pitch-deck.html` and `meridian-proposal-writer.html` in two tabs before you
      start; don't navigate to them cold during the presentation.
- [ ] Click "Load Apex Manufacturing Demo" once in rehearsal and run all five stages end to end,
      including entering a missing-information answer, so you know what a full run looks and feels
      like today.
- [ ] Click "Reset Demo" after rehearsing, before the real run.
- [ ] Turn on **Presentation Mode** in the demo before presenting (larger text, hides dev info).
- [ ] Confirm who is actually driving the keyboard during the demo (recommended: André, per his
      role below) so there's no fumbling over who clicks what.

---

## Speaking assignments

**André — opens, drives the demo, explains the handoff, closes.**

**Ali — Slide 4 (How It Works), her stage on Slide 6 (Testing Method & Findings).**
**Angelica — her stage on Slide 6.**
**Stephanie — her stage on Slide 6.**
**Ashley — her stage on Slide 6.**
**Edwin — his stage on Slide 6.**

Testing commentary on Slide 6 is assigned to whoever actually ran that test — this isn't
interchangeable:

| Stage | Speaker | What to say (from real evidence, not a script to read verbatim) |
|---|---|---|
| Opportunity Summary | **Ali** | "I tested mine against Apex and found a real problem: it labeled an unstated budget as a 'Known Constraint' instead of flagging it as unknown. I fixed that by telling the prompt exactly what counts as a constraint. That's a real revision, not a hypothetical one." |
| Missing Information Detector | **Angelica** | "Mine came back clean on the first test — it separated what we knew from what we didn't, and the questions it suggested were ones a salesperson would actually ask. I didn't need to change anything." |
| Proposal Outline Builder | **Stephanie** | "I have real output from testing mine against Apex — a full ten-section outline with the gaps correctly marked Needs Confirmation. I don't have a formal written review on file for it the way the others do, so that's one thing we're flagging as still open, not something I'm going to overstate tonight." |
| Proposal Writer | **Ashley** | "My first draft didn't clearly separate a possible cause from a confirmed fact — it read like scheduling was already blamed for the delays. I fixed the prompt to explicitly require that distinction, and the revised version does." |
| Follow-Up Prompt | **Edwin** | "Mine passed on the first test — human-sounding, personalized to Apex, a clear next step in each message, nothing invented. No revision needed." |

If a listed speaker isn't present, André reads their line as written above — don't invent new
claims on the fly.

---

## Suggested run-through (~10 minutes, adjustable)

| Time | Slide(s) | Who | Notes |
|---|---|---|---|
| 0:00–0:30 | 1 (Cover) | André | Team intro, one sentence: who Meridian is, what we built. |
| 0:30–1:15 | 2 (Problem) | André | 14 hrs, 5+ days, falling win rate. Don't editorialize — the numbers carry it. |
| 1:15–2:15 | 3 (Solution) | André | Say "prototype vs. workflow" distinction out loud — this is the one nuance easy to blur under time pressure. |
| 2:15–3:00 | 4 (How It Works) | Ali | Walk the five stages and owners; land on "every arrow is a human checkpoint." |
| 3:00–4:15 | 5 (Apex Example) → **Open Demo** | André | Read the four cards fast, then click Open Demo and transition live. |
| 4:15–6:15 | **Live demo** | André drives | See Demo Segment below. |
| 6:15–7:30 | 6 (Testing) | Ali, Angelica, Stephanie, Ashley, Edwin | Each speaks their own line above, ~15 seconds each. André reads the peer-review gap-note. |
| 7:30–8:15 | 7 (Human Review & Measures) | André | State the two scope notes (target vs. measured; follow-up-timing ambiguity) plainly — this is a credibility moment, not a weakness to hide. |
| 8:15–8:45 | 8 (Responsible AI) | André | Fast, four items, don't over-explain. |
| 8:45–9:30 | 9 (What Meridian Receives) | André | Click through Open Library and Download Guide live if time allows, otherwise just name the three deliverables. |
| 9:30–10:00 | 10 (Next Steps) | André | Read the recommendation and the unresolved-items note. Closes the presentation. |

---

## Demo segment (~2 minutes) — use ONE prepared example, don't wait on five live generations

Live-generating all five stages during a timed presentation risks running long or hitting a network
hiccup in front of the room. Structure the demo segment as:

1. Click **Load Apex Manufacturing Demo** (pre-fills Stage 1's notes).
2. Run **Stage 1 live** — this is the one stage worth actually generating in front of the room, to
   prove it's real and not a slideshow. Narrate while it loads: "This is a real call to Claude,
   happening right now."
3. For **Stages 2–5**, click **Use Saved Demo Output** instead of running live — narrate: "This is
   the same owner's actual captured test result, not a live call, so we don't burn the room's time
   waiting on four more round-trips." The badge will visibly read "Saved example — not generated
   live" — don't hide that label, it's the honest disclosure that makes the shortcut fine to take.
4. Click **Approve and Continue** through each stage so the stage bar fills in and the group sees
   the chain, not just one screen.
5. If time allows, briefly show the **Prompt Library** button and the **Post-Proposal Follow-Up
   Tracker** at the bottom — click "Mark Proposal Sent," point out the status badge, and say
   explicitly: "this doesn't send anything — it's a local timer for the demo."

---

## Fallback plan if the demo breaks or the API key isn't working

- Every stage has a **saved, accurately labeled example output** — use "Use Saved Demo Output" for
  all five stages instead of any live call. The demo works entirely offline this way.
- If the page itself won't load (no laptop, no wifi, projector issue), fall back to reading the
  actual captured outputs straight from `meridian-prompt-library.md` and
  `Meridian_Team_Unedited_Responses.md` — the same real text, just off a static file instead of the
  interactive page. Say so if you do this: "the live demo isn't cooperating, so I'm reading the same
  real test output from our library file instead."
- Never present a screenshot or saved output as if it were generated live in the room. The badge
  distinction ("Live AI output" vs. "Saved example — not generated live") exists specifically so
  this never has to be fudged.

---

## What NOT to say

- Don't say the cross-team peer review is done — it isn't confirmed. Say "self-tested and
  self-reviewed by each owner" and name the peer-review gap if asked.
- Don't say Stephanie's stage has a documented review — it doesn't. Say what's true: real output on
  file, review write-up not yet documented.
- Don't say "7 hours" or "under 24 hours" as achieved results — they're targets, said as targets.
- Don't say the follow-up tracker sends anything, reminds anyone, or schedules anything — it
  records a local timestamp only.
- Don't say the Workflow Guide gives an AI "memory" — it's a written document a person updates by
  hand, not something any AI tool reads automatically.
