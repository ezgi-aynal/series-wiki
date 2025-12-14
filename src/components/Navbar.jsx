import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { favorites } = useFavorites();

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 text-white shadow-lg transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-green-400">
            Rick & Morty Wiki
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/characters"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition"
                }
              >
                Characters
              </NavLink>
              <NavLink
                to="/episodes"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition"
                }
              >
                Episodes
              </NavLink>
              <NavLink
                to="/locations"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition"
                }
              >
                Locations
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition"
                }
              >
                Favorites {favorites.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;