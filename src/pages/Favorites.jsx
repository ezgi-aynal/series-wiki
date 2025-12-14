import { useFavorites } from "../context/FavoritesContext";
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          My Favorite Characters
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 mx-auto text-white/70 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            <h2 className="text-2xl font-semibold text-white mb-2">
              No Favorites Yet
            </h2>
            <p className="text-white/80 mb-6">
              Start adding characters to your favorites by clicking the heart icon!
            </p>

            <Link
              to="/characters"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Browse Characters
            </Link>
          </div>
        ) : (
          <>
            <p className="text-white/80 mb-6">
              You have {favorites.length} favorite character
              {favorites.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
