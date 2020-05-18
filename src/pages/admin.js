import React from "react"

import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const AdminPage = () => (
  <Layout>
    <SEO title="Admin" />
    <h1>Admin</h1>

    <Link to="/admin/users">Users</Link>
    <Link to="/admin/logs">Logs</Link>
  </Layout>
)

export default AdminPage
