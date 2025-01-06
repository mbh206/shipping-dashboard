import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Shipments from './pages/Shipments';
import Quotation from './pages/QuotationOrdering';
import Location from './pages/Location';
import Billing from './pages/BillList';
import Partner from './pages/Partner';
import ProductMgmt from './pages/ProductMgmt';
import Setting from './pages/Setting';
import Support from './pages/Support';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>

			{/* Protected Dashboard Routes */}
			<Route element={<ProtectedRoute />}>
				<Route
					path='/dashboard'
					element={<DashboardLayout />}>
					{/* Default Dashboard Home */}
					<Route
						index
						element={<DashboardHome />}
					/>

					{/* Nested Dashboard Routes */}
					<Route
						path='shipments'
						element={<Shipments />}
					/>
					<Route
						path='quotation'
						element={<Quotation />}
					/>
					<Route
						path='location'
						element={<Location />}
					/>
					<Route
						path='billing'
						element={<Billing />}
					/>
					<Route
						path='partner'
						element={<Partner />}
					/>
					<Route
						path='product-management'
						element={<ProductMgmt />}
					/>
					<Route
						path='settings'
						element={<Setting />}
					/>
					<Route
						path='support'
						element={<Support />}
					/>
					<Route
						path='profile'
						element={<Profile />}
					/>
				</Route>
			</Route>

			{/* Catch-all Route */}
			<Route
				path='*'
				element={
					<Navigate
						to='/'
						replace
					/>
				}
			/>
		</Routes>
	);
}

export default App;
