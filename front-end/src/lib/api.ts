import { useNavigate } from "react-router-dom";
export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchCurrentUser = async () => {
	try {
		const response = await fetch(`${apiBaseUrl}/users/me`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching current user:", error);
		return null;
	}
};

export const logout = async () => {
	try {
		const response = await fetch(`${apiBaseUrl}/logout/`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to log out");
		}

		return true;
	} catch (error) {
		console.error("Error during logout:", error);
		return false;
	}
};
