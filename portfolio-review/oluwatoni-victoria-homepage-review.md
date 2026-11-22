# Homepage review: Oluwatoni Victoria

Reviewed 22 November 2026 (second review; the first scored 71.0) | Input: local repo `/home/user/veeportfolio` at the deployed commit, rendered in a headless browser | Audience: assumed hiring managers and recruiters for brand, communications and partnerships roles at media, agency and consumer-brand companies, plus potential partners | Target role and level: not specified, level fit unknown

## A. Overall read

The homepage now does its routing job well. Within the first viewport a reviewer knows the role, the employer and a credible team award, and the four partnership cards that follow each state a personal role plus a result or focus, with Pulse Fiesta directly after as the brand proof. Every fix from the first review landed: the award is attributed to the team with a stated role, keyboard focus no longer enters the hidden menu, LinkedIn is available, and the three overlapping sections are one. What remains is smaller: Moonshot is the only card without an outcome, a few lines repeat, and the "Recent work" ticker is read twice by screen readers.

## B. Evidence and limitations

- **Reviewed:** `index.html`, full page, light mode. Screenshots in `screenshots/`: `home-desktop-1440x900-initial.png`, `home-desktop-1440-full.png`, `home-mobile-390x844-initial.png`, `home-mobile-390-full.png`, `home-focus-sample.png` (all refreshed for this review).
- **Viewports:** 1440 x 900 desktop, 390 x 844 mobile (touch emulation).
- **Tested:** nav "Brand work" opens `brand-work.html`; all four "View case study" buttons open the matching pages in `partnerships/`; "Explore the brand portfolio" opens `brand-work.html`; a 14-step keyboard Tab pass from the top (focus goes from "Let's talk" straight to the hero buttons); reduced motion emulated (entrance animations and the logo marquee stop); no horizontal overflow at 390 px; image alternatives counted (34 images: 0 missing alt, 13 empty alt, all on the duplicated marquee copy, the rest descriptive).
- **Not tested:** the live Vercel URL itself (unreachable from the review environment; the local build is the deployed commit); Instagram, LinkedIn and Gmail destinations; screen-reader output; load speed and contrast (not measured).
- **Assumptions:** visitors are hiring for, or partnering with, a brand and partnerships professional in the Nigerian and wider African media and consumer market.
- The 10 and 60 second passes below are review exercises, not measurements of real recruiter behavior.

## C. First impression and skim

**Pass A, first impression (initial viewport, 1440 x 900):**
- What kind of professional: "Brand, Communications & Partnerships Strategist" and "Events & Partnerships Manager at Pulse" make the role clear. The headline "I build brands and experiences that connect." is warm but general; the supporting line carries the specifics.
- What looks central: events and partnerships, through the portrait tag, the "7K+ Pulse Fiesta attendees against a 4,000 target" stat and the The Juice note card.
- Reason to keep looking: "Part of Pulse Africa's WAN-IFRA award-winning team, Content Strategy Analyst, User Needs Impact Project 360" is now specific and correctly attributed.
- Obvious next step: "See the partnerships" is clearly labelled and is the right route for a reviewer.

**Pass B, skim (full page):**
- Project I would open first, and why: The Juice x Lagos Cocktail Week, because it shows two outcomes ("100+" newsletter subscribers, "+88.3%" Instagram growth during the activation period) and "I led the activation". ART X Lagos is a close second with named interviewees.
- Fit with intended role: strong. Partnerships, a featured brand campaign, a strengths section with proof lines, testimonials and published writing all point the same way.
- Personal contribution vs team or company results: clear on all four cards and in the award line. Attendance and growth figures are presented as event or account results, not personal ones, which is the right framing.
- Career info and contact route: email (Gmail compose) and LinkedIn in the final card and footer; no CV link.
- Still uncertain: what the Moonshot partnership produced; whether the "100+" at The House covers both events or one.

**Recruiting lens:** Role, employer, team award and LinkedIn are all within easy reach, and the claims read as honest. A CV link would save one step, but LinkedIn covers the core need.

**Design hiring-manager lens (here, a brand or partnerships lead):** The partnership cards and the Pulse Fiesta brief, shift and result show commercial and strategic judgment in a scannable way. The new "What I do" cards tie each strength to named work, which is stronger than the previous three separate sections.

## D. Scorecard

| Category | Weight | Rating (0-5) | Points | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| A. Positioning and role relevance | 15 | 4 | 12.0 | Role, employer and team award clear in the first viewport; headline general. | High |
| B. Project selection and previews | 20 | 4 | 16.0 | Four partnership cards with role, result or focus, clip and case-study link; Moonshot lacks an outcome. | High |
| C. Credibility and attribution | 15 | 4 | 12.0 | Award attributed to the team with role; Juice metric qualified; named interviewees at ART X. | High |
| D. Visual craft and art direction | 20 | 4 | 16.0 | Consistent type, pastel stacked cards, real visuals; clip previews are small stills shown larger. | Medium |
| E. Content hierarchy and scanning | 10 | 4 | 8.0 | Overlap merged, Pulse Fiesta follows the partnerships, page about 1,350 px shorter; minor repetition remains. | High |
| F. Navigation and next steps | 10 | 4 | 8.0 | Two-item nav works; every card opens its page; email and LinkedIn present; no CV. | High |
| G. Usability and accessibility | 10 | 4 | 8.0 | Hidden menu no longer focusable; reduced motion respected; ticker text duplicated for screen readers; contrast not measured. | Medium |

