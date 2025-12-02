# Alamo Watched - Styling Guide

## Results Carousel Styling

### Dynamic Background System

The carousel features a **dynamic, colorful abstract background** that changes with each slide:

#### Color Schemes (12 unique gradients)
1. **Welcome** - Blue → Purple → Pink
2. **Total Movies** - Indigo → Blue → Cyan
3. **Hours Watched** - Purple → Pink → Rose
4. **Comparative Stats** - Green → Emerald → Teal
5. **Top Market** - Red → Orange → Yellow
6. **Month Chart** - Blue → Indigo → Purple
7. **Day Chart** - Violet → Purple → Fuchsia
8. **Time Chart** - Orange → Amber → Yellow
9. **Favorite Movie** - Yellow → Amber → Orange
10. **Top Movies** - Blue → Cyan → Teal
11. **Directors** - Indigo → Blue → Cyan
12. **Thank You** - Pink → Rose → Red

#### Animated Elements

**Gradient Background:**
- Smooth fade transition between slides (0.8s duration)
- No white flash - gradient persists and cross-fades
- Each slide triggers new gradient layer

**Animated Geometric Shapes (20 shapes total):**

**Circles (4):**
1. Top-left, 8s loop, 540° rotation with arc pattern
2. Top-right, 10s loop, counter-clockwise orbit
3. Bottom center, 11.5s loop, 480° rotation with complex path
4. Top-left third, 9.5s loop, -600° rotation with bounce

**Squares (4):**
5. Bottom-right, 9s loop, full 360° rotation with bounce
6. Top-left quarter, 11s loop, diagonal at 45° angle
7. Top two-thirds right, 10.5s loop, counter-clockwise with complex path
8. Bottom-left quarter, 12.5s loop, 390° rotation starting at 30°

**Triangles (4):**
9. Mid-right, 7s loop, -480° rotation with float
10. Bottom-left, 9.5s loop, inverted with 420° rotation
11. Top center-left, 8.5s loop, 450° rotation starting at 90°
12. Bottom two-thirds right, 11.5s loop, -405° rotation at -45°

**Hexagons (4):**
13. Bottom center-left, 10.5s loop, 240° rotation with drift
14. Top-right third, 12s loop, 270° rotation starting at 30°
15. Top-left half, 13.5s loop, 255° rotation starting at 15°
16. Bottom-right half, 9.8s loop, 220° rotation starting at -20°

**Stars (2):**
17. Bottom-right quarter, 13s loop, 288° rotation (5-point)
18. Top-left third, 14.5s loop, 324° rotation starting at 36°

**Diamonds (4):**
19. Top two-thirds left, 8.5s loop, full 360° rotation
20. Bottom-right half, 10.8s loop, 405° rotation starting at 45°
21. Top-right center, 11.2s loop, 330° rotation starting at -30°
22. Bottom center-left, 9.3s loop, 380° rotation starting at 20°

All shapes:
- White borders with 15-20% opacity
- Scale from 0 to full size on slide change (5-stage scale animations)
- Complex motion paths with 5 keyframes each
- Rotation ranges: 220° to 600° per loop
- Duration ranges: 7-14.5 seconds
- Different easing for organic, non-repetitive feel
- Reset and re-animate with each slide change
- **Modular component** - Separated into `AnimatedShapes.tsx`

**Floating Particles (15 particles):**
- Spawn at random positions across entire viewport
- Float upward 200px and fade out
- Staggered delays (0.3s intervals)
- 3-5s duration per cycle (randomized)
- Infinite loop with reset on slide change
- Creates depth and atmosphere

### Card Styling

**Main Carousel Card:**
- Semi-transparent white background (`bg-white/95`)
- Backdrop blur for glassmorphism effect
- Rounded corners (`rounded-2xl`)
- Large shadow (`shadow-2xl`)
- Minimum height: 600px

### Navigation Elements

**Arrow Buttons:**
- Semi-transparent white (`bg-white/90`)
- Hover effects: full opacity + scale up 10%
- Backdrop blur for depth
- Extra large shadows (`shadow-xl`)
- Smooth transitions

**Dot Indicators:**
- Active: White, elongated (w-8), with shadow
- Inactive: White 40% opacity, small (w-2)
- Hover: 60% opacity
- All have smooth transitions

**Slide Counter:**
- White text with drop shadow
- Bold, large font (text-lg)
- Positioned below dots

### Keyboard Navigation

- **Left Arrow** - Previous slide
- **Right Arrow** - Next slide
- Event listeners properly cleaned up on unmount

## Design Philosophy

### Spotify Wrapped Inspiration
- One stat/insight at a time
- Bold, colorful, engaging
- Smooth animations throughout
- Story-driven progression

### Color Psychology
- **Blue/Cyan** - Trust, data, analytics
- **Purple/Pink** - Creativity, entertainment
- **Green** - Success, growth, comparison
- **Orange/Yellow** - Energy, warmth, time
- **Red** - Passion, favorites, highlights

### Animation Principles
- **Entrance** - Slide in from right with fade
- **Exit** - Slide out to left with fade
- **Background** - Smooth color transitions
- **Blobs** - Continuous organic movement
- **Buttons** - Responsive hover states

## Technical Implementation

### Framer Motion
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
  >
```

### Tailwind CSS
- Dynamic classes based on slide index
- Gradient utilities (`bg-gradient-to-br`)
- Opacity utilities (`bg-white/95`)
- Blur utilities (`backdrop-blur-sm`, `blur-3xl`)
- Transform utilities (`-translate-y-1/2`)

### Performance
- CSS transforms for animations (GPU accelerated)
- Backdrop filter for glassmorphism
- Optimized re-renders with React keys
- Cleanup of event listeners

## Future Enhancements

Potential additions:
- [ ] Parallax scrolling effect
- [ ] Particle effects on transitions
- [ ] Custom cursor for navigation
- [ ] Sound effects on slide change
- [ ] Confetti on final slide
- [ ] Share button with gradient background
- [ ] Dark mode variant
- [ ] Accessibility: reduced motion support
