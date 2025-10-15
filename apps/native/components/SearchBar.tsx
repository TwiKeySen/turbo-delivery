import { XStack, Input } from "tamagui";
import { Search } from "@tamagui/lucide-icons";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <XStack
      ai="center"
      bg="$gray2"
      br="$4"
      px="$3"
      borderWidth={1}
      borderColor="$gray4"
    >
      <Search size={24} color="$blue10" />
      <Input
        flex={1}
        pl="$2"
        placeholder="Chercher un restaurant..."
        value={value}
        onChangeText={onChangeText}
        borderWidth={0}
        bg="transparent"
        fontSize={16}
        placeholderTextColor="$gray9"
      />
    </XStack>
  );
}
