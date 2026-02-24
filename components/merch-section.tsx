"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useMerchPage } from "@/hooks/use-merch-page"
import { useCart } from "@/components/cart"

export function MerchSection() {
  const { hero, products, loading, error, categories } = useMerchPage()
  const cart = useCart()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  const cartCount = cart?.getCartItemCount() ?? 0
  const openCart = () => cart?.openCart()

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section – content from CMS (Merch page → Merch Hero) */}
      <div
        className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-black bg-cover bg-center"
        style={{
          backgroundImage: hero?.backgroundImageUrl
            ? `url(${hero.backgroundImageUrl})`
            : "url('/happy-family-at-church-event-together.jpg')",
        }}
      >
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-black/80 to-neutral-900/10" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-balance leading-tight tracking-wider uppercase px-2">
              {hero?.title ?? "LEC Merch Store"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              {hero?.subtitle ??
                "Support the church while representing Love Economy Church with our exclusive merchandise."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 px-2"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full relative"
              onClick={openCart}
            >
              <ShoppingCart className="mr-2 size-5 sm:size-6" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="relative w-full py-5 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                style={selectedCategory === category ? { backgroundColor: "#1762B9" } : {}}
                className={`rounded-full text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 ${selectedCategory === category ? "text-white" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div id="products" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 px-2"
            >
              Shop Our Collection
            </motion.h2>
          </motion.div>

          {loading && (
            <p className="text-center text-neutral-600 py-8">Loading products…</p>
          )}
          {error && (
            <p className="text-center text-red-600 py-8">Could not load products. Please try again later.</p>
          )}
          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-center text-neutral-600 py-8">No products available at the moment.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {!loading &&
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="light"
                  imageHeight="h-48 sm:h-56 md:h-[480px]"
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
