import React from 'react';
import Link from 'next/link';

export default async function page() {
	const data = await fetch('http://localhost:5000/bookings');
	const bookings = await data.json();
	return (
		<div className="bg-green-50 p-2 flex justify-center flex-wrap">
			<h2 className="w-full text-center mb-5">Bookings!</h2>
			<ul className="w-1/2 flex items-start gap-3">
				{bookings.map((post: any, i: number) => (
					<li
						key={post.uuid || i}
						className="rounded-sm p-3 border shadow w-1/4 flex flex-col"
					>
						<p>{post.job_description || 'Wala gago!'}</p>
						<button className="mt-5 border px-2 py-1 cursor-pointer">
							<Link href={`/bookings/${post.uuid}`}>See Details</Link>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
