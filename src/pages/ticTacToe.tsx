import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null); 
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const winnerRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  // Reset the game
  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  // Winning combinations
  const winningCombinations: number[][] = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
  ];

  // Handle box click
  const handleClick = (index: number): void => {
    if (board[index] || winner) return; // Ignore clicks on filled boxes or if the game is over

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O'; // Assign X or O
    setBoard(newBoard);
    setIsXTurn(!isXTurn); // Toggle turn
    setClickedIndex(index); // Store the clicked index

    checkWinner(newBoard); // Check for a winner
  };

  // Check for a winner
  const checkWinner = (currentBoard: (string | null)[]): void => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]); // Set the winner
        return;
      }
    }

    // Check for draw
    if (!currentBoard.includes(null)) {
      setWinner('Draw'); // Game is a draw
    }
  };

  // GSAP animation for clicked cell
  useEffect(() => {
    if (clickedIndex !== null) {
      const cell = boardRef.current?.children[clickedIndex] as HTMLElement;
      gsap.to(cell, {
        scale: 1.2,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {
          gsap.to(cell, {
            scale: 1,
            duration: 0.2,
            ease: 'power1.inOut',
          });
        },
      });
    }
  }, [clickedIndex]);

  // GSAP animation for winner message
  useEffect(() => {
    if (winner && winnerRef.current) {
      gsap.fromTo(
        winnerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [winner]);

  return (
    <div className="border flex flex-col gap-3 w-[100vw] relative min-h-[100vh] items-center justify-center bg-red-400">
      {/* Game Board */}
      <div
        ref={boardRef}
        className="grid grid-cols-3 h-[35rem] w-[35rem] rounded-2xl text-9xl gap-0 place-items-center"
      >
        {board.map((value, index) => (
          <button
            key={index}
            className="w-[170px] h-[170px] border-[1px] rounded-xl cursor-pointer flex items-center justify-center box"
            onClick={() => handleClick(index)}
            style={{ pointerEvents: winner ? 'none' : 'auto' }} // Disable clicks if game is over
          >
            {value}
          </button>
        ))}
      </div>

      {/* Winner Display */}
      <div
        ref={winnerRef}
        className="text-5xl font-bold italic"
        id="winner"
      >
        {winner
          ? winner === 'Draw'
            ? 'It\'s a Draw! 😐'
            : `Congratulations! ${winner} Wins 🏆`
          : `Turn: ${isXTurn ? 'X' : 'O'}`}
      </div>

      {/* Reset Button */}
      {winner && (
        <button
          onClick={resetGame}
          className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg text-2xl"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
