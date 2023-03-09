import QRCodeUtil from 'qrcode'
import React, { ReactElement, useMemo } from 'react'

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel,
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0,
  )
  const sqrt = Math.sqrt(arr.length)
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [],
  )
}

const QR_SIZE = 360
const LOGO_SIZE = 64
const LOGO_MARGIN = 8

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel
  logoBackground?: string
  logoUrl?: string
  uri: string
}

export const QRCode = ({ ecl = 'M', logoBackground, logoUrl, uri }: Props) => {
  const size = QR_SIZE - LOGO_MARGIN * 2

  const dots = useMemo(() => {
    const dots: ReactElement[] = []
    const matrix = generateMatrix(uri, ecl)
    const cellSize = size / matrix.length
    const qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x
      const y1 = (matrix.length - 7) * cellSize * y
      for (let i = 0; i < 3; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'white' : 'black'}
            height={cellSize * (7 - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            ry={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            width={cellSize * (7 - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />,
        )
      }
    })

    const clearArenaSize = Math.floor((LOGO_SIZE + 25) / cellSize)
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd
              )
            ) {
              dots.push(
                <circle
                  cx={i * cellSize + cellSize / 2}
                  cy={j * cellSize + cellSize / 2}
                  fill="black"
                  key={`circle-${i}-${j}`}
                  r={cellSize / 3} // calculate size of single dots
                />,
              )
            }
          }
        }
      })
    })

    return dots
  }, [ecl, size, uri])

  const logoWrapperSize = LOGO_SIZE + LOGO_MARGIN * 2

  return (
    <div className="p-4 bg-white rounded-2xl border border-theme">
      <div className="relative w-full h-full select-none">
        <div
          style={{
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            background: logoBackground,
          }}
          className="overflow-hidden absolute top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px]"
        >
          <img
            className="object-cover"
            height={LOGO_SIZE}
            src={logoUrl}
            width={LOGO_SIZE}
            alt="Logo"
          />
        </div>
        <svg height={size} style={{ all: 'revert' }} width={size}>
          <defs>
            <clipPath id="clip-wrapper">
              <rect height={logoWrapperSize} width={logoWrapperSize} />
            </clipPath>
            <clipPath id="clip-logo">
              <rect height={LOGO_SIZE} width={LOGO_SIZE} />
            </clipPath>
          </defs>
          <rect fill="transparent" height={size} width={size} />
          {dots}
        </svg>
      </div>
    </div>
  )
}
