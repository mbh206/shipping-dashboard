import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';

const Profile: React.FC = () => {
	const { user } = useAuth();
	const [roles, setRoles] = useState<Role[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('./dh.json');
				if (!res.ok) {
					throw new Error('Failed to get profile data');
				}
				const data = await res.json();
				setRoles(data.roles);
				setCompanies(data.companies);
			} catch {
				serError(err.message);
			}
		};
		fetchData();
	}, []);

	if (!user) {
		return <p>Loading profile...</p>;
	}

	return (
		<div className='p-4 text-gray-600'>
			<h1 className='text-3xl mb-4'>Profile</h1>
			<p>
				<strong>Username:</strong> {user.username}
			</p>
			<p>
				<strong>Email:</strong> {user.email}
			</p>
			<p>
				<strong>Role:</strong> {user?.roleName}
			</p>
			<p>
				<strong>Company:</strong> {user.companyName}
			</p>
			<p>
				<strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
			</p>
			{/* Add more profile details as needed */}
		</div>
	);
};

export default Profile;
