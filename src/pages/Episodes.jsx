import { useState, useEffect } from 'react';
import { fetchEpisodes } from '../services/api';
import EpisodeCard from '../components/EpisodeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null);

  const loadEpisodes = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEpisodes(pageNum);
      setEpisodes(data.results);
      setInfo(data.info);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEpisodes();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadEpisodes()} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Episodes</h1>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>

        {/* Pagination */}
        {info && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => loadEpisodes(page - 1)}
              disabled={!info.prev}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Previous
            </button>

            <span className="py-2 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-semibold">
              Page {page} of {info.pages}
            </span>

            <button
              onClick={() => loadEpisodes(page + 1)}
              disabled={!info.next}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Episodes;
