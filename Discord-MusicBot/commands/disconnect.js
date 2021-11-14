const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "çıkış",
  description: "Müziği durdurur ve ses kanalından çıkar",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "fişi çek", "çıkış"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız**"
      );
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Şu anda oynatılan hiçbir şey yok...**"
      );
    await client.sendTime(message.channel, ":electric_plug: | **Fiş Çekildi!**");
    await message.react("✅");
    player.destroy();
  },
};
