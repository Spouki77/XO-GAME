import { useState } from 'react'
import React from 'react'

const App: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const handleClick = (index: number): void => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard: string[] = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: string[]): string | null => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner: string | null = calculateWinner(board);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="text-2xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center text-4xl bg-white border-2 border-gray-300"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
