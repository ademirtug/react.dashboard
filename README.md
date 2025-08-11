```md
# React Dashboard

A reusable, customizable React dashboard component built with Vite. Provides a top bar, sidebar, and theming support — all configurable via props. Designed to integrate cleanly into apps that already use React Router.

## 🚀 Features

- 📦 Lightweight bundle (externalizes React, React DOM, and React Router)
- 🧩 Configurable sidebar menu via props
- 🎨 Built-in dark/light theme switcher
- 🔍 Search widget and user dropdown component
- 📱 Responsive layout with mobile off-canvas support

## 📦 Installation

```bash
npm install react.dashboard
```

> ⚠️ **Peer Dependencies Required:**
Make sure your app includes the following dependencies (they're marked as `peerDependencies`):
- `react`
- `react-dom`
- `react-router-dom`

## 🛠️ Usage Example

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ThemeProvider, SearchWidget, UserDropdown } from 'react.dashboard';
import 'react.dashboard/dist/assets/style.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function DashboardPage() {
  const menuItems = [
    {
      label: 'Home',
      icon: 'home',
      action: ({ navigate }) => navigate('/')
    },
    {
      label: 'Logout',
      icon: 'sign-out-alt',
      action: ({ navigate }) => navigate('/login')
    }
  ];

  const topBarConfig = {
    centerContent: <SearchWidget onSearch={console.log} />,
    rightContent: (
      <UserDropdown
        items={[
          { label: 'Profile', icon: 'user' },
          { label: 'Notifications', icon: 'bell' },
          { label: 'Logout', icon: 'sign-out-alt' }
        ]}
      />
    ),
    showThemeToggle: true
  };

  return (
    <Dashboard menuItems={menuItems} topBarConfig={topBarConfig}>
      <div className="container-fluid p-4">
        <h1>Welcome</h1>
        <p>This is your dashboard content</p>
      </div>
    </Dashboard>
  );
}
```

## 🔄 Dynamic Navigation

To enable navigation actions inside menu items, your app **must wrap everything inside a `<Router>`**, so hooks like `useNavigate()` can work.
