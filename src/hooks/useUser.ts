import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const { data } = await axios.get("/api/user");
  return data.user;
};

export const useUser = () => {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  return {
    userQuery,
  };
};
