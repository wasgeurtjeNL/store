"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils/format-price"

interface ProductCardProps {
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    price?: {
      calculated_price: string
      original_price?: string
      difference?: string
      price_type?: "sale" | "default"
    }
    isNew?: boolean
    isPopular?: boolean
    limitedEdition?: boolean
  }
  className?: string
}

export default function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const { title, handle, thumbnail, price, isNew, isPopular, limitedEdition } = product

  return (
    <Link
      href={`/products/${handle}`}
      className={cn(
        "group relative flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <p className="text-center text-sm text-gray-500">No image</p>
          </div>
        )}
        
        {/* Product badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {isNew && (
            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
              Nieuw
            </span>
          )}
          {isPopular && (
            <span className="rounded-full bg-pink-500 px-2 py-1 text-xs font-medium text-white">
              Populair
            </span>
          )}
          {limitedEdition && (
            <span className="rounded-full bg-purple-500 px-2 py-1 text-xs font-medium text-white">
              Beperkte oplage
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
        
        <div className="mt-2">
          {price?.price_type === "sale" ? (
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(price.calculated_price, "EUR")}
              </p>
              {price.original_price && (
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(price.original_price, "EUR")}
                </p>
              )}
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(price?.calculated_price || "0", "EUR")}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
} 