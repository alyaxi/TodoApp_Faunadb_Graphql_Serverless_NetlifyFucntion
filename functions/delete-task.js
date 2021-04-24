const sendQuery = require("./helpers/send-query");

const DELETE_TASK = `
mutation($id : ID!){
    deleteTodo(id: $id){
        _id
    }
}
`;

exports.handler = async (event) => {
    const {id} = JSON.parse(event.body);
    const {data, errors} = await sendQuery(DELETE_TASK, {id})

    if(errors){
        return{    
        statusCode: 500,
        body: JSON.stringify(errors)
        }
    }
    return{
        statusCode: 200,
        body: JSON.stringify({deleteTask: data.deleteTodo})
    }

}