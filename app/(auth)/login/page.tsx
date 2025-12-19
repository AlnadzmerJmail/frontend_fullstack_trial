'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// local imports
import Form from '@/components/Form';
import { Inputs } from '@/types/formTypes';
import { login } from '@/app/lib/api/auth';

function Login() {
	const router = useRouter();

	const handleSubmit = async (data: Inputs) => {
		try {
			const user = await login(data as unknown as BodyInit);
			router.push('/bookings');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('Something went wrong');
			}
		}
	};
	return (
		<div className="border min-h-screen flex flex-col justify-center items-center">
			<Form handleSubmit={handleSubmit} formTitle="Login" />
			<Link href="/signup" className="mt-3 underline text-blue-300">
				Create account
			</Link>
		</div>
	);
}

export default Login;
