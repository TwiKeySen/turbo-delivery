import { YStack, XStack, Text, Input } from "tamagui";
import { MapPin } from "@tamagui/lucide-icons";
import { TouchableOpacity, ScrollView } from "react-native";
import { AddressSuggestion } from "../types/Restaurant";

interface AddressInputProps {
  address: string;
  suggestions: AddressSuggestion[];
  showSuggestions: boolean;
  onAddressChange: (text: string) => void;
  onSelectAddress: (suggestion: AddressSuggestion) => void;
  onFocus: () => void;
}

export function AddressInput({
  address,
  suggestions,
  showSuggestions,
  onAddressChange,
  onSelectAddress,
  onFocus,
}: AddressInputProps) {
  return (
    <YStack position="relative" zi={10000}>
      <XStack
        ai="center"
        bg="$gray2"
        br="$4"
        px="$3"
        borderWidth={1}
        borderColor="$gray5"
      >
        <MapPin size={24} color="$blue10" />
        <Input
          flex={1}
          pl="$2"
          placeholder="Adresse de livraison"
          value={address}
          onChangeText={onAddressChange}
          onFocus={onFocus}
          borderWidth={0}
          bg="transparent"
          fontSize={16}
          placeholderTextColor="$gray10"
        />
      </XStack>

      {showSuggestions && suggestions.length > 0 && (
        <YStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="$background"
          borderWidth={1}
          borderColor="$gray5"
          br="$4"
          mt="$2"
          zi={10001}
          elevation={10}
          shadowColor="$shadowColor"
          shadowRadius={8}
          shadowOffset={{ width: 0, height: 2 }}
        >
          <ScrollView
            style={{ maxHeight: 250 }}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log("Address selected:", suggestion.properties.label);
                  onSelectAddress(suggestion);
                }}
                activeOpacity={0.7}
              >
                <YStack
                  px="$4"
                  py="$3"
                  bg="$background"
                  borderBottomWidth={index < suggestions.length - 1 ? 1 : 0}
                  borderBottomColor="$gray4"
                  hoverStyle={{ bg: "$gray3" }}
                >
                  <Text fontSize={14} fontWeight="500">
                    {suggestion.properties.name}
                  </Text>
                  <Text fontSize={12} color="$gray11">
                    {suggestion.properties.postcode}{" "}
                    {suggestion.properties.city}
                  </Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </YStack>
      )}
    </YStack>
  );
}
