import { NextPage } from 'next';
import { ActivityTable } from '@next/ui';

const PlayGround: NextPage = () => {
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
          <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            Good morning, Emilia Birch
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Duke street studio
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Verified account
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Send money
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Account balance
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">$30,659.45</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-cyan-700 hover:text-cyan-900">
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ActivityTable />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PlayGround;
