import { Redirect, Stack, useSegments } from "expo-router";

const IS_AUTH = false;

export default function RootLayout() {
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";

  if (!IS_AUTH && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  if (IS_AUTH && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
