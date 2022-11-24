import React from 'react';
import classNames from 'classnames';
import { ButtonBackground, ButtonSize } from '../enum/button-size';

interface BtnProps {
    borderColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    fontColor?: string;
    padding?: string;
    borderRadius?: string;
    size: string;
    gap?: string;
    content: string;
    background: string;
    icon?: string;
    attribute?: string;
}

const Button: React.FC<BtnProps> = ({ content, size, background, icon, attribute }) => {
    return (
        <div
            className={classNames(`custom-button text-slate-900 ${attribute}`, {
                'bg-purple-custom text-white': background == ButtonBackground.DARK,
                'bg-transparent text-white': background == ButtonBackground.LIGHT,
                'px-12 py-5 text-2xl leading-8': size == ButtonSize.LARGE,
                'px-12 py-4 text-base leading-6': size == ButtonSize.MEDIUM,
                'px-12 py-3 text-base leading-6': size == ButtonSize.SMALL,
            })}
        >
            <div className="btn-icon flex items-center">
                <span
                    className={classNames(`${icon}`, {
                        'text-purple-custom': background == ButtonBackground.LIGHT,
                        'text-white': background == ButtonBackground.DARK,
                    })}
                ></span>
            </div>
            <div className="btn-name font-semibold">{content}</div>
        </div>
    );
};

export default Button;
