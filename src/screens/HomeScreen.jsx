import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, MapPin, Lock, Plus } from 'lucide-react'

export default function HomeScreen({ onNavigate }) {
  const cards = [
    { id: 1, name: 'Starbucks', type: 'Gutschein', color: 'from-green-600 to-green-700' },
    { id: 2, name: 'Fitnessstudio XYZ', type: 'NFC Karte', color: 'from-blue-600 to-blue-700' },
    { id: 3, name: 'dm Drogerie', type: 'Mitgliedskarte', color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-gradient-to-b from-black via-black to-gray-900 p-6 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Tascherl</h1>
        <p className="text-gray-400 text-sm">Deine digitale Geldbörse</p>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-5 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs mb-1">Deine Karten</p>
            <p className="text-white text-2xl font-bold">{cards.length}</p>
          </div>
          <Wallet className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Deine Karten</h2>
          <button
            onClick={() => onNavigate('add')}
            className="glass rounded-full p-2 hover:glass-light transition-all"
          >
            <Plus className="w-5 h-5 text-blue-400" />
          </button>
        </div>

        <div className="space-y-3">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => onNavigate('cards')}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform`}
            >
              <p className="text-white font-semibold text-sm mb-1">{card.name}</p>
              <p className="text-white/80 text-xs">{card.type}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-white/10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('location')}
          className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:glass-light transition-all"
        >
          <MapPin className="w-6 h-6 text-green-400" />
          <span className="text-white text-xs font-semibold">In deiner Nähe</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('security')}
          className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:glass-light transition-all"
        >
          <Lock className="w-6 h-6 text-blue-400" />
          <span className="text-white text-xs font-semibold">Sicherheit</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
