# FitMart — Design System Reference

Use this file as context whenever designing or building any UI component, page, or screen for FitMart.

---

## Core Philosophy

**Luxury refined minimalism.** Clean, editorial, spacious. No colorful accents, no gradients, no decorative clutter. Every element earns its place. Think Arc'teryx or Apple meets fitness retail.

---

## Color Palette (Tailwind `stone-*` only)

| Role | Class | Hex | Usage |
|---|---|---|---|
| Primary / Dark BG | `stone-900` | `#1c1917` | Buttons, navbars, dark sections, hero banners, card backgrounds |
| Secondary Text | `stone-700` | `#44403c` | Subheadings, slightly muted body text |
| Muted Text | `stone-500` | `#78716c` | Labels, captions, descriptions, placeholder context |
| Borders | `stone-200` | `#e7e5e3` | Card borders, dividers, input outlines |
| Subtle Background | `stone-100` | `#f5f5f4` | Page backgrounds, tag backgrounds, hover states |
| Near-White BG | `stone-50` | `#fafaf9` | Main page background, section alternates |
| Pure White | `white` | `#ffffff` | Cards, inputs, modals, navbar (on scroll) |

### On Dark (`stone-900`) Backgrounds
| Role | Class | Usage |
|---|---|---|
| Primary text | `white` | Headings, CTAs |
| Secondary text | `stone-300` | Body copy on dark |
| Muted text | `stone-400` | Labels, captions on dark |
| Subtle elements | `stone-800` | Inner cards, dividers on dark |
| Borders on dark | `stone-700` | Borders, outlines on dark |

### Error State
| Role | Class |
|---|---|
| Error text | `text-red-600` |
| Error background | `bg-red-50` |
| Error border | `border-red-100` |

### NEVER USE
- Any color outside the `stone-*` family (no blue, green, purple, indigo, etc.)
- Gradient backgrounds
- Colored buttons (other than `stone-900` filled or `stone-*` outlined)
- `gray-*` or `neutral-*` (use `stone-*` exclusively)

---

## Typography

### Font Families
```css
/* In every file — import via style tag or index.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
```

| Role | Family | Tailwind Class |
|---|---|---|
| Display / Headings | DM Serif Display | `font-['DM_Serif_Display']` |
| Body / UI | DM Sans | `font-['DM_Sans',sans-serif]` (set on root) |

### Type Scale

| Use Case | Classes |
|---|---|
| Hero heading | `font-['DM_Serif_Display'] text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.05] tracking-tight` |
| Section heading | `font-['DM_Serif_Display'] text-3xl md:text-4xl text-stone-900` |
| Card heading | `font-['DM_Serif_Display'] text-xl md:text-2xl text-stone-900` |
| Body text | `text-sm text-stone-500 leading-relaxed` |
| Caption / Label | `text-xs text-stone-400` |
| Eyebrow tag | `text-xs tracking-[0.2em] uppercase text-stone-400` |
| Price display | `font-['DM_Serif_Display'] text-3xl text-stone-900` |
| Brand name | `text-[10px] tracking-[0.15em] uppercase text-stone-400` |

### Rules
- Headings always use `DM Serif Display`
- UI text, labels, buttons, inputs always use `DM Sans`
- Eyebrow labels: `text-xs tracking-[0.2em] uppercase text-stone-400` — always before section headings
- Italic in headings: use `<em className="not-italic text-stone-400">` for tonal contrast, never actual italic

---

## Spacing & Layout

| Element | Value |
|---|---|
| Max content width | `max-w-7xl mx-auto` |
| Section horizontal padding | `px-5 lg:px-10` |
| Section vertical padding | `py-16` to `py-24` |
| Large section vertical padding | `py-24` to `py-32` |
| Card internal padding | `p-6` to `p-10` |
| Gap between grid cards | `gap-4 md:gap-5` |

### Grid Layouts
- 2-col: `grid grid-cols-2 gap-4`
- 3-col: `grid md:grid-cols-3 gap-5`
- 4-col (products): `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5`

---

## Component Patterns

### Buttons

```jsx
/* Primary — filled dark */
<button className="bg-stone-900 text-white text-sm px-8 py-3 rounded-full hover:bg-stone-700 transition-colors">
  Label
</button>

/* Secondary — outlined */
<button className="border border-stone-300 text-stone-700 text-sm px-8 py-3 rounded-full hover:bg-stone-100 transition-colors">
  Label
</button>

/* Ghost — on dark background */
<button className="border border-stone-700 text-stone-300 text-sm px-6 py-2.5 rounded-full hover:bg-stone-800 transition-colors">
  Label
</button>

/* Inverted — white on dark section */
<button className="bg-white text-stone-900 text-sm px-8 py-3 rounded-full hover:bg-stone-100 transition-colors">
  Label
</button>

/* Small — inline / card action */
<button className="text-xs border border-stone-300 text-stone-700 px-4 py-2 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
  Label
</button>
```

- All buttons: `rounded-full` (pill shape)
- All buttons: `text-sm` or `text-xs`
- All buttons: `transition-colors` or `transition-all`
- NEVER use colored backgrounds on buttons

