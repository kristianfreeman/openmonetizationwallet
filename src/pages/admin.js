import React from "react"

import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AdminPage = () => (
  <Layout>
    <SEO title="Dashboard" />
    <header>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
  </Layout>
)

export default AdminPage
