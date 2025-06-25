// Example 1: Basic Usage in a Component
import { ErlebnisWizard } from './components/erlebnis-wizard'

export function ExperienceCreator() {
  const handleComplete = () => {
    console.log('Experience created successfully!')
    // Handle the completion, e.g., close modal, refresh list, etc.
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Experience</h1>
      <ErlebnisWizard onComplete={handleComplete} />
    </div>
  )
}

// Example 2: Usage with Modal
import { ErlebnisWizardProvider, useErlebnisWizard } from './components/erlebnis-wizard-modal'

// First, wrap your app with the provider
export function App() {
  return (
    <ErlebnisWizardProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <MainContent />
      </div>
    </ErlebnisWizardProvider>
  )
}

// Then use the hook in any component
function Header() {
  const { openWizard } = useErlebnisWizard()

  return (
    <header className="p-4 border-b">
      <button
        onClick={openWizard}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Share Experience
      </button>
    </header>
  )
}

// Example 3: Using the global function
function SomeComponent() {
  const handleClick = () => {
    // This works from anywhere in the app
    if (typeof window !== 'undefined') {
      window.openErlebnisWizard()
    }
  }

  return (
    <button onClick={handleClick}>
      Open Wizard (Global Function)
    </button>
  )
}

// Example 4: Handling the collected data
import type { ErlebnisData } from './components/erlebnis-wizard'

export function WizardWithDataHandling() {
  const handleComplete = async (data: ErlebnisData) => {
    console.log('Collected data:', data)
    
    // Example: Send to your API
    try {
      const formData = new FormData()
      formData.append('title', data.titel)
      formData.append('description', data.beschreibung)
      formData.append('category', data.kategorie)
      formData.append('emotions', JSON.stringify(data.emotionen))
      formData.append('tags', JSON.stringify(data.tags))
      formData.append('privacy', data.privatsphare)
      
      // Add media files
      data.medien.forEach((file, index) => {
        formData.append(`media_${index}`, file)
      })
      
      const response = await fetch('/api/experiences', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        console.log('Experience saved successfully!')
      }
    } catch (error) {
      console.error('Error saving experience:', error)
    }
  }

  return <ErlebnisWizard onComplete={handleComplete} />
}