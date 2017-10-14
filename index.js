const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');

const vside = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
const bob = new Discord.Client({ //NV Bot
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
const mann = new Discord.Client({ //RJ Bot
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
const miah = new Discord.Client({ //LGA Bot
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
const nene = new Discord.Client({ //Gateway Bot
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
const susp = new Discord.Client({ //Random servers
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

vside.on("ready", () => {
    vside.user.setGame('vSide');
    console.log(`vSide is online!\n${vside.users.size} users found.`);
});
bob.on("ready", () => {
    bob.user.setGame('vSide');
    console.log(`Bob is online.`);
});
mann.on("ready", () => {
    mann.user.setGame('vSide');
    console.log(`MannequinOfTheNight is online.`);
});
miah.on("ready", () => {
    miah.user.setGame('vSide');
    console.log(`Miah is online.`);
});
nene.on("ready", () => {
    nene.user.setGame('vSide');
    console.log(`Nene is online.`);
});
susp.on("ready", () => {
    susp.user.setGame('vSide');
    console.log(`SuspiciousMan is online.`);
});


vside.on("message", async message => { 
    if(message.author.vside || message.system) return;
    if(message.channel.type === 'dm') { return; } 

    if (message.content.indexOf(config.prefix) === 0) {
        let args = message.content.slice(config.prefix.length).split(" ");
        let cmd = args[0].toLowerCase();
        args.shift();

        if (cmd === 'hi' || cmd === 'hello') {
            message.channel.send(`Hi there ${message.author.toString()}`);
            return; 
        }
        else if (cmd === "eval" && message.author.id === config.owner){
            const code = args.join(" ");
            return evalCmd(message, code);
        }
        else { return; }
    } else if (message.content.indexOf("<@"+vside.user.id) === 0 || message.content.indexOf("<@!"+vside.user.id) === 0) {
        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`);
    }
    return;
});


bob.on("message", (message) => require("./events/bob.js")(bob, message))








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
