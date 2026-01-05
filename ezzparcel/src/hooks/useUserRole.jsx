import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userRole,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return null;
      }
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
    enabled: !!user?.email, // Only run query if user email exists
  });

  return {
    role: userRole,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useUserRole;
