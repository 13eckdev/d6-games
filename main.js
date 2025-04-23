import { createServer } from "node:http";

import { getRequestBody } from "./server/server.js";


import {checkAuth, handleCommands, processPayload} from "./server/discordValidator.js";

/**
 *
 * @type {Server<typeof IncomingMessage, typeof ServerResponse>}
 */
const server = createServer((req, res) => {
    /** @type {Map<string, *>} */
    const ctx = new Map();
    // const url = new URL("https://localhost", `${req.headers.host}`);
    // ctx.set("url", url);
    const cxn = {request: req, response: res, context: ctx};
    Promise.resolve(cxn)
        .then(getRequestBody)
        .then(checkAuth)
        .then(processPayload)
        .then(handleCommands)
        .catch(console.error);
});

server.listen(9001, () => console.log("listening on port 9001"))
