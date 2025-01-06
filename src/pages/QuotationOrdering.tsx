// src/pages/QuotationOrdering.tsx

import React, { useState, useEffect } from 'react';
import { Quotation } from '../types/Quotation';
import { Order } from '../types/Order';
import { useAuth } from '../hooks/AuthContext';
import { Customer } from '../types/Customer';

const QuotationOrdering: React.FC = () => {
	const { user } = useAuth();
	const [quotations, setQuotations] = useState<Quotation[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loadingQuotations, setLoadingQuotations] = useState<boolean>(true);
	const [errorQuotations, setErrorQuotations] = useState<string | null>(null);

	// State for Orders
	const [orders, setOrders] = useState<Order[]>([]);
	const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
	const [errorOrders, setErrorOrders] = useState<string | null>(null);

	// Fetch data from db.json
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/db.json'); // Fetch from public folder
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();

				// Set Quotations and Orders directly without filtering
				setQuotations(data.quotations);
				setOrders(data.orders);
				setCustomers(data.customers);
				setLoadingQuotations(false);
				setLoadingOrders(false);
			} catch (error: any) {
				setErrorQuotations(error.message);
				setErrorOrders(error.message);
				setLoadingQuotations(false);
				setLoadingOrders(false);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures this runs once on mount

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				Quotes and Orders
			</h1>
			<section className='mb-8 col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Quotes</h2>
				{loadingQuotations ? (
					<div>Loading quotes...</div>
				) : errorQuotations ? (
					<div className='text-red-500'>Error: {errorQuotations}</div>
				) : quotations.length === 0 ? (
					<div>No quotes found.</div>
				) : (
					<div className='overflow-x-auto'>
						<table className='min-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='py-2 px-2 border-b'>ID</th>
									<th className='py-2 px-2 border-b'>Customer Name</th>
									<th className='py-2 px-2 border-b'>Customer Email</th>
									<th className='py-2 px-2 border-b'>Origin</th>
									<th className='py-2 px-2 border-b'>Destination</th>
									<th className='py-2 px-2 border-b'>Goods Type</th>
									<th className='py-2 px-2 border-b'>Weight (kg)</th>
									<th className='py-2 px-2 border-b'>Dimensions</th>
									<th className='py-2 px-2 border-b'>Service Type</th>
									<th className='py-2 px-2 border-b'>Estimated Cost (USD)</th>
									<th className='py-2 px-2 border-b'>Created At</th>
								</tr>
							</thead>
							<tbody>
								{quotations.map((quotation) => {
									const customer = customers.find(
										(c) => c.id === quotation.customerId
									);

									if (customer?.companyId == user?.companyId) {
										return (
											<tr
												key={quotation.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{quotation.id}</td>
												<td className='py-2 px-4 border-b'>
													{customer?.companyName}
												</td>
												<td className='py-2 px-4 border-b'>
													{customer?.contactEmail}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.originPortId}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.destinationPortId}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.goodsType}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.weight}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.dimensions}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.serviceType}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.estimatedCost}
												</td>
												<td className='py-2 px-4 border-b'>
													{new Date(quotation.createdAt).toLocaleString()}
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</div>
				)}
			</section>

			{/* Orders Section */}
			<section className=' col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Orders</h2>
				{loadingOrders ? (
					<div>Loading orders...</div>
				) : errorOrders ? (
					<div className='text-red-500'>Error: {errorOrders}</div>
				) : orders.length === 0 ? (
					<div>No orders found.</div>
				) : (
					<div className='overflow-x-auto'>
						<table className='min-w-full bg-gray-400 shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='py-2 px-2 border-b'>Order ID</th>
									<th className='py-2 px-2 border-b'>Quotation ID</th>
									<th className='py-2 px-2 border-b'>Payment Method</th>
									<th className='py-2 px-2 border-b'>Payment Status</th>
									<th className='py-2 px-2 border-b'>Order Status</th>
									<th className='py-2 px-2 border-b'>Tracking Number</th>
									<th className='py-2 px-2 border-b'>Carrier</th>
									<th className='py-2 px-2 border-b'>Created At</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => {
									const quote = quotations.find(
										(c) => c.id === order.quotationId
									);

									const customer = customers.find(
										(c) => c.id === quote?.customerId
									);

									if (customer?.companyId == user?.companyId) {
										return (
											<tr
												key={order.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{order.id}</td>
												<td className='py-2 px-4 border-b'>
													{order.quotationId}
												</td>
												<td className='py-2 px-4 border-b'>
													{order.paymentMethod}
												</td>
												<td className='py-2 px-4 border-b'>
													{order.paymentStatus}
												</td>
												<td className='py-2 px-4 border-b'>
													{order.orderStatus}
												</td>
												<td className='py-2 px-4 border-b'>
													{order.trackingNumber}
												</td>
												<td className='py-2 px-4 border-b'>{order.carrier}</td>
												<td className='py-2 px-4 border-b'>
													{new Date(order.createdAt).toLocaleString()}
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</div>
				)}
			</section>
		</div>
	);
};

export default QuotationOrdering;
