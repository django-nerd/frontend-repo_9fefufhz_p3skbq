import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RestaurantGrid from './components/RestaurantGrid'
import RestaurantModal from './components/RestaurantModal'

function App() {
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity }
        return copy
      }
      return [...prev, item]
    })
  }

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0)

  const placeOrder = async () => {
    if (cart.length === 0) return
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const restaurant = cart[0].restaurant
    const items = cart.map(c => ({ item_id: c.id, name: c.name, price: c.price, quantity: c.quantity }))
    const payload = {
      restaurant_id: restaurant.id,
      restaurant_name: restaurant.name,
      items,
      customer_name: 'Guest',
      address: '123 Star St',
      phone: '000-000-0000'
    }
    const res = await fetch(`${baseUrl}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    alert(`Order placed! Total $${data.total}`)
    setCart([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(600px_300px_at_80%_-10%,rgba(99,102,241,0.25),transparent)]" />
      <Navbar cartCount={cartCount} onCartClick={placeOrder} />
      <main className="relative">
        <Hero />
        <RestaurantGrid onOpenRestaurant={setSelected} />
        <RestaurantModal open={!!selected} onClose={() => setSelected(null)} restaurant={selected} onAddToCart={addToCart} />
      </main>
      {/* Floating cart summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl">
            <p className="text-white text-sm">{cartCount} items</p>
            <p className="text-white/80 text-sm">${cart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}</p>
            <button onClick={placeOrder} className="px-4 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">Place Order</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
