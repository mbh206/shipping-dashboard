// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-600'>
			<h2 className='text-4xl mb-6'>Welcome to the Logistics App!</h2>
			<Link
				to='/login'
				className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600'>
				Get Started
			</Link>
		</div>
	);
};

export default Home;
