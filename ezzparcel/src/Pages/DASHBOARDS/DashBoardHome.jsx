import useUserRole from "../../hooks/useUserRole";
import AdminDashBoard from "./AdminDashBoard";
import RiderDashBoard from "./RiderDashBoard";
import UserDashBoard from "./UserDashBoard";

const DashBoardHome = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render dashboard based on user role
  if (role === "admin") {
    return <AdminDashBoard></AdminDashBoard>;
  }
  if (role === "rider") {
    return <RiderDashBoard></RiderDashBoard>;
  }

  // Default to UserDashBoard if role is 'user' or not defined yet
  if (role === "user" || !role) {
    return <UserDashBoard></UserDashBoard>;
  }
};

export default DashBoardHome;
