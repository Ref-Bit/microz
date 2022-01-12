import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import BaseLayout from './components/BaseLayout';

function App({ Component, pageProps }) {
  return (
    <main className="font-body bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen text-sm">
      <BaseLayout currentUser={pageProps.data.currentUser}>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'bg-inherit text-inherit',
            duration: 5000,
          }}
        />
        <Component {...pageProps} />
      </BaseLayout>
    </main>
  );
}

export default App;
