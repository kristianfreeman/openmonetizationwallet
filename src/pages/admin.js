import React, { useEffect, useState } from "react"

import { Link } from "gatsby"
import { CopyToClipboard } from "react-copy-to-clipboard"

import Instructions from "../components/instructions"
import Layout from "../components/layout"
import Log from "../components/log"
import SEO from "../components/seo"

const AdminPage = () => {
  const [logs, setLogs] = useState([])
  const [users, setUsers] = useState({})
  const [walletUrl, setWalletUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetch("/api/users")
      const usersJson = await resp.json()
      setUsers(usersJson)
    }

    fetchUsers()

    const fetchLogs = async () => {
      const resp = await fetch("/api/logs")
      const logsJson = await resp.json()
      setLogs(logsJson)
    }

    fetchLogs()

    setWalletUrl(`$${window.location.host}`)
  }, [])

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000)
    }
  }, [copied])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <header className="mb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      <Instructions logs={logs} users={users} />

      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Your Wallet Information
      </h3>

      <div class="bg-white shadow sm:rounded-lg mt-6">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex flex-col sm:items-start sm:justify-between">
            <div class="pb-5 w-full">
              <div class="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div class="sm:flex sm:items-start">
                  🔗
                  <div class="mt-3 sm:mt-0 sm:ml-4">
                    <div class="text-sm leading-5 font-medium text-gray-900">
                      {walletUrl}
                    </div>
                    <div class="mt-1 text-sm leading-5 text-gray-600 sm:flex sm:items-center">
                      <div>Your wallet URL</div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <span class="inline-flex rounded-md shadow-sm">
                    <CopyToClipboard
                      onCopy={() => setCopied(true)}
                      text={walletUrl}
                    >
                      <button class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        {copied ? "Copied" : "Copy URL"}
                      </button>
                    </CopyToClipboard>
                  </span>
                </div>
              </div>
            </div>
            <div class="max-w-xl text-sm leading-5 text-gray-500">
              <p>
                For help generating a meta tag for embedding with your content,
                check out the{" "}
                <a
                  className="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
                  href="https://webmonetization.org/meta-tag"
                  target="_blank"
                >
                  Meta Tag Generator
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Stats</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Total Requests
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl leading-8 font-semibold text-gray-900">
                        {logs.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5">
                <Link
                  to="/admin/logs"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Number of Wallets
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl leading-8 font-semibold text-gray-900">
                        {Object.keys(users).length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5">
                <Link
                  to="/admin/users"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Logs</h3>

        <div class="py-2 mt-5">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Referrer
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Wallet
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {logs
                  .sort((log1, log2) => log1.timestamp < log2.timestamp)
                  .slice(0, 4)
                  .map(log => (
                    <Log log={log} />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="text-sm leading-5 mt-2 text-right">
            <Link
              to="/admin/logs"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
            >
              View all logs &rarr;
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminPage
