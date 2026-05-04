const SearchBar = () => {
  return (
    <form className="flex w-full gap-4">
      <div className="flex-1">
        <input 
          type="search" 
          placeholder="Search for doctors" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div className="w-64">
        <input 
          type="search" 
          placeholder="Search location" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Search
      </button>
    </form>
  );
};

export default SearchBar;