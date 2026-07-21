---
name: Azteca Energy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5c3f3d'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#916f6c'
  outline-variant: '#e6bdba'
  surface-tint: '#c0001f'
  primary: '#a30019'
  on-primary: '#ffffff'
  primary-container: '#ce1126'
  on-primary-container: '#ffe0dd'
  inverse-primary: '#ffb3ae'
  secondary: '#5c5f60'
  on-secondary: '#ffffff'
  secondary-container: '#e1e3e4'
  on-secondary-container: '#626566'
  tertiary: '#4c5053'
  on-tertiary: '#ffffff'
  tertiary-container: '#64686b'
  on-tertiary-container: '#e4e7ea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930015'
  secondary-fixed: '#e1e3e4'
  secondary-fixed-dim: '#c5c7c8'
  on-secondary-fixed: '#191c1d'
  on-secondary-fixed-variant: '#454748'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#181c1e'
  on-tertiary-fixed-variant: '#43474a'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 48px
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system captures the raw, high-velocity spirit of streetwear culture tailored for a modern sports brand. The aesthetic is defined by **High-Contrast / Bold** visuals, utilizing massive typography and aggressive white space to create a sense of movement.

The target audience is the next generation of football fans—digital natives who value authenticity, speed, and style. The UI should feel "airy" yet impactful, evoking an emotional response of excitement and athletic momentum. By stripping away unnecessary textures and focusing on pure color and form, the system achieves a "fast" feel that reflects the pace of the game.

## Colors

The palette is anchored by **Energetic Red (#CE1126)**, a high-chroma primary used to signal action, urgency, and passion. This is balanced against a vast landscape of **Optic White** and **Cool Grays** to maintain a clean, premium streetwear vibe.

- **Primary:** Used for key brand moments, primary CTAs, and active states.
- **Secondary/Surface:** Light grays are used to define containers without adding visual weight.
- **Neutral:** A deep, near-black used exclusively for high-readability text and structural accents.
- **Functional:** Success, Warning, and Error states should adopt the primary's high-saturation logic but remain secondary to the brand red.

## Typography

The design system relies on **Inter** to deliver a systematic, utilitarian, and modern aesthetic. The hierarchy is extreme: display styles are exceptionally heavy (Extra Bold/Black) and tightly tracked to mimic sports editorial headlines.

- **Display & Headlines:** Use tight letter spacing and heavy weights to create "blocks" of text.
- **Labels:** Small caps or all-caps styling should be used for metadata and overlines to enhance the streetwear "sticker" look.
- **Body:** Maintain generous line height for long-form content to provide a visual breather from the aggressive headlines.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with oversized margins to create a high-fashion, airy feel.

- **Grid Model:** 12-column layout for desktop; 4-column for mobile.
- **Spacing Logic:** Based on a 4px baseline, but emphasizes "Macro-spacing" (64px+) to separate distinct content sections.
- **Vertical Rhythm:** Use the `2xl` spacing unit to separate major sections, allowing the primary red accents to pop against the white space.
- **Mobile Reflow:** In mobile views, cards should bleed to the edge or maintain a consistent `margin-mobile` for a streamlined, app-like feel.

## Elevation & Depth

To maintain the "vibrant and airy" requirement, this design system avoids heavy, muddy shadows. Instead, it uses **Tonal Layers** and **Low-contrast outlines**.

- **Surface Tiers:** Use subtle background shifts (White to Cool Gray) to indicate depth.
- **Shadows:** If used, they must be "Ambient Shadows"—extremely diffused (24px+ blur), very low opacity (3-5%), and slightly tinted with the primary red color to create a warm glow rather than a dark void.
- **Interactive Depth:** On hover, elements should not just "lift" but can also scale slightly (1.02x) to mimic the energy of the brand.

## Shapes

The shape language is defined by **Maximum Roundedness**. This softens the aggressive typography and bold color, making the "Streetwear" look feel approachable and "lifestyle-oriented" rather than purely corporate.

- **Pill Shapes:** Buttons, search bars, and tags should always be fully rounded (pill-style).
- **Cards:** Use `rounded-xl` (1.5rem) to ensure a friendly, modern container feel.
- **Icons:** Should feature rounded terminals and consistent stroke weights to match the Inter typeface.

## Components

### Buttons
Primary buttons are pill-shaped, flooded with Energetic Red, using white bold text. Secondary buttons use a light gray ghost style with a subtle 1px border.

### Cards
Cards are "Bright & Airy" with a white background and a subtle `tertiary` border or an ultra-soft ambient shadow. Headlines within cards should be bold and concise.

### Chips & Tags
Used for player stats or categories. These should be small, pill-shaped, and use the `label-bold` typography style with high-contrast backgrounds (Red on White or White on Gray).

### Inputs
Search and text fields use a subtle gray fill (`secondary`) with no border until focused. Upon focus, a 2px Energetic Red ring is applied.

### Player Stats / Scoreboards
Unique to this system, use large `display` numbers with high-contrast backgrounds to emphasize the "vibrant" data-heavy nature of football.