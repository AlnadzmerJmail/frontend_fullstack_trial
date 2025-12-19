const BASE_URL = 'http://localhost:5000';

type FetchOptions = RequestInit & {
	auth?: boolean;
};

export async function apiFetch<T>(
	endpoint: string,
	options: FetchOptions = {}
): Promise<T> {
	const { auth = false, headers, ...rest } = options;

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...rest,
		headers: {
			'Content-Type': 'application/json',
			...(auth && { Authorization: `Bearer ${getToken()}` }),
			...headers,
		},
	});

	if (!res.ok) {
		const error = await res.text();
		throw new Error(error || 'API request failed');
	}

	if (endpoint.includes('file')) {
		const blob = await res.blob();
		const url = URL.createObjectURL(blob);
		return url as T;
	}

	return res.json();
}

function getToken() {
	return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}
