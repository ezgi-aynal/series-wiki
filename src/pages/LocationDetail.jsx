import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLocationById, fetchMultipleCharacters } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        setLoading(true);
        const locationData = await fetchLocationById(id);
        setLocation(locationData);

        if (locationData.residents.length > 0) {
          const residentUrls = locationData.residents.slice(0, 12);
          const residentsData = await fetchMultipleCharacters(residentUrls);
          setResidents(residentsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLocation();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!location) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <Link
          to="/locations"
          className="text-green-500 hover:text-green-600 dark:hover:text-green-400 mb-6 inline-block transition"
        >
          ← Back to Locations
        </Link>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-gray-900/40 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            {location.name}
          </h1>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Type
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {location.type}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Dimension
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {location.dimension}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Residents
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {location.residents.length} residents
              </p>
            </div>
          </div>
        </div>

        {/* Residents */}
        {residents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Residents
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {residents.map((resident) => (
                <Link key={resident.id} to={`/characters/${resident.id}`}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-gray-900/40 overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={resident.image}
                      alt={resident.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-center font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">
                        {resident.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {location.residents.length > 12 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                Showing first 12 of {location.residents.length} residents
              </p>
            )}
          </div>
        )}

        {residents.length === 0 && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded">
            No known residents for this location.
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationDetail;
