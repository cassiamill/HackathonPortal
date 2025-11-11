import admin from 'firebase-admin'

const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
if (!svcJson) {
  console.warn('FIREBASE_SERVICE_ACCOUNT_JSON is missing. Protected routes will fail.')
} else if (!admin.apps.length) {
  const creds = JSON.parse(svcJson)
  admin.initializeApp({ credential: admin.credential.cert(creds) })
}

export async function requireAuth(req, res, next) {
  try {
    const hdr = req.headers.authorization || ''
    const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null
    if (!token) return res.status(401).json({ error: 'missing token' })
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' })
  }
}
