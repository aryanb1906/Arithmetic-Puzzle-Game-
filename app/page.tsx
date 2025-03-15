import PuzzleGame from "@/components/puzzle-game"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-slate-50 to-slate-100">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-slate-800">Arithmetic Puzzle Game</h1>
      <p className="text-slate-600 text-center max-w-2xl mb-8">
        Arrange the 9 squares in a way that their edges match the arithmetic symbols. Drag pieces to place them on the
        board and click to rotate them.
      </p>
      <PuzzleGame />
    </main>
  )
}

