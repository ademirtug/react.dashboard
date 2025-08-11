import React, { useState } from 'react';
import '../../styles/SearchWidget.css';

const SearchWidget = ({ placeholder = "Search...", onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(searchTerm);
    };

    return (
        <form className="search-widget" onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" aria-label="Search">
                <i className="fas fa-search" />
            </button>
        </form>
    );
};

export default SearchWidget;