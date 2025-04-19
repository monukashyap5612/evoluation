import { useState } from 'react';

export default function FiltersAndSort({ 
  onSearch, 
  onSort, 
  onFilter, 
  tags 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSort = (e) => {
    onSort(e.target.value);
  };

  const handleFilter = (tag) => {
    setActiveTag(tag);
    onFilter(tag);
  };

  return (
    <div className="filters-container space-y-4 mb-6">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select 
          onChange={handleSort}
          className="p-2 border rounded"
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low-High)</option>
          <option value="price-desc">Price (High-Low)</option>
        </select>

        <div className="tag-filters flex flex-wrap gap-2">
          <button
            onClick={() => handleFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTag === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => handleFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}