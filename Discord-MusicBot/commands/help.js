const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "yardım",
  description: "Bot hakkında bilgi verir",
  usage: "[komut]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd", "yardım"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `${client.user.username} Yardım Menüsü`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `Her bir komut türü hakkında bilgi almak için ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }yardım [Komut] | İyi dinlemeler!`
      ).setDescription(`${Commands.join("\n")}
  
  Canto Bot Sürümü: v${require("../package.json").version}
  [✨ Destek Sunucusu](${
    client.botconfig.SupportServer
  }) | By [Emirlmz](https://youtube.com/Emirlmz) | [Kontrol Paneli](${client.botconfig.Website})`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Bu komut bulunamadı.`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Komut: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Kısaltması", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Kullanım",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "İzin",
          "Üye: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },
};
