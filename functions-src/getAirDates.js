import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
// TODO: require dovenv here to access FAUAN_KEY from .env file
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    client.query(
        q.Paginate(q.Distinct(q.Match(q.Index("air_date"))))
    ).then(res => {
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data)
        })
    }).catch(err => {
        console.error("Error:", err)
        return callback(null, {
            statusCode: 500,
            body: JSON.stringify(err)
        })
    })
}