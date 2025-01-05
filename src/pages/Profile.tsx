import React from 'react';
import { useAuth } from '../hooks/AuthContext';

const Profile: React.FC = () => {
	const { user } = useAuth();

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
				<strong>Role ID:</strong> {user.roleId}
			</p>
			<p>
				<strong>Company ID:</strong> {user.companyId}
			</p>
			<p>
				<strong>Joined on:</strong>{' '}
				{new Date(user.createdAt).toLocaleDateString()}
			</p>
			<p>
				<strong>Last Updated:</strong>{' '}
				{new Date(user.updatedAt).toLocaleDateString()}
			</p>
			{/* Add more profile details as needed */}
		</div>
	);
};

export default Profile;
