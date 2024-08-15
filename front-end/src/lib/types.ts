// Define the possible user roles
export enum UserRole {
	SELLER = "seller",
	BUYER = "buyer",
}

// Define the User interface
export interface User {
	id: number;
	name: string;
	email: string;
	passwordHash: string;
	address?: string;
	phone_number?: string;
	role: UserRole;
	profile_picture_url?: string;
	farm_location?: string;
	farm_name?: string;
	bio?: string;
}
