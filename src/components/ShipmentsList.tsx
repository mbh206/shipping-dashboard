// src/components/ShipmentsList.tsx
import React from 'react';

const ShipmentsList: React.FC = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
			<div className='flex flex-col justify-center'>
				<h1 className='text-3xl mb-4'>Shipments List</h1>
				<p>Here you can view and manage all your shipments.</p>
				{/* Implement your shipments list here */}
			</div>
		</div>
	);
};

export default ShipmentsList;
