class Config
{
    constructor(SERVER_ADDRESS, AUTH_SERVER_OPKEY)
    {
        this.SERVER_ADDRESS = SERVER_ADDRESS;
        this.AUTH_SERVER_OPKEY = AUTH_SERVER_OPKEY;
        this.USER_ACCESS_TOKEN = 'default_acc_key';
        this.SERVER_RESPONSE_TAG = "___SERVICE_STD_OUT_SEP___"
    }

    setUserAuthKey(key)
	{
		this.USER_AUTH_KEY = key;
	}

}

export default Config;