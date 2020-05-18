import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)

  const acceptHeader = event.request.headers.get('Accept')
  if (url.pathname === "/" && acceptHeader.includes('application/spsp4+json')) {
    const wallet = '$alice.com'
    const walletUrl = new URL(`https://${wallet.startsWith('$') ? wallet.substring(1) : wallet}`)
    return Response.redirect(`${walletUrl}/.well-known/pay`)
  }

  try {
    return await getAssetFromKV(event)
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}
