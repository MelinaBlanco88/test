---
name: Azteca Athletic Performance
colors:
  surface: '#f7faf5'
  surface-dim: '#d7dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5ef'
  surface-container: '#ebefea'
  surface-container-high: '#e5e9e4'
  surface-container-highest: '#e0e4de'
  on-surface: '#181d1a'
  on-surface-variant: '#3f4943'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eef2ed'
  outline: '#6f7a72'
  outline-variant: '#bec9c1'
  surface-tint: '#096c4b'
  primary: '#004e34'
  on-primary: '#ffffff'
  primary-container: '#006847'
  on-primary-container: '#90e4ba'
  inverse-primary: '#84d7ae'
  secondary: '#bb001e'
  on-secondary: '#ffffff'
  secondary-container: '#e12531'
  on-secondary-container: '#fffbff'
  tertiary: '#722c2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#904340'
  on-tertiary-container: '#ffc4c0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9ff4c9'
  primary-fixed-dim: '#84d7ae'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005237'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930015'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#3d0507'
  on-tertiary-fixed-variant: '#77302e'
  background: '#f7faf5'
  on-background: '#181d1a'
  surface-variant: '#e0e4de'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 88px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style
The design system is engineered to evoke the high-octane energy of elite football while maintaining the refined poise of a luxury fashion house. It targets the "performance-lifestyle" segment—athletes and fans who value technical precision and cultural heritage.

The aesthetic follows a **Premium Minimalist** movement with **High-Performance** accents. This means utilizing vast amounts of whitespace to frame products like gallery pieces, paired with aggressive, heavy typography that commands attention. The interface should feel "breathable" yet intense, mirroring the focus of an athlete before a match. Visual interest is driven by high-scale imagery and cinematic motion rather than decorative UI elements.

## Colors
The palette is rooted in the national identity of Mexican football, executed through a sophisticated lens. 

- **Primary (Mexican Green):** Used as the "Action" color for key CTAs and success states. It represents the pitch and national pride.
- **Secondary (Mexican Red):** Used sparingly for urgent notifications, sale indicators, or high-energy highlights. 
- **Neutral Core:** The design system relies heavily on **Deep Black** for text and structural elements to provide a high-contrast, premium feel. **Light Gray** is used for background sectioning to maintain depth without clutter.
- **Functional Use:** Backgrounds should remain predominantly White or Light Gray to allow product photography to provide the primary color stimulus.

## Typography
Typography is the primary engine of the brand's personality. 

- **Headlines:** Montserrat is used in heavy weights (Bold to Black) with tight letter-spacing to create a "locked" and powerful presence. Display sizes should be used for hero sections, particularly for the Mexico National Team launch.
- **Body:** Inter provides a systematic, neutral counter-balance. Its high legibility ensures that technical product specifications and editorial content are easy to digest.
- **Labels:** Use uppercase styling for category labels and small UI hints to create a technical, organized appearance reminiscent of sports equipment labeling.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Rhythm:** An 8px base unit governs all spatial relationships. 
- **Margins:** Large outer margins (64px) on desktop are critical to achieving the premium "editorial" look.
- **Visual Breathing Room:** Use `stack-xl` (80px) between major sections (e.g., Hero to Product Grid) to ensure the layout never feels cramped. 
- **Product Grids:** Jerseys should be presented in a 2-column layout on mobile to maintain detail, and 3-to-4 column on desktop.

## Elevation & Depth
To maintain a modern, flat-but-premium aesthetic, this design system avoids heavy drop shadows in favor of **Tonal Layering** and **Soft Ambient Occlusion**.

- **Level 0 (Base):** White (#FFFFFF) for the primary canvas.
- **Level 1 (Cards/Containers):** Light Gray (#F5F5F5) or White with a very subtle 1px border (#EEEEEE).
- **Elevation - Floating:** For interactive elements like "Add to Cart" drawers or Modals, use a soft, highly diffused shadow: `0px 20px 40px rgba(0,0,0,0.06)`. 
- **Depth through Imagery:** Depth is primarily created through "cut-out" product photography where the jersey appears to sit on top of the background, casting its own natural shadow within the image.

## Shapes
The shape language balances the aggression of sports with the approachability of modern retail. 

- **Primary Radius:** A consistent 12px (`rounded-md`) to 16px (`rounded-lg`) radius is applied to cards and input fields.
- **Interactive Elements:** Buttons should use the 12px radius to feel substantial.
- **Icons:** Use a 2px stroke weight with slightly rounded caps to match the typography's geometry.
- **Strictness:** Avoid full pills for buttons; the "squircle" look of a 12px radius on a large button feels more engineered and modern than a standard pill shape.

## Components
- **Primary Buttons:** High-contrast Deep Black background with White text. Hover state shifts to Mexican Green. Use large padding (16px 32px) and Montserrat Bold for the label.
- **Product Cards:** Minimalist design with a large image area. Hide "Add to Cart" until hover on desktop to reduce visual noise. Pricing should be in Montserrat Bold.
- **Chips/Badges:** Use for "New Arrival" or "Authentic." Small, rectangular with a 4px radius, using Mexican Green for "Authentic" and Deep Black for "New."
- **Input Fields:** 1px border in Medium Gray, shifting to Deep Black on focus. No shadows.
- **Lists:** Clean, borderless lists with generous 16px vertical padding between items, separated by light 1px dividers.
- **Launch-Specific Hero:** For the Mexico jersey launch, use "Bleed" imagery that breaks the grid, paired with `display-lg` typography overlapping the product.