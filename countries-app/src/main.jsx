import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// CSS
import './index.css'
// We'll use React query for easier data fetching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// react-router-dom components
import { BrowserRouter } from "react-router-dom";
// App component
import CountriesApp from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<CountriesApp />
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
)
