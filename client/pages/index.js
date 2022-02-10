import Head from 'next/head';
import Link from 'next/link';

const Home = ({ currentUser, tickets }) => {
  return (
    <div className="py-8">
      <Head>
        <title>Microz - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-indigo-600 text-6xl font-title">
          {currentUser ? 'Welcome to Microz' : 'Microz'}
        </h1>
        {currentUser && (
          <div>
            <p className="py-5">Your email: {currentUser.email}</p>
            {tickets.length > 0 && (
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
                                Title
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                              >
                                Price
                              </th>
                              <th scope="col" className="p-4">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {tickets.map(ticket => (
                              <tr
                                key={ticket.id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 duration-150"
                              >
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {ticket.title}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {ticket.price}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                  <Link
                                    href="/tickets/[ticketId]"
                                    as={`/tickets/${ticket.id}`}
                                  >
                                    <a className="text-blue-600 dark:text-blue-500 hover:underline">
                                      View
                                    </a>
                                  </Link>
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
          </div>
        )}
      </main>
    </div>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default Home;
