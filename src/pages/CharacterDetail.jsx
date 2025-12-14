import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterById } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!character) return null;

  const statusColor = {
    Alive: 'text-green-500',
    Dead: 'text-red-500',
    unknown: 'text-gray-500 dark:text-gray-400',
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <Link
          to="/characters"
          className="text-green-500 hover:text-green-600 dark:hover:text-green-400 mb-6 inline-block transition"
        >
          ← Back to Characters
        </Link>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-gray-900/40 overflow-hidden transition-colors">
          <div className="md:flex">
            {/* Character Image */}
            <div className="md:w-1/3">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Character Info */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {character.name}
              </h1>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </h3>
                  <p className={`text-xl ${statusColor[character.status] || 'text-gray-600 dark:text-gray-300'}`}>
                    {character.status}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Species
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-200">
                    {character.species}
                  </p>
                </div>

                {character.type && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Type
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-200">
                      {character.type}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Gender
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-200">
                    {character.gender}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Origin
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-200">
                    {character.origin.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Last Known Location
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-200">
                    {character.location.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Episodes
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-200">
                    Appeared in {character.episode.length} episodes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CharacterDetail;
