import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import UserDropdown from './components/Dashboard/UserDropdown';
import SearchWidget from './components/Dashboard/SearchWidget';
import ThemeProvider from './components/context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AppTranslations from './components/pages/AppTranslations';
import WordTranslations from './components/pages/WordTranslations';
export default function App() {
    return (

            <ThemeProvider>
                <Router>
                    <AppContent />
                </Router>
            </ThemeProvider>

    );
}

function AppContent() {
    const navigate = useNavigate();
    const menuItems = [
        {
            id : 'home',
            label: 'Home',
            icon: 'home',
            roles: ['admin', 'user'],
            action: ({ navigate }) => navigate('/')
        },
        {
            id: 'translations',
            label: 'Translations',
            icon: 'language',
            subItems: [
                {
                    label: 'Locales',
                    icon: 'mobile',
                    action: ({ navigate }) => navigate('/locales')
                },
                {
                    label: 'Dictionaries',
                    icon: 'spell-check',
                    action: ({ navigate }) => navigate('/dictionaries')
                }
            ]
        },
        {
            id: 'metadata',
            label: 'Metadata',
            icon: 'database',
            subItems: [
                {
                    label: 'Lesson Catalog',
                    icon: 'person-chalkboard',
                    action: ({ navigate }) => navigate('/lessoncatalog')
                },
            ]
        }
    ];

    const topBarConfig = {
        leftContent: null,
        centerContent: (
            <SearchWidget
                placeholder="Find anything..."
                onSearch={(term) => console.log(term)}
            />
        ),
        rightContent: (
            <UserDropdown
                items={[
                    { label: 'Profile', icon: 'user' },
                    { label: 'Notifications', icon: 'bell' },
                    {
                        label: 'Logout',
                        icon: 'sign-out-alt',
                        onClick: () => {
                            logout();
                            navigate('/login');
                        }
                    }
                ]}
            />
        ),
        showThemeToggle: true
    };

    return (
        <>
            <Routes>
                    <Route element={<Dashboard menuItems={menuItems} topBarConfig={topBarConfig} />}>
                        <Route index element={<AppTranslations />} />
                        <Route path="apptranslations" element={<AppTranslations />} />
                        <Route path="wordtranslations" element={<WordTranslations />} />
                    </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}
