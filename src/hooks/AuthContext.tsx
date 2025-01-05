// src/hooks/AuthContext.tsx

import React, {
	createContext,
	useMemo,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import { Role } from '../types/Role';
import { Company } from '../types/Company';
import { User as BaseUser } from '../types/User'; // Renamed import to BaseUser

// Define an EnrichedUser interface that extends the BaseUser
export interface EnrichedUser extends BaseUser {
	roleName: string;
	permissions: string;
	companyName: string;
}

// Auth Context Type
interface AuthContextType {
	user: EnrichedUser | null;
	login: (credentials: { username: string; password: string }) => Promise<void>;
	logout: () => void;
	roles: Role[];
	getRoleById: (roleId: number) => Role | undefined;
	companies: Company[];
	getCompanyById: (companyId: number) => Company | undefined;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Props
interface AuthProviderProps {
	children: React.ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useLocalStorage<EnrichedUser | null>('user', null);
	const [roles, setRoles] = useState<Role[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [users, setUsers] = useState<BaseUser[]>([]); // Use BaseUser for users
	const [loadingData, setLoadingData] = useState<boolean>(true);
	const [errorData, setErrorData] = useState<string | null>(null);
	const navigate = useNavigate();

	// Fetch data from db.json on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/db.json'); // Fetch from public folder
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();

				// Extract roles, companies, and users
				const fetchedRoles: Role[] = data.roles;
				const fetchedCompanies: Company[] = data.companies;
				const fetchedUsers: BaseUser[] = data.users;

				setRoles(fetchedRoles);
				setCompanies(fetchedCompanies);
				setUsers(fetchedUsers);
				setLoadingData(false);
			} catch (error: any) {
				console.error('Error fetching data:', error);
				setErrorData(error.message);
				setLoadingData(false);
			}
		};

		fetchData();
	}, []);

	// Helper function to get role details by roleId
	const getRoleById = (roleId: number): Role | undefined => {
		return roles.find((role) => role.id === roleId);
	};

	// Helper function to get company details by companyId
	const getCompanyById = (companyId: number): Company | undefined => {
		return companies.find((company) => company.id === companyId);
	};

	// Function to enrich user with roleName, permissions, and companyName
	const enrichUser = (fetchedUser: BaseUser): EnrichedUser => {
		const role = getRoleById(fetchedUser.roleId);
		const company = getCompanyById(fetchedUser.companyId);

		if (!role) {
			console.error(`Role with ID ${fetchedUser.roleId} not found`);
		}

		if (!company) {
			console.error(`Company with ID ${fetchedUser.companyId} not found`);
		}

		return {
			...fetchedUser,
			roleName: role ? role.name : 'Unknown',
			permissions: role ? role.permissions : 'No permissions',
			companyName: company ? company.name : 'Unknown',
		};
	};

	// Login Function
	const login = async (credentials: { username: string; password: string }) => {
		if (loadingData) {
			throw new Error('Data is still loading. Please try again shortly.');
		}

		if (errorData) {
			throw new Error('Failed to load necessary data.');
		}

		try {
			// Find user by username
			const fetchedUser = users.find(
				(u) => u.username === credentials.username
			);

			if (!fetchedUser) {
				throw new Error('Invalid username or password');
			}

			// Simple password check; replace with hashed password verification in production
			if (credentials.password !== fetchedUser.password) {
				throw new Error('Invalid username or password');
			}

			const enrichedUser = enrichUser(fetchedUser);
			setUser(enrichedUser);
			navigate('/dashboard'); // Redirect after successful login
		} catch (error: any) {
			throw new Error(error.message || 'Login failed');
		}
	};

	// Logout Function
	const logout = () => {
		setUser(null);
		navigate('/login', { replace: true }); // Redirect after logout
	};

	// Memoize Context Value
	const value = useMemo(
		() => ({
			user,
			login,
			logout,
			roles,
			getRoleById,
			companies,
			getCompanyById,
		}),
		[user, roles, companies]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook to Use AuthContext
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
