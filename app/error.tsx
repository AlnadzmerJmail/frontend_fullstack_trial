'use client';
export default function Error() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<p className="border text-center border-red-500 text-red-500 px-2 py-1">
				Internal Server Error
			</p>
		</div>
	);
}
