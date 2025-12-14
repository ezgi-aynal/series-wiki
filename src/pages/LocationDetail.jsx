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
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">

        {/* Back link – beyaz */}
        <Link
          to="/locations"
          className="text-white hover:text-white/80 mb-6 inline-block transition font-semibold"
        >
          ← Back to Locations
        </Link>

        {/* Location Info Card */}
        <div className="bg-violet-200/80 dark:bg-violet-900/50 border border-violet-300/60 dark:border-violet-200/10 rounded-xl shadow-xl shadow-black/10 p-8 mb-8">
          <h1 className="text-4xl font-bold text-violet-900 dark:text-violet-100 mb-6">
            {location.name}
          </h1>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                Type
              </h3>
              <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                {location.type}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                Dimension
              </h3>
              <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                {location.dimension}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-900/80 dark:text-violet-200/80">
                Total Residents
              </h3>
              <p className="text-xl text-violet-900/80 dark:text-violet-200/80">
                {location.residents.length} residents
              </p>
            </div>
          </div>
        </div>

        {/* Residents */}
        {residents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Residents
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {residents.map((resident) => (
                <Link key={resident.id} to={`/characters/${resident.id}`}>
                  <div className="bg-violet-200/80 dark:bg-violet-900/50 border border-violet-300/60 dark:border-violet-200/10 rounded-lg shadow-md shadow-black/10 overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={resident.image}
                      alt={resident.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-center font-semibold text-violet-900 dark:text-violet-100 text-sm truncate">
                        {resident.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {location.residents.length > 12 && (
              <p className="text-center text-violet-100/90 dark:text-violet-200/80 mt-4">
                Showing first 12 of {location.residents.length} residents
              </p>
            )}
          </div>
        )}

        {/* No residents */}
        {residents.length === 0 && (
          <div className="bg-violet-300/70 dark:bg-violet-800/50 border border-violet-400/60 dark:border-violet-300/20 text-violet-900 dark:text-violet-100 px-4 py-3 rounded-lg">
            No known residents for this location.
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationDetail;
