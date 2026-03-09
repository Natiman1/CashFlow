import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransactionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Add Transaction</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
