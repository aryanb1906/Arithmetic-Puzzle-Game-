"use client"

import type { PuzzlePiece, PieceDesign, PieceShape } from "@/lib/types"
import PuzzlePieceComponent from "./puzzle-piece"

interface PuzzlePiecesProps {
  pieces: (PuzzlePiece | null)[]
  pieceDesign: PieceDesign
  pieceShape: PieceShape
  selectedPiece: number | null
  onPieceSelect: (index: number) => void
  onPieceRotate: (index: number) => void
}

export default function PuzzlePieces({
  pieces,
  pieceDesign,
  pieceShape,
  selectedPiece,
  onPieceSelect,
  onPieceRotate,
}: PuzzlePiecesProps) {
  return (
    <div className="bg-slate-100 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-slate-700">Available Pieces</h3>
      <div className="grid grid-cols-3 gap-2">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center
              ${piece ? "cursor-pointer hover:bg-slate-200 rounded-md" : "pointer-events-none"}
              ${selectedPiece === index ? "bg-blue-100 rounded-md ring-2 ring-blue-400" : ""}
            `}
            onClick={() => piece && onPieceSelect(index)}
            onDoubleClick={() => piece && onPieceRotate(index)}
          >
            {piece && (
              <PuzzlePieceComponent
                piece={piece}
                design={pieceDesign}
                shape={pieceShape}
                isPlaced={false}
                showHint={false}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">Click to select, double-click to rotate</p>
    </div>
  )
}

