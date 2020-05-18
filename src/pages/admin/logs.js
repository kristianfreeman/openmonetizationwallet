import React, {useEffect, useState} from "react"

import { Link } from 'gatsby'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { DateTime } from 'luxon'

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    const fetchLogs = async () => {
      const resp = await fetch("http://localhost:8787/api/logs")
      const logsJson = await resp.json()
      setLogs(logsJson)
    }

    fetchLogs()
  }, [])

  return (
    <Layout>
      <SEO title="Admin" />
      <h1>Logs</h1>

      {logs.sort((log1, log2) => log1.timestamp < log2.timestamp).map(log =>
        <div key={log.timestamp}>
          {DateTime.fromMillis(log.timestamp).toLocaleString(DateTime.DATETIME_SHORT)} / {log.referer} / {log.wallet}
        </div>
      )}
    </Layout>
  )
}

export default AdminLogsPage
