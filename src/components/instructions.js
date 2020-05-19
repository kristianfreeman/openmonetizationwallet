import React, {useEffect, useState} from 'react'

export default ({ logs = [], users = {} }) => {
  const [finishedGettingStarted, setFinishedGettingStarted] = useState(true)

  useEffect(() => {
    const ls = window.localStorage.getItem("omw:finished_getting_started")
    if (!ls) {
      setFinishedGettingStarted(false)
    }
  }, [])

  const finish = () => {
    setFinishedGettingStarted(true)
    window.localStorage.setItem("omw:finished_getting_started", true)
  }

  const walletIsSetup = Object.keys(users).length > 0
  const receivingLogs = logs.length > 0

  if (finishedGettingStarted) { return null }

  return (
    <div className="pb-12 bg-white">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Get Started
      </h3>
      <div className="mt-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <div className={`flex items-center justify-center h-12 w-12 rounded-md ${walletIsSetup ? 'bg-green-500' : 'bg-indigo-500'} text-white`}>
              {walletIsSetup ?
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> :
                <svg className="h-6 w-6" fill="currentColor" className="h-6 w-6" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              }
            </div>
            <div className="mt-5">
              <h5 className="text-base leading-6 font-medium text-gray-900">Add a user's wallet</h5>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {walletIsSetup ?
                  <span>You've added a user to your Open Monetization Wallet!</span> :
                  <span>Configure your Open Monetization Wallet by adding a user and payment pointer on {" "}
                    <a className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150" href="/admin/users">the Users page</a>.</span>
                }
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className={`flex items-center justify-center h-12 w-12 rounded-md ${receivingLogs ? 'bg-green-500' : 'bg-indigo-500'} text-white`}>
              {receivingLogs ?
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> :
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              }
            </div>
            <div className="mt-5">
              <h5 className="text-base leading-6 font-medium text-gray-900">Use your wallet payment pointer</h5>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {receivingLogs ?
                  "You're using your Open Monetization wallet. Nice!" :
                  "Copy your wallet URL and embed it in your content, such as a blog post or website. We'll begin logging any payment requests to your URL!"
                }
              </p>
            </div>
          </div>

          {walletIsSetup && receivingLogs && (
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
              </div>
              <div className="mt-5">
                <h5 className="text-base leading-6 font-medium text-gray-900">Your Open Monetization Wallet is successfully configured!</h5>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  You can begin using your Open Monetization Wallet URL to accept payments with the Web Monetization API!
                </p>
              </div>
            </div>
          )}
        </div>

        {walletIsSetup && receivingLogs && (
          <span class="inline-flex rounded-md shadow-sm mt-6">
            <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150" onClick={finish}>
              Hide Getting Started
            </button>
          </span>
        )}
      </div>
    </div>
  )
}
