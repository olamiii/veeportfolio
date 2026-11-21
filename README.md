# Vee — Brand Strategist Portfolio

A single-page portfolio for a brand strategist.

**Kept from v1:** the palette (warm cream, sage / peach / lavender / sky pastels, ink, orange accent) and the type pairing (Inter + *Instrument Serif* italic accents).

**v2 layout and motion references:**

| Section | Reference |
| --- | --- |
| Split hero with portrait, floating positioning note | Growthcraft, Arden |
| Recent-work ticker | AppDebut changelog |
| Statement that lights up word by word on scroll | Selene |
| Problem / fix cards, framework with giant numerals, friction-shift-result case study | Growthcraft |
| Stacked sticky project cards in pastels | Athos |
| Dark results band | Kiln |
| Priced service grid with dark "book a call" card | Arden, Daniel Cross |
| Dark six-week timeline that fills as you scroll | AppDebut, Trend |
| Large + stacked testimonials with stats | Kiln |
| About with stat tiles | Arden |
| FAQ in cards | Selene |
| Glow CTA card, giant "Let's talk" and wordmark footer | Kiln, Daniel Cross, AppDebut |

## Structure

```
index.html     all content and sections
css/style.css  design tokens (top of file) and styles
js/main.js     word reveals, scroll highlight, stacked cards, timeline, counters, FAQ, mobile menu
```

No build step. Open `index.html` in a browser, or deploy the folder to Vercel, Netlify or GitHub Pages.

## Content

Portfolio of **Oluwatoni Victoria Ogundipe**, Brand, Communications & Partnerships Strategist (Events & Partnerships Manager at Pulse). Content is curated from the former portfolio (tonisportfolio.netlify.app) plus the 2026 partnerships.

```
index.html                     home: positioning, partnerships, capabilities,
                               Pulse Fiesta + brand work, testimonials, about,
                               published work, contact
partnerships/*.html            case studies: ART X Lagos, The Juice x Lagos Cocktail Week,
                               Moonshot by TechCabal, The House x Lagos Fashion Week
assets/img/                    real images from the former portfolio
assets/reels/                  partnership clips (replace the .webp stills with .gif files to animate)
```

## Replacing placeholders

Partnership cards show project clips from assets/reels/. Earlier placeholders use the `.ph` class (`.ph` figures).
To use a real photo, replace the `<figure class="... ph ph--...">` contents with an `<img>`
and remove the `ph` classes, or drop images into `assets/img/` and reference them.
