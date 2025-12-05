'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Image from 'next/image';

export default function page() {
	const { id } = useParams();
	const [attachments, setAttachments] = useState([]);
	const [attachmentDetails, setAttachmentDetails] = useState<
		{
			attachmentId: string;
			fileUrl: string;
			fileType: 'image' | 'pdf';
		}[]
	>([]);

	useEffect(() => {
		if (!id) return;

		const fetchAttachments = async () => {
			const response = await fetch(
				`http://localhost:5000/booking/attachment/${id}`,
				{
					method: 'GET',
				}
			);
			const attachments = await response.json();

			for (const attachment of attachments) {
				console.log(attachment);
				const { file_type } = attachment;
				if (isImage(file_type) || file_type === '.pdf') {
					// return console.log('image-->>', attachment.file_type.slice(1));
					const contentType = `${file_type.slice(1)}`;
					async function fetchFile() {
						const res = await fetch(
							`http://localhost:5000/booking/attachment/file/${attachment.uuid}/${contentType}`
						);
						const blob = await res.blob();
						const url = URL.createObjectURL(blob);

						if (url) {
							setAttachmentDetails((prev) => [
								...prev,
								{
									attachmentId: attachment.uuid,
									fileUrl: url,
									fileType: file_type === '.pdf' ? 'pdf' : 'image',
								},
							]);
						}
					}
					fetchFile();
				}
			}
			setAttachments(attachments);
		};
		fetchAttachments();
	}, [id]);

	const isImage = (fileType: string): boolean => {
		const imgTypes = ['.jpeg', '.jpg', '.png'];
		return imgTypes.some((t) => t === fileType.toLowerCase());
	};

	const hasFile = (id: string): boolean =>
		attachmentDetails.some((d) => d.attachmentId === id);

	const getFileSource = (id: string): string =>
		attachmentDetails.find((d) => d.attachmentId === id)?.fileUrl || '';

	return (
		<div className="flex justify-center flex-wrap">
			<h2 className="w-full text-center my-5">
				{attachmentDetails.length ? 'Booking Details' : 'No Attachment found'}
			</h2>
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
