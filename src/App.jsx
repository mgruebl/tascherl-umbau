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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center p-8">
      <div className="flex gap-12 w-full max-w-7xl">
        {/* iPhone 17 Preview */}
        <div className="flex-1">
          <iPhone17Frame>
            <CurrentComponent onNavigate={setCurrentScreen} />
          </iPhone17Frame>
        </div>

        {/* Navigation & Info */}
        <div className="flex-1">
          <div className="glass rounded-3xl p-6 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Tascherl Demo</h1>
            <p className="text-gray-400 text-sm mb-8">iOS 18 Liquid Glass Design - iPhone 17</p>

            <div className="space-y-3 mb-8">
              {screens.map(screen => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(screen.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    currentScreen === screen.id
                      ? 'glass-light text-white'
                      : 'text-gray-300 hover:text-white hover:glass'
                  }`}
                >
                  {screen.name}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">✨ Features</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Gutscheinkarten & Barcodes</li>
                <li>• Mitgliedskarten verwaltung</li>
                <li>• NFC-Kartenspeicherung</li>
                <li>• Standort-basierte Empfehlungen</li>
                <li>• 🔒 Europäische Datensicherheit</li>
                <li>• Biometrische Sperre</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-white font-semibold text-sm mb-3">Golden Circle</h3>
              <div className="glass-card rounded-2xl p-4 text-xs space-y-2">
                <p className="text-blue-400"><strong>Why:</strong> Leichteren Alltag</p>
                <p className="text-purple-400"><strong>How:</strong> Alle Karten digital vereint</p>
                <p className="text-green-400"><strong>What:</strong> Tascherl App</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
