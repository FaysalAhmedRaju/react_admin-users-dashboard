import { describe, expect, it } from "vitest";
import type { User } from "../types/user";
import { filterUsers, sortUsers } from "./userFilters";

const users: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        company: "A Co",
        phone: "1",
        website: "a.dev",
        role: "admin",
        status: "active",
        createdAt: "2025-01-02T00:00:00.000Z"
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        company: "B Co",
        phone: "2",
        website: "b.dev",
        role: "user",
        status: "inactive",
        createdAt: "2025-01-04T00:00:00.000Z"
    }
];

describe("userFilters", () => {
    it("filters by search + role + status", () => {
        const result = filterUsers(users, "ali", "admin", "active");
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Alice");
    });

    it("sorts by created date desc", () => {
        const result = sortUsers(users, "created_desc");
        expect(result[0].name).toBe("Bob");
    });
});
