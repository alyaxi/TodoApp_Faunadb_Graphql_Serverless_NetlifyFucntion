const sendQuery = require("./helpers/send-query");

const UPDATE_TODO = `
mutation($id : ID!, $task: String!){
    updateTodo(id: $id, data: {task: $task})
    {
      _id
      task
    }
  }
`
exports.handler = async(event) =>{

    const {id , task} = JSON.parse(event.body)
    const {data, errors} = await sendQuery(UPDATE_TODO, {id, task})

    if(errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({updateTask: data.updateTodo})
    }
}