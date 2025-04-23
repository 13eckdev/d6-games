import {isNull, not} from "../utils/utils.js";

/**
 * @typedef Connection
 * @property {http.IncomingMessage} request the HttpRequest
 * @property {http.ServerResponse} response the HttpResponse
 * @property {Map} context a container for any data related to this specific Connection
 */


/**
 * @class RequestBody
 * @classDesc a container to hold the
 * body of an HTTP request.
 */
class RequestBody {
    #buffer;
    #string;
    #json;
    #urlSearchParams;
    #object;

    /**
     * @hideconstructor
     * @param {Array} buff data array to bufferify
     */
    constructor(buff) {
        this.#buffer = buff;
        this.#string = null;
        this.#json = null;
        this.#object = null;
        this.#urlSearchParams = null;
    }

    /**
     * @returns {Buffer}
     */
    buffer() {
        return this.#buffer;
    }

    /**
     *
     * @returns {string}
     */
    string() {
        if (isNull(this.#string)) { this.#string = this.#buffer.toString(); }
        return this.#string;
    }

    /**
     *
     * @returns {JSON}
     */
    json() {
        if (isNull(this.#json)) { this.#json = JSON.stringify(this.string()); }
        return this.#json;
    }
    object() {
        if (isNull(this.#object)) { this.#object = JSON.parse(this.#string); }
        return this.#object;
    }

    /**
     *
     * @returns {URLSearchParams}
     */
    urlSearchParams() {
        if (isNull(this.#urlSearchParams)) { this.#urlSearchParams = new URLSearchParams(this.string()); }

        return this.#urlSearchParams;
    }
}

/**
 * @async
 * @param {Connection} cxn
 * @returns {Promise<Connection>}
 * @desc If available, will add `Connection.context.get("body")`
 * @see {@link RequestBody}
 */
const getRequestBody = (cxn) => new Promise((resolve, reject) => {
    const CONTENT_LENGTH = parseInt(cxn.request.headers["content-length"]);
    if (not(CONTENT_LENGTH) && not(cxn.request.headers["transfer-encoding"])) { resolve(cxn); }
    const buff = [];

    cxn.request.on("data", (chunk) => {
        buff.push(chunk);
    });

    cxn.request.on("end", () => {
        const body = new RequestBody(buff);
        cxn.context.set("body", body);
        resolve(cxn);
    });

    cxn.request.on("error", (err) => {
        cxn.context.set("error", err);
        reject(cxn);
    });

});

export {
    getRequestBody,
}