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
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <Link
          to="/characters"
          className="text-violet-200 hover:text-violet-100 dark:text-violet-300 dark:hover:text-violet-200 mb-6 inline-block transition font-semibold"
        >
          ← Back to Characters
        </Link>

        <div className="bg-violet-200/80 dark:bg-violet-900/50 border border-violet-300/60 dark:border-violet-200/10 rounded-xl shadow-xl shadow-black/10 overflow-hidden transition-colors">
          <div className="md:flex">
            {/* Character Image */}
            <div className="md:w-1/3 bg-violet-300/40 dark:bg-violet-800/40">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Character Info */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-4xl font-bold text-violet-900 dark:text-violet-100 mb-4">
                {character.name}
              </h1>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Status
                  </h3>
                  <p className={`text-xl ${statusColor[character.status] || 'text-violet-900/80 dark:text-violet-200/80'}`}>
                    {character.status}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Species
                  </h3>
                  <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                    {character.species}
                  </p>
                </div>

                {character.type && (
                  <div>
                    <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                      Type
                    </h3>
                    <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                      {character.type}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Gender
                  </h3>
                  <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                    {character.gender}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Origin
                  </h3>
                  <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                    {character.origin.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Last Known Location
                  </h3>
                  <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                    {character.location.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                    Episodes
                  </h3>
                  <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
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
