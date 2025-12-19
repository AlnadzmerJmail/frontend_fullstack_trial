import { apiFetch } from './client';
import { BookingI, BookingAttachmentI } from '@/types/booking';

export const getBookings = () => {
	return apiFetch<BookingI[]>('/bookings', {
		method: 'GET',
		auth: true,
	});
};

export const getBookingAttachments = (id: string) => {
	return apiFetch<BookingAttachmentI[]>(`/booking/attachment/${id}`, {
		method: 'GET',
		auth: true,
	});
};

export const getBookingAttachmentFile = (id: string, contentType: string) => {
	return apiFetch<string>(`/booking/attachment/file/${id}/${contentType}`, {
		method: 'GET',
		auth: true,
	});
};
