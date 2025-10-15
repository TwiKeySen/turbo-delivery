import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITES_STORAGE_KEY } from "../constants/categories";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY
        );
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    };
    saveFavorites();
  }, [favorites, isLoading]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
  };
}
