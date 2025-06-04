import { Link } from "react-router-dom";
import TirupatiLeftSideBarNav from "./TirupatiLeftSideBarNav";

const TirupatiMenuLayout = ({ children }) => {
  return (
    <div className="h-[100dvh] w-[100dvw]">
      <Link
        to={"/"}
        className="fixed top-4 left-4 bg-raisinBlack w-15px h-fit z-[99] py-1.5 px-3 rounded-lg text-golden transition-all hover:scale-105 hover:shadow-goldenShadow"
      >
        Back to world
      </Link>
      <TirupatiLeftSideBarNav />
      {children}
    </div>
  );
};

export default TirupatiMenuLayout;
