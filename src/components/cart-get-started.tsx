import React from 'react';

interface CardProps {
    image: string;
    title: string;
    content: string;
    attribute?: string;
}

const CartGetStarted: React.FC<CardProps> = ({ image, title, content, attribute }) => {
    return (
        <div
            className={`bg-gray-400 box-border flex flex-col items-center rounded-3xl 0xl:max-md:flex-row ${attribute}`}
        >
            <img className="0xl:max-md:w-2/5 0xl:max-md:h-auto mt-3 mb-5" src={image} alt="" />
            <div className="p-8 flex flex-col items-center 0xl:max-md:items-start">
                <div className="title text-2xl mb-3 0xl:max-md:text-base">{title}</div>
                <div className="content text-center font-normal text-base 0xl:max-md:text-left 0xl:max-md:text-xs">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CartGetStarted;
