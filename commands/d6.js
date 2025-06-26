/**
 * @typedef {Object} DiceRollOptions
 * @prop {Number} dice
 * @prop {Number} [pips]
 * @prop {String} [description]
 */

/**
 * @typedef {Object} AggregatedDice
 * @prop {number} total
 * @prop {string} emoji
 */

import {pickRandom} from "../utils/utils.js";
import {normalDice, wildDice} from "../utils/dice.js";
import {
    componentActionRow,
    componentContainer,
    componentMessage, componentSeparator, componentStringSelect, componentTextDisplay, selectOption
} from "../utils/discordTypes/components.js";
import {InteractionCallbackType, interactionResponse} from "../utils/discordTypes/interaction.js";
import {componentIdentifiers} from "./commandSettings.js";


/**
 *
 * @param {Number} num
 * @param {Boolean} wild
 * @returns {DieCode[]}
 */
const rollDice = (num, wild = false) => {
    const diceToRoll = wild ? wildDice : normalDice;
    return Array.from({length: num}, _ => pickRandom(diceToRoll));
}

/**
 *
 * @param {DieCode[]} dice
 * @returns {AggregatedDice}
 */
const aggregateDice = (dice) => dice.reduce( (obj, die) => {
    obj.emoji += `${die.emoji} `;
    obj.total += die.value;
    return obj;
}, {emoji: "", total: 0});

const addWildOneSelect = () => {
    const select = componentStringSelect().setCustomId("wildone").addPlaceholder("Wild die is a 1!")
        .addOption(selectOption().setLabel("Complication").setValue("complication").addDescription("(On success)").addEmoji({name: "p1", id: "1387813975088959658"}))
        .addOption(selectOption().setLabel("Failure").setValue("failure").addDescription("(On success)").addEmoji({name: "p2", id: "1387813987726528651"}))
        .addOption(selectOption().setLabel("Exceptional failure").setValue("failure_ex").addDescription("(On failure)").addEmoji({name: "p1", id: "1387813975088959658"}))

    return componentActionRow().addComponents(select);
}

const addWildSixSelect = () => {
    const select = componentStringSelect().setCustomId("wildsix").addPlaceholder("Wild die is a 6!")
        .addOption(selectOption().setLabel("Exceptional Success").setValue("exceptional_success").addDescription("(On success)").addEmoji({name: "p1", id: "1387813975088959658"}))
        .addOption(selectOption().setLabel("Ordinary Success").setValue("ordinary_success").addDescription("(On success)").addEmoji({name: "p2", id: "1387813987726528651"}))
        .addOption(selectOption().setLabel("Explode Wild Die").setValue("explode_6").addDescription("(On failure)").addEmoji({name: "reroll", id: "1387813070381781114"}))

    return componentActionRow().addComponents(select);
}

const largeSpacer = componentSeparator().isDivider().largeSpacing();

/**
 *
 * @param {Interaction} interaction
 * @returns { InteractionResponse } textReply
 */
const d6 = (interaction) => {
    /**
     * @type {DiceRollOptions}
     */
    const rollOptions = interaction.data.options.reduce( (obj, opt) => {
        obj[opt.name] = opt.value;
        return obj;
    }, {dice: 0});

    /**
     * @type {DieCode[]}
     */

    const dice = rollOptions.dice === 1 ? rollDice(1, true) :
        [...rollDice(rollOptions.dice-1), ...rollDice(1, true)];

    /**
     *
     * @type {AggregatedDice}
     */
    const diceBlock = aggregateDice(dice);

    const wildValue = dice.at(-1).value;

    const description = `${rollOptions.description ? `## "${rollOptions.description}"` : ""}`;
    const diceTotal = `### You got ${diceBlock.total}!`;
    const emojiLine = `## ${diceBlock.emoji}${rollOptions.pips ? `+${rollOptions.pips}` : ""}`;

    const textLines = [
        componentTextDisplay().withText(diceTotal).setId(componentIdentifiers.DiceTotal),
        componentTextDisplay().withText(emojiLine).setId(componentIdentifiers.EmojiLine)
    ]

    const container = componentContainer();

    if (description !== "") { container.addComponents(componentTextDisplay().withText(description).setId(componentIdentifiers.Description)); }

    container.addComponents(...textLines);

    if (wildValue === 1) {
        container.addComponents(largeSpacer, addWildOneSelect().setId(componentIdentifiers.Buttons));
    }

    if (wildValue === 6) {
        container.addComponents(largeSpacer, addWildSixSelect());//.addId(componentIdentifiers.Buttons));
    }

    const message = componentMessage().addComponents(container);

    return interactionResponse().setType(InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE).withData(message);

}


export default d6;










