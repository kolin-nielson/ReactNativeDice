# Gambling Bank App

A modern, professional-looking mobile application built with React Native and Expo that simulates a gambling bank. Users can place bets, view their current balance, and check a live-updating betting history—all within a sleek, well-designed UI.

## Overview

The Gambling Bank App allows users to:
- View their current bank balance.
- Place bets on a dice game using a customizable target and bet amount.
- Receive instant feedback (via Toast notifications and on-screen messages) about the outcome of each bet.
- See a live, scrollable betting history that updates in real-time.

The app leverages modern state management and navigation techniques to provide a seamless experience across multiple screens.

## Features

- **Two-Screen Navigation:**  
  Uses the Expo Router to switch between the Home screen (Bank overview) and the Gamble screen (betting table).
  
- **Global State Management:**  
  A custom React Context (`BankContext`) is implemented to share the current balance and betting history between screens.

- **Dynamic Betting Experience:**  
  - Place bets with a custom amount using a **TextInput**.
  - Adjust the betting target using a dynamic **Slider**.
  - Choose between betting "UNDER" or "OVER" with clearly highlighted options.
  
- **Instant User Feedback:**  
  Provides immediate feedback via Toast messages and on-screen updates regarding win/loss outcomes and updated balances.
  
- **Responsive & Professional UI:**  
  - Modern styling with a dark-themed gradient background.
  - Custom headers and status bars ensure a polished look.
  - A scrollable betting history that prevents layout issues as more bets are placed.
  
- **Extra Expo Packages:**  
  - **expo-screen-orientation:** Locks the app to portrait mode.
  - **expo-linear-gradient:** Creates visually appealing gradient backgrounds.
  - **expo-status-bar:** Manages the status bar appearance.
  - **@react-native-community/slider:** Provides a custom slider component for target selection.

## Technologies Used

- **React Native:** The primary framework for building the mobile application.
- **Expo:** A powerful set of tools and services built around React Native to help you build, deploy, and quickly iterate on native apps.
- **Expo Router:** Simplifies navigation between screens.
- **React Context API:** For state management across the app.
- **expo-linear-gradient:** For creating gradient backgrounds.
- **expo-screen-orientation:** To lock the screen orientation.
- **expo-status-bar:** For customizing the status bar.
- **@react-native-community/slider:** For an interactive slider component.
- **ToastAndroid:** (Android only) Provides quick feedback messages.

