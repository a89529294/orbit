const jwt = require("jsonwebtoken")

const results = jwt.sign({ foo: "bar" }, "shhhhh", {
  expiresIn: "100s",
})
const header = results.split(".")[0]
const payload = results.split(".")[1]
const signature = results.split(".")[2]
const decodedHeader = Buffer.from(header, "base64").toString("ascii")
const decodedPayload = Buffer.from(payload, "base64").toString("ascii")

console.log(results)
console.log(decodedHeader)
console.log(decodedPayload)
