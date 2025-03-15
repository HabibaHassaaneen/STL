import { cookies } from "next/headers";

export async function getTokenFromCookies() {
  const cookieStore = await cookies(); // Await cookies() before using it
  return cookieStore.get("auth-token") || null;
}
