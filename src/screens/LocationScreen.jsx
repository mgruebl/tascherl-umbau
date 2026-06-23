import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Zap } from 'lucide-react'

export default function LocationScreen({ onNavigate }) {
  const nearby = [
    { id: 1, name: 'Starbucks Mariahilf', distance: '250m', icon: '☕', promo: '-15%' },
    { id: 2, name: 'dm Drogerie', distance: '450m', icon: '💊', promo: '+100 Punkte' },
    { id: 3, name: 'Fitnessstudio XYZ', distance: '680m', icon: '💪', promo: '2h Gratis' },
    { id: 4, name: 'Bäckerei Mueller', distance: '320m', icon: '🥐', promo: 'Kaffee Gratis' },
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
        <h1 className="text-2xl font-bold text-white">In deiner Nähe</h1>
      </div>

      {/* Location Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-5 mb-6 flex items-center gap-3"
      >
        <MapPin className="w-6 h-6 text-green-400" />
        <div>
          <p className="text-white font-semibold text-sm">Wien, Mariahilf</p>
          <p className="text-gray-400 text-xs">GPS aktiviert</p>
        </div>
      </motion.div>

      {/* Nearby Offers */}
      <div className="space-y-3">
        {nearby.map((place, idx) => (
          <motion.div
            key={place.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="glass-card rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:glass-light transition-all"
          >
            <span className="text-3xl">{place.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{place.name}</p>
              <p className="text-gray-400 text-xs">{place.distance}</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-lg">
              <Zap className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-xs font-bold">{place.promo}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-6 border-t border-white/10"
      >
        <div className="glass-card rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-2">💡 Tipp:</p>
          <p className="text-white text-sm font-semibold">Aktiviere Push-Benachrichtigungen für exklusive Angebote</p>
        </div>
      </motion.div>
    </motion.div>
  )
}