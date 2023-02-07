import React from 'react'
import './spinner-table.scss'
import { WheelColor } from './types'
import { css } from '@emotion/css'

export interface SpinnerTableProps {
  numberOfSlices: number
}

export function SpinnerTable ({ numberOfSlices }: SpinnerTableProps) {
  const diameter = 350
  const radius = diameter / 2
  const circumfrance = 6.283185307 * radius
  const sliceHeight = circumfrance / numberOfSlices
  const sliceOffeset = sliceHeight / 2
  const sliceColor = WheelColor
  const rotation = 360 / numberOfSlices

  const sliceEleStyle = Array.from(Array(numberOfSlices).keys()).map(
    (index) => `
            &:nth-child(${index}) {
                transform: rotate(${index * rotation}deg);
            }
            `
  )

  return (
        <div className="spinner-table" style={{ height: diameter - 2, width: diameter - 2 }}>
            <div className="dial">
                {Array.from(Array(numberOfSlices).keys()).map((index) => (
                    <div
                        key={index}
                        className={`slice ${css`
                            top: calc(50% - ${sliceOffeset}px);
                            height: ${sliceHeight}px;

                            &:before {
                                border-width: 0 0 ${sliceHeight / 2 + 4}px ${radius}px;
                                border-color: transparent transparent ${sliceColor} transparent;
                            }

                            &:after {
                                border-width: 0 ${radius}px ${sliceHeight / 2 + 4}px 0;
                                border-color: transparent ${sliceColor} transparent transparent;
                            }

                            &:nth-child(even) {
                                &:after {
                                    border-color: transparent darken(${sliceColor}, 10%) transparent
                                        transparent;
                                }
                                &:before {
                                    border-color: transparent transparent darken(${sliceColor}, 10%)
                                        transparent;
                                }
                            }

                            .label {
                                line-height: ${sliceHeight}px;
                            }

                            ${d}
                        `}`}
                    >
                        <div className="label">{index}</div>
                    </div>
                ))}
            </div>
        </div>
  )
}
