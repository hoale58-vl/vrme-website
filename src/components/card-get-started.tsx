import React from 'react';

interface CardProps {
    image: string;
    title: string;
    content: string;
}

const CartGetStarted: React.FC<CardProps> = ({ image, title, content }) => {
    return (
        <div className="bg-darkGray box-border flex flex-col items-center rounded-3xl">
            <img className="w-64 h-64 mt-3 mb-5" src={image} alt="" />
            <div className="p-8 flex flex-col items-center">
                <div className="title text-2xl mb-3">{title}</div>
                <div className="content text-center font-normal text-base">{content}</div>
            </div>
        </div>
    );
};

export default CartGetStarted;
