const errorSetter = (error)=>{
    console.log(error);
    return  !error.response ? "Problem in getting response" : error.response.data.message
}

module.exports = errorSetter;