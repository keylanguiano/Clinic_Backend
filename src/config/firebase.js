const admin = require ('firebase-admin')
const serviceAccount = require ('./serviceAccountKey.json')

admin.initializeApp
({
    credential: admin.credential.cert (serviceAccount),
    storageBucket: 'gs://clinic-b6ff9.appspot.com'
})

const bucket = admin.storage ().bucket ()

module.exports = { admin, bucket }
