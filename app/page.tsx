import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from './lib/api/auth';

export default async function Home() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		redirect('/login');
	}
	const user = await getUser();
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start">
				<div className="text-white ml-auto">
					<p className="capitalize">{user.userName}</p>
					<p>{user.email}</p>
				</div>
				<div>
					<h1 className="text-white text-lg">Customer Booking Portal</h1>
					<div className="mt-5">
						<Link href="/bookings" className="text-blue-200">
							See Bookings
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
