export interface Location {
	id: number;
	name: string;
	country: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	createdAt: string;
	updatedAt: string;
}
