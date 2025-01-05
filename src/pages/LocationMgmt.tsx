// src/pages/LocationMgmt.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

interface Ports {
	id: number;
	name: string;
	country: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	createdAt: string;
	updatedAt: string;
}

const LocationMgmt: React.FC = () => {
	const { user } = useAuth();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [locations, setLocations] = useState<Ports[]>([]);
	const [shipments, setShipments] = useState<Shipments[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/db.json'); // Ensure correct path
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				setShipments(data.shipments);
				setLocations(data.ports);
				setCustomers(data.customers);
			} catch (err: any) {
				setError(err.message);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6'>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				Port Locations
			</h1>
			<section className='mb-8 col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Shipments</h2>
				<div className='overflow-x-auto'>
					<table className='min-w-full shadow-md rounded'>
						<thead className='text-gray-100 bg-gray-600 text-xs'>
							<tr>
								<th className='py-2 px-2 border-b'>Name</th>
								<th className='py-2 px-2 border-b'>Country</th>
								<th className='py-2 px-2 border-b'>coordinates</th>
								<th className='py-2 px-2 border-b'>Shipment IDs</th>
							</tr>
						</thead>
						<tbody>
							{locations.map((location) => {
								const shipment = shipments.find((c) => c.id === location.id);
								const customer = customers.find(
									(c) => c.id === shipment.customerId
								);

								if (customer.companyId == user?.companyId) {
									return (
										<tr
											key={location.id}
											className='text-center text-gray-100 bg-gray-500'>
											<td className='py-2 px-4 border-b'>{location.name}</td>
											<td className='py-2 px-4 border-b'>{location.country}</td>
											<td className='py-2 px-4 border-b'>
												{location.coordinates.latitude}
												<br />
												{location.coordinates.longitude}
											</td>
											<td className='py-2 px-4 border-b'>
												{shipments
													.filter(
														(shipment) => location.id === shipment.arrivalPortId
													)
													.map((shipment) => shipment.shipmentNumber)
													.join(', ')}
											</td>
											{/* Add more location details as needed */}
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};

export default LocationMgmt;
