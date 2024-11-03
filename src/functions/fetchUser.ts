import { User } from '@/payload-types';
import nookies from 'nookies';

type Response = {
    collection: string
    exp: number
    message: string
    strategy: string
    token: string
    user: User
}

export const fetchUser = async (): Promise<Response | undefined> => {
    const cookies = nookies.get();
    const token = cookies.authToken;

    if (!token) {
        return undefined;
    }

    try {
        const res = await fetch(`/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user data.");
        }

        const user = await res.json();
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return undefined;
    }
};
