import { Outlet } from "react-router-dom";
import { MipLogo } from "./components/layoutComponents";
import LogoImage from "../assets/images/mip-logo.png";

function DefaultLayout() {
  return (
    <div>
      <MipLogo src={LogoImage} />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
