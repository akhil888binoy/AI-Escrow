import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isMobile = window.innerWidth <= 768; // Define mobile condition

  return (
    <header className="header bg-black flex justify-between items-center p-4">
  <nav className="flex font-cinzel text-lg gap-7 text-white">
    <NavLink to={"/"} className="hover:text-yellow-400">
      Home
    </NavLink>
  </nav>

  <nav className="flex font-cinzel text-lg gap-7 text-white">
    <NavLink to={"/escrow"} className="hover:text-yellow-400">
      Escrow
    </NavLink>
    <NavLink to={"/court"} className="hover:text-yellow-400">
      AI Court
    </NavLink>

    <a href="https://github.com/akhil888binoy" target="_blank" rel="noopener noreferrer" className="text-white font-cinzel hover:text-yellow-400">
      Github link
    </a>
  </nav>
</header>

  );
}

export default Navbar;