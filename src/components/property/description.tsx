"use client"
import { useProperty } from "./context"

export const PropertyDescription = () => {
  const property = useProperty()
  return <div>{property.original.description}</div>
}