### Cards

```jsx
/* Light card */
<div className="bg-white border border-stone-200 rounded-2xl p-7 hover:border-stone-300 hover:shadow-lg transition-all duration-300">

/* Dark card */
<div className="bg-stone-900 rounded-2xl p-7">

/* Subtle card */
<div className="bg-stone-100 rounded-2xl p-7">
```

- All cards: `rounded-2xl`
- Hover: `hover:border-stone-300 hover:shadow-lg transition-all duration-300`
- Hover lift: `hover:-translate-y-1` (use sparingly)

### Inputs

```jsx
<input
  className="w-full border border-stone-200 bg-white rounded-lg px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
/>
```

- Shape: `rounded-lg` (inputs are slightly less round than buttons)
- Focus ring: `focus:outline-none focus:border-stone-900`
- Placeholder: `placeholder-stone-300`

### Labels (above inputs)
```jsx
<label className="block text-xs text-stone-500 mb-1.5 tracking-wide uppercase">
  Field Name
</label>
```

### Divider
```jsx
<hr className="border-stone-200" />
/* or inline with text */
<div className="flex items-center gap-3">
  <div className="flex-1 h-px bg-stone-200" />
  <span className="text-xs text-stone-400">or</span>
  <div className="flex-1 h-px bg-stone-200" />
</div>
```

### Eyebrow + Heading Pattern (use before every section)
```jsx
<p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
  Section Tag
</p>
<h2 className="font-['DM_Serif_Display'] text-4xl text-stone-900">
  Section Title
</h2>
```

### Badge / Tag Pills
```jsx
/* Dark badge (e.g. "Best Seller") */
<span className="text-[10px] tracking-widest uppercase bg-stone-900 text-white px-2.5 py-1 rounded-full">
  Label
</span>

/* Light badge */
<span className="text-[10px] tracking-[0.15em] uppercase text-stone-500 border border-stone-200 px-3 py-1.5 rounded-full">
  Label
</span>
```

### Navbar Pattern
```jsx
/* Transparent → opaque on scroll */
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled ? "bg-white/95 backdrop-blur-sm border-b border-stone-200" : "bg-transparent"
}`}>
```

### Pricing / Plan Cards
- Featured/highlighted plan: `bg-stone-900 text-white`
- Other plans: `bg-white border border-stone-200`
- Price: `font-['DM_Serif_Display'] text-4xl`

---

## Animation & Motion

### Standard Fade-Up (page load)
```css
.fade-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.25s; }
.delay-3 { transition-delay: 0.4s; }
```

### Hero Text Reveal
```css
.hero-line { overflow: hidden; }
.slide-up {
  display: inline-block;
  transform: translateY(100%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up.visible { transform: translateY(0); }
```

### Drawer / Slide-In Panel
```css
.slide-panel {
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-panel.open { transform: translateX(0); }
```

### Backdrop Overlay
```css
.overlay {
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.overlay.show { opacity: 1; pointer-events: auto; }
/* Apply: bg-black/30 */
```

### Rules
- All `transition-colors` on interactive elements (buttons, links)
- All `transition-all duration-300` on cards
- Use `useEffect` + `setTimeout(fn, 80)` to trigger visibility state for entrance animations
- Prefer CSS animations over JS where possible

---

## Page Backgrounds (section alternation)

Use this rhythm when stacking sections vertically:

| Section Type | Background |
|---|---|
| Primary hero | `bg-stone-50` |
| Feature / CTA dark | `bg-stone-900` |
| Content section | `bg-white` |
| Alternate content | `bg-stone-50` |
| Subtle banner | `bg-stone-100` |

---

## Iconography

No icon libraries. Use minimal inline SVGs or plain Unicode symbols:

| Symbol | Use |
|---|---|
| `×` | Close / dismiss |
| `→` | CTA arrows, navigation |
| `✓` | Success / confirmed |
| `★` / `☆` | Star ratings |
| `─` | List item marker (replace bullet points) |
| `∅` | Empty state |
| `◎` / `⚡` / `✓` | Feature icons (text-based) |

---

## Logo / Brand Wordmark

```jsx
<span className="font-['DM_Serif_Display'] text-xl text-stone-900 tracking-tight">
  FitMart
</span>
/* On dark background: text-white */
```

---

## Do / Don't Summary

| ✅ Do | ❌ Don't |
|---|---|
| Use `stone-*` exclusively | Use any other color family |
| `rounded-full` on buttons | `rounded` or `rounded-md` on buttons |
| `rounded-2xl` on cards | `rounded-xl` or less on cards |
| Eyebrow tag before every section heading | Jump straight into headings |
| `DM Serif Display` for all headings | Use DM Sans for headings |
| `transition-colors` on every interactive element | Static hover states |
| Minimal, purposeful animations | Excessive motion or bouncing |
| Generous whitespace | Cramped layouts |
| Lowercase `text-xs tracking-[0.2em] uppercase` for labels | Bold or large labels |
| `text-stone-400` for muted/secondary info | Black text for everything |