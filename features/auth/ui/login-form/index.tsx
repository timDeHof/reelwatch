import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { isLoggedInAtom } from '@/entities/user/model/store';
import { useUser } from '@/app/providers/userProvider';
import { Routes } from '@/shared/config/routes';
import { INITIAL_FORM_STATE } from '../../model/constants';
import { PasswordToggle } from './password-toggle';
import { ErrorMessage } from './error-message';
import { account } from '@/shared/lib/appwrite';

const LoginForm = () => {
  const user = useUser();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleShowPasswordClick = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await user?.login(formState.email, formState.password);
      setIsLoggedIn(true);
      const session = await account.get();
      const sessionToken = await account.createJWT();
      localStorage.setItem('sessionToken', sessionToken.jwt);
      router.push(Routes.watchList);
    } catch (error) {
      setFormState(prev => ({ ...prev, error: 'Invalid email or password' }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 bg-white rounded shadow md:w-1/2 lg:w-1/3">
      <h2
        tabIndex={0}
        role="heading"
        aria-label="Login to your account"
        className="text-2xl font-extrabold text-center text-gray-800"
      >
        Login to your account
      </h2>
      <div>
        <span>Don&apos;t have an account </span>
        <Link
          className="underline cursor-pointer text-sky-800 underline-offset-4 hover:text-rose-900"
          href={Routes.register}
        >
          Click here
        </Link>
      </div>
      <form className="w-3/4 space-y-4" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md appearance-none placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative flex px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <input
                id="password"
                name="password"
                type={formState.showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="relative block w-full text-gray-900 appearance-none placeholder:text-gray-500 focus:outline-none"
                placeholder="Password"
                value={formState.password}
                onChange={handleInputChange}
              />
              <PasswordToggle
                showPassword={formState.showPassword}
                onToggle={handleShowPasswordClick}
              />
            </div>
          </div>
        </div>

        {formState.error && <ErrorMessage message={formState.error} />}

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="text-indigo-500 size-5 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C5.58 2 2 5.58 2 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6zM9 7h2v5H9V7zm2 7a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;