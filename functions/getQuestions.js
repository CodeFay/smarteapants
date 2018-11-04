import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  console.log("Function `getQuestions` invoked")
  /* parse the string body into a useable JS object */
  
  /* construct the fauna query */
  return client.query(q.Map(q.Paginate(q.Match(q.Index("questions_by_show_number"), "4680")), q.Lambda("q", q.Get(q.Var("q"))))) // This is hardcoded to "4680" for now
  .then((res) => {
    console.log("success", res)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(res)
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
