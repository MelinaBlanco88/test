---
name: Obsidian Pitch
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c8c2'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b938c'
  outline-variant: '#414943'
  surface-tint: '#a2d1b7'
  primary: '#a2d1b7'
  on-primary: '#083825'
  primary-container: '#013220'
  on-primary-container: '#6f9c84'
  inverse-primary: '#3b6751'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#2b2b2b'
  on-tertiary-container: '#949292'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bdedd2'
  primary-fixed-dim: '#a2d1b7'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#234f3b'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Oswald
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 88px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 36px
  body-lg:
    fontFamily: Chivo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Chivo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Oswald
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Oswald
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system embodies the concept of "Sacred Intensity," merging the architectural monoliths of Aztec heritage with the high-octane pressure of elite football. The brand personality is aggressive, authoritative, and unapologetically premium. It targets a high-performance audience that views sport as a ritual and excellence as a requirement.

The aesthetic leans into a **High-Contrast / Modern Brutalist** hybrid. It utilizes sharp, uncompromising geometries, massive condensed typography, and a "dark-to-void" color hierarchy. Visuals should feel heavy and grounded, as if carved from stone, then accented with metallic precision to evoke the "Elite" status. White space is used not for airiness, but for focus—isolating key actions and data points like a spotlight on a pitch.

## Colors

The palette is anchored in the "Deep Forest" primary, a green so dark it borders on black, representing the history and the grass beneath the lights. 

- **Primary (#013220):** Used for key brand moments and heavy container backgrounds.
- **Secondary Gold (#D4AF37):** Reserved exclusively for "Elite" highlights, calls to action, and victory states. It must never be used for body text.
- **Surface Grays:** The background is a pure Obsidian Black (#050505). Interactive surfaces use Dark Charcoal (#1A1A1A) to provide subtle depth without breaking the dark aesthetic.
- **Accents:** High-contrast white is used for maximum legibility of data, while gold is used for prestige markers.

## Typography

Typography is a tool for dominance. **Oswald** serves as the voice of authority, its condensed forms mimicking the verticality of a stadium. All headlines and labels must be set in uppercase to maintain a rigid, disciplined structure.

**Chivo** is used for body copy to provide a sharp, modern contrast that ensures legibility during data-heavy reading. It maintains a technical, confident feel without the "shouting" nature of the headlines.

Use `display-lg` for hero impact moments. `label-sm` should be used for metadata and stats, emphasizing the "technical" side of the sport.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to create a centered, monolithic "altar" of content. 
- **Grid:** A 12-column system with tight 16px gutters to reinforce the aggressive, compact nature of the brand.
- **Rhythm:** An 8pt baseline grid is used for vertical rhythm, but components themselves utilize 4px increments for razor-sharp precision.
- **Margins:** Generous side margins on desktop (64px+) force the eye toward the center, creating a sense of stadium-like focus.

Mobile layouts should collapse into a single-column stack with 16px margins, maintaining the density of information.

## Elevation & Depth

This system rejects soft ambient shadows in favor of **Tonal Layering** and **High-Contrast Outlines**. 

- **Level 0 (Floor):** Pure Black (#050505).
- **Level 1 (Card/Surface):** Deep Green-Gray (#0C1410).
- **Level 2 (Interactive):** Deep Forest (#013220).

To convey hierarchy, use 1px solid borders. Use a subtle gray (#2A2A2A) for standard containers and the accent Gold (#D4AF37) for "active" or "elite" elements. Depth is achieved through color value shifts rather than light-source simulation.

## Shapes

The shape language is strictly **Sharp (0)**. There are no rounded corners in this design system. 

Every button, input, card, and modal must have 90-degree angles. This architectural rigidity reflects the strength of a fortress and the precision of a professional athlete. This lack of softness is essential to maintaining the "aggressive" brand tone.

## Components

- **Buttons:** Primary buttons are Gold with Black text. Secondary buttons are Forest Green with White text. All buttons use the `label-lg` type style. Hover states should include a 1px white inset border to signal "Elite" precision.
- **Cards:** Cards use a Level 1 surface color with a 1px dark border. On hover, the border should transition to Gold.
- **Inputs:** Text fields are dark gray with a 1px border. When focused, the border turns Gold and the background becomes slightly darker.
- **Chips/Badges:** Small, rectangular blocks with uppercase `label-sm` text. "Elite" badges use Gold backgrounds; standard badges use Forest Green.
- **Progress Bars:** Use a heavy 8px height. The track is Level 2 gray; the fill is Gold.
- **Data Tables:** High-density, sharp borders, with headers utilizing the Gold accent color for key metric columns.