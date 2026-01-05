import { Outlet } from "react-router";
import authImg from "../assets/ai (1).png";
import EzzParcelLogo from "../Pages/Shared/EzzParcelLogo/EzzParcelLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen p-2">
      {/* <div className="flex justify-center lg:justify-start">
        <EzzParcelLogo></EzzParcelLogo>
      </div> */}
      <div className=" hero-content flex-col flex-1 lg:flex-row-reverse">
        <img
          src={authImg}
          className="hidden lg:block max-w-sm rounded-lg shadow-2xl flex-1"
        />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
