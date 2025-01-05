export interface Order {
	customerId: number;
	id: number;
	quotationId: number;
	userId: number;
	paymentMethod: string; // e.g., "Credit Card"
	paymentStatus: string; // e.g., "Completed", "Pending"
	orderStatus: string; // e.g., "Confirmed", "In Transit", "Delivered"
	trackingNumber: string;
	carrier: string; // e.g., "FedEx"
	createdAt: string;
	updatedAt: string;
}
