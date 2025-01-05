// src/pages/BillList.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

interface Billing {
	id: number;
	amount: number;
	date: string;
	type: string;
	from: number; // Partner or Customer ID
	to: number; // Partner or Customer ID
	description: string;
	shipmentId: number;
	createdAt: string;
	updatedAt: string;
}

const Billing: React.FC = () => {
	const { user } = useAuth();
	const [billings, setBillings] = useState<Billing[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/db.json'); // Use absolute path
				if (!res.ok) {
					throw new Error('Failed to fetch billing data');
				}
				const data = await res.json();

				// Ensure the keys match your db.json
				setBillings(data.billing);
				setCustomers(data.customers);
				setShipments(data.shipments);
			} catch (err: any) {
				console.error('Error fetching data:', err);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 '>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				Quotes and Orders
			</h1>
			{/* Quotations Section */}
			<section className='mb-8 col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Quotes</h2>
				<div className='overflow-x-auto'>
					<table className='min-w-full shadow-md rounded'>
						<thead className='text-gray-100 bg-gray-600 text-xs'>
							<tr>
								<th className='py-2 px-2 border-b'>ID</th>
								<th className='py-2 px-2 border-b'>Company</th>
								<th className='py-2 px-2 border-b'>Amount</th>
								<th className='py-2 px-2 border-b'>Date</th>
								<th className='py-2 px-2 border-b'>Type</th>
								<th className='py-2 px-2 border-b'>Description</th>
								<th className='py-2 px-2 border-b'>Created</th>
							</tr>
						</thead>
						<tbody>
							{billings.map((bill) => {
								const shipment = shipments.find(
									(c) => c.id === bill.shipmentId
								);
								const customer = customers.find(
									(c) => c.id === shipment.customerId
								);
								if (customer?.companyId == user?.companyId) {
									return (
										<tr
											key={bill.id}
											className='text-center text-gray-100 bg-gray-500'>
											<td className='py-2 px-4 border-b'>{bill.id}</td>
											<td className='py-2 px-4 border-b'>
												{customer.companyName}
											</td>
											<td className='py-2 px-4 border-b'>${bill.amount}</td>
											<td className='py-2 px-4 border-b'>{bill.date}</td>
											<td className='py-2 px-4 border-b'>{bill.type}</td>
											<td className='py-2 px-4 border-b'>{bill.description}</td>

											<td className='py-2 px-4 border-b'>
												{' '}
												{new Date(bill.createdAt).toLocaleString()}
											</td>
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

export default Billing;
