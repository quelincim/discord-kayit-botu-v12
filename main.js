const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./config.js")
const moment = require('moment')
require("moment-duration-format")
  moment.locale("tr")
const fs = require("fs");                                       
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    console.log(`TEST&REGİSTER BOTU sunucuya giriş sağladı.`)
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });                                                                     
});

client.on('guildMemberAdd', async miaf => {

  const dionysus = config.sunucuid

  const piece = config.kayitKanal;

    client.guilds.cache.get(dionysus).channels.cache.get(piece).send(`
  
  • ${miaf} sunucumuza hoş geldin. Seninle beraber **${miaf.guild.memberCount}** kişiye ulaştık :tada: 
  
  • Hesabınızın kuruluş tarihi: **${moment(miaf.user.createdAt).format('DD/MM/YYYY | HH:mm:ss')}**

  • Sesli odalara girerek kaydınızı yaptırabilirsiniz. <@&${config.teyitci}> sizinle ilgilenecektir.

  `)
});

  setInterval(() => {
        const server = client.guilds.cache.get("868142708668125195"); //Server ID 
 
        server.members.cache.forEach(async member => {
  
 if (member.user.username.includes("‡")) {
            await member.roles.add("868425076184326174").catch(() => {})
        }
}, 60 * 1000)// 60(60 saniye) kısmını değiştirebilirsiniz
    
        client.on("guildMemberAdd", member => {
      let tag = "‡"; //tagınız
      let rol = "868425076184326174"; //tag rol id
     //  let kanal = "873212804906246235" 
   if(member.user.username.includes(tag)){
   //  kanal.send(new Discord.MessageEmbed().setDescription(`${member} adlı kullanıcı sunucumuza taglı bir şekilde giriş yaptı.`).setFooter('Quélincim').setColor(client.config.embedColor))
    member.roles.add(rol)

    }
    })

client.login(config.token)
