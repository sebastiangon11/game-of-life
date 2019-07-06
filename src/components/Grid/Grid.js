import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

function randomBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function Grid({height, width, isRunning}) {

  // Build the matrix with random values and save it in state
  const [matrix, setMatrix] = useState(
    Array.from({ length: height },
      () => (Array.from({ length: width },
        () => randomBetween(0, 1))
      )
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) buildNextGeneration();
    }, 100);

    return () => {
      clearInterval(intervalId);
    }
  });

  const buildNextGeneration = () => {
    const oldGeneration = matrix;
    const newGeneration = matrix.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          return isAliveOrDeath(oldGeneration, rowIndex, columnIndex);
        })
    })
    setMatrix(newGeneration);
  }

  const isAliveOrDeath = (matrix, x, y) => {
    const neighboursCount = getAliveNeighboursCount(x, y);

    if (matrix[x][y] === 1) { // is currently alive
      if(neighboursCount === 2 || neighboursCount === 3) {
        return 1 // lives
      } else {
        return 0 // dies
      }
    } else { // is currently dead
      if(neighboursCount === 3) {
        return 1 // lives
      } else {
        return 0 // dies
      }
    }
  }

  const getAliveNeighboursCount = (x, y) => {
    let count = 0;

    if (matrix[x-1] && matrix[x-1][y-1]) count++
    if (matrix[x-1] && matrix[x-1][y]) count++;
    if (matrix[x-1] && matrix[x-1][y+1]) count++
    if (matrix[x][y-1]) count++
    if (matrix[x][y+1]) count++
    if (matrix[x+1] && matrix[x+1][y-1]) count++
    if (matrix[x+1] && matrix[x+1][y]) count++
    if (matrix[x+1] && matrix[x+1][y+1]) count++

    return count
  };

  return (
    <div>
        {
          matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((value, columnIndex) => (
                <Cell key={`${value}${columnIndex}`} value={value} />
              ))}
            </div>
          ))
        }
    </div>
  );
}

export default Grid;
