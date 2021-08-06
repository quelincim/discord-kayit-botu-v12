const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on("guildMemberAdd", (members) => {
    members.guild.channels.cache
        .get()
        .send('${member}, Hoþgeldin');
});

client.login('');