import { createStore } from 'solid-js/store';

const [searchStore, setSearchStore] = createStore({
    searchTerm: '',
    searchResults: [],
    searchPerformed: false,
});

export { searchStore, setSearchStore };