import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });

    const cycleTheme = () => {
        const themes = ['light', 'dark', 'system'];
        const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return 'brightness_7';
            case 'dark': return 'brightness_4';
            default: return 'computer';
        }
    };


    // Handle system theme changes
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => applyTheme('system');

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [theme]);

    const applyTheme = (newTheme) => {
        const effectiveTheme = newTheme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            : newTheme;

        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
    };

    // Update theme everywhere when changed
    useEffect(() => {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, getThemeIcon }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);