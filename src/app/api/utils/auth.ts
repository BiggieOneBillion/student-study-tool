// import crypto from "crypto"

// const COOKIE_SECRET =
//   process.env.NEXT_PUBLIC_COOKIE_SECRET || "your-secure-secret";

// // Function to create a signed cookie
// export function signCookie(value: string) {
//   const hmac = crypto.createHmac("sha256", COOKIE_SECRET);
//   hmac.update(value);
//   const signature = hmac.digest("hex");
//   return `${value}.${signature}`;
// }

// // Function to verify a signed cookie
// export function verifyCookie(cookie: { name: string; value: string }) {
//   console.log(cookie);

//   const [value, signature] = cookie.value.split(".");
//   const hmac = crypto.createHmac("sha256", COOKIE_SECRET);
//   hmac.update(value);
//   const expectedSignature = hmac.digest("hex");

//   return signature === expectedSignature ? value : null;
// }
import { jwtVerify, SignJWT } from "jose";

// Secret key for signing (must be at least 32 characters long)
const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_COOKIE_SECRET || "your-secure-secret",
);

// Generate a JWT
import { JWTPayload } from "jose";

export async function generateToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h") // Token expires in 1 hour
    .sign(SECRET_KEY);
}

// Verify a JWT
export async function verifyToken(token: string): Promise<object | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
