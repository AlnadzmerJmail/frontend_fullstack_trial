export interface BookingI {
	uuid: string;
	date: string;
	status: string;
	job_description: string;
}
export interface BookingAttachmentI {
	uuid: string;
	date: string;
	file_url?: string;
	file_type: '.pdf' | '.jpeg' | '.jpg' | '.png';
}
