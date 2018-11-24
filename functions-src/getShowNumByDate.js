import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
// TODO: require dovenv here to access FAUAN_KEY from .env file
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    console.log("Netlify lambda func `getShowNumByDate` fired")

    const airDate = event.queryStringParameters.airDate
    console.log(`airDate received from queryString: ${airDate}`)

    client.query(
        q.Select(["data", "show_number"], q.Get(q.Match(q.Index("show_num_by_air_date"), airDate)))
    ).then(res => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res)
        })
    }).catch(err => {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(err)
        })
    })
}