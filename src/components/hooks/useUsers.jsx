import { useState } from "react";
import { fetchUsersService } from "../../services/staff";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await fetchUsersService();
    setLoading(false);
    if (result.success) {
      setUsers(result.users.data);
    } else {
      setErrors(result.errors);
    }
  };

  return { users, errors, loading, fetchUsers };
}
