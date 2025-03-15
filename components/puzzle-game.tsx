"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, RefreshCw, Lightbulb, Check } from "lucide-react"
import PuzzleBoard from "./puzzle-board"
import PuzzlePieces from "./puzzle-pieces"
import CustomizationPanel from "./customization-panel"
import { generatePuzzle, checkSolution } from "@/lib/puzzle-utils"
import type { PuzzlePiece, BoardSize, PieceDesign, PieceShape } from "@/lib/types"

export default function PuzzleGame() {
  const [boardSize, setBoardSize] = useState<BoardSize>("3x3")
  const [pieceDesign, setPieceDesign] = useState<PieceDesign>("classic")
  const [pieceShape, setPieceShape] = useState<PieceShape>("square")
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [boardPieces, setBoardPieces] = useState<(PuzzlePiece | null)[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  // Initialize the puzzle
  useEffect(() => {
    resetGame()
  }, [boardSize, pieceDesign, pieceShape])

  const resetGame = () => {
    const { puzzlePieces, solution } = generatePuzzle(boardSize)
    setPieces(puzzlePieces)
    setBoardPieces(Array(boardSize === "3x3" ? 9 : 16).fill(null))
    setSelectedPiece(null)
    setShowHint(false)
    setIsSolved(false)
  }

  const rotatePiece = (index: number) => {
    if (index === null) return

    setPieces((prev) => {
      const newPieces = [...prev]
      if (newPieces[index]) {
        newPieces[index] = {
          ...newPieces[index],
          rotation: (newPieces[index].rotation + 90) % 360,
        }
      }
      return newPieces
    })
  }

  const placePiece = (pieceIndex: number, boardIndex: number) => {
    if (pieceIndex === null || boardPieces[boardIndex] !== null) return

    // Place the piece on the board
    setBoardPieces((prev) => {
      const newBoardPieces = [...prev]
      newBoardPieces[boardIndex] = pieces[pieceIndex]
      return newBoardPieces
    })

    // Remove the piece from available pieces
    setPieces((prev) => {
      const newPieces = [...prev]
      newPieces[pieceIndex] = null
      return newPieces
    })

    // Check if the puzzle is solved
    const newBoardPieces = [...boardPieces]
    newBoardPieces[boardIndex] = pieces[pieceIndex]
    if (newBoardPieces.every((piece) => piece !== null)) {
      const solved = checkSolution(newBoardPieces, boardSize)
      setIsSolved(solved)
    }

    // Clear selected piece after placing
    setSelectedPiece(null)
  }

  const removePiece = (boardIndex: number) => {
    if (boardPieces[boardIndex] === null) return

    // Add the piece back to available pieces
    setPieces((prev) => {
      const newPieces = [...prev]
      const firstNullIndex = newPieces.findIndex((piece) => piece === null)
      if (firstNullIndex !== -1) {
        newPieces[firstNullIndex] = boardPieces[boardIndex]
      } else {
        newPieces.push(boardPieces[boardIndex])
      }
      return newPieces
    })

    // Remove the piece from the board
    setBoardPieces((prev) => {
      const newBoardPieces = [...prev]
      newBoardPieces[boardIndex] = null
      return newBoardPieces
    })

    setIsSolved(false)
  }

  const checkCurrentSolution = () => {
    if (boardPieces.some((piece) => piece === null)) {
      alert("Please place all pieces on the board first!")
      return
    }

    const solved = checkSolution(boardPieces, boardSize)
    setIsSolved(solved)

    if (solved) {
      alert("Congratulations! You solved the puzzle!")
    } else {
      alert("Not quite right. Keep trying!")
    }
  }

  const toggleHint = () => {
    setShowHint((prev) => !prev)
  }

  // Handle board cell click - either place a piece or remove a piece
  const handleBoardCellClick = (index: number) => {
    if (boardPieces[index]) {
      // If there's already a piece, remove it
      removePiece(index)
    } else if (selectedPiece !== null) {
      // If there's a selected piece, place it
      placePiece(selectedPiece, index)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="game" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="game">Game</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>

        <TabsContent value="game" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-2/3">
              <PuzzleBoard
                boardSize={boardSize}
                pieces={boardPieces}
                pieceDesign={pieceDesign}
                pieceShape={pieceShape}
                onCellClick={handleBoardCellClick}
                showHint={showHint}
                isSolved={isSolved}
                selectedPiece={selectedPiece !== null ? pieces[selectedPiece] : null}
              />
            </div>

            <div className="w-full md:w-1/3 space-y-6">
              <PuzzlePieces
                pieces={pieces}
                pieceDesign={pieceDesign}
                pieceShape={pieceShape}
                selectedPiece={selectedPiece}
                onPieceSelect={setSelectedPiece}
                onPieceRotate={rotatePiece}
              />

              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => selectedPiece !== null && rotatePiece(selectedPiece)}
                  disabled={selectedPiece === null}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rotate
                </Button>

                <Button variant="outline" onClick={resetGame}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>

                <Button variant="outline" onClick={toggleHint}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>

                <Button onClick={checkCurrentSolution}>
                  <Check className="mr-2 h-4 w-4" />
                  Check Solution
                </Button>
              </div>

              {isSolved && (
                <div className="p-4 bg-green-100 text-green-800 rounded-md text-center">
                  Congratulations! You solved the puzzle!
                </div>
              )}

              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-1">How to Play:</h3>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal pl-4">
                  <li>Select a piece from the right panel</li>
                  <li>Click on an empty cell on the board to place it</li>
                  <li>Click on a placed piece to remove it</li>
                  <li>Use the Rotate button to rotate selected pieces</li>
                  <li>Match the symbols on adjacent edges</li>
                </ol>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customize">
          <CustomizationPanel
            boardSize={boardSize}
            pieceDesign={pieceDesign}
            pieceShape={pieceShape}
            onBoardSizeChange={setBoardSize}
            onPieceDesignChange={setPieceDesign}
            onPieceShapeChange={setPieceShape}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

