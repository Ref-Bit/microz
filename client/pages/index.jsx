import Head from 'next/head';
import { buildClient } from '../api/buildClient';

const Home = ({ data: { currentUser } }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Microz - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-indigo-600 text-6xl font-title">
          {currentUser ? 'Welcome to Microz' : 'Microz'}
        </h1>
        {currentUser && (
          <p className="py-5 w-1/2">Your Email: {currentUser.email}</p>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await buildClient(ctx).get('/api/auth/current-user');
  return { props: { data } };
}

export default Home;
