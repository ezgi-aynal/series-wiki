import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function CharacterCard({ character }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    favorite ? removeFavorite(character.id) : addFavorite(character);
  };

  return (
    <div className="relative">
      <Link to={`/characters/${character.id}`}>
        <div className="bg-violet-200/80 dark:bg-violet-900/50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-violet-300/60 dark:border-violet-200/10">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-4">
            <h3 className="text-xl font-bold text-violet-900 dark:text-violet-100 mb-2">
              {character.name}
            </h3>

            <div className="flex items-center mb-2">
              <span className={`w-3 h-3 rounded-full ${statusColor[character.status]} mr-2`} />
              <span className="text-violet-900/80 dark:text-violet-200/80">
                {character.status} - {character.species}
              </span>
            </div>

            <p className="text-violet-900/70 dark:text-violet-200/70 text-sm">
              <span className="font-semibold">Last known location:</span><br />
              {character.location.name}
            </p>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 p-2 bg-violet-100/90 dark:bg-violet-800/60 rounded-full shadow-lg hover:scale-110 transition-transform z-10 border border-violet-300/60 dark:border-violet-200/10"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? (
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-violet-800/70 dark:text-violet-200/70"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default CharacterCard;
