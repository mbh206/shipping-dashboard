export interface Billing {
	id: number;
	amount: number;
	date: string;
	type: string;
	from: number; // Partner or Customer ID
	to: number; // Partner or Customer ID
	description: string;
	shipmentId: number;
	createdAt: string;
	updatedAt: string;
}
