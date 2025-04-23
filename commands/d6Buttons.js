/**
 *
 * @param {Interaction} interaction
 * @returns {Object} textReply
 */
import {pickRandom} from "../utils/utils.js";
import { wildTest} from "../utils/dice.js";


const wrongUser = {
    type: 4,
    data: {
        content: "You don't have permission to do that",
        flags: 64
    }
}


const decomposeComponents = (components) => components.length === 2 ? {desc: "", emoji: components[1], total: components[0]} : {desc: components[0], emoji: components[2], total: components[1]};

const explodeSix = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components[0].components;
    const user = interaction.member.nick ?? interaction.member.user.username;

    let {desc, emoji, total} = decomposeComponents(innerComponents);
    total = Number(innerComponents[1].content.split(" ")[3].replace("!", ""));

    emoji.content += " | "

    let newDie;

    do {
        newDie = pickRandom(wildTest);
        total += newDie.value;
        emoji.content += `${newDie.emoji} `;
    } while (newDie.value === 6)

    const container = {
        type: 17,
        accent_color: 3368601,
        components: [{type: 10, content: `### You got ${total}!`}, emoji, {type: 10, content: `-# ${user} exploded the wild die`}]
    }

    if (desc !== "") { container.components.unshift(desc); }

    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: [container]
        }
    }
}


const exceptional_success = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components//.components;
    innerComponents.pop();

    const user = interaction.member.nick ?? interaction.member.user.username;

    innerComponents.push({type: 10, content: `-# ${user} achieves an exceptional success and gained 1 Hero Point`})


    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: innerComponents
        }
    }

}


const ordinary_success = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components//.components;
    innerComponents.pop();

    const user = interaction.member.nick ?? interaction.member.user.username;

    innerComponents.push({type: 10, content: `-# ${user} gained 2 Hero Points`})


    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: innerComponents
        }
    }
}


const complication = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components//.components;
    innerComponents.pop();

    const user = interaction.member.nick ?? interaction.member.user.username;

    innerComponents.push({type: 10, content: `-# ${user} succees with a complication and gained 1 Hero Point`})

    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: innerComponents
        }
    }
}


const failure = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components//.components;
    innerComponents.pop();

    const user = interaction.member.nick ?? interaction.member.user.username;

    innerComponents.push({type: 10, content: `-# ${user} turned a success into a failure due to a complication and gained 2 Hero Points`})

    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: innerComponents
        }
    }
}


const failure_ex = (interaction) => {
    if (interaction.message.interaction_metadata.user.id !== interaction.member.user.id) {
        return wrongUser;
    }
    const innerComponents = interaction.message.components//.components;
    innerComponents.pop();

    const user = interaction.member.nick ?? interaction.member.user.username;

    innerComponents.push({type: 10, content: `-# ${user}'s failure is accentuate due to a complication and gained 1 Hero Point`})

    return {
        type: 7,
        data: {
            flags: 1 << 15,
            components: innerComponents
        }
    }
}


export { explodeSix, exceptional_success, ordinary_success, complication, failure, failure_ex };