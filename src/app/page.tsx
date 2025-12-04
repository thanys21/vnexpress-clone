"use client";

import { useState, useEffect, use } from "react";
import { IUser } from "@/models/User";
import Loading from "./loading";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<[number, number]>([1, 10]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [removeUserId, setRemoveUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/vnexpress/users?page=${pagination[0]}&limit=${pagination[1]}${
          search ? `&search=${search}` : ""
        }`
      );
      const data = await res.json();
      setUsers(data.data);
      setLoading(false);
    };

    fetchUsers();
  }, [pagination, search]);

  const createUser = async () => {
    const res = await fetch("/api/vnexpress/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New User",
        email: "",
        account: `user${Date.now()}`,
        password: "password123",
      }),
    });
    const data = await res.json();
    console.log("Created User:", data);
  };

  const removeUser = async (user_id: number) => {
    const res = await fetch("/api/vnexpress/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    const data = await res.json();
    console.log("Removed User:", data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPagination([1, pagination[1]]);
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        users.map((user) => <p key={user.user_id}>{user.name}</p>)
      )}
      <button onClick={() => setPagination([pagination[0] + 1, pagination[1]])}>
        Next Page
      </button>

      <button onClick={() => createUser()}>Create Temp User</button>

      <input
        type="number"
        placeholder="User ID to remove"
        value={removeUserId || ""}
        onChange={(e) => setRemoveUserId(Number(e.target.value))}
      />
      <button onClick={() => removeUser(removeUserId || 0)}>
        Remove Temp User
      </button>
    </div>
  );
}
