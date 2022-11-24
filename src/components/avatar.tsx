import { url } from 'inspector';
import * as React from 'react';
// import avatar1 from '../images/avatar1.png'

interface BtnProps {
    url: string;
}

const Avatar: React.FC<BtnProps> = ({ url }) => {
    return <img className='w-6' src={url} alt="" />;
};

export default Avatar;
