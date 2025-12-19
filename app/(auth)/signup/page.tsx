'use client';
import Form from '@/components/Form';
import { Inputs } from '@/types/formTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signup, login } from '@/app/lib/api/auth';

function page() {
	const router = useRouter();
	const handleSubmit = async (data: Inputs) => {
		try {
			const user = await signup(data as unknown as BodyInit);
			if (user.id) {
				await login({
					email: data.email,
					password: data.password,
				} as unknown as BodyInit);
				router.push('/bookings');
			}
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
			<Form handleSubmit={handleSubmit} isSignup />
			<Link href="/login" className="mt-3 underline text-blue-300">
				I have an account
			</Link>
		</div>
	);
}

export default page;
