import Head from 'next/head';
import { useRequest } from '../../hooks/useRequest';
import Router from 'next/router';

const ShowTicket = ({ ticket }) => {
  const handleOrder = async () => {
    await useRequest({
      method: 'POST',
      url: '/api/orders',
      body: { ticketId: ticket.id },
      toastMsg: 'New order created 📦✅',
      onSuccess: order =>
        Router.push('/orders/[orderId]', `/orders/${order.id}`),
    });
  };

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>Microz - {ticket.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <div className="bg-gray-100 dark:bg-gray-700 w-1/3 shadow hover:shadow-xl border-l-4 hover:border-indigo-600 border-gray-600 rounded py-2 px-3 mx-auto space-y-4 duration-150">
          <h1 className="text-2xl font-title">{ticket.title}</h1>
          <h4 className="font-medium">Price: ${ticket.price}</h4>
          <button
            onClick={handleOrder}
            className="inline-flex items-center text-white text-sm bg-indigo-600 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-500 rounded mt-4 md:mt-0 duration-300"
          >
            Buy
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

ShowTicket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default ShowTicket;
