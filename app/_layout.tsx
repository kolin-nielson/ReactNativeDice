// app/layout.tsx

import React from "react";
import { BankProvider } from "./context/BankContext";
import { Slot } from "expo-router";

// Root layout that wraps all screens with the Bank context.
export default function RootLayout() {
  return (
    <BankProvider>
      <Slot />
    </BankProvider>
  );
}
