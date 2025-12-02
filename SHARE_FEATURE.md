# Share Feature Documentation

## Overview

The share feature allows users to export their Alamo Wrapped statistics as a shareable 1080x1080px image, perfect for social media.

## Implementation

### Components

**1. ShareCard Component** (`src/components/ShareCard.tsx`)
- Hidden component (positioned off-screen)
- 1080x1080px square format (Instagram-optimized)
- Displays key stats:
  - Total movies watched
  - Hours watched
  - Percentile ranking
  - Favorite movie (if has repeat viewings) OR top market
- Gradient background with decorative elements
- Includes branding footer with website URL

**2. Share Button** (in ResultsCarousel final slide)
- Gradient button with Share icon
- Loading state with spinner animation
- Disabled state while generating
- Hover effects and transitions

### Technology

**html2canvas**
- Converts DOM elements to canvas
- Scale: 2x for high quality (2160x2160px actual output)
- Transparent background support
- No logging to console

### User Flow

1. **User clicks "Share Your Wrapped"** on final slide
2. **Loading state** - Button shows spinner
3. **Image generation** - html2canvas captures ShareCard
4. **Platform detection:**
   - **Mobile with Web Share API** - Native share dialog opens
   - **Desktop or no Web Share** - Automatic download
5. **Complete** - Button returns to normal state

### Web Share API

**Supported on:**
- iOS Safari 12+
- Android Chrome 75+
- macOS Safari 12.1+

**Features:**
- Native share sheet
- Direct sharing to apps (Instagram, Twitter, Messages, etc.)
- File sharing support
- Graceful fallback to download

### Download Fallback

**When Web Share is unavailable:**
- Creates temporary `<a>` element
- Triggers download with filename: `alamo-wrapped-2025.png`
- Removes element after download

## Image Specifications

### Dimensions
- **Canvas size:** 1080x1080px
- **Actual output:** 2160x2160px (2x scale for quality)
- **Format:** PNG with transparency support

### Design
- **Background:** Gradient (blue → purple → pink)
- **Layout:** 2x2 grid of stat cards
- **Typography:** Bold, high-contrast white text
- **Decorative:** Floating blur circles
- **Branding:** Footer with website URL

### Content
- Header: "My 2025 Alamo Wrapped"
- 4 stat cards with icons
- Footer: "alamowrapped.com"

## Error Handling

**Scenarios:**
1. **ShareCard not found** - Alert user, log error
2. **Canvas generation fails** - Alert user, log error
3. **Share cancelled** - Silent, fallback to download
4. **Share not supported** - Automatic fallback to download

## Performance

**Generation time:** ~1-2 seconds
- Depends on device performance
- Loading state provides feedback
- Non-blocking UI

## Future Enhancements

### Potential Features
- [ ] Multiple template options
- [ ] Instagram Story format (1080x1920px)
- [ ] Twitter/X format (1200x675px)
- [ ] Animated GIF export
- [ ] Video export (slideshow)
- [ ] Copy to clipboard
- [ ] Direct social media posting
- [ ] QR code with results link
- [ ] Custom color schemes
- [ ] Add user's name/handle

### Technical Improvements
- [ ] Server-side rendering (Puppeteer)
- [ ] Canvas API for more control
- [ ] Font embedding for consistency
- [ ] Image compression
- [ ] Progressive enhancement
- [ ] Analytics tracking

## Testing

### Manual Testing Checklist
- [ ] Desktop Chrome - Download works
- [ ] Desktop Safari - Download works
- [ ] Desktop Firefox - Download works
- [ ] iOS Safari - Native share works
- [ ] Android Chrome - Native share works
- [ ] Image quality is high
- [ ] All stats display correctly
- [ ] Loading state appears
- [ ] Error handling works
- [ ] Button disabled during generation

### Edge Cases
- [ ] No repeat viewings (shows top market instead)
- [ ] Very long movie titles (truncation)
- [ ] High movie counts (formatting)
- [ ] Network offline (should still work)

## Dependencies

```json
{
  "html2canvas": "^1.4.1"
}
```

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| html2canvas | ✅ | ✅ | ✅ | ✅ |
| Web Share API | ✅ | ❌ | ✅ | ✅ |
| Download | ✅ | ✅ | ✅ | ✅ |

## Security

- `target="_blank"` with `rel="noopener noreferrer"` on external links
- No external API calls
- Client-side only processing
- No data sent to servers
- No tracking pixels

## Accessibility

- Button has proper disabled state
- Loading indicator is visible
- Keyboard accessible
- Screen reader friendly button text
- Clear visual feedback

## File Size

**Generated image:**
- Typical size: 200-400 KB
- Format: PNG
- Compression: None (lossless)
- Suitable for social media upload limits

## Social Media Specs

### Instagram
- **Post:** 1080x1080px ✅ (Perfect fit)
- **Story:** 1080x1920px (Future enhancement)
- **Max file size:** 30 MB ✅

### Twitter/X
- **Post:** 1200x675px recommended (Future enhancement)
- **Current:** 1080x1080px ✅ (Works, slightly cropped)
- **Max file size:** 5 MB ✅

### Facebook
- **Post:** 1200x630px recommended (Future enhancement)
- **Current:** 1080x1080px ✅ (Works fine)
- **Max file size:** 10 MB ✅
