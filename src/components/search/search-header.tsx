"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"

export const SearchHeader = () => {
  return (
    <div className="bg-white border-b p-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search locations..."
            className="pl-10 h-10 border-gray-300"
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Price</span>
          <span>•</span>
          <span>Beds & Baths</span>
          <span>•</span>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}