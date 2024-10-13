import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header bg-black flex justify-between items-center p-4">
      
      {/* Logo or Home link */}
      <nav className="flex font-cinzel text-sm md:text-lg gap-7 text-white">
        <NavLink to={"/"} className="hover:text-yellow-400">
          Home
        </NavLink>
      </nav>

      {/* Navigation links (Escrow, AI Court, Github) */}
      <nav className="flex font-cinzel text-sm md:text-lg gap-7 text-white">
        <NavLink to={"/escrow"} className="hover:text-yellow-400">
          Escrow
        </NavLink>
        <NavLink to={"/court"} className="hover:text-yellow-400">
          AI Court
        </NavLink>
        <a
          href="https://github.com/akhil888binoy/AI-Escrow.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400"
        >
          Github link
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
