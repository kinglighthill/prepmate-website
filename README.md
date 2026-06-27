# Prepmate Website (Next.js replica)

A pixel-faithful Next.js replica of [myprepmate.com](https://www.myprepmate.com/), rebuilt with the App Router, the original brand colors, fonts (Urbanist / Inter / Instrument Sans), and assets.

## Stack
- Next.js 15 (App Router)
- React 19
- CSS Modules (no UI framework — styling matches the original Framer design tokens)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Structure

```
app/
  layout.tsx          # metadata, favicon, fonts
  globals.css         # brand tokens, typography, buttons
  page.tsx            # section composition + vertical rhythm
  data.ts             # image URLs + copy extracted from the original
  components/
    Navbar            # fixed pill navbar
    Hero              # curved hero card, exam badges, download CTA, devices
    ExamTicker        # "20+ Exams Supported" marquee
    Proof             # 3 stat cards
    Features          # feature pills + phone mockup
    HowToUse          # 3-step phone card grid
    Testimonials      # two-row review marquee (opposite directions)
    ExploreScreens    # laptop slideshow (client)
    FAQ               # accordion (client)
    CTA               # store download buttons
    Footer
    PhoneCard / SectionHeader / DownloadButton  # shared
```

Images are served from `framerusercontent.com` (the original CDN) and whitelisted in `next.config.mjs`.

## Brand tokens
- Primary purple `#6466f2`, gradient accent `#923cf6`
- Inks `#0c0c0c → #666`, surfaces `#f8fafc / #f4f7f9 / #f1f4f8`
