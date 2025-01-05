export interface Shipment {
	id: number;
	shipmentNumber: string;
	contents: string;
	quantity: string;
	departureDate: string;
	arrivalDate: string;
	status: string;
	itinerary: number[]; // Array of Port IDs
	departurePortId: number;
	arrivalPortId: number;
	mainContactId: number;
	customerId: number;
	billingId: number;
	createdAt: string;
	updatedAt: string;
}
