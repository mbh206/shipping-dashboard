import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Company } from '../types/Company';

interface Partner {
	id: number;
	name: string;
	type: string;
	contactEmail: string;
	contactPhone: string;
	address: string;
	servicesProvided: string;
	companyId: number;
	createdAt: string;
	updatedAt: string;
}

const Partner: React.FC = () => {
	const { user } = useAuth();
	const [partners, setPartners] = useState<Partner[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/db.json');
				if (!res.ok) {
					throw new Error('Failed to fetch partner data');
				}
				const data = await res.json();

				setPartners(data.partners);
				setCompanies(data.companies);
			} catch (err: any) {
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 '>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				Partners
			</h1>
			{/* Quotations Section */}
			<section className='mb-8 col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Partners</h2>
				<div className='overflow-x-auto'>
					<table className='min-w-full shadow-md rounded'>
						<thead className='text-gray-100 bg-gray-600 text-xs'>
							<tr>
								<th className='py-2 px-2 border-b'>ID</th>
								<th className='py-2 px-2 border-b'>Name</th>
								<th className='py-2 px-2 border-b'>Type</th>
								<th className='py-2 px-2 border-b'>contactEmail</th>
								<th className='py-2 px-2 border-b'>contactPhone</th>
								<th className='py-2 px-2 border-b'>address</th>
								<th className='py-2 px-2 border-b'>servicesProvided</th>
								<th className='py-2 px-2 border-b'>Partner Company</th>
							</tr>
						</thead>
						<tbody>
							{partners.map((partner) => {
								const company = companies.find(
									(c) => c.id === partner.companyId
								);
								if (company.name == user?.companyName)
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
											<td className='py-2 px-4 border-b'>
												{partner.contactPhone}
											</td>
											<td className='py-2 px-4 border-b'>{partner.address}</td>
											<td className='py-2 px-4 border-b'>
												{partner.servicesProvided}
											</td>
											<td className='py-2 px-4 border-b'>{company.name}</td>
										</tr>
									);
							})}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};

export default Partner;
