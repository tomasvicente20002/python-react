import React from "react"

export function Card({ children, className = "" }) {
  return (
    <div className={`p-6 bg-white rounded-2xl shadow-sm border ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children }) {
  return (
    <div className="pb-2 border-b mb-2">
      {children}
    </div>
  )
}

export function CardContent({ children }) {
  return (
    <div className="pt-2">
      {children}
    </div>
  )
}
