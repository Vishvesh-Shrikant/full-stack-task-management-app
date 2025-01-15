import  { createContext, ReactNode, useEffect, useState } from 'react'

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  }
  
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(
      localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    );
  
    useEffect(() => {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };