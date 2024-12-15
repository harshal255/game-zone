import React, { useState, useEffect } from 'react';

const KukuCube: React.FC = () => {
    const [gridSize, setGridSize] = useState<number>(2); // Grid starts at 2x2
    const [score, setScore] = useState<number>(0);
    const [counter, setCounter] = useState<number>(45); // Game timer
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [randomBox, setRandomBox] = useState<number | null>(null);
    const [gridColor, setGridColor] = useState<string>('#000000'); // Initial color

    // Generate a random number between min and max
    const randomIntFromInterval = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1) + min);

    // Generate a random color
    const getRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Start a new grid
    const generateGrid = (size: number): void => {
        const randomBoxIndex = randomIntFromInterval(1, size * size);
        setRandomBox(randomBoxIndex);
        setGridColor(getRandomColor());
    };

    // Handle correct box click
    const handleCorrectClick = (): void => {
        if (!isPaused) {
            setScore((prevScore) => prevScore + 1);
            setGridSize((prevSize) => prevSize + 1);
        }
    };

    // Handle incorrect box click
    const handleIncorrectClick = (): void => {
        if (!isPaused) {
            setScore((prevScore) => prevScore - 1);
            alert('You clicked the wrong box!');
        }
    };

    // Pause and resume the game
    const togglePause = (): void => {
                setIsPaused((prevState) => !prevState);
    };

    // Start the game
    const startGame = (): void => {
        setIsStarted(true);
        setCounter(45);
    }

    // Timer countdown
    useEffect(() => {
        if (isPaused || !isStarted) return;

        if (isStarted && counter === 0) {
            alert(`Game over! Your final score is ${score}`);
            // Reload the game or display to play game
            setTimeout(() => {
                setScore(0)
                setIsStarted(false);
            }, 1200);

            // window.location.reload(); 
            return;
        }

        if (isStarted) {
            const timer = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [counter, isPaused,isStarted]);



    // Generate a new grid whenever the grid size changes
    useEffect(() => {
        generateGrid(gridSize);
    }, [gridSize]);

    return (
        <>
            {/* Header */}
            <div className="sticky top-0 z-20 flex flex-col bg-purple-500 p-1 text-lg">
                <div className="flex justify-evenly items-center h-10">
                    <span className='font-bold'>
                        Score: <span id="score">{score}</span>
                    </span>
                    <span className='font-bold'>
                        Time left: <span id="counter">{counter}</span>
                    </span>
                    {isStarted && <button
                        id="pause"
                        onClick={togglePause}
                        className="px-3 py-0.5 bg-green-500 rounded-lg"
                    >
                        { isPaused ? 'Resume' : 'Pause'}
                    </button>}
                </div>
            </div>


            {/* Game Grid */}
            {isStarted ? <div className="flex items-center justify-center min-h-[95dvh] bg-purple-400">
                <div
                    className={`grid gap-0.5 border p-1 bg-white rounded-lg`}
                    style={{
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        width: '40rem',
                        height: '40rem',
                    }}
                >
                    {Array.from({ length: gridSize * gridSize }, (ele, index) => (
                        <button
                            key={index}
                            onClick={
                                index + 1 === randomBox ? handleCorrectClick : handleIncorrectClick
                            }
                            className={`w-auto h-auto border rounded-lg cursor-pointer ${index + 1 === randomBox ? 'opacity-70' : ''
                                }`}
                            style={{
                                backgroundColor: index + 1 === randomBox ? `${gridColor}` : gridColor,
                            }}
                        />
                    ))}
                </div>
            </div> : <div className='flex flex-col justify-center min-h-[95dvh] bg-purple-400 px-10 gap-5'>
                <div className="flex flex-col gap-2">
                    <p className='text-2xl text-start'>This puzzle is a fun game <span className='font-bold'>KUKU CUBE!</span></p>
                    <p className='text-xl text-start'>This simple puzzle game will test the quality of your color vision.</p>
                    <p className='text-xl text-start'>You need to identify one tile which is not the same color with the other tiles.</p>
                </div>
                <p className='text-5xl text-end'>Easy to play, self described puzzle game,
                    Enjoy...!</p>
                <div className="flex justify-end w-full">
                    <button onClick={() => startGame()} className='text-black cursor-pointer text-xl text-center px-5 py-2 bg-green-500 w-fit rounded-lg font-semibold'>Let's Play {`>>`}</button>
                </div>
            </div>
            }
        </>
    );
};

export default KukuCube;
