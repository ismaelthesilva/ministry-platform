// Test script to verify dark mode functionality
console.log("Testing dark mode functions...");

// Test the theme utility functions
import {
  initializeTheme,
  toggleTheme,
  getStoredTheme,
  getSystemTheme,
  applyTheme,
} from "./src/lib/theme";

// Test 1: Initialize theme
console.log("1. Testing initializeTheme...");
const initialTheme = initializeTheme();
console.log("Initial theme:", initialTheme);

// Test 2: Check stored theme
console.log("2. Testing getStoredTheme...");
const storedTheme = getStoredTheme();
console.log("Stored theme:", storedTheme);

// Test 3: Check system theme
console.log("3. Testing getSystemTheme...");
const systemTheme = getSystemTheme();
console.log("System theme:", systemTheme);

// Test 4: Toggle theme
console.log("4. Testing toggleTheme...");
const newTheme = toggleTheme();
console.log("After toggle:", newTheme);

// Test 5: Apply theme manually
console.log("5. Testing applyTheme...");
applyTheme("dark");
console.log("Applied dark theme");

// Check if dark class is applied
const isDarkApplied = document.documentElement.classList.contains("dark");
console.log("Dark class applied:", isDarkApplied);

export default {
  initialTheme,
  storedTheme,
  systemTheme,
  newTheme,
  isDarkApplied,
};
