const auth = require("./authentication.json")
const k = auth.key
const v = auth.value
module.exports = {
    headers: {
        // the key and the value for the authentication 
        [k]: v
    }
}
