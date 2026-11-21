# Vee — Brand Strategist Portfolio

A single-page portfolio for a brand strategist, blending two design references:

| From **Viral** | From **Taffy** |
| --- | --- |
| Warm cream canvas (`#EFEBE5` / `#F7F3EC`) | Pastel mesh gradients (sage, peach, lavender, sky) |
| Tight Inter tracking (−0.05em on headings) | *Instrument Serif* italic accent words |
| Grey pill section tags, black badge icons | Orange spark doodles + handwritten notes |
| Black preloader with spinning mark | Word-by-word blur-in headline |
| Rolling button text on hover | Fanned, tilted hero cards with mouse parallax |
| Alternating case-study rows with stats | Bento services with mini UI mockups |
| Quote card + mission card | Staggered process steps, "vs" comparison, ghost words |

## Structure

```
index.html     all content and sections
css/style.css  design tokens (top of file) and styles
js/main.js     preloader, reveals, counters, parallax, FAQ, mobile menu
```

No build step. Open `index.html` in a browser, or deploy the folder to Vercel, Netlify or GitHub Pages.

## Making it yours

- **Name / logo:** search for `Vee` in `index.html`.
- **Colours & fonts:** edit the `:root` tokens at the top of `css/style.css`.
- **Case studies, stats, testimonial, FAQ:** all copy lives in `index.html`. Client names and numbers are placeholders.
- **Images:** currently Unsplash placeholders; swap the `src` URLs for real project shots and a real portrait.
- **Contact:** replace `hello@vee.studio` and the `#` social links.
- Animation respects `prefers-reduced-motion`.
