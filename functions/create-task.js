const sendQuery = require("./helpers/send-query");

const CREATE_TASK = `
mutation($task: String!){
    createTodo(data:{task: $task})
    {
      _id
      task
    }
  }`

exports.handler = async(event)=>{
    const {task} = JSON.parse(event.body) 
    const {data, errors} = await sendQuery(CREATE_TASK, {task})
    console.log(data);

    if(errors){
        return{
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }
    return{
        statusCode: 200,
        body: JSON.stringify({newTask: data.createTodo})
    }
}