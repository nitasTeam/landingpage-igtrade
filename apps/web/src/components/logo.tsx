import { Link } from "react-router";

export const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/infinity-globalindo-logo.svg"
        alt="Infinity Globalindo"
        className="h-8 w-auto"
      />
    </Link>
  );
};

