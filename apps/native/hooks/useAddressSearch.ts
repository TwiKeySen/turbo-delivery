import { useState, useCallback, useEffect, useRef } from "react";
import { AddressSuggestion } from "../types/Restaurant";

export function useAddressSearch() {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  const searchAddress = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
          query
        )}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await response.json();
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load address suggestions");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddressChange = useCallback(
    (text: string) => {
      setAddress(text);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        searchAddress(text);
      }, 300);
    },
    [searchAddress]
  );

  const selectAddress = useCallback((suggestion: AddressSuggestion) => {
    setAddress(suggestion.properties.label);
    setShowSuggestions(false);
    setSuggestions([]);
    setError(null);
  }, []);

  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [suggestions.length]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    address,
    suggestions,
    showSuggestions,
    isLoading,
    error,
    handleAddressChange,
    selectAddress,
    handleFocus,
    setShowSuggestions,
  };
}
