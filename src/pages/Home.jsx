import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 transition-colors">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to Rick and Morty Wiki
          </h1>
          <p className="text-2xl mb-12 max-w-2xl mx-auto">
            Explore the interdimensional adventures of Rick Sanchez and his grandson Morty Smith
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-stretch">
          
          <Link to="/characters" className="group">
            <div className="bg-violet-200/80 dark:bg-violet-900/50 rounded-xl shadow-xl shadow-black/10 p-8 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-violet-300/60 dark:border-violet-200/10 h-full flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100 mb-3">
                  Characters
                </h2>
                <p className="text-violet-900/80 dark:text-violet-200/80 mb-4">
                  Discover over 800 characters from across the multiverse
                </p>
              </div>
              <span className="text-violet-900 dark:text-violet-200 font-semibold underline">
                Explore Characters →
              </span>
            </div>
          </Link>

          <Link to="/episodes" className="group">
            <div className="bg-violet-200/80 dark:bg-violet-900/50 rounded-xl shadow-xl shadow-black/10 p-8 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-violet-300/60 dark:border-violet-200/10 h-full flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">📺</div>
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100 mb-3">
                  Episodes
                </h2>
                <p className="text-violet-900/80 dark:text-violet-200/80 mb-4">
                  Browse all episodes from every season
                </p>
              </div>
              <span className="text-violet-900 dark:text-violet-200 font-semibold underline">
                View Episodes →
              </span>
            </div>
          </Link>

          <Link to="/locations" className="group">
            <div className="bg-violet-200/80 dark:bg-violet-900/50 rounded-xl shadow-xl shadow-black/10 p-8 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-violet-300/60 dark:border-violet-200/10 h-full flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">🌍</div>
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100 mb-3">
                  Locations
                </h2>
                <p className="text-violet-900/80 dark:text-violet-200/80 mb-4">
                  Visit strange dimensions and exotic planets
                </p>
              </div>
              <span className="text-violet-900 dark:text-violet-200 font-semibold underline">
                Explore Locations →
              </span>
            </div>
          </Link>

        </div>

        {/* About Section */}
        <div className="mt-20 bg-violet-200/80 dark:bg-violet-900/50 rounded-xl shadow-xl shadow-black/10 p-8 max-w-4xl mx-auto border border-violet-300/60 dark:border-violet-200/10">
          <h2 className="text-3xl font-bold text-violet-900 dark:text-violet-100 mb-4">
            About This Wiki
          </h2>
          <p className="text-violet-900/80 dark:text-violet-200/80 leading-relaxed mb-4">
            This wiki is your comprehensive guide to the Rick and Morty universe.
            Search through hundreds of characters, explore episode details, and discover
            the various dimensions and locations featured in the show.
          </p>
          <p className="text-violet-900/80 dark:text-violet-200/80 leading-relaxed">
            All data is powered by <strong>The Rick and Morty API</strong>, providing
            accurate and up-to-date information about your favorite animated series.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;
