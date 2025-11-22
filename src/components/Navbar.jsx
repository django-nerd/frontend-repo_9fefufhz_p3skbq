import { useState } from 'react'
import { ShoppingBag, Search, Menu } from 'lucide-react'

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-sm bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)} className="sm:hidden text-slate-200 hover:text-white">
            <Menu size={22} />
          </button>
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/20 blur-2xl rounded-full" />
            <div className="relative flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_2px_rgba(96,165,250,0.8)]" />
              <span className="font-semibold tracking-tight text-white">Celestial Bites</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/70 border border-white/10 text-slate-200">
          <Search size={16} className="text-slate-400" />
          <input placeholder="Search cuisines, dishes..." className="bg-transparent outline-none placeholder:text-slate-400 text-sm w-64" />
        </div>

        <button onClick={onCartClick} className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition">
          <ShoppingBag size={18} />
          <span className="text-sm font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-white text-slate-900 font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
