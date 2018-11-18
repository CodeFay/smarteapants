import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
// TODO: require dovenv here to access FAUAN_KEY from .env file
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  console.log("Function `getQuestions` invoked")
  /* parse the string body into a useable JS object */
  const airDate = event.queryStringParameters.airDate
  const altairDate = '4860'

  console.log(`Show number passed from component = ${typeof airDate} ${airDate}`)
  
  /* construct the fauna query */
  return client.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index("questions_by_air_date"), airDate)
      ),
      q.Lambda("q", q.Get(q.Var("q")))
    )
  ).then((res) => {
    console.log("Success!", airDate, res.data.length)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(res.data)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
