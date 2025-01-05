// src/pages/Shipments.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

interface Shipment {
	id: number;
	shipmentNumber: string;
	contents: string;
	quantity: string;
	departureDate: string;
	arrivalDate: string;
	status: string;
	itinerary: [];
	departurePortId: number;
	arrivalPortId: number;
	mainContactId: number;
	customerId: number;
	billingId: number;
}
const Shipments: React.FC = () => {
	const { user } = useAuth();
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [ports, setPorts] = useState<Port[]>([]);
	const [billing, setBilling] = useState<Billing[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
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
				setCustomers(data.customers);
				setContacts(data.contacts);
				setPorts(data.ports);
				setBilling(data.billing);
				setLoading(false);
			} catch (err: any) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				shipments
			</h1>
			<section className='mb-8 col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Shipments</h2>
				<div className='overflow-x-auto'>
					<table className='min-w-full shadow-md rounded'>
						<thead className='text-gray-100 bg-gray-600 text-xs'>
							<tr>
								<th className='py-2 px-2 border-b'>Shipment #</th>
								<th className='py-2 px-2 border-b'>Contents</th>
								<th className='py-2 px-2 border-b'>Customer</th>
								<th className='py-2 px-2 border-b'>Contact</th>
								<th className='py-2 px-2 border-b'>Departure port</th>
								<th className='py-2 px-2 border-b'>Arrival Port</th>
								<th className='py-2 px-2 border-b'>Total</th>
							</tr>
						</thead>
						<tbody>
							{shipments.map((shipment) => {
								const customer = customers.find(
									(c) => c.id === shipment.customerId
								);
								const contact = contacts.find(
									(c) => c.id === shipment.mainContactId
								);
								const departurePort = ports.find(
									(p) => p.id === shipment.departurePortId
								);
								const arrivalPort = ports.find(
									(p) => p.id === shipment.arrivalPortId
								);
								const billingRecord = billing.find(
									(b) => b.id === shipment.billingId
								);
								if (customer.companyId == user?.companyId) {
									return (
										<tr
											key={shipment.id}
											className='text-center text-gray-100 bg-gray-500'>
											<td className='py-2 px-4 border-b'>{shipment.id}</td>
											<td className='py-2 px-4 border-b'>
												{shipment.contents}
											</td>
											<td className='py-2 px-4 border-b'>
												{customer ? customer.name : 'N/A'}
											</td>
											<td className='py-2 px-4 border-b'>
												{contact ? contact.name : 'N/A'}
											</td>
											<td className='py-2 px-4 border-b'>
												{departurePort ? departurePort.name : 'N/A'}
											</td>
											<td className='py-2 px-4 border-b'>
												{arrivalPort ? arrivalPort.name : 'N/A'}
											</td>
											<td className='py-2 px-4 border-b'>
												{billingRecord ? billingRecord.amount : 'N/A'}
											</td>
											{/* Add more shipment details as needed */}
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

export default Shipments;
