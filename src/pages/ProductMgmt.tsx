// src/pages/ProductMgmt.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';

const ProductMgmt: React.FC = () => {
	const { user } = useAuth();
	const [customers, setCustomer] = useState<Customer[]>([]);
	const [products, setProducts] = useState<Products[]>([]);
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [ports, setPorts] = useState<Ports[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/db.json');
				if (!res.ok) {
					throw new Error('Failed to fetch product data');
				}
				const data = await res.json();
				setCustomer(data.customers);
				setProducts(data.products);
				setShipments(data.shipments);
				setPorts(data.ports);
			} catch (err: any) {
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='text-slate-600 mb-8 col-span-2 md:col-span-5'>
			<div className='flex flex-col justify-center'>
				<h1 className='text-3xl mb-4'>Product Management List</h1>
				<section className='mb-8 col-span-2 md:col-span-5'>
					<h2 className='text-xl mb-4'>Your Quotes</h2>
					<div className='overflow-x-auto'>
						<table className='min-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='py-2 px-2 border-b'>ID</th>
									<th className='py-2 px-2 border-b'>Product</th>
									<th className='py-2 px-2 border-b'>Weight</th>
									<th className='py-2 px-2 border-b'>Amount</th>
									<th className='py-2 px-2 border-b'>Shipment</th>
									<th className='py-2 px-2 border-b'>Port</th>
									<th className='py-2 px-2 border-b'>Arrival Date</th>
									<th className='py-2 px-2 border-b'>Destination City</th>
									<th className='py-2 px-2 border-b'>Delivery Date</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => {
									const shipment = shipments.find(
										(c) => c.id === product.shipmentId
									);
									const customer = customers.find(
										(c) => c.id === shipment.customerId
									);
									const port = ports.find(
										(c) => c.id === product.arrivalPortId
									);
									if (customer.companyId == user?.companyId) {
										return (
											<tr
												key={product.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{product.id}</td>
												<td className='py-2 px-4 border-b'>
													{product.product}
												</td>
												<td className='py-2 px-4 border-b'>
													{product.weight}kg
												</td>
												<td className='py-2 px-4 border-b'>{product.amount}</td>
												<td className='py-2 px-4 border-b'>
													{shipment.shipmentNumber}
												</td>
												<td className='py-2 px-4 border-b'>{port.name}</td>
												<td className='py-2 px-4 border-b'>
													{product.arrivalDate}
												</td>
												<td className='py-2 px-4 border-b'>
													{product.destination}
												</td>
												<td className='py-2 px-4 border-b'>
													{product.deliveryDate}
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
		</div>
	);
};

export default ProductMgmt;
