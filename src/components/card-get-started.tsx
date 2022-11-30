import React from 'react';

interface CardProps {
    image: string;
    title: string;
    content: string;
    attribute?: string;
}

const CardGetStarted: React.FC<CardProps> = ({ image, title, content, attribute }) => {
    return (
        <div className={`card-get-started`}>
            <img className="card-get-started-image" src={image} alt="" />
            <div className="card-get-started-group">
                <div className="card-get-started-title">{title}</div>
                <div className="card-get-started-content">{content}</div>
            </div>
        </div>
    );
};

export default CardGetStarted;
