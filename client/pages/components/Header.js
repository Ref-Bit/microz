import ActiveLink from './ActiveLink';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';

const Header = ({ currentUser }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await useRequest({
      method: 'POST',
      url: '/api/auth/signout',
      body: {},
      onSuccess: () => router.push('/'),
    });
  };

  return (
    <header>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <ActiveLink activeClassName="active" href="/">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-inherit p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Microz</span>
          </a>
        </ActiveLink>
        {!currentUser && (
          <nav className="md:ml-auto flex flex-wrap items-center text-sm justify-center">
            <ActiveLink activeClassName="active" href="/auth/signup">
              <a className="mr-5 hover:text-indigo-500 duration-300">Sign Up</a>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/auth/signin">
              <a className="mr-5 hover:text-indigo-500 duration-300">Sign In</a>
            </ActiveLink>
          </nav>
        )}
        {currentUser && (
          <button
            onClick={handleSignOut}
            className="inline-flex items-center text-sm bg-indigo-600 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-500 rounded mt-4 md:mt-0 duration-300"
          >
            Sign Out
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
        )}
      </div>
    </header>
  );
};

export default Header;
