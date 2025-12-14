import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEpisodeById, fetchMultipleCharacters } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        setLoading(true);
        const episodeData = await fetchEpisodeById(id);
        setEpisode(episodeData);

        const characterUrls = episodeData.characters.slice(0, 10);
        const charactersData = await fetchMultipleCharacters(characterUrls);
        setCharacters(charactersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisode();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!episode) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <Link
          to="/episodes"
          className="text-green-500 hover:text-green-600 dark:hover:text-green-400 mb-6 inline-block transition"
        >
          ← Back to Episodes
        </Link>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-gray-900/40 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {episode.name}
            </h1>
            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
              {episode.episode}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Air Date
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {episode.air_date}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Characters
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {episode.characters.length} characters appeared
              </p>
            </div>
          </div>
        </div>

        {/* Characters in Episode */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Characters in this Episode
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {characters.map((character) => (
              <Link key={character.id} to={`/characters/${character.id}`}>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-gray-900/40 overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-center font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {character.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {episode.characters.length > 10 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              Showing first 10 of {episode.characters.length} characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
