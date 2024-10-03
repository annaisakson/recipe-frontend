import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Green Plate
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/recipes">Recipes</NavItem>
              <NavItem to="/add-recipe">Add Recipe</NavItem>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150 ease-in-out ${
          isActive
            ? "border-primary text-primary"
            : "border-transparent text-gray-300 hover:border-primary hover:text-primary"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
