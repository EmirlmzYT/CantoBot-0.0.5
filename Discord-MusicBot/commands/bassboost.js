const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
  yok: 0.0,
  düşük: 0.2,
  normal: 0.3,
  yüksek: 0.35,
};
module.exports = {
  name: "bas",
  description: "Bas artırma ses efektini etkinleştirir",
  usage: "<yok|düşük|normal|yüksek>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["bb", "bass", "bassboost"],
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
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız!**"
      );

    if (!args[0])
      return client.sendTime(
        message.channel,
        "**Lütfen bir bas yükseltme seviyesi sağlayın. \nKullanılabilir Düzeyler:** `yok`, `düşük`, `orta`, `yüksek`"
      ); //kullanıcı argüman sağlamıyorsa [argümanlar]

    let level = "yok";
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();

    player.setEQ(
      ...new Array(3)
        .fill(null)
        .map((_, i) => ({ band: i, gain: levels[level] }))
    );

    return client.sendTime(
      message.channel,
      `✅ | **Bass seviyesini şuna ayarlayın:** \`${level}\``
    );
  },
};
