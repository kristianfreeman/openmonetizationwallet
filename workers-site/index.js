import { getAssetFromKV, mapRequestToAsset } from "@cloudflare/kv-asset-handler"
import cookie from "cookie"
import qs from "qs"

import loginPage from "./login"

addEventListener("fetch", event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    event.respondWith(new Response("Internal Error", { status: 500 }))
  }
})

function pickPointer(pointers) {
  const sum = Object.values(pointers).reduce((sum, { share }) => sum + share, 0)
  let choice = Math.random() * sum

  for (const pointer in pointers) {
    const { share } = pointers[pointer]
    if ((choice -= share) <= 0) {
      return pointers[pointer]
    }
  }
}

async function handleEvent(event) {
  let response = new Response(null)
  const url = new URL(event.request.url)
  const acceptHeader = event.request.headers.get("Accept")

  let wallets

  if (url.pathname === "/" && acceptHeader.includes("application/spsp4+json")) {
    const walletData = await DB.get("wallets")
    wallets = walletData ? JSON.parse(walletData) : {}

    // TODO: is this spec compliant?
    if (!wallets) {
      return new Response("Not found", { status: 404 })
    }

    const walletKeys = Object.keys(wallets)
    const pickedWallet = pickPointer(wallets)
    const { id, wallet } = pickedWallet

    const now = Date.now()
    const log = {
      referer: event.request.headers.get("Referer"),
      timestamp: now,
      wallet: id,
    }

    await DB.put(`logs:${now}`, JSON.stringify(log))

    const walletUrl = new URL(
      `https://${wallet.startsWith("$") ? wallet.substring(1) : wallet}`
    )
    return Response.redirect(`${walletUrl}/.well-known/pay`)
  } else if (url.pathname === "/") {
    return new Response("OK")
  }

  if (url.pathname === "/admin" && event.request.method === "POST") {
    const text = await event.request.text()
    const body = qs.parse(text)

    if (!body.admin_secret) {
      return new Response("Unauthorized", { status: 401 })
    }

    const secretToCheck = body.admin_secret
    if (secretToCheck === ADMIN_SECRET) {
      const date = new Date()
      // Expires in three days
      date.setDate(date.getDate() + 3)
      return new Response(
        `<script type="text/javascript">window.location = "${url}"</script>Login successful, redirecting...`,
        {
          headers: {
            "Content-type": "text/html",
            "Set-Cookie": `Authorization=${secretToCheck}; Secure; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`,
          },
        }
      )
    } else {
      return new Response("Unauthorized", { status: 401 })
    }
  } else if (url.pathname.includes("/admin")) {
    const cookies = cookie.parse(event.request.headers.get("Cookie"))
    const authCookie = cookies["Authorization"]
    if (authCookie !== ADMIN_SECRET) {
      return loginPage()
    }
  }

  if (url.pathname === "/api/users") {
    wallets = await DB.get("wallets")
    return new Response(wallets, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
  }

  if (url.pathname === "/api/logs") {
    const { keys: logKeys } = await DB.list({ prefix: `logs:` })
    const logs = await Promise.all(
      logKeys.map(async ({ name }) => JSON.parse(await DB.get(name)))
    )

    return new Response(JSON.stringify(logs), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
  }

  if (url.pathname === "/admin/users" && event.request.method === "POST") {
    const walletBody = await event.request.json()
    // TODO: may want to delete/re-put to bust this cache
    await DB.put("wallets", JSON.stringify(walletBody))
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  try {
    return getAssetFromKV(event)
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}
