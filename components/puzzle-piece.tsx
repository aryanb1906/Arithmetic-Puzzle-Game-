"use client"

import type { PuzzlePiece, PieceDesign, PieceShape } from "@/lib/types"

interface PuzzlePieceComponentProps {
  piece: PuzzlePiece
  design: PieceDesign
  shape: PieceShape
  isPlaced: boolean
  showHint: boolean
}

export default function PuzzlePieceComponent({ piece, design, shape, isPlaced, showHint }: PuzzlePieceComponentProps) {
  const { id, edges, rotation, color } = piece

  // Get background color based on design and piece color
  const getBgColor = () => {
    if (design === "colorful") {
      return color || "bg-blue-200"
    }
    return "bg-white"
  }

  // Get border style based on shape
  const getBorderStyle = () => {
    switch (shape) {
      case "rounded":
        return "rounded-xl"
      case "hexagon":
        return "clip-path-hexagon"
      default:
        return "rounded-md"
    }
  }

  // Get symbol style based on design and hint status
  const getSymbolStyle = (symbol: string, position: "top" | "right" | "bottom" | "left") => {
    let baseStyle = design === "minimal" ? "text-slate-700 font-light" : "text-slate-900 font-medium"

    // Add highlight for hints
    if (showHint) {
      baseStyle += " bg-yellow-100 px-1 rounded font-bold"
    }

    return baseStyle
  }

  return (
    <div
      className={`
        relative w-full h-full ${getBgColor()} ${getBorderStyle()}
        border border-slate-300 shadow-sm
        flex items-center justify-center
        transition-transform duration-300
        ${isPlaced ? "cursor-pointer" : "cursor-grab"}
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Top edge */}
      <div className="absolute top-1 left-0 right-0 flex justify-center">
        <span className={`text-sm ${getSymbolStyle(edges.top, "top")}`}>{edges.top}</span>
      </div>

      {/* Right edge */}
      <div className="absolute right-1 top-0 bottom-0 flex items-center">
        <span className={`text-sm ${getSymbolStyle(edges.right, "right")}`}>{edges.right}</span>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <span className={`text-sm ${getSymbolStyle(edges.bottom, "bottom")}`}>{edges.bottom}</span>
      </div>

      {/* Left edge */}
      <div className="absolute left-1 top-0 bottom-0 flex items-center">
        <span className={`text-sm ${getSymbolStyle(edges.left, "left")}`}>{edges.left}</span>
      </div>

      {/* Center - piece ID and hint */}
      {showHint && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">#{id}</div>
            <div className="text-xs text-blue-800 mt-1">Match symbols</div>
          </div>
        </div>
      )}
    </div>
  )
}

