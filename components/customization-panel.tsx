"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { BoardSize, PieceDesign, PieceShape } from "@/lib/types"

interface CustomizationPanelProps {
  boardSize: BoardSize
  pieceDesign: PieceDesign
  pieceShape: PieceShape
  onBoardSizeChange: (size: BoardSize) => void
  onPieceDesignChange: (design: PieceDesign) => void
  onPieceShapeChange: (shape: PieceShape) => void
}

export default function CustomizationPanel({
  boardSize,
  pieceDesign,
  pieceShape,
  onBoardSizeChange,
  onPieceDesignChange,
  onPieceShapeChange,
}: CustomizationPanelProps) {
  return (
    <div className="space-y-8 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-4 text-slate-800">Board Size</h3>
        <RadioGroup
          value={boardSize}
          onValueChange={(value) => onBoardSizeChange(value as BoardSize)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3x3" id="board-3x3" />
            <Label htmlFor="board-3x3">3x3 Grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4x4" id="board-4x4" />
            <Label htmlFor="board-4x4">4x4 Grid</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-slate-800">Piece Design</h3>
        <RadioGroup
          value={pieceDesign}
          onValueChange={(value) => onPieceDesignChange(value as PieceDesign)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="classic" id="design-classic" />
            <Label htmlFor="design-classic">Classic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="design-minimal" />
            <Label htmlFor="design-minimal">Minimal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="colorful" id="design-colorful" />
            <Label htmlFor="design-colorful">Colorful</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-slate-800">Piece Shape</h3>
        <RadioGroup
          value={pieceShape}
          onValueChange={(value) => onPieceShapeChange(value as PieceShape)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="square" id="shape-square" />
            <Label htmlFor="shape-square">Square</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rounded" id="shape-rounded" />
            <Label htmlFor="shape-rounded">Rounded</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hexagon" id="shape-hexagon" />
            <Label htmlFor="shape-hexagon">Hexagon</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-4">
          Customize your puzzle experience by changing the board size, piece design, and shape. Changes will reset your
          current game progress.
        </p>
      </div>
    </div>
  )
}

