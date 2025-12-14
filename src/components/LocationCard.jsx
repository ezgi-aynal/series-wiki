import { Link } from 'react-router-dom';

function LocationCard({ location }) {
  return (
    <Link to={`/locations/${location.id}`}>
      <div
        className="
          bg-violet-200/80 dark:bg-violet-900/50
          rounded-lg
          shadow-md shadow-black/10
          p-6
          hover:shadow-xl
          transition-shadow duration-300
          cursor-pointer
          border border-violet-300/60 dark:border-violet-200/10
        "
      >
        <h3 className="text-xl font-bold text-violet-900 dark:text-violet-100 mb-3">
          {location.name}
        </h3>

        <div className="space-y-2">
          <p className="text-violet-900/80 dark:text-violet-200/80">
            <span className="font-semibold">Type:</span> {location.type}
          </p>

          <p className="text-violet-900/80 dark:text-violet-200/80">
            <span className="font-semibold">Dimension:</span> {location.dimension}
          </p>

          <p className="text-violet-900/70 dark:text-violet-200/70 text-sm">
            {location.residents.length} residents
          </p>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
