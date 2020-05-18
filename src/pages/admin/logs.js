import React, { useEffect, useState } from "react"

import { Link } from "gatsby"

import Log from "../../components/log"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    const fetchLogs = async () => {
      const resp = await fetch("/api/logs")
      const logsJson = await resp.json()
      setLogs(logsJson)
    }

    fetchLogs()
  }, [])

  return (
    <Layout>
      <SEO title="Admin" />
      <header>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Logs
          </h1>
        </div>
      </header>

      <div class="flex flex-col py-6">
        <div class="-my-2 py-2">
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
                  .map(log => <Log log={log} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminLogsPage
