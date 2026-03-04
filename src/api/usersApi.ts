import type { User, UserRole, UserStatus } from "../types/user";

interface ApiUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
}

const roles: UserRole[] = ["admin", "manager", "user"];

const roleById = (id: number): UserRole => roles[id % roles.length];
const statusById = (id: number): UserStatus => (id % 2 === 0 ? "inactive" : "active");
const createdAtById = (id: number): string => {
    const base = Date.UTC(2025, 0, 1);
    return new Date(base + id * 86400000).toISOString();
};

export async function fetchUsers(): Promise<User[]> {
    console.log("🚀 fetchUsers() called");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log("📡 API Response status:", res.status);
    if (!res.ok) throw new Error("Failed to fetch users");

    const data = (await res.json()) as ApiUser[];
    console.log("📦 Raw API data:", data);
    return data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        company: u.company?.name ?? "N/A",
        phone: u.phone,
        website: u.website,
        role: roleById(u.id),
        status: statusById(u.id),
        createdAt: createdAtById(u.id)
    }));
}
