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

## Making it yours

- **Name / logo:** search for `Vee` in `index.html`.
- **Colours & fonts:** edit the `:root` tokens at the top of `css/style.css`.
- **Case studies, stats, testimonial, FAQ:** all copy lives in `index.html`. Client names and numbers are placeholders.
- **Images:** currently Unsplash placeholders; swap the `src` URLs for real project shots and a real portrait.
- **Contact:** replace `hello@vee.studio` and the `#` social links.
- Animation respects `prefers-reduced-motion`.
