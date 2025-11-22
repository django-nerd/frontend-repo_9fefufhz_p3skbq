import { useEffect, useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'

export default function RestaurantModal({ open, onClose, restaurant, onAddToCart }) {
  const [menu, setMenu] = useState([])
  const [qty, setQty] = useState({})

  useEffect(() => {
    if (!restaurant) return
    const fetchMenu = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/restaurants/${restaurant.id}/menu`)
      const data = await res.json()
      setMenu(data)
    }
    fetchMenu()
  }, [restaurant])

  if (!open || !restaurant) return null

  const setQuantity = (id, delta) => {
    setQty(prev => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-slate-900 rounded-3xl border border-white/10 overflow-hidden">
        <div className="relative h-40">
          <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white border border-white/10"><X size={18} /></button>
        </div>
        <div className="p-4">
          <h3 className="text-white text-xl font-semibold mb-1">{restaurant.name}</h3>
          <p className="text-blue-100/80 text-sm mb-4">{restaurant.cuisine} • {restaurant.rating}⭐ • {restaurant.delivery_time_min}-{restaurant.delivery_time_min + 10} min</p>

          <div className="space-y-3 max-h-80 overflow-auto pr-1">
            {menu.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-slate-800/60">
                <img src={item.image_url} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-white font-medium leading-tight">{item.name}</p>
                  <p className="text-blue-100/70 text-sm line-clamp-2">{item.description}</p>
                  <p className="text-blue-100 mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQuantity(item.id, -1)} className="p-2 rounded-xl bg-slate-700 text-white"><Minus size={16} /></button>
                  <span className="w-6 text-center text-white">{qty[item.id] || 0}</span>
                  <button onClick={() => setQuantity(item.id, 1)} className="p-2 rounded-xl bg-blue-600 text-white"><Plus size={16} /></button>
                </div>
                <button onClick={() => qty[item.id] > 0 && onAddToCart({ ...item, quantity: qty[item.id], restaurant })} className="ml-2 px-3 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
