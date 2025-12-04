import { IUser } from "@/models/User";

const Home = async () => {
  const data = await fetch("http://localhost:3000/api/vnexpress/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await data.json();
  console.log("users", users);
  return (
    <div>
      {users.data.map((user: IUser) => (
        <p key={user.user_id}>{user.name}</p>
      ))}
    </div>
  );
};

export default Home;
