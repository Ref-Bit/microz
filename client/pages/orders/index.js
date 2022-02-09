import Head from 'next/head';

const Orders = ({ orders }) => {
  return (
    <div className="py-8">
      <Head>
        <title>Microz - My Orders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-indigo-600 text-2xl font-title pb-6">My Orders</h1>
        {orders.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Ticket
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Status
                          </th>
                          <th scope="col" className="p-4">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {orders.map(order => (
                          <tr
                            key={order.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 duration-150"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {order.ticket.title}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {order.status}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                              <a className="text-blue-600 dark:text-blue-500 hover:underline">
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

Orders.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default Orders;
