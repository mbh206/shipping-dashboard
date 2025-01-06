import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shipment } from '../types/Shipment';
import { Quotation } from '../types/Quotation';
import { Billing } from '../types/Billing';
import { Product } from '../types/Product';
import { Customer } from '../types/Customer';
import { Contact } from '../types/Contact';
import { Company } from '../types/Company';
import { Partner } from '../types/Partner';
import { Location } from '../types/Location';
import { useAuth } from '../hooks/AuthContext';

const DashboardHome: React.FC = () => {
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [quotations, setQuotations] = useState<Quotation[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [locations, setLocations] = useState<Location[]>([]);
	const [billing, setBilling] = useState<Billing[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/db.json');
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				setShipments(data.shipments);
				setQuotations(data.quotations);
				setCustomers(data.customers);
				setContacts(data.contacts);
				setCompanies(data.companies);
				setLocations(data.ports);
				setBilling(data.billing);
				setProducts(data.products);
				setPartners(data.partners);
				setLoading(false);
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='dashboard-home text-slate-600'>
			<h1 className='m-auto w-80 text-3xl mb-6 text-slate-800 border-b border-slate-500'>
				Dashboard Overview
			</h1>
			<div className='grid grid-cols-1'>
				{/* Shipments Card */}
				<h2 className='text-xl mb-1'>Shipments</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/5'>Shipment #</th>
									<th className='p-1 border-b w-1/5'>Contact</th>
									<th className='p-1 border-b w-1/5'>Departure Port</th>
									<th className='p-1 border-b w-1/5'>Arrival Port</th>
									<th className='p-1 border-b w-60'>Total</th>
								</tr>
							</thead>
							<tbody>
								{shipments
									.filter((shipment) => {
										const customer = customers.find(
											(c) => c.id === shipment.customerId
										);
										return customer?.companyId === user?.companyId;
									})
									.slice(0, 5)
									.map((shipment) => {
										const contact = contacts.find(
											(c) => c.id === shipment.mainContactId
										);
										const departurePort = locations.find(
											(p) => p.id === shipment.departurePortId
										);
										const arrivalPort = locations.find(
											(p) => p.id === shipment.arrivalPortId
										);
										const billingRecord = billing.find(
											(b) => b.id === shipment.billingId
										);

										return (
											<tr
												key={shipment.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>
													{shipment.shipmentNumber}
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
													${billingRecord ? billingRecord.amount : 'N/A'}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/shipments'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Shipments
						</button>
					</Link>
				</section>

				{/* Quotes/Orders Card */}
				<h2 className='text-xl mb-1'>Quotes & Orders</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/4'>Quote #</th>
									<th className='p-1 border-b w-1/4'>Customer</th>
									<th className='p-1 border-b w-1/4'>Goods Type</th>
									<th className='p-1 border-b w-80'>Estimated Cost</th>
								</tr>
							</thead>
							<tbody>
								{quotations
									.filter((quotation) => {
										const customer = customers.find(
											(c) => c.id === quotation.customerId
										);
										return customer?.companyId === user?.companyId;
									})
									.slice(0, 5)
									.map((quotation) => {
										const customer = customers.find(
											(c) => c.id === quotation.customerId
										);

										return (
											<tr
												key={quotation.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{quotation.id}</td>
												<td className='py-2 px-4 border-b'>
													{customer ? customer.companyName : 'N/A'}
												</td>
												<td className='py-2 px-4 border-b'>
													{quotation.goodsType}
												</td>
												<td className='py-2 px-4 border-b'>
													${quotation.estimatedCost}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/quotation'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Quotes & Orders
						</button>
					</Link>
				</section>

				{/* Billing Card */}
				<h2 className='text-xl mb-1'>Billing</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/4'>Billing #</th>
									<th className='p-1 border-b w-1/4'>Shipment</th>
									<th className='p-1 border-b w-1/4'>Type</th>
									<th className='p-1 border-b w-80'>Amount</th>
								</tr>
							</thead>
							<tbody>
								{billing
									.filter((bill) => {
										const customer = customers.find(
											(c) =>
												c.id ===
												shipments.find((s) => s.id === bill.shipmentId)
													?.customerId
										);
										return customer?.companyId === user?.companyId;
									})
									.slice(0, 5)
									.map((bill) => {
										const shipment = shipments.find(
											(c) => c.id === bill.shipmentId
										);

										return (
											<tr
												key={bill.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{bill.id}</td>
												<td className='py-2 px-4 border-b'>
													{shipment?.shipmentNumber}
												</td>
												<td className='py-2 px-4 border-b'>{bill.type}</td>
												<td className='py-2 px-4 border-b'>${bill.amount}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/billing'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Billings
						</button>
					</Link>
				</section>

				{/* Product Management Card */}
				<h2 className='text-xl mb-1'>Products</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/4'>Product #</th>
									<th className='p-1 border-b w-1/4'>Products</th>
									<th className='p-1 border-b w-1/4'>Destination</th>
									<th className='p-1 border-b w-80'>Arrival Date</th>
								</tr>
							</thead>
							<tbody>
								{products
									.filter((product) => {
										const customer = customers.find(
											(c) =>
												c.id ===
												shipments.find((s) => s.id === product.shipmentId)
													?.customerId
										);
										return customer?.companyId === user?.companyId;
									})
									.slice(0, 5)
									.map((product) => {
										return (
											<tr
												key={product.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{product.id}</td>
												<td className='py-2 px-4 border-b'>
													{product.product}
												</td>
												<td className='py-2 px-4 border-b'>
													{product.destination}
												</td>
												<td className='py-2 px-4 border-b'>
													{new Date(product.arrivalDate)
														.toLocaleString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric',
															hour: 'numeric',
															minute: '2-digit',
															hour12: true,
														})
														.replace(' AM', 'AM')
														.replace(' PM', 'PM')}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/product-management'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Products
						</button>
					</Link>
				</section>

				{/* Partner Management Card */}
				<h2 className='text-xl mb-1'>Partners</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/4'>Partner #</th>
									<th className='p-1 border-b w-1/4'>Name</th>
									<th className='p-1 border-b w-1/4'>Type</th>
									<th className='p-1 border-b w-80'>Contact</th>
								</tr>
							</thead>
							<tbody>
								{partners
									.filter((partner) => {
										const company = companies.find(
											(c) => c.id === partner.companyId
										);
										return company?.id === user?.companyId;
									})
									.slice(0, 5)
									.map((partner) => {
										return (
											<tr
												key={partner.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{partner.id}</td>
												<td className='py-2 px-4 border-b'>{partner.name}</td>
												<td className='py-2 px-4 border-b'>{partner.type}</td>
												<td className='py-2 px-4 border-b'>
													{partner.contactEmail}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/partner'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Partners
						</button>
					</Link>
				</section>

				{/* Location Management Card */}
				<h2 className='text-xl mb-1'>Ports</h2>
				<section className='rounded w-full bg-gray-400 mb-9'>
					<div className='shadow-md overflow-x-auto'>
						<table className='nim-w-full shadow-md rounded'>
							<thead className='text-gray-100 bg-gray-600 text-xs'>
								<tr>
									<th className='p-1 border-b w-1/4'>Port #</th>
									<th className='p-1 border-b w-1/4'>Name</th>
									<th className='p-1 border-b w-1/4'>Country</th>
									<th className='p-1 border-b w-80'>Shipments</th>
								</tr>
							</thead>
							<tbody>
								{locations
									.filter((location) =>
										shipments.some(
											(shipment) =>
												shipment.arrivalPortId === location.id &&
												customers.find(
													(customer) => customer.id === shipment.customerId
												)?.companyId === user?.companyId
										)
									)
									.slice(0, 5)
									.map((location) => {
										const shipmentsForPort = shipments.filter(
											(shipment) =>
												shipment.arrivalPortId === location.id &&
												customers.find(
													(customer) => customer.id === shipment.customerId
												)?.companyId === user?.companyId
										);

										return (
											<tr
												key={location.id}
												className='text-center text-gray-100 bg-gray-500'>
												<td className='py-2 px-4 border-b'>{location.id}</td>
												<td className='py-2 px-4 border-b'>{location.name}</td>
												<td className='py-2 px-4 border-b'>
													{location.country}
												</td>
												<td className='py-2 px-4 border-b'>
													{shipmentsForPort.length > 0
														? shipmentsForPort
																.map((shipment) => shipment.shipmentNumber)
																.join(', ')
														: 'No Shipments'}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<Link to='/dashboard/locationmgmt'>
						<button className='m-2 text-gray-600 bg-yellow-200 flex'>
							Go to Ports
						</button>
					</Link>
				</section>
			</div>
		</div>
	);
};

export default DashboardHome;
