'use client';

import React, { useMemo } from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

/**
 * Generates a deterministic grid pattern from a string.
 * This creates a visually QR-like pattern. For actual scanning,
 * the staff page uses a text-input fallback with the code.
 */
function generatePattern(input: string, gridSize: number): boolean[][] {
  // Simple hash function to get deterministic values from the string
  function hash(str: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  const grid: boolean[][] = [];

  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      // Finder patterns (top-left, top-right, bottom-left corners) — like real QR codes
      const isFinderPattern =
        (row < 7 && col < 7) ||
        (row < 7 && col >= gridSize - 7) ||
        (row >= gridSize - 7 && col < 7);

      if (isFinderPattern) {
        // Draw the 7x7 finder pattern blocks
        const localRow = row < 7 ? row : row - (gridSize - 7);
        const localCol = col < 7 ? col : col - (gridSize - 7);

        // Outer border
        if (localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6) {
          grid[row][col] = true;
        }
        // White ring
        else if (localRow === 1 || localRow === 5 || localCol === 1 || localCol === 5) {
          grid[row][col] = false;
        }
        // Inner 3x3 block
        else {
          grid[row][col] = true;
        }
      }
      // Timing patterns (row 6 and col 6)
      else if (row === 6) {
        grid[row][col] = col % 2 === 0;
      } else if (col === 6) {
        grid[row][col] = row % 2 === 0;
      }
      // Data area — deterministic from input string
      else {
        const h = hash(input, row * gridSize + col);
        grid[row][col] = h % 3 !== 0; // roughly 2/3 filled for visual density
      }
    }
  }

  return grid;
}

export default function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  const gridSize = 21; // Standard QR version 1 is 21x21

  const pattern = useMemo(() => generatePattern(value, gridSize), [value]);

  const cellSize = size / gridSize;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* QR pattern */}
      <div
        className="bg-white p-2 rounded-lg shadow-lg"
        style={{ width: size + 16, height: size + 16 }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${gridSize} ${gridSize}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={gridSize} height={gridSize} fill="white" />
          {pattern.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              cell ? (
                <rect
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex}
                  y={rowIndex}
                  width={1}
                  height={1}
                  fill="#0f172a"
                />
              ) : null
            )
          )}
        </svg>
      </div>

      {/* Code text below QR */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
        <p className="text-xs text-slate-400 text-center mb-0.5">Loyalty Code</p>
        <p className="text-accent font-mono font-bold text-lg tracking-widest text-center">
          {value}
        </p>
      </div>
    </div>
  );
}
