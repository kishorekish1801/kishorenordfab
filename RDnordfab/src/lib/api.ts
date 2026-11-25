/**
 * Small API client used when the NestJS backend is connected.
 * Until then, pages read from src/data/products.ts for the visual prototype.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "Request failed");
    throw new Error(`API ${response.status}: ${message || response.statusText}`);
  }

  return response.json() as Promise<T>;
}
