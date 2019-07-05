import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';
import _ from 'lodash';

function randomBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function Grid({height, width}) {

  // Build the matrix with random values
  const [matrix, setMatrix] = useState(
    Array.from({ length: height },
      () => (Array.from({ length: width },
        () => randomBetween(0, 1))
      )
    )
  );

  return (
    <div className="grid">
        {
          matrix.map(row => (
            <div className="row">
              {row.map(column => (
                <Cell value={column} />
              ))}
            </div>
          ))
        }
    </div>
  );
}

export default Grid;
