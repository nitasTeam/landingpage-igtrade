import { Link } from "react-router";

export const Logo = ({ isWhite = false }: { isWhite?: boolean }) => {
  return (
    <Link to="/">
      <img
        src={isWhite ? "/infinity-globalindo-white-logo.svg" : "/infinity-globalindo-logo.svg"}
        alt="Infinity Globalindo"
        className="h-10 w-auto"
      />
    </Link>
  );
};

