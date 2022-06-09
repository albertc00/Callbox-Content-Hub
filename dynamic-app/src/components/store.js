import { writable } from 'svelte/store';

export const isSearching = writable('');
export const SearchTerm = writable('');
export const fields = writable('');
export const selection = writable(1);
export const fieldID = writable('');
export const pages = writable(1);
export const category = writable(1);
export const colModal = writable(false);
