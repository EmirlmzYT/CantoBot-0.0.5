const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "temizle",
  description: "Sunucu kuyruğunu temizler",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls", "clear", "temizle"],
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

    if (!player.queue || !player.queue.length || player.queue.length === 0)
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
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **Sıra temizlendi!**");
  },
};
