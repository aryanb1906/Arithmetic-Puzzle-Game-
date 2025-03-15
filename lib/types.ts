// Board size types
export type BoardSize = "3x3" | "4x4"

// Piece design types
export type PieceDesign = "classic" | "minimal" | "colorful"

// Piece shape types
export type PieceShape = "square" | "rounded" | "hexagon"

// Puzzle piece type
export interface PuzzlePiece {
  id: number
  edges: {
    top: string
    right: string
    bottom: string
    left: string
  }
  rotation: number
  color?: string
}

