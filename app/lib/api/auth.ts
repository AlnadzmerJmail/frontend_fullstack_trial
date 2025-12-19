import { apiFetch } from './client';
import { UserAuthI } from '@/types';

export const signup = (userData: BodyInit) => {
	return apiFetch<UserAuthI>('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify(userData),
	});
};

export const login = (userData: BodyInit) => {
	return apiFetch<UserAuthI>('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(userData),
	});
};

export const getUser = () => {
	return apiFetch<UserAuthI>('/api/auth/user', {
		method: 'GET',
	});
};
