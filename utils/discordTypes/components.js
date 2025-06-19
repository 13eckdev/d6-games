/**
 * @typedef {object} Component
 * @prop { number } type
 * @prop { number } [id]
 */

/**
 * @typedef { object } ActionRow
 * @extends Component
 * @prop { Component[] } Components
 */

/**
 * @typedef { object } Button
 * @extends Component
 * @prop { number } style
 * @prop { string } [label]
 * @prop { object } [emoji]
 * @prop { string } custom_id
 * @prop { Snowflake } [sku_id]
 * @prop { string } [url]
 * @prop { boolean } [disabled]
 */

import {MessageFlags } from "./Message.js"

/**
 * Enum for component types
 * @enum  { number }
 */
const componentType = {
    ActionRow: 1,
    Button: 2,
    StringSelect: 3,
    TextInput: 4,
    UserSelect: 5,
    RoleSelect: 6,
    MentionableSelect: 7,
    ChannelSelect: 8,
    Section: 9,
    TextDisplay: 10,
    Thumbnail: 11,
    MediaGallery: 12,
    File: 13,
    Separator: 14,
    undefined: 16,
    Container: 17
}


/**
 * Enum for button style
 * @enum { number }
 */
const buttonStyle = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,
    Premium: 6
}


/**
 * Creates a new message object with components
 *
 */
const componentMessage = () => {
    const data = {
        flags: MessageFlags.IS_COMPONENTS_V2,
        components: []
    }

    const _M = {}

    _M.isEphemeral = function() {
        data.flags |= MessageFlags.EPHEMERAL;
        return this;
    }

    _M.addComponents = function(...components) {
        data.components.push(...components);
        return this;
    }

    _M.toJSON = () => data;

    return _M;
}


const componentActionRow = () => {
    const data = {
        type: componentType.ActionRow,
        components: []
    }

    const _A = {}
    _A.setId = function(id) {
        data.id = id;
        return this;
    }

    _A.addComponents = function(...components) {
        data.components.push(...components);
        return this;
    }

    _A.toJSON = () => data;

    return _A;
}

const componentButton = () => {
    const data = {
        type: componentType.Button
    }

    const _B = {}

    _B.setId = function(id) {
        data.id = id;
        return this;
    }

    _B.setStyle = function(style) {
        data.style = style;
        return this;
    }

    _B.setLabel = function(label) {
        data.label = label;
        return this;
    }

    _B.setEmoji = function(emojiObject) {
        data.emoji = emojiObject;
        return this;
    }

    _B.setSku = function(sku) {
        data.sku = sku;
        return this;
    }

    _B.setUrl = function(url) {
        data.url = url;
        return this;
    }

    _B.isDisabled = function(bool = true) {
        data.disabled = bool;
        return this;
    }

    _B.setCustomId = function(customId) {
        data.custom_id = customId;
        return this;
    }

    _B.toJSON = () => data;

    return _B;
}

const componentTextDisplay = () => {
    const data = {
        type: componentType.TextDisplay,
    }

    const _T = {}

    _T.withText = function(text) {
        data.content = text;
        return this;
    }
    _T.setId = function(id) {
        data.id = id;
        return this;
    }

    _T.toJSON = () => data;

    return _T;
}

const componentSeparator = () => {
    const separator = {
        type: componentType.Separator
    }

    const _S = {}

    _S.setId = function(id) {
        separator.id = id;
        return this;
    }

    _S.isDivider = function() {
        separator.divider = true;
        return this;
    }

    _S.largeSpacing = function () {
        separator.spacing = 2;
        return this;
    }

    _S.toJSON = () => separator;

    return _S;
}

const componentContainer = () => {
    const container = {
        type: componentType.Container,
        components: [],
    }

    const _C = {}

    _C.setId = function(id){
        container[id] = id;
        return this;
    }

    _C.setAccentColor = function(color) {
        container.accent_color = color;
        return this;
    }

    _C.isSpoiler = function(){
        container.spoiler = true;
        return this;
    }

    _C.addComponents = function(...components) {
        container.components.push(...components);
        return this;
    }

    _C.toJSON = () => container;

    return _C;
}




export { componentMessage, componentActionRow, componentButton, componentTextDisplay, componentSeparator, componentContainer, buttonStyle };