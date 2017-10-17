const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');

const vside = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START', 'CHANNEL_PINS_UPDATE', 'USER_NOTE_UPDATE']
});
const bob = new Discord.Client({ //NV Bot
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK', 
    'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 
    'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 
    'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
const mann = new Discord.Client({ //RJ Bot
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK', 
    'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 
    'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 
    'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
const miah = new Discord.Client({ //LGA Bot
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK', 
    'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 
    'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 
    'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
const nene = new Discord.Client({ //Gateway Bot
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK', 
    'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 
    'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 
    'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
const susp = new Discord.Client({ //Random servers
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK', 
    'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 
    'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 
    'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});



vside.on("ready", () => {
    vside.user.setGame('vSide');
    console.log(`vSide bots are online!\n${vside.users.size} users found.`);
});
bob.on("ready", () => {
    bob.user.setGame('vSide');
    //console.log(`Bob is online.`);
});
mann.on("ready", () => {
    mann.user.setGame('vSide');
    //console.log(`MannequinOfTheNight is online.`);
});
miah.on("ready", () => {
    miah.user.setGame('vSide');
    //console.log(`Miah is online.`);
});
nene.on("ready", () => {
    nene.user.setGame('vSide');
    //console.log(`Nene is online.`);
});
susp.on("ready", () => {
    susp.user.setGame('vSide');
    //console.log(`SuspiciousMan is online.`);
});


vside.on("message", async message => { 
    if(message.author.bot || message.system) return;
    if(message.channel.type === 'dm') { return; } 

    if (message.content.indexOf(config.prefix) === 0) {
        let args = message.content.slice(config.prefix.length).split(" ");
        let cmd = args[0].toLowerCase();
        args.shift();

        if (cmd === 'hi') {
            message.channel.send(`Hi there ${message.author.toString()}`);
            return; 
        }

        else if (cmd === "eval" && message.author.id === config.owner){
            const code = args.join(" ");
            return evalCmd(message, code);
        }
        
        return;
    } else if (message.content.indexOf("<@"+vside.user.id) === 0 || message.content.indexOf("<@!"+vside.user.id) === 0) {
        return;// message.channel.send(`Use \`${config.prefix}\` to interact with me.`);
    }
    return;
});

susp.on("message", async message => { 
    if (message.author.bot || message.system) return;
    let msgs = ["My clothes tell secrets","find the key...(his eyes dart side to side looking for something)", "I've got Nothing to Hide"];
    if (message.channel.type === 'dm') { 
        return message.channel.send(msgs[Math.floor(Math.random()*msgs.length)]);
    } 

    if (message.content.indexOf("<@"+susp.user.id) === 0 || message.content.indexOf("<@!"+susp.user.id) === 0) {
        return message.channel.send(msgs[Math.floor(Math.random()*msgs.length)]);
    }
    return;
});

bob.on("message", async message => { 
    if (message.author.bot || message.system) return;
    if (message.channel.type === 'dm') { 
        return message.channel.send(`Hey, good to see you again. No trivia today. Try tomorrow.`);
    } //Hey, good to see you again. You already answered this day's trivia. Try tomorrow. 

    if (message.content.indexOf("<@"+bob.user.id) === 0 || message.content.indexOf("<@!"+bob.user.id) === 0) {
        return message.channel.send(`Hey, good to see you again. No trivia today. Try tomorrow.`);
    }
    return;
});






function evalCmd(message, code) {
    if(message.author.id !== config.owner) return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0') //Don't let it post your token
    return text;
}

// Catch Errors before they crash the app.
process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
});
process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
});

vside.login(config.vside);
bob.login(config.bob);
mann.login(config.man);
miah.login(config.miah);
nene.login(config.nene);
susp.login(config.susp);
