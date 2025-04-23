import {createPublicKey, verify} from "node:crypto";
import {not} from "../utils/utils.js";
import d6 from "../commands/d6.js";
import {exceptional_success, explodeSix, failure, failure_ex, ordinary_success} from "../commands/d6Buttons.js";


const pubKey = "acda45c91f61e68d267d51d44a3fbd8142859875b77a1f7198421b7ab32f654d";
const cryptoKey = Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), Buffer.from(pubKey,'hex')]);
const verifyKey = createPublicKey({format: 'der',type: 'spki', key: cryptoKey});


/**
 *
 * @param {Connection} cxn
 * @returns {Promise<Connection>}
 */
const checkAuth = (cxn) => new Promise((resolve) => {
    const headers = cxn.request.headers;
    const timestamp = headers['x-signature-timestamp'];
    const sig = Buffer.from(headers['x-signature-ed25519'], 'hex');
    const data = Buffer.from(timestamp+cxn.context.get("body").string());
    const isVerified = verify(null, data, verifyKey, sig);
    cxn.context.set("verified", isVerified);
    resolve(cxn);
});


/**
 *
 * @param {Connection} cxn
 * @returns {Promise<Connection>}
 */
const processPayload = (cxn) => new Promise((resolve) => {
    const {response, context} = cxn;
    if (not(context.get("verified"))) {
        response.writeHead(401, {"Content-Type": "text/plain"}).end("invalid request signature");
        return resolve(cxn);
    }

    const body = context.get("body").object();
    if (body.type === 1) response.writeHead(200, {"Content-Type": "application/json"}).end(JSON.stringify({type: 1}));
    resolve(cxn);
});


/**
 *
 * @param {Promise<Connection>} cxn
 * @returns {Promise<Connection>}
 */
const handleCommands = (cxn) => new Promise((resolve) => {
    const {response, context} = cxn;
    if (response.writableEnded) return resolve(cxn);

    let reply;
    switch (context.get("body").object().data.name) {
        case "d6":
            reply = d6(context.get("body").object());
            break;
    }
    switch (context.get("body").object().data.custom_id) {
        case "rolled_1":
        case "explode_6":
            reply = explodeSix(context.get("body").object());
            break;
        case "exceptional_success":
            reply = exceptional_success(context.get("body").object());
            break;
        case "ordinary_success":
            reply = ordinary_success(context.get("body").object());
            break;
        case "failure":
            reply = failure(context.get("body").object());
            break;
        case "failure_ex":
            reply = failure_ex(context.get("body").object());
            break;
    }


    response.writeHead(200, {"content-type": "application/json"}).end(JSON.stringify(reply));

    resolve(cxn);
});

export { checkAuth, processPayload, handleCommands };