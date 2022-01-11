import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <main className='font-body bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen text-sm'>
      <Component {...pageProps} />
    </main>
  );
}

export default App;
