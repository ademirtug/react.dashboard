import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Needed for resolving paths

export default defineConfig({
    plugins: [react()],
    server: {
        port: 45005 // Your existing dev server port
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'DashboardPackage',
            fileName: (format) => `dashboard-package.${format}.js`
        },
        cssCodeSplit: false, // <--- this merges all CSS into one file
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM'
                },
                assetFileNames: 'assets/[name][extname]'
            }
        },
        outDir: 'dist'
    }
});