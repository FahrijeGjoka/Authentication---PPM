import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerBackTitleVisible: false,  
        headerShadowVisible: false,      
      }}
    />
  );
}
