import {Enum} from "../utils.js";

/**
 * @typedef {Object} Interaction
 * @param {Snowflake} id
 * @param {Snowflake} application_id
 * @param {InteractionType} type
 * @param {ApplicationCommandData | MessageComponentData | ModalSubmitData =} data
 * @param {Object =} guild
 * @param {Snowflake =} guild_id
 * @param {Object =} channel
 * @param {Snowflake =} channel_id
 * @param {Object =} member
 * @param {Object =} user
 * @param {String} token
 * @param {Number} version
 * @param {Object=} message
 * @param {String} app_permissions
 * @param {String} locale
 * @param {String} guild_locale
 * @param {Object[]} entitlements
 * @param {Object<ApplicationIntegration, Snowflake | 0>} authorizing_integration_owners
 * @param {InteractionContextType =} context
 */

/**
 * @typedef {InteractionType}
 * @Enum {Number}
 */

const InteractionType = Enum("PING",
    "APPLICATION_COMMAND",
    "MESSAGE_COMPONENT",
    "APPLICATION_COMMAND_AUTOCOMPLETE",
    "MODAL_SUBMIT");

/**
 * @Enum {Number}
 * @typedef {InteractionContextType}
 */

const InteractionContextType = Object.freeze({GUILD: 0, BOT_DM: 1, PRIVATE_CHANNEL: 2});

/**
 * @typedef {Object} ApplicationCommandData
 * @param {Snowflake} id
 * @param {String} name
 * @param {Number} type
 * @param {Object=} resolved
 * @param {ApplicationCommandInteractionDataOption[]=} options
 * @param {Snowflake=} guild_id
 * @param {Snowflake=} target_id
 */

/**
 * @typedef {Object} MessageComponentData
 * @param {String} custom_id
 * @param {Number} component_type
 * @param {Array=} values
 * @param {Object=} resolved
 */

/**
 * @typedef {Object} ModalSubmitData
 * @param {String} custom_id
 * @param {Array} components
 */


/**
 * @typedef {Object} ResolvedData
 * @param {Object<Snowflake, Object>=} users
 * @param {Object<Snowflake, Object>=} members
 * @param {Object<Snowflake, Object>=} roles
 * @param {Object<Snowflake, Object>=} channels
 * @param {Object<Snowflake, Object>=} messages
 * @param {Object<Snowflake, Object>=} attachments
 */

/**
 * @typedef {Object} ApplicationCommandInteractionDataOption
 * @param {String} name
 * @param {Number} type
 * @param {String | Number | Boolean=} value
 * @param {ApplicationCommandInteractionDataOption[]=} options
 * @param {Boolean=} focused
 */