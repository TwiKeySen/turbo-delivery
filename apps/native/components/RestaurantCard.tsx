import { YStack, XStack, Text, Image } from "tamagui";
import {
  Heart,
  Phone,
  MapPinned,
  Truck,
  Globe,
  Clock,
} from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { memo } from "react";
import { Restaurant } from "../types/Restaurant";
import { makePhoneCall, openWebsite } from "../utils/phone";
import { CUISINE_TYPE_MAP } from "../constants/categories";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function RestaurantCardComponent({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: RestaurantCardProps) {
  return (
    <YStack
      bg="$background"
      br="$4"
      overflow="hidden"
      borderWidth={1}
      borderColor="$gray5"
      shadowColor="$shadowColor"
      shadowRadius={4}
      shadowOffset={{ width: 0, height: 2 }}
      elevation={2}
      mb="$4"
      pressStyle={{ opacity: 0.95, scale: 0.98 }}
    >
      <YStack position="relative" h={180}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={{ width: "100%", height: 180 }}
          resizeMode="cover"
        />

        <YStack position="absolute" top="$3" right="$3">
          <TouchableOpacity
            onPress={() => onToggleFavorite(restaurant.id)}
            accessibilityLabel={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            accessibilityRole="button"
          >
            <YStack
              bg="white"
              br="$10"
              p="$2"
              shadowColor="$shadowColor"
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={2}
            >
              <Heart size={18} color={isFavorite ? "$red10" : "$gray10"} />
            </YStack>
          </TouchableOpacity>
        </YStack>

        <XStack position="absolute" bottom="$3" right="$3" gap="$2">
          <TouchableOpacity
            onPress={() => makePhoneCall(restaurant.phoneNumber)}
            accessibilityLabel={`Appeler ${restaurant.name}`}
            accessibilityRole="button"
          >
            <YStack
              bg="white"
              br="$10"
              p="$2"
              shadowColor="$shadowColor"
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={2}
            >
              <Phone size={18} color="$gray12" />
            </YStack>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openWebsite(restaurant.website)}
            accessibilityLabel={`Visiter le site de ${restaurant.name}`}
            accessibilityRole="button"
          >
            <YStack
              bg="white"
              br="$10"
              p="$2"
              shadowColor="$shadowColor"
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={2}
            >
              <Globe size={18} color="$gray12" />
            </YStack>
          </TouchableOpacity>
        </XStack>
      </YStack>

      <YStack px="$4" py="$3" gap="$2">
        <XStack ai="center" jc="space-between" gap="$2">
          <Text
            fontSize={20}
            fontWeight="700"
            color="$gray12"
            flex={1}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>
          <XStack
            ai="center"
            gap="$1"
            bg="$yellow2"
            br="$3"
            px="$2.5"
            py="$1.5"
            flexShrink={0}
          >
            <Text fontSize={16} color="$yellow11">
              ★
            </Text>
            <Text fontSize={15} fontWeight="600" color="$gray12">
              {restaurant.rating}
            </Text>
          </XStack>
        </XStack>

        <XStack ai="center" gap="$2">
          <Text fontSize={15} color="$gray11">
            {CUISINE_TYPE_MAP[restaurant.cuisineType] || restaurant.cuisineType}
          </Text>
        </XStack>

        <XStack jc="space-between" gap="$3" mt="$1" flexWrap="wrap">
          <XStack ai="center" gap="$1.5">
            <Truck size={16} color="$gray10" />
            <Text fontSize={13} color="$gray11">
              {restaurant.deliveryFee === 0
                ? "Gratuit"
                : `${restaurant.deliveryFee.toFixed(2)}€`}
            </Text>
          </XStack>

          <XStack ai="center" gap="$1.5">
            <MapPinned size={16} color="$gray10" />
            <Text fontSize={13} color="$gray11">
              {restaurant.distance} km
            </Text>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  );
}

export const RestaurantCard = memo(RestaurantCardComponent);
