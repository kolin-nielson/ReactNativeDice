import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { BankContext } from "./context/BankContext";

// HomeScreen displays the bank's current balance and a scrollable betting history.
export default function HomeScreen() {
  const { money, betHistory } = useContext(BankContext);
  const router = useRouter();

  return (
    // SafeAreaView ensures content does not overlap with system status bars.
    <SafeAreaView style={{ flex: 1 }}>
      {/* Status bar with light content */}
      <StatusBar style="light" />

      {/* Custom header for the Home screen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bank</Text>
      </View>

      <LinearGradient colors={["#1a1a1a", "#2a2a2a"]} style={styles.container}>
        <View style={styles.content}>
          {/* Display current money balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>${money.toFixed(2)}</Text>
          </View>

          {/* Button to navigate to the gambling screen */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/gamble")}
          >
            <Text style={styles.buttonText}>Start Gambling</Text>
          </Pressable>

          {/* Scrollable Betting History Container */}
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Betting History</Text>
            {betHistory.length === 0 ? (
              <Text style={styles.noHistoryText}>No bets yet.</Text>
            ) : (
              <FlatList
                data={betHistory}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.historyList}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={styles.historyText}>
                      Bet: ${item.bet.toFixed(2)}
                    </Text>
                    <Text
                      style={[
                        styles.historyText,
                        item.result.includes("Won")
                          ? styles.winText
                          : styles.loseText,
                      ]}
                    >
                      {item.result}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
  },
  balanceContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
  },
  balanceText: { fontSize: 48, fontWeight: "700", color: "#4CAF50" },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.95 }] },
  buttonText: { color: "white", fontSize: 20, fontWeight: "600" },
  historyContainer: {
    width: "100%",
    marginTop: 40,
    maxHeight: 300,
    height: 300,
  },
  historyTitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  noHistoryText: { color: "#fff", textAlign: "center" },
  historyList: {
    paddingBottom: 10,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  historyText: { color: "#fff", fontSize: 16 },
  winText: { color: "#4CAF50" },
  loseText: { color: "#F44336" },
});
