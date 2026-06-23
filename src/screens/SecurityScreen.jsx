import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle, Shield, Key } from 'lucide-react'

export default function SecurityScreen({ onNavigate }) {
  const features = [
    { icon: Shield, title: 'AES-256 Verschlüsselung', desc: 'Alle Kartendaten verschlüsselt', active: true },
    { icon: Lock, title: 'Biometrische Sperre', desc: 'Face ID / Fingerabdruck', active: true },
    { icon: Key, title: 'Zwei-Faktor-Auth', desc: '2FA für Account', active: true },
    { icon: Shield, title: 'Österreichische Server', desc: 'DSGVO-konform in AT/EU', active: true },
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
        <h1 className="text-2xl font-bold text-white">🔒 Sicherheit</h1>
      </div>

      {/* Security Status */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6 mb-6 flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <p className="text-white font-bold text-lg mb-2">Maximale Sicherheit</p>
        <p className="text-gray-400 text-xs">Deine Daten sind vollständig geschützt</p>
      </motion.div>

      {/* Security Features */}
      <div className="space-y-3 mb-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={idx}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="glass-card rounded-2xl p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{feature.title}</p>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
              {feature.active && (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Privacy Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-6 border-t border-white/10 space-y-4"
      >
        <div className="glass-card rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-2">📋 Datenschutz</p>
          <ul className="text-white text-xs space-y-1">
            <li>• Keine Weitergabe an Dritte</li>
            <li>• Automatische Löschung nach 2 Jahren Inaktivität</li>
            <li>• EU-DSGVO konform</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}