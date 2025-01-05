// src/pages/Support.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

interface Ticket {
	id: number;
	userId: number;
	details: string;
	response: string;
	createdAt: string;
	updatedAt: string;
}

interface SupportData {
	openTickets?: Ticket[];
	closedTickets?: Ticket[];
}

const Support: React.FC = () => {
	const { user } = useAuth();
	const [supports, setSupports] = useState<SupportData[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/db.json'); // Ensure this path is correct
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				setSupports(data.support);
			} catch (err: any) {
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='p-6 text-slate-600 grid col-span-2 md:col-span-5 gap-6 '>
			<div>
				<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
					Support
				</h1>
				<p className='mb-4'>Here you can view and manage all your support.</p>
				<hr />
				<h2 className='text-xl mb-2'>Open Tickets</h2>
				{supports.map((ticketGroup, index) => {
					if (ticketGroup.openTickets) {
						return ticketGroup.openTickets
							.filter((ticket) => ticket.userId === user?.id)
							.map((ticket) => (
								<div
									key={`open-${ticket.id}`}
									className='mb-4 bg-green-100 p-2 rounded shadow'>
									<p>
										<strong>Details:</strong> {ticket.details}
									</p>
									<p>
										<strong>Response:</strong> {ticket.response}
									</p>
								</div>
							));
					}
					return null;
				})}

				{/* Closed Tickets Section */}
				<h2 className='text-xl mb-2 mt-6'>Closed Tickets</h2>
				{supports.map((ticketGroup, index) => {
					if (ticketGroup.closedTickets) {
						return ticketGroup.closedTickets
							.filter((ticket) => ticket.userId === user?.id)
							.map((ticket) => (
								<div
									key={`closed-${ticket.id}`}
									className='mb-4 bg-red-100 p-2 rounded shadow'>
									<p>
										<strong>Details:</strong> {ticket.details}
									</p>
									<p>
										<strong>Response:</strong> {ticket.response}
									</p>
								</div>
							));
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Support;
