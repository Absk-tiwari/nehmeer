import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    const [ searchQuery, setSearchQuery ] = useState("");
    const authToken = localStorage.getItem('nehmeer-auth-token');

    return (
        <SearchContext.Provider 
        value={{
            searchQuery, 
            setSearchQuery, 
            authToken
        }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook for using the context
export const useSearch = () => useContext(SearchContext);