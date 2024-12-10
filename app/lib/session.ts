import { compare, hash } from "bcryptjs";

const SALT_ROUND = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUND);
}

export async function comparePassword(plainTextPassword: string, hashedPassword: string) {
  return compare(plainTextPassword, hashedPassword);
}
