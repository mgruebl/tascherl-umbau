import React from 'react'
import { motion } from 'framer-motion'

export default function iPhone17Frame({ children }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto"
      style={{
        width: '390px',
        height: '844px',
        perspective: '1200px',
      }}
    >
      {/* Phone Body - Black Aluminum Frame */}
      <div
        className="absolute inset-0 rounded-[50px] overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
          boxShadow: `
            0 0 80px rgba(0, 0, 0, 0.6),
            0 20px 60px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5)
          `,
        }}
      >
        {/* Phone Bezel/Frame */}
        <div className="absolute inset-4 rounded-[45px] border-8 border-gray-900 overflow-hidden">
          {/* Screen Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-[37px] pointer-events-none z-40" />

          {/* Dynamic Island Container */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full z-50 flex justify-center pt-2.5">
            {/* Dynamic Island Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-56 h-11 bg-black rounded-full shadow-lg border border-gray-800 flex items-center justify-center gap-4 relative"
              style={{
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), inset 0 1px 3px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Camera Notch - Left */}
              <div className="w-3 h-3 rounded-full bg-black shadow-lg" />
              
              {/* Status Bar Content */}
              <div className="flex-1 flex items-center justify-between px-4">
                <span className="text-white text-xs font-semibold">9:41</span>
              </div>

              {/* Status Icons - Right */}
              <div className="w-1 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
            </motion.div>
          </div>

          {/* Status Bar Spacing */}
          <div className="h-14 bg-black" />

          {/* Screen Content Area */}
          <div className="w-full flex-1 bg-black overflow-hidden relative">
            {children}

            {/* Screen Vignette */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[37px]"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%)',
              }}
            />
          </div>

          {/* Home Indicator Area */}
          <div className="h-9 bg-black flex items-center justify-center border-t border-gray-900">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              className="h-1.5 bg-gray-800 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Phone Glass Shine */}
      <div
        className="absolute inset-0 rounded-[50px] pointer-events-none"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.2) 0%,
              transparent 30%,
              transparent 70%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
          boxShadow: `
            inset -1px -1px 3px rgba(0, 0, 0, 0.5),
            inset 1px 1px 3px rgba(255, 255, 255, 0.1)
          `,
        }}
      />

      {/* Phone Shadow Base */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-80 h-20 bg-black/30 rounded-full blur-3xl"
      />
    </motion.div>
  )
}
