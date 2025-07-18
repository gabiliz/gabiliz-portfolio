'use client'

import { useEffect, useState } from 'react'

export function AsciiPlayer() {
  const [frames, setFrames] = useState<string[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)

  const trimFramesLightly = (frames: string[]) => {
    return frames.map(frame => {
      const lines = frame.split('\n');
      
      let startLine = 0;
      let removedTop = 0;
      while (startLine < lines.length && lines[startLine].trim() === '' && removedTop < 6) {
        startLine++;
        removedTop++;
      }
      
      let endLine = lines.length - 5;
      let removedBottom = 0;
      while (endLine >= 0 && lines[endLine].trim() === '' && removedBottom < 2) {
        endLine--;
        removedBottom++;
      }
      
      if (startLine > endLine) {
        return frame;
      }
      
      const trimmedLines = lines.slice(startLine, endLine + 1);

      let minIndent = Infinity;
      trimmedLines.forEach(line => {
        if (line.trim() !== '') {
          const indent = line.match(/^ */)?.[0].length || 0;
          minIndent = Math.min(minIndent, indent);
        }
      });
      
      const removeIndent = Math.min(minIndent, 60);
      
      const horizontallyTrimmedLines = trimmedLines.map(line => {
        if (line.length > removeIndent) {
          let processedLine = line.substring(removeIndent);
          let rightSpaces = 0;
          for (let i = processedLine.length - 1; i >= 0 && processedLine[i] === ' ' && rightSpaces < 80; i--) {
            rightSpaces++;
          }
          if (rightSpaces > 0) {
            processedLine = processedLine.slice(0, -Math.min(rightSpaces, 80));
          }
          return processedLine;
        }
        return line;
      });
      
      return horizontallyTrimmedLines.join('\n');
    });
  }

  useEffect(() => {
    fetch('/ascii/ascii_frames.json')
      .then((res) => res.json())
      .then((rawFrames) => {
        const lightlyTrimmedFrames = trimFramesLightly(rawFrames)
        setFrames(lightlyTrimmedFrames)
      })
      .catch((error) => {
        console.error('Erro ao carregar frames:', error)
      })
  }, [])

  useEffect(() => {
    if (frames.length === 0) return
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length)
    }, 30) // 30 fps

    return () => clearInterval(interval)
  }, [frames])

  return (
    <pre
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: '12px',
        whiteSpace: 'pre',
        overflow: 'hidden',
        display: 'inline-block',
        margin: 0,
        padding: 0,
      }}
    >
      {frames[currentFrame]}
    </pre>
  )
}