import { useState, useEffect, useRef } from 'react';
import { fetchCharacters, searchCharacters, filterCharactersByStatus } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debounceRef = useRef(null);

  const loadCharacters = async (pageNum = 1, status = '') => {
    try {
      setLoading(true);
      setError(null);

      const data = status
        ? await filterCharactersByStatus(status, pageNum)
        : await fetchCharacters(pageNum);

      setCharacters(data.results);
      setInfo(data.info);
      setPage(pageNum);
      setSearchMode(false);
    } catch (err) {
      setError(err.message);
      setCharacters([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(1, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchTerm.trim()) {
      setSearchMode(false);
      setError(null);
      loadCharacters(1, statusFilter);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchCharacters(searchTerm);

        const filtered = statusFilter
          ? data.results.filter((c) => c.status?.toLowerCase() === statusFilter)
          : data.results;

        setCharacters(filtered);
        setInfo(null);
        setSearchMode(true);

        if (filtered.length === 0) setError('No characters found');
      } catch {
        setCharacters([]);
        setInfo(null);
        setSearchMode(true);
        setError('No characters found');
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Characters</h1>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmitSearch={() => {}}
          placeholder="Search characters by name..."
        />

        {/* Status Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          {['', 'alive', 'dead', 'unknown'].map((s) => (
            <button
              key={s || 'all'}
              onClick={() => handleStatusChange(s)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                statusFilter === s
                  ? 'bg-green-500 text-white'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700'
              }`}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-10">
            <LoadingSpinner />
          </div>
        )}

        {/* Empty State */}
        {!loading && error && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-xl">{error}</p>
            <button
              onClick={() => {
                setSearchTerm('');
                loadCharacters(1, statusFilter);
              }}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Back to All Characters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && characters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        {/* Pagination (only normal mode) */}
        {!loading && !searchMode && info && characters.length > 0 && (
          <div className="flex justify-center gap-4 mt-12 flex-wrap">
            <button
              onClick={() => loadCharacters(page - 1, statusFilter)}
              disabled={!info.prev}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Previous
            </button>

            <span className="py-2 px-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-lg font-semibold">
              Page {page} of {info.pages}
            </span>

            <button
              onClick={() => loadCharacters(page + 1, statusFilter)}
              disabled={!info.next}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;
