import React, { useState } from 'react'
import iPhone17Frame from './components/iPhone17Frame'
import HomeScreen from './screens/HomeScreen'
import CardsScreen from './screens/CardsScreen'
import AddCardScreen from './screens/AddCardScreen'
import LocationScreen from './screens/LocationScreen'
import SecurityScreen from './screens/SecurityScreen'
import GoldenCircleScreen from './screens/GoldenCircleScreen'

const screens = [
  { id: 'home', name: 'Home', component: HomeScreen },
  { id: 'cards', name: 'Meine Karten', component: CardsScreen },
  { id: 'add', name: 'Karte hinzufügen', component: AddCardScreen },
  { id: 'location', name: 'In deiner Nähe', component: LocationScreen },
  { id: 'security', name: 'Sicherheit', component: SecurityScreen },
  { id: 'golden', name: 'Golden Circle', component: GoldenCircleScreen },
]

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home')

  const CurrentComponent = screens.find(s => s.id === currentScreen)?.component || HomeScreen

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center overflow-hidden p-4">
      <div className="relative">
        {/* iPhone 17 Device */}
        <iPhone17Frame>
          <CurrentComponent onNavigate={setCurrentScreen} />
        </iPhone17Frame>

        {/* Bottom Navigation Overlay */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-8">
          <div className="flex gap-2 bg-black/70 backdrop-blur-xl rounded-full px-5 py-3 border border-white/20 shadow-2xl">
            {screens.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(screen.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentScreen === screen.id
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {screen.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
