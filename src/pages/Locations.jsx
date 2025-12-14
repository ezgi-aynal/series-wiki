import { useState, useEffect } from 'react';
import { fetchLocations } from '../services/api';
import LocationCard from '../components/LocationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null);

  const loadLocations = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLocations(pageNum);
      setLocations(data.results);
      setInfo(data.info);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadLocations()} />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
     <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Locations</h1>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* Pagination */}
        {info && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => loadLocations(page - 1)}
              disabled={!info.prev}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Previous
            </button>
            <span className="py-2 px-4 bg-white rounded-lg font-semibold">
              Page {page} of {info.pages}
            </span>
            <button
              onClick={() => loadLocations(page + 1)}
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

export default Locations;