/**
 *
 * @param {Interaction} interaction
 * @returns {Object} textReply
 */
import {pickRandom} from "../utils/utils.js";
import { wildDice } from "../utils/dice.js";
import {
    componentContainer,
    componentMessage,
    componentSeparator,
    componentTextDisplay
} from "../utils/discordTypes/components.js";
import {componentIdentifiers} from "./commandSettings.js";
import {InteractionCallbackType, interactionResponse} from "../utils/discordTypes/interaction.js";

/**
 *
 * @type {InteractionResponse}
 */
const wrongUser = interactionResponse().setType(InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE)
        .withData(componentMessage().isEphemeral()
            .addComponents(componentTextDisplay().withText("You don't have permission to do that"))
        );



const decomposeComponents = (interaction) => {
    let desc, emoji, total;

    for (const component of interaction.message.components[0].components) {
        if (component.id === componentIdentifiers.Description) {
            desc = component.content;
        } else if (component.id === componentIdentifiers.EmojiLine) {
            emoji = component.content;
        } else if (component.id === componentIdentifiers.DiceTotal) {
            total = component.content;
        }
    }

        const retVal = { emoji, total }
        retVal.user = interaction.member.nick ?? interaction.member.user.username;
        if (desc) { retVal.desc = desc; }

        return retVal;
}

/**
 *
 * @param { string } desc
 * @param { number } total
 * @param { string } emoji
 * @param { string } result
 * @returns { object }
 */
const composeReturnMessage = ({desc, total, emoji, result}) => {
    const container = componentContainer();

    if (desc) { container.addComponents(componentTextDisplay().withText(desc)); }
    container.addComponents(componentTextDisplay().withText(total),
        componentTextDisplay().withText(emoji),
        componentSeparator().largeSpacing().isDivider(),
        componentTextDisplay().withText(result));

    return componentMessage().addComponents(container);
}


/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const explodeSix = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }

    let {desc, emoji, total, user} = decomposeComponents(interaction);
    total = Number(total.split(" ").at(-1).replace("!", ""));
    emoji += " | "

    let newDie;

    do {
        newDie = pickRandom(wildDice);
        total += newDie.value;
        emoji += `${newDie.emoji} `;
    } while (newDie.value === 6)


    const message = composeReturnMessage({desc, emoji, total, result: `-# ${user} exploded the wild die`});
    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}

/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const exceptional_success = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }

    let {desc, emoji, total, user} = decomposeComponents(interaction);

    const message = composeReturnMessage({desc, total, emoji, result:`-# ${user} achieves an exceptional success and gains 1 Hero Point`});

    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}


/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const ordinary_success = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }

    let {desc, emoji, total, user} = decomposeComponents(interaction);
    const message = composeReturnMessage({desc, total, emoji, result: `-# ${user} achieves a normal success and gains 2 Hero Points`});

    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}


/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const complication = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }

    let {desc, emoji, total, user} = decomposeComponents(interaction);

    const message = composeReturnMessage({desc, emoji, total, result: `-# ${user} succeeds with a complication and gains 1 Hero Point`});

    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}

/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const failure = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    let {desc, emoji, total, user} = decomposeComponents(interaction);

    const message = composeReturnMessage({desc, emoji, total, result: `-# ${user} turned a success into a failure due to a complication and gains 2 Hero Points`});

    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}

/**
 *
 * @param { Interaction } interaction
 * @returns { InteractionResponse }
 */
const failure_ex = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }

    let {desc, emoji, total, user} = decomposeComponents(interaction);
    const message = composeReturnMessage({desc, emoji, total, result: `-# ${user}'s failure is accentuate due to a complication and gains 1 Hero Point`});
    return interactionResponse().setType(InteractionCallbackType.UPDATE_MESSAGE).withData(message);
}

export { explodeSix, exceptional_success, ordinary_success, complication, failure, failure_ex };