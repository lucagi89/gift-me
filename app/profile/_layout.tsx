import { Stack, Link, usePathname } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useUser } from "../../contexts/userContext";

const ProfileLayout = () => {
  const pathname = usePathname(); // Get the current route
  const { user, loading } = useUser(); // Get the user object

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!user) {
    return <Text style={styles.notLoggedText}>Not logged in</Text>;
  }

  // Mock user data (Replace with real user data)
  const isCurrentUser = true; // Change this based on user authentication
  const userProfilePic = user.photoURL || "https://via.placeholder.com/100"; // Default profile picture
  const fullName = `${user.firstName || "First"} ${user.lastName || "Last"}`;

  // List of sections with their dynamic routes
  const sections = ["upperBody", "lowerBody", "head", "shoes", "wishes"];

  return (
    <View style={styles.container}>
      {/* 🟢 Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          disabled={!isCurrentUser}
          style={styles.profilePicWrapper}
        >
          <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
          {isCurrentUser && <Text style={styles.editText}>Edit</Text>}
        </TouchableOpacity>
        <Text style={styles.userName}>{fullName}</Text>
      </View>

      {/* 🟡 Navigation Buttons */}
      <ScrollView contentContainerStyle={styles.navContainer}>
        {sections.map((section) => (
          <Link key={section} href={`/${section}`} style={styles.navButton}>
            <Text style={styles.navButtonText}>
              {section.replace(/([A-Z])/g, " $1").toUpperCase()}
            </Text>
          </Link>
        ))}
      </ScrollView>

      {/* 🟣 Stack for Dynamic Pages */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007bff",
    borderBottomWidth: 2,
    borderBottomColor: "#0056b3",
    elevation: 5,
  },
  profilePicWrapper: {
    position: "relative",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
  },
  editText: {
    position: "absolute",
    bottom: 5,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: 2,
    fontSize: 12,
    borderRadius: 5,
  },
  userName: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  navContainer: {
    padding: 20,
    alignItems: "center",
  },
  navButton: {
    width: "80%",
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  notLoggedText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
});

export default ProfileLayout;
