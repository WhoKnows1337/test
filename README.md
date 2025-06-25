# Erlebnis Wizard - Standalone Component

This is a standalone version of the Erlebnis (Experience) Wizard from XP Share. It includes a complete multi-step form wizard with an emotion wheel for creating and sharing experiences.

## Features

- 9-step wizard process with progress tracking
- Interactive emotion wheel (Emotionsrad) based on Gloria Willcox's Feeling Wheel
- Auto-save functionality with local storage
- Offline support
- Media upload with whiteboard/drawing capability
- Location selection with interactive map
- Privacy settings
- Draft saving
- Responsive design with dark theme

## Installation

### 1. Prerequisites

Make sure you have a Next.js or React project with TypeScript set up.

### 2. Install Dependencies

```bash
npm install lucide-react date-fns clsx tailwind-merge tailwindcss-animate
npm install @radix-ui/react-alert @radix-ui/react-badge @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-slot
```

### 3. Setup Tailwind CSS

1. Copy the `tailwind.config.ts` to your project root
2. Add the CSS variables from `globals.css` to your global CSS file
3. Make sure to include the tailwindcss-animate plugin

### 4. Copy Files

Copy the entire folder structure to your project:

```
components/
├── erlebnis-wizard.tsx       # Main wizard component
├── erlebnis-wizard-modal.tsx # Modal wrapper
├── wizard/                   # All wizard step components
│   ├── titel-schritt.tsx
│   ├── beschreibung-schritt.tsx
│   ├── emotionen-schritt.tsx
│   ├── emotions-rad.tsx      # Emotion wheel component
│   ├── kategorie-schritt.tsx
│   ├── datum-ort-schritt.tsx
│   ├── tags-schritt.tsx
│   ├── medien-schritt.tsx
│   ├── privatsphare-schritt.tsx
│   ├── zusammenfassung.tsx
│   └── aehnliche-finden-button.tsx
├── ui/                       # shadcn/ui components
├── whiteboard/              # Drawing functionality
├── map/                     # Location selection
hooks/
├── use-toast.ts
└── use-online-status.ts
lib/
└── utils.ts
```

### 5. Update Import Paths

Update all import paths to match your project structure. The components use `@/` alias for imports.

## Usage

### Basic Usage

```tsx
import { ErlebnisWizard } from '@/components/erlebnis-wizard'

function MyComponent() {
  const handleComplete = () => {
    console.log('Wizard completed!')
  }

  return <ErlebnisWizard onComplete={handleComplete} />
}
```

### With Modal

```tsx
import { ErlebnisWizardProvider, useErlebnisWizard } from '@/components/erlebnis-wizard-modal'

// Wrap your app with the provider
function App() {
  return (
    <ErlebnisWizardProvider>
      <YourApp />
    </ErlebnisWizardProvider>
  )
}

// Use the hook to open the wizard
function MyButton() {
  const { openWizard } = useErlebnisWizard()
  
  return (
    <button onClick={openWizard}>
      Open Experience Wizard
    </button>
  )
}
```

### Global Function

The modal also provides a global function:

```tsx
// Anywhere in your app
window.openErlebnisWizard()
```

## Data Structure

The wizard collects the following data:

```typescript
type ErlebnisData = {
  titel: string                    // Title
  kategorie: string               // Category
  unterkategorie?: string         // Subcategory
  beschreibung: string            // Description
  datum: Date | undefined         // Date
  ort: string                     // Location
  tags: string[]                  // Manual tags
  kiTags: string[]               // AI-suggested tags
  emotionen: string[]            // Selected emotions
  medien: File[]                 // Media files
  whiteboardImages?: WhiteboardImage[]  // Drawings
  mediaComments?: MediaComment[]  // Media comments
  privatsphare: "privat" | "link" | "offentlich" | "gruppe"  // Privacy
  gruppenId?: string             // Group ID (if privacy is "gruppe")
}
```

## Customization

### Styling

The wizard uses Tailwind CSS with a dark theme. You can customize colors by modifying the CSS variables in your global CSS file.

### Language

The wizard is currently in German. To translate:
1. Search for all German text strings in the components
2. Replace with your desired language
3. Consider creating a translation system for multi-language support

### Categories

Categories are defined in `kategorie-schritt.tsx`. You can modify the `kategorien` array to add or change categories.

### Emotions

The emotion wheel is defined in `emotions-rad.tsx`. The `emotionsKategorien` array contains all emotions organized in a hierarchical structure.

## Notes

- The wizard saves progress automatically to localStorage
- Media files are handled as File objects and need backend integration for actual upload
- The location selection requires a map provider integration (currently mocked)
- Some features like AI tag suggestions need backend API integration

## License

This component is extracted from the XP Share project. Please ensure you have the right to use it in your project.