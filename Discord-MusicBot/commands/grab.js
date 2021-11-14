const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "kaydet",
  description: "Geçerli şarkıyı Direkt Mesajlarınıza kaydeder",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save", "kaydet"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Şu anda oynatılan hiçbir şey yok...**"
      );
    if (!player.playing)
      return client.sendTime(
        message.channel,
        "❌ | **Şu anda oynatılan hiçbir şey yok...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bir şeyi çalmak için bir ses kanalında olmalısınız!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız!**"
      );
    message.author
      .send(
        new MessageEmbed()
          .setAuthor(
            `Şarkı kaydedildi`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setThumbnail(
            `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
          )
          .setURL(player.queue.current.uri)
          .setColor(client.botconfig.EmbedColor)
          .setTitle(`**${player.queue.current.title}**`)
          .addField(
            `⌛ Süre: `,
            `\`${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField(`🎵 Yazar: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `▶ Oynat:`,
            `\`${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }.play ${player.queue.current.uri}\``
          )
          .addField(`🔎 Şuradan kaydedildi::`, `<#${message.channel.id}>`)
          .setFooter(
            `${player.queue.current.requester.tag} Tarafından talep edildi`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          )
      )
      .catch((e) => {
        return message.channel.send("**:x: DM'leriniz devre dışı bırakıldı**");
      });

    client.sendTime(message.channel, "✅ | **Dm'lerini kontrol et :wink:**");
  },
};
