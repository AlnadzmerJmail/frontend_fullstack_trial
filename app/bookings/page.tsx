import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getBookings } from '../lib/api/booking';

export default async function page() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		redirect('/login');
	}

	const bookings = await getBookings();

	return (
		<div className="h-screen bg-green-50 p-2 flex flex-col items-center">
			<div className="w-full flex justify-center items-center my-5">
				<button className="mr-auto cursor-pointer">
					<Link href={`/`}>Back</Link>
				</button>
				<h2 className="text-center mr-auto">Bookings List</h2>
			</div>
			<ul className="w-1/2 flex items-start gap-3 mb-auto">
				{bookings.map((post: any, i: number) => (
					<li
						key={post.uuid || i}
						className="rounded-sm p-3 border shadow w-1/4 flex flex-col"
					>
						<p>{post.job_description || '--'}</p>
						<button className="mt-5 border px-2 py-1 cursor-pointer">
							<Link href={`/bookings/${post.uuid}`}>See Details</Link>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
