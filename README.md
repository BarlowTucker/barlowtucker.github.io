# barlowtucker.com

Personal advisory site for Barlow Tucker. Plain HTML, CSS, and a little JavaScript, hosted on GitHub Pages at the custom domain in `CNAME`. There is no build step: edit the files and push.

## Structure

```
index.html                  Homepage (hero, why, how I help, engagement models, about teaser, contact)
about/index.html            About page (story, career history, how I work)
insights/index.html         Insights index (topic pillars, articles, talks)
insights/leveling-up/       One article; copy this folder to add another
404.html                    Custom not-found page (GitHub Pages serves this automatically)
css/style.css               Design tokens and all styles, organized by section
js/main.js                  Header state, mobile menu, scroll reveal (respects reduced motion)
assets/images/              Portrait, favicons, Open Graph share image
robots.txt, sitemap.xml     Search engine hints; add new pages to the sitemap
```

Pages share the same header and footer markup. When you change the navigation, update it in every HTML file.

## Adding an article

1. Copy `insights/leveling-up/` to `insights/<slug>/` and edit `index.html`: title, description, canonical URL, Open Graph tags, the JSON-LD block, the heading, byline, and body.
2. Add a `.post` block to the Articles list in `insights/index.html`, newest first.
3. Add the new URL to `sitemap.xml`.

Body copy uses the `.prose` styles. Diagrams in the existing article are built in HTML and CSS (`.zpd` classes) so the text stays legible at any size.

## Brand notes

- Type: Source Serif 4 for headlines, Inter for text, the system monospace stack for labels. Both web fonts load from Google Fonts. Headlines are weight 600 so they stay crisp on standard-resolution screens.
- Color tokens live at the top of `css/style.css`. Orange is one hue doing three jobs: `--accent` for rules and large type, `--accent-deep` for small text on light surfaces, `--accent-soft` for small text on dark surfaces. All pairings meet WCAG AA.
- Primary call to action is "Let's Talk" everywhere; the closing section uses "Start a Conversation".

## Optional hooks

- Analytics: a commented GA4 snippet sits in the `<head>` of `index.html`. Copy it to the other pages if you turn it on.
- Scheduling: the contact section has a comment showing where to add a "Book a Strategy Call" button once you have a Calendly or Cal.com link.
- Contact form: the site uses `mailto:` links today. A Formspree or similar form can replace the button in the contact section without any other changes.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000/. Root-relative paths (`/css/style.css`) mean the pages must be served, not opened as files.
