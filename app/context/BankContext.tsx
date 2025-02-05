import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of a bet record.
export interface Bet {
  bet: number;
  result: string;
}

// Define the context properties.
interface BankContextProps {
  money: number;
  betHistory: Bet[];
  updateMoney: (amount: number) => void;
  addBet: (bet: Bet) => void;
}

// Create the context with default values.
export const BankContext = createContext<BankContextProps>({
  money: 1000,
  betHistory: [],
  updateMoney: () => {},
  addBet: () => {},
});

// Provider component that wraps the app so all screens share the same bank state.
export const BankProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState<number>(1000);
  const [betHistory, setBetHistory] = useState<Bet[]>([]);

  // Function to update the money balance.
  const updateMoney = (amount: number) => {
    setMoney(amount);
  };

  // Function to add a bet record to the history.
  const addBet = (bet: Bet) => {
    setBetHistory(prev => [bet, ...prev]);
  };

  return (
    <BankContext.Provider value={{ money, betHistory, updateMoney, addBet }}>
      {children}
    </BankContext.Provider>
  );
};
