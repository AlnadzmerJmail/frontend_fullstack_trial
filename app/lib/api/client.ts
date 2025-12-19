const BASE_URL = 'http://localhost:5000';

type FetchOptions = RequestInit & {
	auth?: boolean;
};

export async function apiFetch<T>(
	endpoint: string,
	options: FetchOptions = {}
): Promise<T> {
	const { auth = false, headers, ...rest } = options;
	const isServer = typeof window === 'undefined';
	let cookieHeader = '';

	if (isServer) {
		// Dynamically import next/headers only on the server -- Needed for server side request to set the cookies
		const { cookies } = await import('next/headers');
		const cookieStore = await cookies();
		cookieHeader = cookieStore.toString();
	}

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...rest,
		headers: {
			'Content-Type': 'application/json',
			...(isServer && cookieHeader ? { Cookie: cookieHeader } : {}),
			...headers,
		},
		credentials: 'include', // Needed for client side request -- to include the cookies
	});

	if (!res.ok) {
		let message = 'API request failed';
		try {
			const data = await res.json();
			message = data.message ?? message;
		} catch {
			message = await res.text();
		}

		throw new Error(message);
	}

	if (endpoint.includes('file')) {
		const blob = await res.blob();
		const url = URL.createObjectURL(blob);
		return url as T;
	}

	return res.json();
}
