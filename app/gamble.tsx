import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { BankContext } from "./context/BankContext";

// GambleScreen allows the user to place bets and see updated balances.
export default function GambleScreen() {
  const router = useRouter();
  const { money, updateMoney, addBet } = useContext(BankContext);

  // Local state for the current money, bet amount, target number, selected choice, and bet result.
  const [currentMoney, setCurrentMoney] = useState<number>(money);
  const [betAmount, setBetAmount] = useState<string>("");
  const [target, setTarget] = useState<number>(50);
  const [choice, setChoice] = useState<"under" | "over">("under");
  const [result, setResult] = useState<string | null>(null);

  // Lock the device orientation to portrait mode.
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  // Sync local money state with the context value.
  useEffect(() => {
    setCurrentMoney(money);
  }, [money]);

  // Function to handle placing a bet.
  const handleBet = () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0 || bet > currentMoney) {
      ToastAndroid.show("Invalid bet amount!", ToastAndroid.SHORT);
      return;
    }

    // Generate a random number between 0 and 99.
    const roll = Math.floor(Math.random() * 100);
    let win = false;
    let multiplier = 0;

    // Determine win or loss based on user's choice and target.
    if (
      (choice === "under" && roll < target) ||
      (choice === "over" && roll > target)
    ) {
      win = true;
      multiplier =
        choice === "under"
          ? (100 / target) * 0.95
          : (100 / (100 - target)) * 0.95;
    }

    // Calculate updated money based on win or loss.
    const updatedMoney = win
      ? currentMoney + bet * (multiplier - 1)
      : currentMoney - bet;
    setCurrentMoney(updatedMoney);
    updateMoney(updatedMoney);

    // Create a result message and update the bet history.
    const outcome = win
      ? `Won! Roll: ${roll} | Payout: x${multiplier.toFixed(2)}`
      : `Lost! Roll: ${roll}`;
    setResult(outcome);
    addBet({ bet, result: outcome });
    // ToastAndroid.show(outcome, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*status bar */}
      <StatusBar backgroundColor="#333" style="light" />

      {/* Custom header with a back button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backIcon}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Dice</Text>
      </View>

      <LinearGradient colors={["#1a1a1a", "#2a2a2a"]} style={styles.container}>
        <View style={styles.content}>
          {/* Display current money balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>${currentMoney.toFixed(2)}</Text>
          </View>

          {/* Input for the bet amount */}
          <TextInput
            style={styles.input}
            placeholder="Bet Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={betAmount}
            onChangeText={setBetAmount}
          />

          {/* Display current target value */}
          <Text style={styles.sliderLabel}>Target: {target}</Text>
          {/* 
            The slider changes its highlighted side based on the selection:
            - For "UNDER": the left side (minimum track) is highlighted.
            - For "OVER": the right side (maximum track) is highlighted.
          */}
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={99}
            step={1}
            value={target}
            onValueChange={setTarget}
            // Set dynamic colors based on choice:
            minimumTrackTintColor={choice === "under" ? "#2196F3" : "#888"}
            maximumTrackTintColor={choice === "over" ? "#FF9800" : "#888"}
            thumbTintColor="#FFF"
          />

          {/* Buttons for selecting UNDER or OVER */}
          <View style={styles.choiceContainer}>
            <Pressable
              style={[
                styles.choiceButton,
                choice === "under" && styles.underSelected,
              ]}
              onPress={() => setChoice("under")}
            >
              <Text style={styles.choiceText}>UNDER {target}</Text>
            </Pressable>
            <Pressable
              style={[
                styles.choiceButton,
                choice === "over" && styles.overSelected,
              ]}
              onPress={() => setChoice("over")}
            >
              <Text style={styles.choiceText}>OVER {target}</Text>
            </Pressable>
          </View>

          {/* Button to place the bet */}
          <Pressable style={styles.actionButton} onPress={handleBet}>
            <Text style={styles.actionButtonText}>PLACE BET</Text>
          </Pressable>
          
          {/* Display the result of the bet */}
          {result && (
            <View style={styles.resultContainer}>
              <Text
                style={[
                  styles.resultText,
                  result.includes("Won") ? styles.winText : styles.loseText,
                ]}
              >
                {result}
              </Text>
            </View>
          )}

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

// Styles for the Gamble screen, header, slider, and buttons.
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
    paddingTop: 40,
  },
  backIcon: {
    marginRight: 10,
    padding: 5,
  },
  backText: {
    color: "#fff",
    fontSize: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    left: "28%",
 
  
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  balanceContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  balanceText: { fontSize: 32, fontWeight: "700", color: "#4CAF50" },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    width: "80%",
    marginBottom: 20,
    textAlign: "center",
  },
  sliderLabel: { color: "#fff", fontSize: 16, marginBottom: 10 },
  slider: { width: "80%", height: 40, marginBottom: 20 },
  choiceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  choiceButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  underSelected: { backgroundColor: "#2196F3" },
  overSelected: { backgroundColor: "#FF9800" },
  choiceText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  actionButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  actionButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  resultContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "80%",
    alignItems: "center",
  },
  resultText: { fontSize: 16, textAlign: "center", fontWeight: "500" },
  winText: { color: "#4CAF50" },
  loseText: { color: "#F44336" },
});
