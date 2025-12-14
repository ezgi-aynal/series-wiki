import { Link } from 'react-router-dom';

function EpisodeCard({ episode }) {
  return (
    <Link to={`/episodes/${episode.id}`}>
      <div className="
        bg-white dark:bg-gray-800
        rounded-lg shadow-md dark:shadow-gray-900/40
        p-6 hover:shadow-xl transition-shadow duration-300
        cursor-pointer
      ">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {episode.name}
          </h3>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {episode.episode}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Air Date:</span> {episode.air_date}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {episode.characters.length} characters
        </p>
      </div>
    </Link>
  );
}

export default EpisodeCard;
