import {Enum} from "../utils.js";


const InteractionType = Object.freeze({
    PING: 1,
    APPLICATION_COMMAND: 2,
    MESSAGE_COMPONENT: 3,
    APPLICATION_COMMAND_AUTOCOMPLETE: 4,
    MODAL_SUBMIT: 5
});

/**
 * @Enum {Number}
 * @typedef {InteractionContextType}
 */

const InteractionContextType = Object.freeze({GUILD: 0, BOT_DM: 1, PRIVATE_CHANNEL: 2});

/**
 * @typedef {Object} ApplicationCommandOptionType
 * @enum {Number}
 */
const ApplicationCommandOptionType = Object.freeze({
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10,
    ATTACHMENT: 11
});


/**
 * @typedef {Object} InteractionCallbackType
 * @Enum {Number}
 */
const InteractionCallbackType = Object.freeze({
    "PONG": 1,
    "CHANNEL_MESSAGE_WITH_SOURCE": 4,
    "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE": 5,
    "DEFERRED_UPDATE_MESSAGE": 6,
    "UPDATE_MESSAGE": 7,
    "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT": 8,
    "MODAL": 9,
    "PREMIUM_REQUIRED": 10,
    "LAUNCH_ACTIVITY": 12
})


const interactionResponse = () => {
    const _data = {
        type: undefined,
    }

    const _R = {}

    _R.setType = function(type) {
        _data.type = type;
        return this;
    }

    _R.withData = function(data) {
        _data.data = data;
        return this;
    }

    _R.toJSON = function() {
        return _data;
    }

    return _R;
}

/**
 * @typedef {Object} Interaction
 * @prop {Snowflake} id
 * @prop {Snowflake} application_id
 * @prop {InteractionType} type
 * @prop {ApplicationCommandData | MessageComponentData | ModalSubmitData =} data
 * @prop {Object =} guild
 * @prop {Snowflake =} guild_id
 * @prop {Object =} channel
 * @prop {Snowflake =} channel_id
 * @prop {Object =} member
 * @prop {Object =} user
 * @prop {String} token
 * @prop {Number} version
 * @prop {Object=} message
 * @prop {String} app_permissions
 * @prop {String} locale
 * @prop {String} guild_locale
 * @prop {Object[]} entitlements
 * @prop {Object<ApplicationIntegration, Snowflake | 0>} authorizing_integration_owners
 * @prop {InteractionContextType =} context
 */

/**
 * @typedef {InteractionType}
 * @Enum {Number}
 */


/**
 * @typedef {Object} ApplicationCommandData
 * @prop {Snowflake} id
 * @prop {String} name
 * @prop {Number} type
 * @prop {Object=} resolved
 * @prop {ApplicationCommandInteractionDataOption[]=} options
 * @prop {Snowflake=} guild_id
 * @prop {Snowflake=} target_id
 */


/**
 * @typedef {Object} MessageComponentData
 * @prop {String} custom_id
 * @prop {Number} component_type
 * @prop {Array=} values
 * @prop {Object=} resolved
 */


/**
 * @typedef {Object} ModalSubmitData
 * @prop {String} custom_id
 * @prop {Array} components
 */


/**
 * @typedef {Object} ResolvedData
 * @prop {Object<Snowflake, Object>=} users
 * @prop {Object<Snowflake, Object>=} members
 * @prop {Object<Snowflake, Object>=} roles
 * @prop {Object<Snowflake, Object>=} channels
 * @prop {Object<Snowflake, Object>=} messages
 * @prop {Object<Snowflake, Object>=} attachments
 */

/**
 * @typedef {Object} ApplicationCommandInteractionDataOption
 * @prop {String} name
 * @prop {ApplicationCommandOptionType} type
 * @prop {String | Number | Boolean=} value
 * @prop {ApplicationCommandInteractionDataOption[]=} options
 * @prop {Boolean=} focused
 */


/**
 * @typedef {Object} MessageInteraction
 * @prop {Snowflake} id
 * @prop {InteractionType} type
 * @prop {String} name
 * @prop {Object} user
 * @prop {Object=} member
 */


/**
 * @typedef {Object} InteractionResponse
 * @prop {InteractionCallbackType} type
 * @prop {Object=} data
 */

/**
 * @typedef {Object} InteractionCallbackMessage
 * @prop {Boolean=} tts
 * @prop {String=} content
 * @prop {Object[]=} embeds
 * @prop {Object=} allowed_mentions
 * @prop {MessageFlags=} flags
 * @prop {Object[]=} components
 * @prop {Object[]=} attachments
 * @prop {Object=} poll
 */

/**
 * @typedef {Object} InteractionCallbackAutocomplete
 * @prop {Object[]=} choices
 */

/**
 * @typedef {Object} InteractionCallbackModal
 * @prop {String} custom_id
 * @prop {String} title
 * @prop {Object[]} components
 */

/**
 * @typdef {Object} InteractionCallbackResponse
 * @prop {Interaction} interaction
 * @prop {InteractionCallbackObject=} resource
 */

/**
 * @typedef {Object} InteractionCallbackObject
 * @prop {Snowflake} id
 * @prop {Number} type
 * @prop {String=} activity_instance_id
 * @prop {Snowflake=} response_message_id
 * @prop {Boolean=} response_message_loading
 * @prop {Boolean=} response_message_ephemeral
 */


export { InteractionType, InteractionContextType, ApplicationCommandOptionType, InteractionCallbackType, interactionResponse }