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
import {normalTest, wildTest, normalDice, wildDice} from "../utils/dice.js";
import {
    buttonStyle,
    componentActionRow,
    componentButton,
    componentContainer,
    componentMessage, componentSeparator, componentTextDisplay
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
    const diceToRoll = wild ? wildTest : normalTest;
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


const addWildOneComponents = () => {
    const buttons = [
        componentButton().setLabel("Success with complication. +1 Hero Point").setCustomId("complication").setStyle(buttonStyle.Danger),
        componentButton().setLabel("Success becomes failure due to complication. +2 Hero Points").setCustomId("failure").setStyle(buttonStyle.Danger),
        componentButton().setLabel("Failure accentuated due to complication. +1 Hero Point").setCustomId("failure_ex").setStyle(buttonStyle.Danger)
    ];

    return componentActionRow().addComponents(...buttons);
}

const addWildSixComponents = () => {
    const buttons = [
        componentButton().setLabel("Exceptional success + 1 Hero Point").setCustomId("exceptional_success").setStyle(buttonStyle.Success),
        componentButton().setLabel("Ordinary success + 2 Hero Points").setCustomId("ordinary_success").setStyle(buttonStyle.Success),
        componentButton().setLabel("Roll failed? Explode that 6!").setCustomId("explode_6").setStyle(buttonStyle.Success)
    ];

    return componentActionRow().addComponents(...buttons);
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

    const container = componentContainer().setAccentColor(3368601);

    if (description !== "") { container.addComponents(componentTextDisplay().withText(description).setId(componentIdentifiers.Description)); }

    container.addComponents(...textLines);

    if (wildValue === 1) {
        container.addComponents(largeSpacer, addWildOneComponents().setId(componentIdentifiers.Buttons));
    }

    if (wildValue === 6) {
        container.addComponents(largeSpacer, addWildSixComponents().setId(componentIdentifiers.Buttons));
    }

    const message = componentMessage().addComponents(container);

    return interactionResponse().setType(InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE).withData(message);

}


export default d6;










