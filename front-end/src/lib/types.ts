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
	phoneNumber?: string;
	role: UserRole;
	profilePictureUrl?: string;
}
