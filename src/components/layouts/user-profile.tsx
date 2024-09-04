import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
  }

export default function UserProfile() {
  const { userId, getToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);;

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const token = await getToken();
        const res = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
