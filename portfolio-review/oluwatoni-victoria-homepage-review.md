# Homepage review: Oluwatoni Victoria

Reviewed 22 November 2026 | Input: local repo `/home/user/veeportfolio` (commit `bebbc42`, the same build deployed to veeportfolio-navy.vercel.app), rendered in a headless browser | Audience: assumed hiring managers and recruiters for brand, communications and partnerships roles at media, agency and consumer-brand companies, plus potential partners | Target role and level: not specified, level fit unknown

## A. Overall read

Within the first viewport a reviewer knows this is a brand, communications and partnerships strategist currently at Pulse, and the four partnership cards that follow are the strongest part of the page: each names the partners, a role line and a way into a case study, and The Juice card carries a clearly qualified metric. The main obstacles are attribution and focus. The WAN-IFRA proof line sits next to the name as if it were a personal award, the Moonshot card does not say what Oluwatoni owned, and three consecutive sections (approach cards, Key Strengths, Capabilities) describe what she does before the Pulse Fiesta campaign shows it. There is also no LinkedIn or CV route, which a recruiter will look for.

## B. Evidence and limitations

- **Reviewed:** `index.html`, full page, light mode; dark mode spot-checked in an earlier session pass. Screenshots in `screenshots/`: `home-desktop-1440x900-initial.png`, `home-desktop-1440-full.png`, `home-mobile-390x844-initial.png`, `home-mobile-390-full.png`, `home-focus-sample.png`.
- **Viewports:** 1440 x 900 desktop, 390 x 844 mobile (touch emulation).
- **Tested:** nav "Brand work" opens `brand-work.html`; all four "View case study" buttons open the matching page in `partnerships/`; "Explore the brand portfolio" opens `brand-work.html`; reel links point to Instagram (destination not loaded, Instagram is unreachable from the review environment); a 14-step keyboard Tab pass from the top; reduced motion emulated (entrance animations and the logo marquee stop); horizontal overflow at 390 px (none).
- **Not tested:** the live Vercel URL itself (blocked from the review environment, the local build is the same commit); Gmail compose destination; screen-reader output; load speed and contrast (not measured, no tool run).
- **Assumptions:** the visitor is hiring for or partnering with a brand and partnerships professional in the Nigerian and wider African media and consumer market. No target level was given.
- The 10 and 60 second passes below are review exercises, not measurements of real recruiter behavior.

## C. First impression and skim

**Pass A, first impression (initial viewport, 1440 x 900):**
- What kind of professional: the eyebrow "Brand, Communications & Partnerships Strategist" and the line "Events & Partnerships Manager at Pulse" make the role clear. The headline "I build brands and experiences that connect." is warm but generic on its own; the supporting line does the work.
- What looks central: the portrait, a "7K+ Pulse Fiesta attendees against a 4,000 target" stat and a note card about The Juice x Lagos Cocktail Week. Events and partnerships read as the centre of gravity.
- Reason to keep looking: a named employer, a concrete attendance number and the "WAN-IFRA Award winner" line.
- Obvious next step: two buttons, "Let's work together" and "See the partnerships". The second is the right one for a reviewer and is clearly labelled.

**Pass B, skim (full page):**
- Project I would open first, and why: The Juice x Lagos Cocktail Week. It is the only partnership card with an outcome ("~300 to 565" Instagram followers, "+88.3%"), and the description says "I led the activation", so contribution is explicit.
- Fit with intended role: strong for partnerships, events and brand roles. Four 2026 partnerships, one featured campaign, capabilities and testimonials all point the same way.
- Personal contribution vs team or company results: mixed. The Juice and ART X cards state personal roles. Moonshot says "My role: Pulse partnership team", which is a team, not a contribution. The WAN-IFRA line in the hero is a Pulse Africa award (the linked Ringier article credits Pulse Africa) presented under the person's name.
- Career info and contact route: contact is clear (several "Let's work together" and "Let's talk" buttons opening Gmail compose, plus the email address). There is no LinkedIn, CV or employment history on the page.
- Still uncertain: what Oluwatoni personally did on User Needs Impact Project 360; what she owned at Moonshot; employment history before Pulse.

**Recruiting lens:** Role, current employer and a few concrete numbers are easy to find, and the testimonials name real people and titles. A recruiter will look for LinkedIn or a CV and not find one, and may question the award line once they notice it was Pulse's award.

