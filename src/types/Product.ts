export interface Product {
	arrivalPortId: number;
	id: number;
	product: string;
	weight: number; // in kilograms
	amount: number;
	shipmentId: number;
	arrivalPort: string;
	arrivalDate: string;
	destination: string;
	deliveryDate: string;
	createdAt: string;
	updatedAt: string;
}
