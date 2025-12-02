# Changelog

## December 1, 2025 - Carousel Update

### Major Changes

#### 🎠 Spotify Wrapped-Style Carousel
- **Replaced dashboard with carousel interface** - Results now display one stat/chart at a time
- **Smooth animations** - Slides transition with fade and slide effects
- **Navigation controls** - Left/right arrows and dot indicators for navigation
- **Keyboard support** - Arrow keys work for navigation
- **Progress indicator** - Shows current slide number (e.g., "3 / 12")

#### 📅 2025 Filtering
- **Year-specific analytics** - Only counts movies with `sessionDateTimeUtc` in 2025
- **Automatic filtering** - Applied in the analyzer before any calculations
- **Accurate statistics** - All metrics now reflect 2025 data only

#### 🎬 Conditional Content
- **Top Movies slide** - Only shows if user has watched any movie more than once
- **Favorite Movie slide** - Only shows if user has repeat viewings
- **Dynamic slide count** - Total slides adjust based on available data

#### 🎯 Multi-Page JSON Support
- **"Add More Movies" button** - Allows adding multiple JSON inputs
- **Tab navigation** - Switch between different pagination responses
- **Per-tab validation** - Visual indicators (✓/✗) for each input
- **Combined analysis** - All purchases merged before processing
- **Smart submit button** - Only enabled when ALL tabs have valid JSON

### Carousel Slides

1. **Welcome** - "Your 2025 Alamo Wrapped"
2. **Total Movies** - Big number display with unique count
3. **Hours Watched** - Total viewing time
4. **Comparative Stats** - Percentile ranking vs other users
5. **Top Market** - Most visited location
6. **Movies by Month** - Bar chart of viewing timeline
7. **Day of Week** - When you watch movies
8. **Time of Day** - Morning/afternoon/evening/night patterns
9. **Favorite Movie** - Most-watched film (conditional)
10. **Top Rewatches** - List of repeat viewings (conditional)
11. **Top Directors** - Most-watched directors
12. **Thank You** - Closing message

### Removed Features
- ❌ "Analyze Another Year" button
- ❌ All-in-one dashboard view
- ❌ Static layout

### Technical Changes

**Files Modified:**
- `src/lib/analyzer.ts` - Added 2025 date filtering
- `src/app/results/[sessionId]/page.tsx` - Switched to carousel component
- `src/app/page.tsx` - Added multi-input support with tabs

**Files Created:**
- `src/components/ResultsCarousel.tsx` - New carousel component

**Dependencies Used:**
- `framer-motion` - Slide animations
- `recharts` - Chart rendering
- `lucide-react` - Icons

### User Experience Improvements

✅ **More engaging** - Story-driven presentation like Spotify Wrapped
✅ **Mobile-friendly** - Carousel works great on all screen sizes
✅ **Focused content** - One insight at a time, easier to digest
✅ **Shareable moments** - Each slide is screenshot-worthy
✅ **Accurate data** - 2025 filtering ensures correct year
✅ **Flexible input** - Handle paginated API responses easily

### Next Steps

Potential future enhancements:
- Add share buttons for individual slides
- Export carousel as video/GIF
- Add more slide types (genres, ratings, etc.)
- Social media integration
- Year-over-year comparisons
