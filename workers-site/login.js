const loginTemplate = `
<!doctype html>
<html lang="en">
<head>
  <title>Login | Open Monetization Wallet</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css">
</head>
<body>
<div class="min-h-screen bg-gray-50 flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Open Monetization Wallet" />
    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      Sign in to Open Monetization Wallet
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form action="/admin" method="POST">
        <div>
          <label for="admin_secret" class="block text-sm font-medium leading-5 text-gray-700">
            Admin Secret
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="admin_secret" name="admin_secret" type="password" placeholder="********" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Log in
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>
</body>
</html>
`

export default () => new Response(
  loginTemplate,
  { headers: { 'Content-type': 'text/html' } }
)
