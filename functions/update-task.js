const sendQuery = require("./helpers/send-query");

const UPDATE_TASK = `
updateTodo(
    id: ID!
    data:{task: $task})){
        _id
        task
    }
    `

exports.handler = (event) => {
    const {id, task} = JSON.parse(event.body)
    const {data, errors} = await sendQuery(UPDATE_TASK, {id, task})

    if(errors){
        return{
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }
    return{
        statusCode: 200,
        body: JSON.stringify({updateTask: data.updateTodo})
    }

}
