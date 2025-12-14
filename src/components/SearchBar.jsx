function SearchBar({ value, onChange, onSubmitSearch, placeholder = "Search..." }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            flex-1 px-4 py-3 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-green-500
            transition-colors
          "
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
