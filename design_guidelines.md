# Learning Journal PWA Design Guidelines

## Design Philosophy
**Warm Modern Minimal:** A refined, human-crafted visual system with warm neutral tones, subtle violet accents, and generous whitespace. The design balances professionalism with approachability, focusing on readability and clear visual hierarchy.

## Color Palette

### Light Mode
- **Background:** Warm off-white (#FDFCFB)
- **Foreground:** Deep slate (#1E2433)
- **Primary:** Muted violet (#6F5EF9)
- **Cards:** Warm cream (#F9F7F5)
- **Muted:** Warm gray for secondary text
- **Accents:** Gradient combinations using violet, blue, emerald, amber

### Dark Mode
- **Background:** Deep navy (#151A23)
- **Foreground:** Warm off-white (#F2EEE8)
- **Primary:** Lighter violet (#7C6EF9)
- **Cards:** Elevated navy (#181E28)
- **Muted:** Warm gray for secondary text

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - body text, forms, UI elements
- Display: Space Grotesk (Google Fonts) - headings, page titles, logo

**Hierarchy:**
- Page Titles: text-3xl md:text-4xl font-bold (Space Grotesk)
- Section Headings: text-xl md:text-2xl font-semibold
- Card Titles: text-lg font-semibold
- Body Text: text-base leading-relaxed
- Meta Info: text-sm text-muted-foreground
- Labels: text-xs font-medium uppercase tracking-wider

## Layout System

**Spacing Scale:** 4, 5, 6, 8, 10, 12, 14, 16 (Tailwind units)
- Component padding: p-5 or p-6
- Section spacing: py-8 md:py-12 or py-16 md:py-20
- Card gaps: gap-4 or gap-6
- Form field spacing: space-y-5

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Content sections: max-w-4xl or max-w-5xl
- Side padding: px-4 md:px-8

**Grid Layouts:**
- Feature cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- Projects: grid-cols-1 md:grid-cols-2
- About timeline: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Patterns

### Navigation
- Fixed top with backdrop blur (bg-background/80 backdrop-blur-lg)
- Subtle border (border-border/50)
- Logo with hover color transition
- Compact nav buttons with icons
- Mobile menu with same blur treatment

### Hero Section (Home)
- Asymmetric two-column layout on desktop
- Course badge pill above title
- Title split with accent color on second line
- Latest reflection preview card on right
- Gradient accent backgrounds

### Cards
- Rounded corners (rounded-lg default)
- Subtle border from theme
- Content padding p-5 or p-6
- Hover elevation using hover-elevate utility

### Journal Entry Cards
- Left accent bar (w-1 bg-primary)
- Flex layout with bar + content
- Week badge as rounded-full pill
- Delete button appears on hover (opacity transition)

### Project Cards
- Aspect ratio header (16/10) with gradient or image
- Gradient backgrounds with icon overlays
- Technology badges in secondary variant
- Ghost button CTAs in footer section

### Stats Cards
- Icon in rounded container (bg-primary/10)
- Large bold number
- Small muted label below

### Timeline Items
- Grid layout instead of vertical line
- Each item as card with icon + content
- Hover elevation on items
- Icon in rounded container

### Buttons
- Use built-in shadcn variants
- Default size for primary actions
- Small size for secondary actions
- Icon buttons with size="icon"
- Gap spacing with icons (gap-2)

### Badges
- Secondary variant for technology tags
- Font-normal weight
- Small text (text-xs)
- Rounded-full for week indicators

### Forms
- Clear labels above inputs
- Helpful descriptions below textareas
- Grid layout for side-by-side fields
- Submit + Reset button pair

## Visual Effects

### Gradients
- Feature icons: Subtle two-color gradients (from-color/20 to-color/10)
- Project placeholders: Similar subtle gradients with icon overlay
- Section backgrounds: Primary color at 5% opacity

### Hover States
- Use hover-elevate utility class
- Group hover for child element visibility
- Subtle opacity transitions
- No layout shifts on hover

### Transitions
- Color transitions: transition-colors
- Opacity: transition-opacity
- Image scale on hover: transition-transform duration-300

## Responsive Behavior

### Mobile (< md)
- Single column layouts
- Stack navigation vertically in menu
- Full-width form inputs
- Simplified stats layout

### Tablet (md - lg)
- Two-column grids where appropriate
- Side-by-side form fields
- Stats cards in row

### Desktop (lg+)
- Full multi-column layouts
- Asymmetric hero with preview card
- Sticky profile card on about page

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels on interactive elements
- Focus visible states
- Sufficient color contrast
- Touch targets min 44px

## Icons
- Library: Lucide React
- Navigation icons: w-4 h-4
- Feature icons: w-5 h-5
- Large decorative: w-12 h-12 or w-16 h-16
- Company logos: react-icons/si
