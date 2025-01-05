// src/pages/Login.tsx

import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
	const { user, login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	// If the user is already logged in, redirect to dashboard
	if (user) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login({ username, password });
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h1 className='py-2 uppercase'>Please Login</h1>
			<div className='flex flex-col items-center justify-center h-screen bg-gray-600'>
				<div className='flex flex-col bg-slate-100 my-3 rounded text-gray-500 w-96'>
					<p>
						Please use one of the following users to login. <br />
						The password is: <strong>123123</strong> for eveeryone.
					</p>
					<ul>
						<li className='py-2'>Jena2</li>
						<li className='py-2'>Jon70</li>
						<li className='py-2'>Ted_Little</li>
						<li className='py-2'>Sammie1</li>
					</ul>
				</div>
				<form
					onSubmit={handleLogin}
					className='bg-slate-100 p-8 rounded shadow-md w-96'>
					{error && <p className='text-red-500 mb-4'>{error}</p>}
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-gray-700 mb-2'>
							Username:
						</label>
						<input
							id='username'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='w-full px-3 py-2 border rounded focus:outline-none focus:ring'
							required
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-gray-700 mb-2'>
							Password:
						</label>
						<input
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-3 py-2 border rounded focus:outline-none focus:ring'
							required
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors ${
							loading ? 'opacity-50 cursor-not-allowed' : ''
						}`}>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
