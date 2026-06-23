import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function GoldenCircleScreen({ onNavigate }) {
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
        <h1 className="text-2xl font-bold text-white">Golden Circle</h1>
      </div>

      {/* Circular Golden Circle Visualization */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-56 h-56">
          {/* Outer Circle - What */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="absolute inset-0 rounded-full border-4 border-green-500/30 flex items-center justify-center"
          >
            {/* Middle Circle - How */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-32 h-32 rounded-full border-4 border-purple-500/40 flex items-center justify-center"
            >
              {/* Inner Circle - Why */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"
              >
                <span className="text-white text-2xl font-bold">WHY</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* HOW Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-14 text-center"
            >
              <p className="text-purple-400 font-bold text-sm">HOW</p>
            </motion.div>

            {/* WHAT Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-6 text-center"
            >
              <p className="text-green-400 font-bold text-sm">WHAT</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Explanation */}
      <div className="space-y-3">
        {/* WHY */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-4 border-l-4 border-blue-500"
        >
          <p className="text-blue-400 font-bold text-sm mb-1">WHY - Der Grund</p>
          <p className="text-white text-xs">Wir glauben, dass niemand eine prall gefüllte Geldbörse braucht. Der Alltag soll leichter sein – ohne Kartenchaos.</p>
        </motion.div>

        {/* HOW */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-4 border-l-4 border-purple-500"
        >
          <p className="text-purple-400 font-bold text-sm mb-1">HOW - Wie wir es tun</p>
          <p className="text-white text-xs">Tascherl vereint alle Kartentypen sicher an einem Ort – Gutscheine, Mitgliedskarten & NFC. Europäische Datensicherheit.</p>
        </motion.div>

        {/* WHAT */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-4 border-l-4 border-green-500"
        >
          <p className="text-green-400 font-bold text-sm mb-1">WHAT - Was wir anbieten</p>
          <p className="text-white text-xs">Eine App, die deine Geldbörse digitalisiert – dein Tascherl für alle Karten, immer griffbereit und sicher.</p>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto pt-6 border-t border-white/10"
      >
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-white font-bold italic">"Leichter leben. Mit Tascherl."</p>
        </div>
      </motion.div>
    </motion.div>
  )
}