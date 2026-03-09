import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>welcome back</Text>
        <Text style={styles.subtitle}>Sign In to Continue </Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#999"}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#999"}
            autoComplete="password"
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text>
              Don&apos;t have an account? <Text>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  form:{
    width: "100%",
  },
  input:{
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    color: "#000",
  },
  button:{
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton:{
    alignItems: "center",
    marginTop: 16,
  },
});
