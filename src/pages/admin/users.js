import React, { useEffect, useState } from "react"

import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { v4 as uuidv4 } from "uuid"

const Errors = ({ errors = [] }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm leading-5 font-medium text-red-800">
            There was {errors.length > 1 ? `${errors.length} errors` : 'one error'} with your submission
          </h3>
          <div className="mt-2 text-sm leading-5 text-red-700">
            <ul className="list-disc pl-5">
              {errors.map((err, index) =>
                <li className={index > 0 ? 'mt-1' : ''} key={index}>{err}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserForm = ({ onChange, user }) => (
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 font-medium text-gray-900">
        <input
          className="form-input sm:text-sm sm:leading-5"
          name="name"
          onChange={evt => onChange("name", evt.target.value)}
          placeholder="Name"
          required
          value={user.name}
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">
        <input
          className="form-input sm:text-sm sm:leading-5"
          name="wallet"
          onChange={evt => onChange("wallet", evt.target.value)}
          placeholder="Wallet URL"
          required
          value={user.wallet}
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <input
        className="form-input sm:text-sm sm:leading-5"
        name="share"
        onChange={evt => onChange("share", Number(evt.target.value))}
        placeholder="Share (must add up to 100)"
        required
        type="number"
        value={user.share}
      />
    </td>
  </tr>
)

const User = ({ deleteUser, user }) => (
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="flex items-center">
        <div class="text-sm leading-5 font-medium text-gray-900">
          {user.name}
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">{user.wallet}</div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      {user.share}%
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <a href="#" class="text-red-600 hover:text-red-900" onClick={() => deleteUser(user.id) }>
        Delete
      </a>
    </td>
  </tr>
)

const AdminUsersPage = () => {
  const [users, setUsers] = useState({})
  const [editing, setEditing] = useState(false)
  const [editedUsers, setEditedUsers] = useState(null)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetch("/api/users")
      const usersJson = await resp.json()
      setUsers(usersJson)
    }

    fetchUsers()
  }, [])

  const userKeys = Object.keys(users)

  const stopEdit = () => setEditing(false)
  const startEdit = () => {
    if (!editedUsers) {
      setEditedUsers(users)
    }
    setEditing(true)
  }

  const onChange = key => (field, value) => {
    const newUsers = Object.assign({}, editedUsers, {
      [key]: Object.assign({}, editedUsers[key], {
        [field]: value,
      }),
    })

    setEditedUsers(newUsers)
  }

  const deleteUser = async key => {
    const user = users[key]

    if (window.confirm(`Do you really want to remove ${user.name}'s wallet?`)) {
      const usersWithout = {}

      Object.keys(users).map(user => {
        if (users[user].id !== key) {
          usersWithout[user] = users[user]
        }
      })

      try {
        await fetch("/admin/users", {
          method: "POST",
          body: JSON.stringify(usersWithout),
        })
      } catch (err) {
        console.log(err)
      }

      setUsers(usersWithout)
    }
  }

  const save = async evt => {
    evt.preventDefault()

    const shares = Object.values(editedUsers).map(u => u.share)
    const shareSum = shares.reduce((initial, share) => initial += share, 0)
    if (shareSum !== 100) {
      setErrors([`Shares must add up to 100% (currently ${shareSum})`])
      return false
    }

    setErrors([])

    try {
      await fetch("/admin/users", {
        method: "POST",
        body: JSON.stringify(editedUsers),
      })
    } catch (err) {
      console.log(err)
    }

    setUsers(editedUsers)
    setEditing(false)
    setEditedUsers(null)
  }

  const addWallet = evt => {
    evt.preventDefault()

    const id = uuidv4()
    setEditedUsers(
      Object.assign({}, editedUsers, {
        [id]: {
          id,
          name: "",
          wallet: "",
          share: null,
        },
      })
    )
  }

  return (
    <Layout>
      <SEO title="Users" />

      <header>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Users
          </h1>
        </div>
      </header>

      <div class="flex flex-col py-6">
        {errors.length ? <Errors errors={errors} /> : null}
        <div class="-my-2 py-2">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Wallet
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Share Percentage
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {editing
                  ? Object.keys(editedUsers).map(key => (
                      <UserForm
                        key={key}
                        onChange={onChange(key)}
                        user={editedUsers[key]}
                      />
                    ))
                  : userKeys.map(key =>
                      <User
                        deleteUser={deleteUser.bind(this)}
                        key={key}
                        user={users[key]}
                      />
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        {editing ? (
          <>
            <span className="inline-flex rounded-md shadow-sm mr-2">
              <button
                onClick={stopEdit}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                Cancel
              </button>
            </span>
            <span className="inline-flex rounded-md shadow-sm mr-2">
              <button
                onClick={addWallet}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                Add wallet
              </button>
            </span>
            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={save}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Save wallet configuration
              </button>
            </span>
          </>
        ) : (
          <span className="inline-flex rounded-md shadow-sm">
            <button
              onClick={startEdit}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Edit wallet configuration
            </button>
          </span>
        )}
      </div>
    </Layout>
  )
}

export default AdminUsersPage
