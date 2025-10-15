import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

const AppLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TamaguiProvider>
  );
};

export default AppLayout;
