import React from "react"

import { Link } from 'gatsby'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const AdminUsersPage = () => (
  <Layout>
    <SEO title="Admin" />
    <h1>Users</h1>

    <div>Users go here</div>

    <Link to="/admin">Dash</Link>
    <Link to="/admin/logs">Logs</Link>
  </Layout>
)

export default AdminUsersPage
