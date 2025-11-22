import { useEffect, useState } from 'react'

export default function RestaurantGrid({ onOpenRestaurant }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      try {
        const res = await fetch(`${baseUrl}/restaurants`)
        const data = await res.json()
        setRestaurants(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div id="restaurants" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-slate-800/60 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="restaurants" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-xl font-semibold text-white mb-4">Nearby Restaurants</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {restaurants.map(r => (
          <button key={r.id} onClick={() => onOpenRestaurant(r)} className="group text-left">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-800/60">
              <img src={r.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349'} alt={r.name} className="h-40 w-full object-cover group-hover:scale-[1.02] transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between text-white">
                  <p className="font-semibold tracking-tight">{r.name}</p>
                  <p className="text-sm opacity-90">{r.delivery_time_min}-{r.delivery_time_min + 10} min</p>
                </div>
                <p className="text-blue-100/90 text-xs">{r.cuisine} • {r.rating.toFixed(1)}⭐</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
