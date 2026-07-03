import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET || "dev-secret-change-me";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, secret);
}
