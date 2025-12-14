const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/character/?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch characters');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const searchCharacters = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/character/?name=${name}`);
    if (!response.ok) throw new Error('No characters found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const filterCharactersByStatus = async (status, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/character/?status=${status}&page=${page}`);
    if (!response.ok) throw new Error('No characters found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) throw new Error('Character not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEpisodes = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/episode/?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch episodes');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEpisodeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/episode/${id}`);
    if (!response.ok) throw new Error('Episode not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchLocations = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/location/?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchLocationById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/location/${id}`);
    if (!response.ok) throw new Error('Location not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchMultipleCharacters = async (urls) => {
  try {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    return await Promise.all(promises);
  } catch (error) {
    throw error;
  }
};