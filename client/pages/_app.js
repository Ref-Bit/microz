import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import BaseLayout from './components/BaseLayout';
import { buildClient } from '../api/buildClient';

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <main className="font-body bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen text-sm">
      <BaseLayout currentUser={currentUser}>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'bg-inherit text-inherit',
            duration: 5000,
          }}
        />
        <Component currentUser={currentUser} {...pageProps} />
      </BaseLayout>
    </main>
  );
}

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/auth/current-user');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
