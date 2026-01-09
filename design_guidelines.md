# Learning Journal PWA Design Guidelines

## Design Approach
**System-Based:** Clean productivity app aesthetic inspired by Notion and Linear. Focus on readability, clear hierarchy, and efficient information display for educational content and portfolio presentation.

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - body text, forms, UI elements
- Display: Space Grotesk (Google Fonts) - headings, page titles

**Hierarchy:**
- Page Titles: text-4xl md:text-5xl font-bold (Space Grotesk)
- Section Headings: text-2xl md:text-3xl font-semibold
- Subsections: text-xl font-medium
- Body Text: text-base leading-relaxed
- Meta Info (dates, tags): text-sm text-opacity-70
- Form Labels: text-sm font-medium uppercase tracking-wide

## Layout System

**Spacing Primitives:** Tailwind units 2, 4, 6, 8, 12, 16, 20
- Component padding: p-6 or p-8
- Section spacing: space-y-8 or space-y-12
- Card gaps: gap-6
- Form field spacing: space-y-4

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Reading content: max-w-3xl
- Forms: max-w-2xl
- Side padding: px-4 md:px-8

**Grid Layouts:**
- Projects: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Journal entries: Single column max-w-3xl for readability
- About page: Two-column on desktop (profile info + bio)

## Component Library

### Navigation
- Fixed top navigation bar with backdrop blur effect
- Logo/name left, menu items right
- Active page indicator with subtle underline
- Mobile: Hamburger menu (if needed) or simplified horizontal scroll
- Height: h-16, items centered vertically

### Homepage
- Hero section: h-screen or min-h-[70vh]
- Centered content: name/title, tagline, brief description
- Subtle CTA buttons (View Journal, See Projects)
- Optional: Animated typing effect for tagline
- NO background image - clean, minimal approach with focus on typography

### Journal Page
**Entry Form Card:**
- Elevated card with rounded corners (rounded-xl)
- Form fields: Name input, Reflection textarea (rows-6)
- Clear submit/reset buttons
- Helper text: "Minimum 10 words" beneath textarea

**Journal Entries Display:**
- Card-based layout per entry
- Each card shows: Name (bold), Date (italic, smaller), Reflection text
- Cards have subtle border, rounded-lg, p-6
- Stack vertically with space-y-6
- Most recent entries first
- Empty state: Centered message "No reflections yet"

### Projects Page
- Grid of project cards (2-3 columns on desktop)
- Each card: Project image (if available), title, description, tech tags
- Cards hover effect: subtle lift (transform)
- Link to GitHub or external project
- Optional: Filter by technology/category

### About Page
- Two-column layout (desktop): Profile image/info left, bio right
- Profile section: Name, role, contact links (GitHub, email)
- Bio: max-w-2xl, readable line-height
- Skills/technologies: Badge-style tags with rounded-full pills
- Optional: Timeline of learning journey

### Forms & Inputs
- Consistent input styling: border rounded-lg, px-4 py-3
- Focus states: ring-2 effect
- Labels above inputs with proper spacing (mb-2)
- Textareas: resize-none for consistency
- Buttons: rounded-lg px-6 py-3, font-medium
- Validation messages: text-sm below inputs

### Cards
- Standard card: rounded-xl, border, p-6
- Journal entry card: border-l-4 accent border for visual interest
- Project card: overflow-hidden for image, content p-6
- Hover effects: subtle shadow increase

### Buttons
**Primary:** Full background, medium weight text, px-6 py-3, rounded-lg
**Secondary:** Border variant, transparent background
**Small buttons:** px-4 py-2, text-sm

### Footer
- Simple centered layout
- Copyright, GitHub link, PWA install status indicator
- py-12, border-top
- Minimal, not intrusive

## Special PWA Features

**Offline Indicator:**
- Subtle banner at top when offline
- Fixed position, dismissible
- Text: "You're offline. Changes will sync when connected."

**Install Prompt:**
- Non-intrusive prompt button in navigation or footer
- Only show if not already installed

**Loading States:**
- Skeleton screens for journal entries loading
- Subtle spinner for form submissions

## Responsive Strategy

**Mobile (base to md):**
- Single column layouts
- Stack navigation items or use simplified menu
- Larger touch targets (min-h-12 for buttons)
- Form inputs: full width, comfortable spacing

**Tablet (md to lg):**
- 2-column grids for projects
- Side-by-side layouts begin to appear

**Desktop (lg+):**
- Full 3-column grids
- Optimal reading width maintained with max-w constraints
- Generous whitespace

## Accessibility
- Semantic HTML throughout
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels with for attributes
- ARIA labels where needed (navigation, buttons)
- Sufficient touch targets (44px minimum)
- Keyboard navigation support
- Focus visible states on all interactive elements

## Icons
**Library:** Heroicons (via CDN)
- Navigation: outline style, w-6 h-6
- Form actions: solid style, w-5 h-5
- Status indicators: outline, w-5 h-5
- Social links: Consistent sizing w-6 h-6

## Animation
**Minimal approach:**
- Page transitions: None (instant, fast loading)
- Card hovers: Subtle transform scale-[1.02] + shadow
- Button states: Standard hover/active
- Form submission: Brief success animation (checkmark fade-in)
- NO scroll animations, parallax, or complex transitions

## Images
**Usage:**
- NO hero background image on homepage
- Project cards: Thumbnail images (aspect-ratio-video)
- About page: Professional headshot/avatar (rounded-full or rounded-lg)
- Fallback: Placeholder with initials if no image

This design prioritizes clarity, readability, and function—perfect for a learning journal and portfolio showcase that will be used weekly throughout an academic term.