import React from 'react'
import { motion } from 'framer-motion'

export default function iPhone17Frame({ children }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative"
      style={{
        width: '393px',
        aspectRatio: '9/19.5',
      }}
    >
      {/* Phone Frame */}
      <div className="relative w-full h-full rounded-[50px] bg-black shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black rounded-full z-50 shadow-lg flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="flex-1 text-center text-white text-xs font-semibold">9:41</div>
          <div className="w-4 h-2 rounded-full bg-gradient-to-r from-green-500 to-transparent"></div>
        </div>

        {/* Status Bar Top Spacing */}
        <div className="h-12 bg-black"></div>

        {/* Screen Content */}
        <div className="w-full flex-1 bg-black overflow-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="h-6 bg-black flex items-center justify-center">
          <div className="w-32 h-1 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* Phone Shadow */}
      <div className="absolute inset-0 rounded-[50px] shadow-2xl pointer-events-none" style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.1) inset',
      }}></div>
    </motion.div>
  )
}
