import Head from 'next/head';
import { AuthForm } from '../components';

const SignUp = () => {
  return (
    <div>
      <Head>
        <title>Microz - Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm formTitle="Sign Up" />
    </div>
  );
};

export default SignUp;
