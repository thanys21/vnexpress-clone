"use client";

import { useState, useEffect } from "react";
import { IUser } from "@/models/User";
import Loading from "./loading";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<[number, number]>([1, 10]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/vnexpress/users?page=${pagination[0]}&limit=${pagination[1]}`
      );
      const data = await res.json();
      setUsers(data.data);
      setLoading(false);
    };

    fetchUsers();
  }, [pagination]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        users.map((user) => <p key={user.user_id}>{user.name}</p>)
      )}
      <button onClick={() => setPagination([pagination[0] + 1, pagination[1]])}>
        Next Page
      </button>
    </div>
  );
}
