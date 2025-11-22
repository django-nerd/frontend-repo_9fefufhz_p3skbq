import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_20%_-10%,rgba(56,189,248,0.25),transparent),radial-gradient(800px_300px_at_80%_-10%,rgba(99,102,241,0.25),transparent)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
            >
              Food from a different universe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-5 text-lg text-blue-100/90 max-w-xl"
            >
              Discover handpicked restaurants with cosmic vibes and stellar flavors. Lightning-fast delivery, mesmerizing UI.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-8 flex items-center gap-3"
            >
              <a href="#restaurants" className="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition">Explore Restaurants</a>
              <a href="#featured" className="px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/20 transition">Featured</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(96,165,250,0.15),transparent_30%)] blur-2xl" />
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 shadow-2xl">
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" alt="noodles" className="w-full h-[340px] object-cover" />
              </div>
              <div className="p-4 text-blue-100/90">
                <p className="text-sm">Featured: Nebula Noodles • 25-35 min • 4.8⭐</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
