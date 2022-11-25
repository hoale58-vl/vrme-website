import React from 'react';
import { ButtonBackground, ButtonSize } from '../enum/button-size';
import Avatar from './avatar';
import Button from './button';

interface CardProps {
    image?: string;
    content?: string;
    avatar?: string;
    author: string;
    price?: string;
}

const CardNFT: React.FC<CardProps> = ({ image, content, avatar, author, price }) => {
    return (
        <div className="bg-darkGray h-fit pb-6 rounded-3xl text-white w-fit mx-auto">
            <img src={image} alt="" />
            <div className="content text-2xl mx-5 mt-5">{content}</div>
            <div className="author mt-1.5 mx-5 gap-3 flex flex-row items-center justify-start">
                <div className="avatar">
                    <Avatar url="/images/avatars/avatar1.png" />
                </div>
                <div className="author-name custom-font font-light text-base">{author}</div>
            </div>
            <div className="price mt-7 mx-5 flex justify-between">
                <div className="">
                    <div className="price-label text-gray-custom custom-font font-normal text-xs">
                        Price
                    </div>
                    <div className="price-item custom-font font-light text-base mt-2">
                        {price + ' ETH'}
                    </div>
                </div>
                <Button
                    content={'Buy'}
                    size={ButtonSize.SMALL}
                    background={ButtonBackground.DARK}
                    icon={'icon-RocketLaunch'}
                />
            </div>
        </div>
    );
};

export default CardNFT;
