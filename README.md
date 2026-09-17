# davidcliu.com — static replica

A plain HTML/CSS/JS rebuild of davidcliu.com that matches the current
WordPress site's look, layout, colors, fonts, and content as closely as
possible — with no WordPress, no database, no plugins, no hosting bill.

Colors, fonts (Open Sans / Dosis / Raleway), section order, and spacing
were pulled directly from the live site's own stylesheet, so this should
look like the same site at a glance.

## What's different, and why

Two small, deliberate deviations from a byte-for-byt e copy:

1. **The Bill Gates and Steve Ballmer quotes are paraphrased**, not
   quoted verbatim. Both original quotes run well past what's safe to
   reproduce word-for-word, so I shortened them to a paraphrase with
   attribution. Swap in the original wording yourself in `index.html`
   (search for `promo-box-hor` and `promo-box-ver`) if you'd like —
   they're your site's content to use as you choose.
2. **The client-logo carousel and the contact form don't have a
   server behind them anymore.** The logos now scroll in a seamless
   CSS marquee instead of the old jQuery/Owl Carousel slider (looks
   the same, no library needed). The contact form still collects the
   same fields, but since static hosting has no backend to email you,
   pressing Send opens the visitor's own email client instead
   (a `mailto:` link) with the message pre-filled. The Google Map
   embed is left out because it depends on a paid/keyed Google Maps
   API — reintroducing it would reintroduce a billing dependency,
   which cuts against making this free.

Everything else — text, structure, section order, colors, fonts — is
the same.

## What's in here

```
index.html        the whole page
css/style.css      all styling
js/script.js       slider, sticky header, mobile menu, count-up stats,
                   skill-bar fill, contact form, go-to-top
assets/            logo, hero background photos, client logos
```

Two fonts (Open Sans / Dosis / Raleway) load from Google Fonts and
icons load from a Font Awesome CDN — both free, no account needed.
Everything else is self-contained.

## Publish it free on GitHub Pages

1. **Create a repository.** On GitHub, click **New repository**. Name it
   whatever you like (e.g. `davidcliu-site`). Public repos get Pages for
   free.
2. **Upload these files.** Either:
   - Drag the contents of this folder (not the folder itself — its
     *contents*) into GitHub's web UI via "Add file → Upload files", or
   - From a terminal:
     ```
     cd site
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```
3. **Turn on Pages.** In the repo, go to **Settings → Pages**. Under
   "Build and deployment," set Source to **Deploy from a branch**, branch
   `main`, folder `/ (root)`. Save.
4. **Visit your site.** GitHub will give you a URL like
   `https://<your-username>.github.io/<your-repo>/` within a minute or two.

## Point davidcliu.com at it (optional, still free)

1. In **Settings → Pages → Custom domain**, enter `davidcliu.com` and save.
   GitHub adds a `CNAME` file to your repo automatically.
2. At your domain registrar, update DNS:
   - Apex domain (`davidcliu.com`): four **A records** to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www.davidcliu.com`: a **CNAME record** to `<your-username>.github.io`
3. Back in **Settings → Pages**, once DNS propagates, check **Enforce
   HTTPS** for a free certificate.
4. Cancel the WordPress hosting plan once the new site is live.

## Editing later

Everything is plain text — open `index.html` in any editor to change
copy, `css/style.css` for colors/spacing (all in one `:root` block at
the top), `js/script.js` for behavior. Commit and push; Pages
redeploys in under a minute.
