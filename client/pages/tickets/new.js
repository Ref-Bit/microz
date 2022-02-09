import Head from 'next/head';
import { useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);

  const handlePrice = () => {
    const parsedPrice = parseFloat(price);

    setPrice(parsedPrice.toFixed(2));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await useRequest({
      method: 'POST',
      url: '/api/tickets',
      body: { title, price },
      toastMsg: 'New ticket created 🎫✅',
      onSuccess: () => Router.push('/'),
    });

    setTitle('');
    setPrice('');
  };

  return (
    <div>
      <Head>
        <title>Microz - New Ticket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-indigo-600 text-4xl py-6 font-title">
          Create new ticket
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-3/4 md:w-1/4 text-left bg-inherit shadow border-2 border-gray-500 hover:border-indigo-500 rounded px-4 pt-6 pb-8 mb-4 duration-300"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              id="title"
              type="text"
              placeholder="New Concert"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              id="price"
              type="number"
              placeholder={99.99}
              min={0}
              step={0.01}
              value={price}
              onChange={e => setPrice(e.target.value)}
              onBlur={handlePrice}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-1 duration-300"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTicket;
