import React from 'react';

interface CardProps {
	title: string;
	children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
	return (
		<div className='bg-slate-100 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-slate-600'>
			<h2 className='text-xl font-semibold mb-2'>{title}</h2>
			{children}
		</div>
	);
};

export default Card;
