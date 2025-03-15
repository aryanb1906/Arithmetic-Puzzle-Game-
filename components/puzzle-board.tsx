"use client"

import type { PuzzlePiece, BoardSize, PieceDesign, PieceShape } from "@/lib/types"
import PuzzlePieceComponent from "./puzzle-piece"

interface PuzzleBoardProps {
  boardSize: BoardSize
  pieces: (PuzzlePiece | null)[]
  pieceDesign: PieceDesign
  pieceShape: PieceShape
  onCellClick: (index: number) => void
  showHint: boolean
  isSolved: boolean
  selectedPiece: PuzzlePiece | null
}

export default function PuzzleBoard({
  boardSize,
  pieces,
  pieceDesign,
  pieceShape,
  onCellClick,
  showHint,
  isSolved,
  selectedPiece,
}: PuzzleBoardProps) {
  const gridSize = boardSize === "3x3" ? 3 : 4

  return (
    <div
      className={`grid gap-1 p-2 bg-slate-200 rounded-lg shadow-md mx-auto aspect-square w-full max-w-md`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={`
            rounded border-2 
            ${piece ? "border-solid border-slate-300" : "border-dashed border-slate-300 hover:bg-slate-100 hover:border-slate-400"}
            ${isSolved && piece ? "border-green-500" : ""}
            ${!piece && selectedPiece ? "cursor-pointer bg-slate-100/70" : ""}
            flex items-center justify-center
            transition-all duration-200
          `}
          onClick={() => onCellClick(index)}
        >
          {piece ? (
            <PuzzlePieceComponent
              piece={piece}
              design={pieceDesign}
              shape={pieceShape}
              isPlaced={true}
              showHint={showHint}
            />
          ) : (
            selectedPiece && (
              <div className="w-full h-full opacity-30">
                <PuzzlePieceComponent
                  piece={selectedPiece}
                  design={pieceDesign}
                  shape={pieceShape}
                  isPlaced={false}
                  showHint={false}
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )
}

