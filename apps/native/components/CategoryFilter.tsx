import { XStack, YStack, Text, ScrollView } from "tamagui";
import { Heart } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  showFavoritesOnly,
  onToggleFavorites,
}: CategoryFilterProps) {
  return (
    <XStack ai="center" gap="$2" mt="$2">
      <TouchableOpacity onPress={onToggleFavorites}>
        <YStack
          bg={showFavoritesOnly ? "$red2" : "$gray2"}
          br="$10"
          px="$4"
          py="$2.5"
          ai="center"
          jc="center"
          borderWidth={1}
          borderColor={showFavoritesOnly ? "$red10" : "$gray5"}
        >
          <Heart
            size={20}
            color="$red10"
            fill={showFavoritesOnly ? "$red10" : "transparent"}
          />
        </YStack>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => onCategoryChange(category)}
            >
              <YStack
                bg={selectedCategory === category ? "$blue10" : "$gray2"}
                br="$10"
                px="$4"
                py="$2.5"
                borderWidth={1}
                borderColor={
                  selectedCategory === category ? "$blue10" : "$gray5"
                }
              >
                <Text
                  fontSize={14}
                  fontWeight={selectedCategory === category ? "600" : "400"}
                  color={selectedCategory === category ? "white" : "$gray11"}
                >
                  {category}
                </Text>
              </YStack>
            </TouchableOpacity>
          ))}
        </XStack>
      </ScrollView>
    </XStack>
  );
}
