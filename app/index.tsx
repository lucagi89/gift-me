import { Text, View, TouchableOpacity } from "react-native";
import { useUser } from "../contexts/userContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user ? `Welcome, ${user.uid}` : "Welcome to the app !"}</Text>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Text>Go to profile</Text>
      </TouchableOpacity>
    </View>
  );
}
