import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Plus } from 'lucide-react'

export default function AddCardScreen({ onNavigate }) {
  const [cardType, setCardType] = useState(null)

  const types = [
    { id: 'barcode', name: 'Barcode / Gutschein', icon: '📊', color: 'from-blue-600' },
    { id: 'member', name: 'Mitgliedskarte', icon: '🪪', color: 'from-purple-600' },
    { id: 'nfc', name: 'NFC Karte', icon: '📲', color: 'from-green-600' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-gradient-to-b from-black via-black to-gray-900 p-6 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="glass rounded-full p-3 hover:glass-light transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Neue Karte</h1>
      </div>

      {!cardType ? (
        // Card Type Selection
        <div className="space-y-3">
          {types.map((type, idx) => (
            <motion.button
              key={type.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCardType(type.id)}
              className={`glass-card rounded-2xl p-4 text-left hover:glass-light transition-all w-full`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{type.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-semibold">{type.name}</p>
                  <p className="text-gray-400 text-xs">Karte hinzufügen</p>
                </div>
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        // Form
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          {/* Camera Scan */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center aspect-video mb-4"
          >
            <Camera className="w-16 h-16 text-blue-400 mb-4" />
            <p className="text-white font-semibold">Karte fotografieren</p>
            <p className="text-gray-400 text-xs text-center mt-2">Oder manuell eingeben</p>
          </motion.div>

          {/* Input Fields */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Kartennummer"
              className="w-full bg-gray-800 text-white rounded-2xl px-4 py-3 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Kartenname"
              className="w-full bg-gray-800 text-white rounded-2xl px-4 py-3 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-white/10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCardType(null)}
              className="glass rounded-2xl p-3 text-white font-semibold hover:glass-light transition-all"
            >
              Zurück
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="bg-blue-600 rounded-2xl p-3 text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Speichern
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}