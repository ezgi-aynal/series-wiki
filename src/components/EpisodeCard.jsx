import { Link } from 'react-router-dom';

function EpisodeCard({ episode }) {
  return (
    <Link to={`/episodes/${episode.id}`}>
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
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-violet-900 dark:text-violet-100">
            {episode.name}
          </h3>

          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {episode.episode}
          </span>
        </div>

        <p className="text-violet-900/80 dark:text-violet-200/80 mb-2">
          <span className="font-semibold">Air Date:</span> {episode.air_date}
        </p>

        <p className="text-violet-900/70 dark:text-violet-200/70 text-sm">
          {episode.characters.length} characters
        </p>
      </div>
    </Link>
  );
}

export default EpisodeCard;
