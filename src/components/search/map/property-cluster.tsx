"use client"

import { PropertyDecorator } from "@/repository/property/property-decorator"
import { cn } from "@/lib/utils"

interface PropertyClusterProps {
  properties: PropertyDecorator[]
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const PropertyCluster = ({
  properties,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropertyClusterProps) => {
  const count = properties.length
  
  // Don't render cluster for single property
  if (count <= 1) return null

  // Calculate average price for the cluster
  const validPrices = properties
    .map(p => p.original.price)
    .filter((price): price is number => price !== null && price !== undefined)
  
  const avgPrice = validPrices.length > 0 
    ? validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length
    : null

  // Determine cluster size based on count
  const getClusterSize = (count: number) => {
    if (count < 10) return "small"
    if (count < 50) return "medium"
    return "large"
  }

  const size = getClusterSize(count)

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200 transform hover:scale-110",
        "flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-lg",
        size === "small" && "w-10 h-10 text-sm",
        size === "medium" && "w-12 h-12 text-base", 
        size === "large" && "w-14 h-14 text-lg"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {count}
      
      {/* Pulse animation for large clusters */}
      {size === "large" && (
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      )}
    </div>
  )
}