**Design hiring-manager lens (here, a brand or partnerships lead):** The partnership cards and the Pulse Fiesta brief, shift and result show strategic thinking in a scannable way. The middle of the page repeats itself, and the strongest brand outcome (Pulse Fiesta) sits below three explanatory sections.

## D. Scorecard

| Category | Weight | Rating (0-5) | Points | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| A. Positioning and role relevance | 15 | 4 | 12.0 | Eyebrow and lead state role and employer; headline alone is generic. | High |
| B. Project selection and previews | 20 | 4 | 16.0 | Four partnership cards with category, role line, case-study button and reel; Moonshot role vague; strongest brand result lower on page. | High |
| C. Credibility and attribution | 15 | 3 | 9.0 | Juice metric honestly qualified; WAN-IFRA shown as a personal award; Moonshot contribution unstated; testimonials named. | High |
| D. Visual craft and art direction | 20 | 4 | 16.0 | Consistent type pairing, pastel stacked cards, real campaign visuals; reel previews are small stills (203 x 360 source) shown larger. | Medium |
| E. Content hierarchy and scanning | 10 | 3 | 6.0 | Approach cards, Key Strengths and Capabilities overlap; recent-work ticker text is duplicated; first project starts about 1,580 px down on desktop. | High |
| F. Navigation and next steps | 10 | 3 | 6.0 | Two-item nav works; case-study links all open; contact clear; no LinkedIn or CV route. | High |
| G. Usability and accessibility | 10 | 3 | 6.0 | Hidden mobile menu links receive keyboard focus on desktop; reduced motion respected; no overflow at 390 px; contrast not measured. | Medium |

**Total:** 71.0 / 100

These ratings are editorial judgments for prioritizing changes, not a hiring prediction.

## E. Prioritized changes

### 1. Attribute the WAN-IFRA award correctly
- **Where:** hero proof line "WAN-IFRA Award winner / User Needs Impact Project 360, Pulse Africa".
- **What I found:** the line sits under the name and reads as a personal award. The linked Ringier announcement credits Pulse Africa, and no part of the homepage says what Oluwatoni did on the project.
- **Likely effect (interpretation):** a careful reviewer who checks the link may discount the other claims on the page.
- **Change:** reframe as team recognition with a personal role, for example "Part of Pulse Africa's WAN-IFRA award-winning User Needs strategy: [specific fact needed, your role]". Add the same role line to the User Needs card on the brand portfolio page.
- **Priority:** important | **Effort:** small, assuming you can state your role in one line.
- **How to check it:** a reader who has not seen the site can say whose award it was and what you did, from the line alone.

### 2. Stop keyboard focus entering the hidden mobile menu
- **Where:** `.sheet` mobile menu, present on desktop.
- **What I found:** in the Tab pass, after "Let's talk" focus moved to "Home", "Brand work" and "Let's work together" inside the closed, invisible mobile menu.
- **Likely effect (interpretation):** keyboard users lose sight of focus for three stops on every page.
- **Change:** add `inert` (or `visibility: hidden`) to the menu while it is closed and remove it when opened.
- **Priority:** important | **Effort:** small.
- **How to check it:** Tab from the top of the page; focus goes from "Let's talk" straight to "Let's work together" in the hero.

### 3. Give recruiters a career route
- **Where:** nav, footer links and the final call to action.
- **What I found:** the only contact routes are Gmail compose and the email address. There is no LinkedIn profile, CV or summary of roles before Pulse.
- **Likely effect (interpretation):** a recruiter screening several candidates has nowhere to check history and dates.
- **Change:** add LinkedIn and a CV (PDF or a page) to the footer links and next to "Email me" in the final card.
- **Priority:** important | **Effort:** small, assuming both exist.
- **How to check it:** from any section a visitor can reach LinkedIn or a CV in one click.

### 4. Merge the three "what I do" sections
- **Where:** approach cards (Insight and discovery, Strategy and narrative, Execution and impact), "Key Strengths." and "What I bring to the table."
- **What I found:** twelve cards in a row describe method and skills; "Key Strengths" and "Capabilities" cover the same ground (brand, partnerships, experiences).
- **Likely effect (interpretation):** the Pulse Fiesta campaign, the page's strongest brand outcome, is pushed far down and the middle of the page reads as repetition.
- **Change:** keep the statement and either the three approach cards or Key Strengths, fold the six capabilities into one compact list, and move Pulse Fiesta up to follow the partnerships.
- **Priority:** important | **Effort:** medium.
- **How to check it:** on a 1440 x 900 screen, Pulse Fiesta starts within two scrolls of the last partnership card.