**Total:** 80.0 / 100 (previous review: 71.0)

These ratings are editorial judgments for prioritizing changes, not a hiring prediction.

## E. Prioritized changes

### 1. Give Moonshot an outcome
- **Where:** Moonshot by TechCabal x Pulse card, "Focus: Industry engagement & thought leadership".
- **What I found:** the other three cards show a result (interviews, subscribers, attendance); this one shows a focus area.
- **Likely effect (interpretation):** it reads as the weakest card and the one a reviewer skips.
- **Change:** replace "Focus" with a concrete result, for example what Pulse produced or hosted at Moonshot: "[specific fact needed]".
- **Priority:** important | **Effort:** small, assuming you have one fact to add.
- **How to check it:** every partnership card's second stat names something that happened.

### 2. Hide the duplicated ticker text from screen readers
- **Where:** "Recent work" ticker under the hero.
- **What I found:** the page text contains the six ticker items twice, because the scrolling loop duplicates the list without hiding the copy.
- **Likely effect (interpretation):** screen-reader users hear the same six items twice.
- **Change:** mark the duplicated copy `aria-hidden="true"`, as the brand logo marquee already does.
- **Priority:** polish | **Effort:** small.
- **How to check it:** the page's accessible text lists each ticker item once.

### 3. Remove the repeated Moonshot role line
- **Where:** Moonshot card description ("I coordinated it from conception to execution.") and its "My role" stat ("Coordinated the partnership from conception to execution").
- **What I found:** the same sentence appears twice within a few lines.
- **Likely effect (interpretation):** repetition makes a short card feel thinner.
- **Change:** drop the sentence from the description and keep the stat.
- **Priority:** polish | **Effort:** small.
- **How to check it:** each fact on the card appears once.

### 4. Clarify the attendance figure at The House
- **Where:** The House card, "Pulse Creator Collective attended, alongside 100+ creators, designers and fashion enthusiasts."
- **What I found:** two events are named, but the figure does not say which it covers.
- **Likely effect (interpretation):** an interviewer may ask, and the answer should already be on the page.
- **Change:** add "across both events" or name the event.
- **Priority:** polish | **Effort:** small.
- **How to check it:** a reader can say which event the 100+ figure refers to.

### 5. Sharper clip previews
- **Where:** the four partnership clips.
- **What I found:** the previews are small still frames (203 x 360 source) shown at roughly 460 px tall.
- **Likely effect (interpretation):** they look slightly soft next to the crisp portrait and Pulse Fiesta images.
- **Change:** replace them with higher-resolution frames or the original GIF files.
- **Priority:** polish | **Effort:** small, assuming the originals are available.
- **How to check it:** at 1440 px the clip previews look as sharp as the other images.

## F. Section decisions

| Section | Decision | Why |
| --- | --- | --- |
| Hero | Keep | Clear role, employer and correctly attributed award. |
| Recent-work ticker | Improve | Hide the duplicated copy from screen readers. |
| Brands I've worked with | Keep | Real logos, quick credibility. |
| Strategic partnerships | Keep (one card to improve) | Strongest section; Moonshot needs an outcome. |
| Pulse Fiesta featured campaign | Keep | Strong brief, shift and result, now in the right place. |
| What I do | Keep | Merged section ties each strength to named work. |
| Testimonials | Keep | Named people with titles. |
| About | Keep | Real photo, current role, skills. |
| Published work | Keep | Six real, linked articles. |
| Final call to action | Keep | Email and LinkedIn side by side. |

## G. Copy and project-preview revisions

**Hero directions (optional; the current headline works with its supporting line):**
1. Keep the current headline and supporting line.
2. "I build brands, partnerships and experiences audiences show up for."
3. "Brand, communications and partnerships at Pulse, from Pulse Fiesta to Lagos Fashion Week."

**Recommended:** 1, because the supporting line already names the role and the proof line carries the award; the gain from changing the headline is small.
**Supporting line:** keep as is.
**Primary action:** "See the partnerships" | **Secondary action:** "Let's work together"

**Project previews:**
- **Moonshot by TechCabal x Pulse**: "A media partnership that put Pulse's platforms inside the conversations shaping Africa's technology, business and creative ecosystem." Role: "Coordinated the partnership from conception to execution". Result: "[specific fact needed]".
- **The House x Pulse x Lagos Fashion Week**: add "across both events" (or the event name) after the 100+ figure if that is accurate.

## H. Recommended page sequence

Keep the current order. Hero, brands, partnerships, Pulse Fiesta, What I do, testimonials, About, writing and contact now moves from who, to proof, to how, to trust, to contact.

## I. Next actions

1. Write one result line for Moonshot and put it in the card's second stat.
2. Add `aria-hidden="true"` to the duplicated ticker list.
3. Remove the repeated role sentence from the Moonshot card description.

**Questions that would sharpen this review (max three):**
- What did the Moonshot partnership produce for Pulse (sessions, content, reach or a renewal)?
- Does the 100+ attendance figure cover both events at The House?
- Do you want a CV link, or is LinkedIn enough for the roles you are targeting?

**Evidence to inspect after clicking:** whether each case study states the goal, separates your role from the team's, and shows what was produced and how it performed. These are covered in the separate case-study reviews.
