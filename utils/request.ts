const requestReturn = (result: String, response?: unknown, error?: object):{} => {
    return {
        "result": result,
        ...(response ? {"response": response} : ''),
        ...(error ? {"error": error} : '')
    }
}

const msg500:string = "Internal Server Error."

export {msg500, requestReturn}