// src/pages/Setting.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

interface User {
	id: number;
	username: string;
	email: string;
	roleId: number;
	companyId: number;
}

interface Company {
	id: number;
	name: string;
}

interface Role {
	id: number;
	name: string;
}

const Setting: React.FC = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState<User[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/db.json');
				if (!res.ok) {
					throw new Error('Failed to load settings data');
				}
				const data = await res.json();
				setUsers(data.users);
				setCompanies(data.companies);
				setRoles(data.roles);
			} catch (err: any) {
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='p-6 text-slate-600 grid grid-cols-1 xl:grid-cols-3 gap-6'>
			<h1 className='text-2xl mb-2 col-span-2 md:col-span-5 text-center'>
				Company Settings
			</h1>
			<section className='col-span-2 md:col-span-5'>
				<h2 className='text-xl mb-4'>Your Company Network</h2>
				<div className='overflow-x-auto'>
					<table className='min-w-full shadow-md rounded'>
						<thead className='text-gray-100 bg-gray-600 text-xs'>
							<tr>
								<th className='py-2 px-2 border-b'>User</th>
								<th className='py-2 px-2 border-b'>Role</th>
								<th className='py-2 px-2 border-b'>Contact</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u) => {
								const role = roles.find((c) => c.id === u.roleId);
								const company = companies.find((c) => c.id === u.companyId);
								if (!role) {
									console.warn(
										`Role with ID ${u.roleId} not found for User ID ${u.id}`
									);
									return null;
								}

								if (!company) {
									console.warn(
										`Company with ID ${u.companyId} not found for User ID ${u.id}`
									);
									return null;
								}
								if (company.id === user?.companyId) {
									return (
										<tr
											key={u.id}
											className='text-center text-gray-100 bg-gray-500'>
											<td className='py-2 px-4 border-b'>{u.username}</td>
											<td className='py-2 px-4 border-b'>{role.name}</td>
											<td className='py-2 px-4 border-b'>{u.email}</td>
										</tr>
									);
								}
								return null;
							})}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};

export default Setting;
