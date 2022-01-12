import Head from 'next/head';
import { AuthForm } from '../components';

const SignIn = () => {
  return (
    <div>
      <Head>
        <title>Microz - Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm formTitle="Sign In" />
    </div>
  );
};

export default SignIn;
