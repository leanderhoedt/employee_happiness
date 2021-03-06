/**
 * Handle JWT token
 * Even though it's discouraged to save JWT token in cookies for XSS attack, it's just for demo purposes :)
 */
import Cookies from "universal-cookie"
import nextCookies from "next-cookies"

const cookies = new Cookies();

class TokenService {
    saveToken(token) {
        cookies.set("token", token, {path: "/"});
        return Promise.resolve();
    }

    getToken(ctx) {
        if (ctx && ctx.req) {
            const {token} = nextCookies(ctx);
            return token;
        }
        return cookies.get("token");
    }

    removeToken() {
        return cookies.remove('token');
    }
}

export default TokenService