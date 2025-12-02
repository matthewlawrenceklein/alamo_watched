# Help Modal Documentation

## Overview

The Help Modal provides users with step-by-step visual and written instructions for extracting their purchase history data from Alamo Drafthouse's website using Chrome Developer Tools.

## Implementation

### Components

**HelpModal Component** (`src/components/HelpModal.tsx`)
- Full-screen modal overlay with backdrop blur
- Animated entrance/exit with Framer Motion
- Scrollable content area
- Responsive design
- Close button and backdrop click to dismiss

### Features

**Visual Tutorial:**
- GIF walkthrough showing the entire process
- Located at `/assets/tutorial.gif`
- Displayed prominently at top of modal

**7-Step Instructions:**

1. **Log in to Alamo Drafthouse**
   - Direct link to purchase history page
   - Login reminder

2. **Open Chrome Developer Tools**
   - Keyboard shortcuts for Mac/Windows
   - Network tab navigation
   - Filter setup (Fetch/XHR)

3. **Reload the Page**
   - Keyboard shortcuts
   - Explanation of why this is needed

4. **Load All Purchases**
   - "Load More" button instructions
   - Explanation of pagination

5. **Find Purchase History Requests**
   - How to identify the correct requests
   - Multiple request explanation

6. **Copy Each Response**
   - Double-click to open in new tab
   - Select all and copy instructions
   - Keyboard shortcuts

7. **Paste Into the App**
   - Tab system explanation
   - "Add Another Tab" button reference

**Additional Elements:**
- Pro tip callout box
- Color-coded step numbers
- Keyboard shortcut badges
- External link to Alamo Drafthouse
- "Got It!" button to close

### UI/UX Design

**Layout:**
- Maximum width: 4xl (896px)
- Maximum height: 90vh
- Scrollable content area
- Fixed header and footer

**Color Scheme:**
- Header: Blue to purple gradient
- Step numbers: Matching gradient circles
- Info boxes: Blue background
- Tip box: Green background
- Links: Blue with hover state

**Animations:**
- Backdrop fade in/out
- Modal scale and fade
- Smooth transitions (200ms)

**Accessibility:**
- Keyboard shortcuts displayed in `<kbd>` tags
- ARIA labels on buttons
- Semantic HTML structure
- Focus management
- Screen reader friendly

### Trigger

**Help Button:**
- Located next to "Get Started" heading
- Large question mark icon (HelpCircle)
- Circular button with blue background
- Hover state: Darker blue
- Tooltip: "How to get your data"

### State Management

```tsx
const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
```

**Open:** Click help button → `setIsHelpModalOpen(true)`
**Close:** 
- Click X button
- Click backdrop
- Click "Got It!" button
→ `setIsHelpModalOpen(false)`

## User Flow

1. User lands on homepage
2. Sees "Get Started" with question mark button
3. Clicks question mark
4. Modal opens with tutorial GIF and instructions
5. User follows steps to extract data
6. User closes modal
7. User pastes data into app

## Technical Details

### Dependencies

```json
{
  "framer-motion": "^10.x.x",
  "lucide-react": "^0.x.x",
  "next/image": "^14.x.x"
}
```

### File Structure

```
src/
├── components/
│   └── HelpModal.tsx       # Modal component
├── app/
│   └── page.tsx            # Homepage with help button
└── public/
    └── assets/
        └── tutorial.gif    # Tutorial video/GIF
```

### Props Interface

```tsx
interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}
```

## Assets Required

**Tutorial GIF:**
- Path: `/assets/tutorial.gif`
- Recommended size: 800x450px
- Format: GIF or MP4
- Content: Screen recording showing:
  - Opening DevTools
  - Network tab
  - Reloading page
  - Clicking "Load More"
  - Finding purchase-history requests
  - Opening in new tab
  - Copying JSON

## Styling

### Tailwind Classes

**Modal Container:**
- `fixed inset-0 z-50` - Full screen overlay
- `flex items-center justify-center` - Center modal
- `p-4` - Padding for mobile

**Modal Content:**
- `bg-white rounded-2xl` - White card with rounded corners
- `shadow-2xl` - Large shadow
- `max-w-4xl w-full` - Responsive width
- `max-h-[90vh]` - Maximum height
- `overflow-hidden` - Clip content

**Header:**
- `bg-gradient-to-r from-blue-600 to-purple-600` - Gradient
- `p-6` - Padding
- `text-3xl font-bold text-white` - Large white text

**Step Numbers:**
- `w-10 h-10` - Fixed size
- `bg-gradient-to-br from-blue-600 to-purple-600` - Gradient
- `rounded-full` - Circle
- `text-white font-bold` - White bold text

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Modal | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ |
| Backdrop blur | ✅ | ✅ | ✅ | ✅ |
| GIF playback | ✅ | ✅ | ✅ | ✅ |

## Keyboard Shortcuts Displayed

**Mac:**
- `Cmd+Option+I` - Open DevTools
- `Cmd+R` - Reload page
- `Cmd+A` - Select all
- `Cmd+C` - Copy

**Windows:**
- `Ctrl+Shift+I` - Open DevTools
- `F12` - Open DevTools (alternative)
- `Ctrl+R` - Reload page
- `Ctrl+A` - Select all
- `Ctrl+C` - Copy

## Future Enhancements

### Potential Improvements
- [ ] Video player instead of GIF
- [ ] Interactive tutorial (step-by-step clicks)
- [ ] Browser detection (show Chrome-specific instructions)
- [ ] Download tutorial as PDF
- [ ] Embedded video from YouTube/Vimeo
- [ ] Multiple language support
- [ ] Dark mode support
- [ ] Print-friendly version
- [ ] FAQ section
- [ ] Troubleshooting guide
- [ ] Alternative methods (Safari, Firefox)

### Analytics Ideas
- [ ] Track modal open rate
- [ ] Track completion rate (modal → successful paste)
- [ ] Track time spent in modal
- [ ] Track which step users spend most time on
- [ ] A/B test different tutorial formats

## Testing Checklist

### Functionality
- [ ] Modal opens when help button clicked
- [ ] Modal closes when X button clicked
- [ ] Modal closes when backdrop clicked
- [ ] Modal closes when "Got It!" clicked
- [ ] GIF loads and plays
- [ ] All links work
- [ ] Keyboard shortcuts display correctly
- [ ] Scrolling works on long content
- [ ] Mobile responsive

### Visual
- [ ] Animations smooth
- [ ] Colors match brand
- [ ] Text readable
- [ ] Images load
- [ ] Layout doesn't break
- [ ] Step numbers aligned
- [ ] Buttons styled correctly

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus trap in modal
- [ ] ARIA labels present
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Text scalable

## Known Issues

None currently.

## Support

For issues or questions about the help modal:
1. Check that `/assets/tutorial.gif` exists
2. Verify Framer Motion is installed
3. Check browser console for errors
4. Ensure Next.js Image component is configured

## Version History

- **v1.0** - Initial implementation with GIF and 7-step instructions
