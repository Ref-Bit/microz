import Head from 'next/head';
import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await useRequest({
      method: 'POST',
      url: '/api/auth/signup',
      body: { email, password },
      onSuccess: () => Router.push('/'),
    });
  };

  return (
    <div>
      <Head>
        <title>Microz - SignUp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 py-24">
        <h1 className="text-4xl font-title py-8">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="w-1/4 bg-inherit shadow border-2 border-gray-500 hover:border-indigo-500 rounded px-4 pt-6 pb-8 mb-4 duration-300"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              id="email"
              type="email"
              placeholder="your-email@server.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Microz Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
