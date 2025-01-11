import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

const SALT_ROUND = 10;

type SessionData = {
  user: { id: string };
  expires: string;
};

interface User {
  id: string;
  email: string;
  password: string | null;
  image: string | null;
  role: Role | null;
}

type UploadPayload = {
  uploadPayload: {
    fileName: string;
    useUniqueFileName: string;
    tags: string;
  };
  expire: number;
  publicKey: string;
};

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUND);
}

export async function comparePassword(plainTextPassword: string, hashedPassword: string) {
  return compare(plainTextPassword, hashedPassword);
}

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload as SessionData;
}

export async function getSession() {
  const session = (await cookies()).get("estatesession")?.value;
  if (!session) return null;
  return await verifyToken(session);
}

export async function setSession(user: User) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const session: SessionData = {
    user: { id: user.id! },
    expires: expiresInOneDay.toISOString(),
  };

  const encryptedSession = await signToken(session);

  await cookies().set("estatesession", encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function getImageKitToken(
  privateKey: string,
  publicKey: string,
  payload: UploadPayload
) {
  const privatekey = new TextEncoder().encode(privateKey);

  return await new SignJWT(payload.uploadPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
      kid: publicKey,
    })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(privatekey);
}
