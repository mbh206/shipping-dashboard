// src/components/LeftNavMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNavMenu: React.FC = () => {
	const navItems = [
		{ name: 'Dashboard', path: '/dashboard' },
		{ name: 'Shipments', path: '/dashboard/shipments' },
		{ name: 'Quotation/Ordering', path: '/dashboard/quotation' },
		{ name: 'Billing', path: '/dashboard/billing' },
		{ name: 'Product Management', path: '/dashboard/product-management' },
		{
			name: 'Partner Management',
			path: '/dashboard/partner',
		},
		{ name: 'Location Management', path: '/dashboard/locationmgmt' },
		{ name: 'Settings', path: '/dashboard/settings' },
		{ name: 'Support', path: '/dashboard/support' },
	];

	return (
		<aside className='w-64 bg-gray-800 text-white h-screen'>
			<div className='p-6'>
				<h2 className='text-3xl text-center mb-4'>ShippingCo</h2>
				<hr className='border-gray-700 mb-6' />
				<nav>
					<ul className='decoration-white'>
						{navItems.map((item) => (
							<li
								key={item.name}
								className='mb-2'>
								<NavLink
									to={item.path}
									end={item.path === '/dashboard'}
									className={({ isActive }) =>
										isActive
											? 'block py-1 px-4 bg-gray-700 rounded'
											: 'block py-1 px-4 hover:bg-gray-700 rounded'
									}>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default LeftNavMenu;
