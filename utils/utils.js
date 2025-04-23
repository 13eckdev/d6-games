/**
 * @private
 * @param {*} v the accumulated value
 * @param {function} fn the next function in the sequence
 */
const syncReducer = (v, fn) => fn(v);


/**
 * @description Curried function that takes
 * in an array of functions to run on data.
 * Then returns the modified data
 * @param {...function} fns
 * @returns {(data: *) => *}
 */
const pipe = (...fns) => (data) => fns.reduce(syncReducer, data);


/**
 * @param {Promise<*>} v The returned value from the prior promise
 * @param {function} fn the next function to run in the sequence
 * @returns {Promise<*>}
 */
const asyncReducer = (v, fn) => v.then(fn);


/**
 * @description Async curried function that takes
 * in an array of functions to run on data.
 * Then returns the modified data via Promise.
 * @param {...function} fns
 * @returns {function(*): Promise<*>}
 */
const pipeAsync = (...fns) => (data) => fns.reduce(asyncReducer, Promise.resolve(data));

/**
 * @description Converts a value to its inverse boolean
 * @param {*} val
 * @returns {boolean}
 */
const not = (val) => !val;


/**
 * @description checks if the value
 * is not undefined
 * @param {*} val
 * @returns {boolean}
 */
const notUndefined = (val) => val !== undefined;


/**
 * @description checks if the value
 * is not null
 * @param {*} val
 * @returns {boolean}
 */
const notNull = (val) => val !== null;


/**
 * @description checks if the value
 * is undefined
 * @param {*} val
 * @returns {boolean}
 */
const isUndefined = (val) => val === undefined;


/**
 * @description checks if the value
 * is null
 * @param {*} val
 * @returns {boolean}
 */
const isNull = (val) => val === null;

/**
 *
 * @param {Array} arr
 * @returns {*}
 */
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];


/**
 *
 * @param {String}args
 * @constructor
 * @returns {Object}
 */
const Enum = (...args) =>Object.freeze(
    args.reduce( (obj, key, idx) => (obj[key] = (idx+1), obj), {})
);

export {
    not,
    notUndefined,
    notNull,
    isUndefined,
    isNull,
    pipe,
    pipeAsync,
    pickRandom,
    Enum
}