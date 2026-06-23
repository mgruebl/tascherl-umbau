import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Barcode, QrCode, Copy } from 'lucide-react'

export default function CardsScreen({ onNavigate }) {
  const cardDetails = {
    name: 'Starbucks Card',
    type: 'Gutscheinkarte',
    barcode: '123456789012345',
    balance: '€42,50',
    points: '340 Punkte',
  }

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
        <div>
          <h1 className="text-2xl font-bold text-white">{cardDetails.name}</h1>
          <p className="text-gray-400 text-xs">{cardDetails.type}</p>
        </div>
      </div>

      {/* Card Visual */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 mb-6 aspect-video flex flex-col justify-between"
      >
        <div>
          <p className="text-green-100 text-xs font-semibold">STARBUCKS REWARDS</p>
          <p className="text-white text-xl font-bold mt-2">★ ★ ★ ★ ★</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-2">Gutschein-Nr.</p>
          <p className="text-white font-mono text-sm font-bold">{cardDetails.barcode}</p>
        </div>
      </motion.div>

      {/* QR Code Display */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6 mb-6 flex flex-col items-center"
      >
        <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center mb-4">
          <QrCode className="w-32 h-32 text-black" />
        </div>
        <p className="text-gray-400 text-xs text-center">QR-Code beim Checkout scannen</p>
      </motion.div>

      {/* Details */}
      <div className="space-y-3">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4"
        >
          <p className="text-gray-400 text-xs mb-1">Kontostand</p>
          <p className="text-white font-bold text-lg">{cardDetails.balance}</p>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-4"
        >
          <p className="text-gray-400 text-xs mb-1">Treuepunkte</p>
          <p className="text-white font-bold text-lg">{cardDetails.points}</p>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-white/10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="glass rounded-2xl p-3 flex items-center justify-center gap-2 hover:glass-light transition-all"
        >
          <Barcode className="w-4 h-4 text-blue-400" />
          <span className="text-white text-xs font-semibold">Barcode</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="glass rounded-2xl p-3 flex items-center justify-center gap-2 hover:glass-light transition-all"
        >
          <Copy className="w-4 h-4 text-green-400" />
          <span className="text-white text-xs font-semibold">Kopieren</span>
        </motion.button>
      </div>
    </motion.div>
  )
}