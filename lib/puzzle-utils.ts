import type { PuzzlePiece, BoardSize } from "./types"

// Arithmetic symbols to use on the edges
const symbols = ["+", "-", "×", "÷", "=", "≠", "<", ">", "±"]

// Colors for the colorful design
const colors = [
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-red-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-orange-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-lime-200",
  "bg-amber-200",
  "bg-emerald-200",
  "bg-fuchsia-200",
  "bg-rose-200",
  "bg-sky-200",
]

// Generate a random puzzle
export function generatePuzzle(boardSize: BoardSize) {
  const size = boardSize === "3x3" ? 3 : 4
  const totalPieces = size * size

  // Create pieces with random symbols on edges
  const puzzlePieces: PuzzlePiece[] = []

  for (let i = 0; i < totalPieces; i++) {
    puzzlePieces.push({
      id: i + 1,
      edges: {
        top: symbols[Math.floor(Math.random() * symbols.length)],
        right: symbols[Math.floor(Math.random() * symbols.length)],
        bottom: symbols[Math.floor(Math.random() * symbols.length)],
        left: symbols[Math.floor(Math.random() * symbols.length)],
      },
      rotation: Math.floor(Math.random() / 0.25) * 90, // 0, 90, 180, or 270
      color: colors[i % colors.length],
    })
  }

  // Create a solution (in a real game, this would be a valid solution)
  // For this demo, we'll just use the pieces as they are
  const solution = [...puzzlePieces]

  return { puzzlePieces, solution }
}

// Check if the current arrangement is a solution
export function checkSolution(boardPieces: (PuzzlePiece | null)[], boardSize: BoardSize) {
  const size = boardSize === "3x3" ? 3 : 4

  // In a real implementation, we would check if adjacent edges match
  // For this demo, we'll just check if all pieces are placed
  if (boardPieces.some((piece) => piece === null)) {
    return false
  }

  // Check if adjacent edges match
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const index = row * size + col
      const piece = boardPieces[index]

      if (!piece) continue

      // Check right edge matches left edge of piece to the right
      if (col < size - 1) {
        const rightPiece = boardPieces[row * size + col + 1]
        if (rightPiece) {
          const currentRightEdge = getRotatedEdge(piece, "right")
          const rightLeftEdge = getRotatedEdge(rightPiece, "left")

          if (currentRightEdge !== rightLeftEdge) {
            return false
          }
        }
      }

      // Check bottom edge matches top edge of piece below
      if (row < size - 1) {
        const bottomPiece = boardPieces[(row + 1) * size + col]
        if (bottomPiece) {
          const currentBottomEdge = getRotatedEdge(piece, "bottom")
          const bottomTopEdge = getRotatedEdge(bottomPiece, "top")

          if (currentBottomEdge !== bottomTopEdge) {
            return false
          }
        }
      }
    }
  }

  // For demo purposes, we'll consider it solved if all pieces are placed
  // In a real game, you would check if all adjacent edges match
  return true
}

// Helper function to get the actual edge value after rotation
function getRotatedEdge(piece: PuzzlePiece, edge: "top" | "right" | "bottom" | "left"): string {
  const rotation = piece.rotation % 360

  if (rotation === 0) {
    return piece.edges[edge]
  }

  if (rotation === 90) {
    const map = { top: "left", right: "top", bottom: "right", left: "bottom" }
    return piece.edges[map[edge]]
  }

  if (rotation === 180) {
    const map = { top: "bottom", right: "left", bottom: "top", left: "right" }
    return piece.edges[map[edge]]
  }

  if (rotation === 270) {
    const map = { top: "right", right: "bottom", bottom: "left", left: "top" }
    return piece.edges[map[edge]]
  }

  return piece.edges[edge]
}

// Helper function to get a random piece from the available pieces
export function getRandomPiece(pieces: PuzzlePiece[]): PuzzlePiece | null {
  const availablePieces = pieces.filter((piece) => piece !== null)
  if (availablePieces.length === 0) return null

  const randomIndex = Math.floor(Math.random() * availablePieces.length)
  return availablePieces[randomIndex]
}

