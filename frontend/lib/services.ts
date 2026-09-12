import { RegisterUser } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const userRegister = async (userData: RegisterUser) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};