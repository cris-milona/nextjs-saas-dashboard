import type { User } from "@/types";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function isAdmin(role: User["role"] | null | undefined): boolean {
  return role === "admin";
}

export async function fetchUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/users/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return (await res.json()) as User;
  } catch {
    return null;
  }
}
