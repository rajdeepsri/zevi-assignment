import logo from "../assets/logo.svg";
import "./HomeHeader.scss";
const HomeHeader = () => {
  return (
    <div className="home_header">
      <img src={logo} alt="" />
    </div>
  );
};

export default HomeHeader;
