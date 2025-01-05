import React from 'react';
import { FaBell, FaUserCircle, FaDoorOpen } from 'react-icons/fa';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopNavBar: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
	};
	const handleProfile = () => {
		navigate('/dashboard/Profile');
	};
	return (
		<header className='flex justify-between shadow-md px-4 py-3 bg-slate-400'>
			<div className='text-sm text-black text-left'>
				{user ? (
					<>
						<span className='px-1'>
							<strong className='uppercase text-xs text-gray-500'>
								User:{' '}
							</strong>
							{user.username}
						</span>
						<span className='px-1'>
							<strong className='uppercase text-xs text-gray-500'>
								Email:{' '}
							</strong>
							{user.email}
						</span>
						<br />
						<span className='px-1'>
							<strong className='uppercase text-xs text-gray-500'>
								Company:{' '}
							</strong>
							{user.companyName}
						</span>
						<span className='px-1'>
							<strong className='uppercase text-xs text-gray-500'>
								Role:{' '}
							</strong>
							{user?.roleName}
						</span>
					</>
				) : (
					<span>Loading user...</span>
				)}
			</div>
			<div className='flex items-center space-x-2'>
				<button
					className='text-gray-200 hover:text-gray-500 bg-slate-400 p-1 hover:bg-slate-300'
					aria-label='Profile'
					onClick={handleProfile}>
					<FaUserCircle size={18} />
				</button>
				<button
					className='text-gray-200 hover:text-gray-500 bg-slate-400 p-1 hover:bg-slate-300'
					aria-label='Logout'
					onClick={handleLogout}>
					<FaDoorOpen size={18} />
				</button>
			</div>
		</header>
	);
};
export default TopNavBar;
