import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<ThemeProvider
				defaultTheme='system'
				storageKey='vite-ui-theme'>
				<App />
			</ThemeProvider>
		</React.StrictMode>
	)
}
