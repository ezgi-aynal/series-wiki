import { Link } from 'react-router-dom';

function LocationCard({ location }) {
  return (
    <Link to={`/locations/${location.id}`}>
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-lg shadow-md dark:shadow-gray-900/40
          p-6 hover:shadow-xl transition-shadow duration-300
          cursor-pointer
        "
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {location.name}
        </h3>

        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Type:</span> {location.type}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Dimension:</span> {location.dimension}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {location.residents.length} residents
          </p>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
