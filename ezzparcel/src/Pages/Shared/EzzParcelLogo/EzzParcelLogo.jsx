import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const EzzParcelLogo = () => {
  return (
    <Link to="">
      <div>
        <img className="h-[65px] w-auto" src={logo} alt="" />
      </div>
    </Link>
  );
};

export default EzzParcelLogo;
