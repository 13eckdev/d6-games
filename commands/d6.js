/**
 * @typedef {Object} DiceRollOptions
 * @param {Number} dice
 * @param {Number} [pips]
 * @param {String} [description]
 */

/**
 * @typedef {Object} AggregatedDice
 * @param {Number} total
 * @param {String} emoji
 */

import {pickRandom} from "../utils/utils.js";
import {normalTest, wildTest, normalDice, wildDice} from "../utils/dice.js";

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


const wildOne = {
    type: 1,
    components: [
        {
            type: 2,
            style: 4,
            custom_id: "complication",
            label: "Success with complication. +1 Hero Point",
        },
        {
            type: 2,
            style: 4,
            custom_id: "failure",
            label: "Success becomes failure due to complication. +2 Hero Points",
        },
        {
            type: 2,
            style: 4,
            custom_id: "failure_ex",
            label: "Failure accentuated due to complication. +1 Hero Point",
        }
    ]
}

const wildSix = {
    type: 1,
    components: [
        {
            type: 2,
            style: 3,
            custom_id: "exceptional_success",
            label: "Exceptional success + 1 Hero Point",
        },
        {
            type: 2,
            style: 3,
            custom_id: "ordinary_success",
            label: "Ordinary success + 2 Hero Points",
        },
        {
            type: 2,
            style: 3,
            custom_id: "explode_6",
            label: "Roll failed? Explode that 6!",
        }
    ]
}

/**
 *
 * @param {Interaction} interaction
 * @returns {Object} textReply
 */
const d6 = (interaction) => {
    /**
     * @type {DiceRollOptions}
     */
    const rollOptions = interaction?.data?.options.reduce( (obj, opt) => {
        obj[opt.name] = opt.value;
        return obj;
    }, {});


    /**
     * @type {Array<DieCode>}
     */

    const dice = rollOptions.dice === 1 ? rollDice(1, true) :
        [...rollDice(rollOptions.dice-1), ...rollDice(1, true)];


    const diceBlock = aggregateDice(dice);

    const wildValue = dice.at(-1).value;

    const description = `${rollOptions.description ? `## "${rollOptions.description}"` : ""}`;
    const diceTotal = `### You got ${diceBlock.total}!`;
    const emojiLine = `### ${diceBlock.emoji}${rollOptions.pips ? `+${rollOptions.pips}` : ""}`;


    const textLines = [{ type: 10, content: diceTotal }, { type: 10, content: emojiLine }];

    if (description !== "") { textLines.unshift({type: 10, content: description}); }

    const container = {
        type: 17,
        accent_color: 3368601,
        components: textLines
    }

    let retObj = {
        type: 4,
        data: {
            flags: 1 << 15,
            components: [container]
        }
    }

    if (wildValue === 1) {
        retObj.data.components.push(wildOne);
    }

    if (wildValue === 6) {
        retObj.data.components.push(wildSix);
    }

    return retObj;
}


export default d6;










