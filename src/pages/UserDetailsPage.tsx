import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";
import { useUsers } from "../hooks/useUsers";
import type { UserRole, UserStatus } from "../types/user";

export function UserDetailsPage() {
    const { id } = useParams();
    const userId = Number(id);

    const { users, isLoading, error, reload, updateUser } = useUsers();
    const user = useMemo(() => users.find((u) => u.id === userId), [users, userId]);

    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<UserRole>("user");
    const [status, setStatus] = useState<UserStatus>("active");

    if (isLoading) return <Loading />;
    if (error) return <ErrorState message={error} onRetry={reload} />;
    if (!user) return <p>User not found.</p>;

    const openEdit = () => {
        setRole(user.role);
        setStatus(user.status);
        setIsOpen(true);
    };

    const saveEdit = () => {
        updateUser(user.id, { role, status });
        setIsOpen(false);
    };

    return (
        <section>
            <Link to="/users">Back to Users</Link>
            <h1>{user.name}</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>

            <button onClick={openEdit}>Edit Role & Status</button>

            {isOpen && (
                <Modal title="Edit user role and status" onClose={() => setIsOpen(false)}>
                    <h2>Edit User</h2>

                    <label htmlFor="edit-role">Role</label>
                    <select id="edit-role" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>

                    <label htmlFor="edit-status">Status</label>
                    <select
                        id="edit-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as UserStatus)}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div>
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </section>
    );
}
