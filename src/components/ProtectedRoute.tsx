// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const ProtectedRoute: React.FC = () => {
	const { user } = useAuth();

	if (!user) {
		// User is not authenticated, redirect to login
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	// User is authenticated, render the child routes
	return <Outlet />;
};

export default ProtectedRoute;
