import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="fixed bottom-0 bg-black flex justify-around w-full p-10 items-left h-auto">
      <NavLink to="/Boote">Boote</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Reservierungen">Reservieren</NavLink>
    </aside>
  );
};

export default Aside;
