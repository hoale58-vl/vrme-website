import React from 'react';
import './spinner-table.scss';
import { WheelColorHex } from './types';
import { css } from '@emotion/css';
import { darkenColor, toColor } from './utils';
import { LuckyWheelPrize } from 'types/lucky-wheel';

export type SpinnerTableProps = {
    slices: LuckyWheelPrize[];
};

export function SpinnerTable({ slices }: SpinnerTableProps) {
    const numberOfSlices = slices.length;
    const diameter = 350;
    const radius = diameter / 2;
    const circumfrance = 6.283185307 * radius;
    const sliceHeight = circumfrance / numberOfSlices;
    const sliceOffeset = sliceHeight / 2;

    const sliceEleStyle = slices.map((_, index) => {
        const rotation = 360 / numberOfSlices;

        return `
            &:nth-child(${index + 1}) {
                transform: rotate(${index * rotation}deg);
            }
            `;
    });

    return (
        <div
            className={`spinner-table ${css`
                height: ${diameter - 2}px;
                width: ${diameter - 2}px;
            `}`}
        >
            <div className="dial">
                {slices.map((slice, index) => {
                    const darkenPercentage = (numberOfSlices - index / 3) / numberOfSlices;
                    const sliceColor = toColor(darkenColor(WheelColorHex, index, darkenPercentage));
                    return (
                        <div
                            key={index}
                            className={`slice ${css`
                                top: calc(50% - ${sliceOffeset}px);
                                height: ${sliceHeight}px;

                                &:before {
                                    border-width: 0 0 ${sliceHeight / 2 + 4}px ${radius}px;
                                    border-color: transparent transparent ${sliceColor} transparent !important;
                                }

                                &:after {
                                    border-width: 0 ${radius}px ${sliceHeight / 2 + 4}px 0;
                                    border-color: transparent ${sliceColor} transparent transparent !important;
                                }

                                .label {
                                    line-height: ${sliceHeight}px;
                                }

                                ${sliceEleStyle}
                            `}`}
                        >
                            <div className="label">{slice.name}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
