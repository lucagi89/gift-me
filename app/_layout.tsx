import { Stack, Slot } from "expo-router";
import { UserContextProvider } from "../contexts/userContext";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Slot />
        </Stack>
      </SafeAreaView>
    </UserContextProvider>
  );
}
