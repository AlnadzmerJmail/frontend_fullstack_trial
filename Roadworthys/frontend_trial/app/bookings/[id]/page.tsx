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
				if (isImage(attachment.file_type)) {
					async function fetchFile() {
						const res = await fetch(
							`http://localhost:5000/booking/attachment/file/${attachment.uuid}`
						);
						const blob = await res.blob();
						const url = URL.createObjectURL(blob);

						if (url) {
							setAttachmentDetails((prev) => [
								...prev,
								{ attachmentId: attachment.uuid, fileUrl: url },
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
		const imgTypes = ['.jpeg', '.jpg', 'png'];
		return imgTypes.some((t) => t === fileType.toLowerCase());
	};

	return (
		<div>
			<h2 className="text-center my-5">Booking Details</h2>
			<ul className="w-1/2 flex items-start gap-3">
				{attachments.map((attachment: any, i: number) =>
					isImage(attachment.file_type) ? (
						<li
							key={attachment.uuid || i}
							className="rounded-sm p-3 border shadow w-1/4 flex flex-col"
						>
							{attachmentDetails.find((d) => d.attachmentId === attachment.uuid)
								?.fileUrl ? (
								<Image
									className="dark:invert"
									src={
										attachmentDetails.find(
											(d) => d.attachmentId === attachment.uuid
										)!.fileUrl
									}
									alt="attachment"
									width={100}
									height={20}
									priority
								/>
							) : null}
							<p>{attachment.attachment_name || '--'}</p>
						</li>
					) : null
				)}
			</ul>
		</div>
	);
}