### 5. State what you owned at Moonshot
- **Where:** Moonshot by TechCabal x Pulse card, "My role: Pulse partnership team".
- **What I found:** the other three cards name a personal contribution; this one names a team.
- **Likely effect (interpretation):** it reads as the weakest card and invites the question of whether you were involved.
- **Change:** replace with your actual contribution, for example "My role: [specific fact needed]".
- **Priority:** polish | **Effort:** small.
- **How to check it:** every partnership card starts its role line with a verb describing your work.

## F. Section decisions

| Section | Decision | Why |
| --- | --- | --- |
| Hero | Improve | Keep the layout and portrait; sharpen the supporting line with proof and fix the award attribution. |
| Recent-work ticker | Improve | Useful at a glance, but its text is duplicated for screen readers; hide the duplicate copy. |
| Brands I've worked with | Keep | Real logos, quick credibility, does not block the work. |
| Strategic partnerships | Keep | Strongest section: clear partners, roles, reels and case-study links. |
| Statement and approach cards | Keep (trimmed) | The statement is distinctive; the cards overlap with Key Strengths. |
| Key Strengths | Remove or merge | Repeats the approach cards and Capabilities. |
| Capabilities | Improve | Compress into one shorter list with its evidence chips. |
| Pulse Fiesta featured campaign | Move | Up, directly after the partnerships. |
| Testimonials | Keep | Named people with titles, specific praise. |
| About | Keep | Real photo, current role, concise tiles. |
| Published work | Keep | Six real, linked BusinessDay articles support the communications claim. |
| Final call to action | Improve | Add LinkedIn and CV beside "Email me". |

## G. Copy and project-preview revisions

**Hero directions:**
1. Keep "I build brands and experiences that connect." and change the supporting line to: "I'm Oluwatoni Victoria, Events & Partnerships Manager at Pulse. I led the repositioning of Pulse Fiesta and develop partnerships with platforms like ART X Lagos, Lagos Cocktail Week and Lagos Fashion Week."
2. "Brand, communications and partnerships at Pulse. I build the partnerships and experiences audiences show up for."
3. "I turn brand strategy into partnerships, events and stories people show up for."

**Recommended:** 1, because it keeps the headline you chose and replaces the general supporting line with named, verifiable work.
**Supporting line (award):** "Part of Pulse Africa's WAN-IFRA award-winning User Needs strategy: [specific fact needed, your role]."
**Primary action:** "See the partnerships" | **Secondary action:** "Let's work together"

**Project previews:**
- **Moonshot by TechCabal x Pulse**: "My role: [specific fact needed]". Keep the focus line as it is.
- **The Juice x Lagos Cocktail Week**: already strong. Keep "I led the activation" and the qualified Instagram metric.

## H. Recommended page sequence

1. Hero: role, current employer, proof.
2. Brands strip: quick credibility.
3. Strategic partnerships: the main evidence.
4. Pulse Fiesta featured campaign: the strongest brand outcome, with a link to the brand portfolio.
5. Statement with either the approach cards or Key Strengths, not both.
6. Capabilities as a compact list.
7. Testimonials, About, Published work.
8. Final call to action with email, LinkedIn and CV.

## I. Next actions

1. Write one line stating your role on User Needs Impact Project 360 and use it in the hero proof line and on the brand portfolio card.
2. Add `inert` to the closed mobile menu and re-run a Tab pass.
3. Add your LinkedIn URL and a CV to the footer and final call to action.

**Questions that would sharpen this review (max three):**
- Which roles or clients is this portfolio mainly for: in-house brand and partnerships roles, agency roles, or freelance partners?
- What exactly was your role on User Needs Impact Project 360 and on the Moonshot partnership?
- Do you have a LinkedIn profile and CV you are happy to link?

**Evidence to inspect after clicking:** Do the case studies show the opportunity and why it mattered to each partner, what Oluwatoni personally did versus the wider Pulse team, and what happened as a result (content published, reach, revenue or relationship renewal)? These are covered in the separate case-study reviews.
