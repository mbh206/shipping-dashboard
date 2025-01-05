// src/pages/DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftNavMenu from '../components/LeftNavMenu';
import TopNavBar from '../components/TopNavBar';

const DashboardLayout: React.FC = () => {
	return (
		<div className='flex'>
			<LeftNavMenu />
			<div className='flex-1 flex flex-col'>
				{/* Top Navigation Bar */}
				<TopNavBar />

				{/* Dashboard Content */}
				<main className='flex-1 bg-slate-200 p-4 overflow-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
