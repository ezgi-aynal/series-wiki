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
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <Link
          to="/episodes"
          className="text-white hover:text-white/80 mb-6 inline-block transition font-semibold">
          ← Back to Episodes
        </Link>

        {/* Episode Info Card */}
        <div className="bg-violet-200/80 dark:bg-violet-900/50 border border-violet-300/60 dark:border-violet-200/10 rounded-xl shadow-xl shadow-black/10 p-8 mb-8">
          <div className="flex justify-between items-start mb-6 gap-4">
            <h1 className="text-4xl font-bold text-violet-900 dark:text-violet-100">
              {episode.name}
            </h1>
            <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-lg font-semibold whitespace-nowrap">
              {episode.episode}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                Air Date
              </h3>
              <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                {episode.air_date}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                Total Characters
              </h3>
              <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                {episode.characters.length} characters appeared
              </p>
            </div>
          </div>
        </div>

        {/* Characters in Episode */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Characters in this Episode
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {characters.map((character) => (
              <Link key={character.id} to={`/characters/${character.id}`}>
                <div className="bg-violet-200/80 dark:bg-violet-900/50 border border-violet-300/60 dark:border-violet-200/10 rounded-lg shadow-md shadow-black/10 overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-center font-semibold text-violet-900 dark:text-violet-100 truncate">
                      {character.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {episode.characters.length > 10 && (
            <p className="text-center text-violet-100/90 dark:text-violet-200/80 mt-4">
              Showing first 10 of {episode.characters.length} characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
