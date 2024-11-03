import nookies from 'nookies';

export const tryLogin = async (email: string, password: string, setLoggingIn: (value: boolean) => void) => {
    setLoggingIn(true);

    try {
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await res.json();

        if (json.token) {
            nookies.set(null, 'authToken', json.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            console.log("Token saved in cookie:", json.token);
            alert("Logged in");
        } else {
            alert("Login failed: No token received.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error logging in.");
    } finally {
        setLoggingIn(false);

    }
};
