import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export const useTheme = () => {
  const context = useContext(ThemeContext)

  // help to return error if the context is used for outside the scope of the component wrapped with it
  if (context === undefined) {
    throw new Error("useTheme() must be used inside a ThemeProvider")
  }

  return context;
}