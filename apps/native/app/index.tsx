import { StatusBar } from "expo-status-bar";
import { YStack, Text } from "tamagui";
import { useState, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { restaurants } from "../data/restaurants";
import { AddressInput } from "../components/AddressInput";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { RestaurantCard } from "../components/RestaurantCard";
import { useFavorites } from "../hooks/useFavorites";
import { useAddressSearch } from "../hooks/useAddressSearch";
import { CATEGORIES, CUISINE_TYPE_MAP } from "../constants/categories";

export default function Native() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    address,
    suggestions,
    showSuggestions,
    handleAddressChange,
    selectAddress,
    handleFocus,
  } = useAddressSearch();

  const getEnglishCuisineType = (frenchCategory: string): string => {
    return (
      Object.entries(CUISINE_TYPE_MAP).find(
        ([_, french]) => french === frenchCategory
      )?.[0] || frenchCategory
    );
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const searchMatch =
        !searchQuery ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisineType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        CUISINE_TYPE_MAP[r.cuisineType]
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const englishCategory = getEnglishCuisineType(selectedCategory);
      const categoryMatch =
        selectedCategory === "Tous" || r.cuisineType === englishCategory;

      const favoriteMatch = !showFavoritesOnly || favorites.includes(r.id);

      return searchMatch && categoryMatch && favoriteMatch;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  return (
    <YStack f={1} bg="$background" ai="center">
      <StatusBar style="auto" />

      <YStack w="100%" maxWidth={600} zi={1000}>
        <YStack ai="center" pt={80} pb="$4" px="$4">
          <Text fontSize={36} fontWeight="bold" color="$blue10">
            FoodDelivery
          </Text>
        </YStack>

        <YStack px="$4" gap="$2" zi={1001}>
          <AddressInput
            address={address}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onAddressChange={handleAddressChange}
            onSelectAddress={selectAddress}
            onFocus={handleFocus}
          />

          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

          <CategoryFilter
            categories={[...CATEGORIES]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
          />

          <Text fontSize={16} fontWeight="600" color="$gray12" mt="$3" mb="$1">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length <= 1
              ? "restaurant trouvé"
              : "restaurants trouvés"}
          </Text>
        </YStack>
      </YStack>

      <YStack f={1} w="100%" maxWidth={600}>
        <FlashList
          data={filteredRestaurants}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: restaurant }) => (
            <RestaurantCard
              restaurant={restaurant}
              isFavorite={isFavorite(restaurant.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <YStack ai="center" jc="center" py="$10" px="$4">
              <Text fontSize={20} fontWeight="600" color="$gray11" mb="$2">
                Aucun restaurant trouvé
              </Text>
              <Text fontSize={14} color="$gray10" textAlign="center">
                {showFavoritesOnly
                  ? "Vous n'avez pas encore ajouté de favoris"
                  : "Essayez d'ajuster vos filtres ou votre recherche"}
              </Text>
            </YStack>
          }
        />
      </YStack>
    </YStack>
  );
}
