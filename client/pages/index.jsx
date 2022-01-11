import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Microz - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-indigo-600 text-6xl font-title">Microz</h1>
        <p className="py-5 w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aliquid
          eos unde nulla amet! Similique, quaerat ut. Omnis repellendus eveniet
          voluptatibus similique perspiciatis expedita delectus, saepe fugit
          soluta perferendis ab?
        </p>
      </main>
    </div>
  );
}
