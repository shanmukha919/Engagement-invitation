# 💍 Animated Wedding & Engagement Invitation Website (React)

A mobile-first animated digital wedding & engagement invitation web application inspired by luxury reel invitations. It features a 3D door-opening intro, silk curtain pull reveal with courtyard camera zoom, scratch-to-reveal heart card with calendar integration, flip countdown, card carousel gallery, scroll-drawing timeline, venue map with custom gold pin, multi-language support (English / Telugu / Hindi), RSVP form with Supabase & local storage backup, and background music.

---

## ✨ Features

- **Frame 1: 3D Door Opening Intro (100dvh)**
  - Embossed sage green doors (`#8A9A7B`) meeting in the center with an ornate gold cartouche crest (`#C9A66B`).
  - Shimmering gold sweep and breathing "Tap to open" CTA.
  - On tap: Doors swing open outward in 3D perspective (`rotateY: -105deg / +105deg`, `perspective: 1200px`) and trigger background music fade-in.
- **Frame 2: Curtain Pull Reveal & Courtyard Zoom**
  - Silk curtains slide and gather horizontally (`x: 0%` to `±100%`, `scaleX: 0.6`).
  - Scalloped valance with gold tassels sways gently.
  - Courtyard background performs a slow 3-second camera zoom (`scale: 1.15 -> 1.0`).
- **Frame 3: Hero Typography & Drifting Florals**
  - Staggered typography reveal: "We're getting married", Groom & Bride names in *Great Vibes* cursive, parent details and qualifications.
  - Personalized guest greeting badge when accessed via `/invite/:guestSlug`.
  - Floating petal particles via `@tsparticles` and drifting watercolor floral corners.
- **Frame 4: Welcome Message**
  - Textured cream card with 3 scaling heart icons and smooth line-by-line reveal.
- **Frame 5: Scratch-to-Reveal Sacred Date**
  - Canvas API scratchable glitter heart (`destination-out`, brush radius 30px).
  - Automatically clears at >55%, plays celebration chime, bursts gold/blush/cream confetti, and offers **Google Calendar** and **.ICS file download**.
- **Frame 6: Flip Countdown Timer**
  - Days, Hours, Minutes, and Seconds tiles with animated slide and fade digit transitions.
- **Frame 7: Photo Gallery Carousel**
  - Swiper card-stack carousel with 6 couple photos, gold pagination dots, and romantic captions.
- **Frame 8: Scroll-Drawing Program Timeline**
  - Vertical timeline with a dynamic gold line that draws downward as you scroll (`useScroll` + `pathLength`).
- **Frame 9: Pre-Wedding Celebrations & Logistics**
  - Horizontally swipeable cards with event dates, times, venues, and dress-code color palette chips.
  - Dedicated cards for **Dress Code** (Men & Women), **Transportation** (shuttles), and **Accommodation** (hotel discount codes).
- **Frame 10: Venue & Interactive Map**
  - Leaflet map centered on venue coordinates with custom gold drop-pin marker.
  - "Open in Google Maps" and "Get Directions" deep links.
- **Frame 11: RSVP Form**
  - Validated with `react-hook-form` + `zod` with error shake animations.
  - Prefills guest name from URL slug.
  - Saves to **Supabase** (with seamless offline/demo `localStorage` fallback).
  - Triggers animated checkmark + confetti burst on submit.
  - "Share Invitation on WhatsApp" one-tap share button.
- **Frame 12: Footer & Hashtag**
  - Script family signatures, hashtag, and subtle paper-grain texture.
- **Multi-Language Support (i18next)**
  - Toggle between **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
- **Floating Controls**
  - 44px glass circles for Music Mute/Unmute (remembers choice in `localStorage`) and Language toggle.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 💌 Personalized Guest Links

- Standard link: `http://localhost:5173/`
- Personalized link: `http://localhost:5173/invite/rohit-sharma`
- Displays: *"Dear Rohit Sharma & Family, request the honor of your presence..."*
- Auto-prefills "Rohit Sharma & Family" in the RSVP form.

### Adding New Guests
Edit `src/data/guests.json`:
```json
{
  "vip-guest": "Honored Guest & Family",
  "rohit-sharma": "Rohit Sharma & Family",
  "priya-verma": "Priya Verma",
  "karthik-rao": "Karthik Rao & Family"
}
```

---

## ⚙️ Customizing Invitation Details (`src/data/config.js`)

All couple names, event dates, venues, coordinates, hashtags, and texts are located in one central file:
[`src/data/config.js`](file:///d:/wedding/wedding/src/data/config.js):

- `groom` & `bride`: Names, parents, qualifications, profession.
- `weddingDateTimeISO`: Target date & time for countdown (`"2026-11-30T10:00:00+05:30"`).
- `venue`: Name, address, coordinates `[lat, lng]`, Google Maps URLs.
- `timeline`: Order of events with icons and descriptions.
- `celebrations`: Pre-wedding events with dress-code color chips.
- `guestInfo`: Dress code, transport shuttles, accommodation details.
- `hashtag`: Couple's wedding hashtag.

---

## 🎨 Asset Replacement Guide

All assets are located in `src/assets/` and `public/`:

| Asset File | Dimension | Purpose |
| :--- | :--- | :--- |
| `door-left.png` | 540x1200 | Left sage green embossed door half |
| `door-right.png` | 540x1200 | Right door half (mirror of left) |
| `crest.png` | 420x420 | Transparent gold cartouche crest with initials & "TAP TO OPEN" |
| `curtain-left.png` | 340x1100 | Left cream silk curtain drape with gold tassel |
| `curtain-right.png` | 340x1100 | Right cream silk curtain drape |
| `valance.png` | 640x260 | Top scalloped cream swag drapery with tassels |
| `scene-bg.jpg` | 720x1400 | Courtyard archway & garden fountain backdrop |
| `floral-tl.png` | 340x340 | Watercolor botanical corner (top-left) |
| `floral-br.png` | 340x340 | Botanical corner (bottom-right) |
| `gallery-1..6.jpg` | 600x800 | Couple photo gallery pictures |
| `glitter.png` | 400x400 | Gold & sage glitter texture for scratch heart canvas |
| `music.mp3` | Audio | Background romantic instrumental music |
| `chime.wav` | Audio | Scratch reveal celebration chime |

To regenerate or customize the placeholder assets programmatically at any time, run:
```bash
python generate_assets.py
```

---

## 🗄️ Supabase Setup (Optional)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run the following schema:
```sql
CREATE TABLE public.rsvps (
  id BIGSERIAL PRIMARY KEY,
  guest_slug TEXT DEFAULT 'direct',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT TRUE,
  guests_count INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit RSVPs
CREATE POLICY "Allow anonymous RSVP submission" ON public.rsvps
  FOR INSERT WITH CHECK (true);

-- Allow authenticated project owners to read RSVPs
CREATE POLICY "Allow authenticated read" ON public.rsvps
  FOR SELECT USING (auth.role() = 'authenticated');
```
3. Copy your project URL and Anon key into a `.env` file (copied from `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
*(If `.env` is omitted, the RSVP form automatically saves submissions to `localStorage` so the website works smoothly out of the box!)*

---

## 🚢 Deploying to Vercel / Netlify

### Deploy on Vercel
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Vite**.
4. (Optional) In **Environment Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Click **Deploy**.

For single-page routing on Vercel, ensure `vercel.json` contains:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
*(This has already been created for you in the project root)*.
