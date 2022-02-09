import Head from 'next/head';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useRequest } from '../../hooks/useRequest';

const ShowOrder = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const handlePayment = async tokenId => {
    await useRequest({
      method: 'POST',
      url: '/api/payments',
      body: { token: tokenId, orderId: order.id },
      toastMsg: 'Thank you for your payment 💳✅',
      onSuccess: payment => console.log('Payment', payment),
    });
  };

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <div className="py-2">
      <Head>
        <title>Microz - Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {timeLeft > 0 ? (
        <div className="bg-gray-100 dark:bg-gray-700 w-1/3 shadow hover:shadow-xl border-l-4 hover:border-indigo-600 border-gray-600 rounded py-2 px-3 mx-auto space-y-4 duration-150">
            <p>{timeLeft} seconds until order expires</p>
            <StripeCheckout
              token={({ id }) => handlePayment(id)}
              stripeKey="pk_test_bEqaSh4gsMgRmv75BofasQ25"
              amount={order.ticket.price * 100}
              email={currentUser.email}
            />
          </div>
        ) : (
          <p>Sorry, your order has expired</p>
        )}
      </main>
    </div>
  );
};

ShowOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default ShowOrder;
