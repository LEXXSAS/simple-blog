import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {store} from './store.js'
import { Provider } from 'react-redux'
import {
    QueryClient,
    QueryClientProvider
  } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <App />
        </Provider>
    </QueryClientProvider>
)
