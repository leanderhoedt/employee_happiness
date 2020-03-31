/**
 * Handle JWT token
 * Even though it's discouraged to save JWT token in cookies for XSS attack, it's just for demo purposes :)
 */
import Cookies from "universal-cookie"

class TokenService {
    saveToken(token) {
        const cookies = new Cookies();
        cookies.set("token", token, { path: "/" });
        return Promise.resolve();
    }

    getToken() {
        const cookies = new Cookies();
        return cookies.get("token");
    }
}

export default TokenService