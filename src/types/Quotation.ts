export interface Quotation {
	customerId: any;
	id: number;
	userId: number;
	customerName: string;
	customerEmail: string;
	originPortId: number;
	destinationPortId: number;
	goodsType: string;
	weight: number; // in kilograms
	dimensions: string; // e.g., "2m x 1.5m x 1m"
	serviceType: string; // e.g., "Express"
	estimatedCost: number; // in USD
	createdAt: string;
	updatedAt: string;
}
