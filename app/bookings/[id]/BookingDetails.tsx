'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { BookingAttachmentI } from '@/types';
import {
	getBookingAttachments,
	getBookingAttachmentFile,
} from '@/app/lib/api/booking';

import Image from 'next/image';

export default function BookingDetails() {
	const { id } = useParams();
	const router = useRouter();
	const [attachments, setAttachments] = useState<BookingAttachmentI[]>([]);
	const [attachmentDetails, setAttachmentDetails] = useState<
		BookingAttachmentI[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) return;

		const fetchAttachments = async () => {
			setIsLoading(true);
			try {
				const attachments: BookingAttachmentI[] = await getBookingAttachments(
					`${id}`
				);
				setAttachments(attachments);
				for (const attachment of attachments) {
					const { file_type } = attachment;
					if (isImage(file_type) || file_type === '.pdf') {
						const contentType = `${file_type.slice(1)}`;
						try {
							const url = await getBookingAttachmentFile(
								attachment.uuid,
								contentType
							);

							if (!url) continue;

							setAttachmentDetails(
								(prev) =>
									[
										...prev,
										{
											uuid: attachment.uuid,
											file_url: url,
											file_type,
										},
									] as Array<BookingAttachmentI>
							);
						} catch (error) {
							setError('Error: Fetch attachment file went error');
						}
					}
				}
			} catch (error) {
				setError('Error: Fetch attachment went error');
			}
			setIsLoading(false);
		};
		fetchAttachments();
	}, [id]);

	const isImage = (fileType: string): boolean => {
		const imgTypes = ['.jpeg', '.jpg', '.png'];
		return imgTypes.some((t) => t === fileType.toLowerCase());
	};

	const hasFile = (id: string): boolean =>
		attachmentDetails.some((d) => d.uuid === id);

	const getFileSource = (id: string): string =>
		attachmentDetails.find((d) => d.uuid === id)?.file_url || '';

	const handleBack = () => router.back();

	if (error || isLoading) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				{error ? (
					<p className="border text-center border-red-500 text-red-500 px-2 py-1">
						{error}
					</p>
				) : (
					<p className="border text-center border-green-500 text-green-500 px-2 py-1">
						Loading...
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="flex justify-center flex-wrap">
			<div className="w-full gap-5 flex justify-center">
				<button className="mr-auto cursor-pointer" onClick={handleBack}>
					Back
				</button>
				<h2 className="text-center my-5 mr-auto">
					{attachmentDetails.length ? 'Booking Details' : 'No Attachment found'}
				</h2>
			</div>
			<ul className="w-1/2 flex items-start gap-3 min-h-screen">
				{attachments.map((attachment: any, i: number) =>
					isImage(attachment.file_type) || attachment.file_type === '.pdf' ? (
						<li
							key={attachment.uuid || i}
							className={`border rounded-sm p-3 flex flex-col ${
								attachment.file_type === '.pdf' ? 'w-full h-full' : 'w-1/4'
							}`}
						>
							{hasFile(attachment.uuid) ? (
								attachment.file_type === '.pdf' ? (
									<iframe
										src={getFileSource(attachment.uuid)}
										width="100%"
										height="100%"
										title="PDF Attachment"
									/>
								) : (
									<Image
										className="dark:invert"
										src={getFileSource(attachment.uuid)}
										alt="attachment"
										width={100}
										height={20}
										priority
									/>
								)
							) : null}
							<p>{attachment.attachment_name || '--'}</p>
						</li>
					) : null
				)}
			</ul>
		</div>
	);
}
