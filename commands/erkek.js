const Discord = require('discord.js');
const config = require('../config.js');
client = new Discord.Client();

exports.run = async (client, message, args) => {


    try {

        if (!message.member.roles.cache.has(config.teyitci)) return message.reply('Yetersiz yetki!'); //eğer yetkisi yoksa dönüt mesajı attırıyoruz.

        const piece = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //üyeyi çekiyoruz yani hem etiket hemde id ile olur.
        const miaf = args[1] //isim
        const dionysus = args[2] //yaş

        if (!piece) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${message.author}**\n\nDoğru kullanım Örnek: !e **@üye** isim yaş`).setFooter(`Quélincim was here.`).setColor("RANDOM").setTimestamp());
        if (!miaf) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${message.author}**\n\nDoğru kullanım Örnek: !e @üye **isim** yaş`).setFooter(`Quélincim was here.`).setColor("RANDOM").setTimestamp());
        if (!dionysus) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${message.author}**\n\nDoğru kullanım Örnek: !e @üye isim **yaş**`).setFooter(`Quélincim was here.`).setColor("RANDOM").setTimestamp());

        message.channel.send(new Discord.MessageEmbed().setDescription(`**${message.author}**\n\n${piece}adlı üye sunucumuza __erkek__<@&${config.erkekRol}><@&${config.erkekRol2}> olarak kayıt edilmiştir.`).setFooter(`Quélincim was here.`).setColor("RANDOM").setTimestamp())
        piece.setNickname(`${miaf} | ${dionysus}`).catch(e => message.channel.send(`Benden Üstte Olduğu İçin İsmini Değiştiremedim.`))
        await piece.roles.add(config.erkekRol) //eğer başka rolleriniz de varsa onları da ek olarak congif.json da belirtip alt satıra kopyalayıp yapın.
        await piece.roles.add(config.erkekRol2)
        await piece.roles.remove(config.kayitsiz)
        message.guild.channels.cache.get(config.genelChat).send(`${piece} aramıza katıldı :tada: Sunucumuz şuanda **${message.guild.memberCount}** kişi!`)

    } catch (e) {
        message.channel.send(`Kayıt Yetkim veya Rolüm Yok`)
    }

};
exports.config = {
  name: "erkek",
  guildOnly: true,
  aliases: ["e"],
};
