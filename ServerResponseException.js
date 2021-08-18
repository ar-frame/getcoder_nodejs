class ServerResponseException extends Error {
    constructor(message)
    {
        super(message)
        this.name = "ServerResponseException"
        this.message = this.name + ": " + (message || 'Error')
    }
}
export default ServerResponseException