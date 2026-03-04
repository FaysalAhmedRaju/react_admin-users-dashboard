import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as usersApi from "../api/usersApi";
import type { User } from "../types/user";
import { UsersPage } from "./UsersPage";

vi.mock("../api/usersApi", () => ({
    fetchUsers: vi.fn()
}));

const mockedFetchUsers = vi.mocked(usersApi.fetchUsers);

const mockUsers: User[] = [
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
        createdAt: "2025-01-03T00:00:00.000Z"
    }
];

describe("UsersPage", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.resetAllMocks();
    });

    it("renders users and filters by role", async () => {
        mockedFetchUsers.mockResolvedValue(mockUsers);

        render(
            <MemoryRouter>
                <UsersPage />
            </MemoryRouter>
        );

        expect(await screen.findByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText("Role"), "admin");

        await waitFor(() => {
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.queryByText("Bob")).not.toBeInTheDocument();
        });
    });
});
