const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "ayarlar",
  description: "Botun ayarlarını düzenleyin",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["conf", "config", "ayarlar"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Config = new MessageEmbed()
      .setAuthor("Sunucu Ayarları", client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .addField("Prefix", GuildDB.prefix, true)
      .addField("DJ Rolü", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Ayarlanmadı", true)
      .setDescription(`
Ne düzenlemek istersin?

:one: - Sunucu Prefix(Ön Eki)
:two: - DJ Rolü
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel,
        "❌ | **Cevap vermen çok uzun sürdü. Ayarları düzenlemek istiyorsanız komutu tekrar çalıştırın.!**"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await client.sendTime(
        message.channel,
        "Ön eki ne olarak değiştirmek istiyorsunuz??"
      );
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(
          message.channel,
          "Cevap vermen çok uzun sürdü."
        );
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel,
        `Sunucu öneki başarıyla kaydedildi: \`${prefix}\``
      );
    } else {
      await client.sendTime(
        message.channel,
        "Lütfen `DJ'lerin` sahip olmasını istediğiniz rolü belirtin."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(
          message.channel,
          "Cevap vermen çok uzun sürdü."
        );
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel,
          "Lütfen sadece DJ'ler için istediğiniz rolü belirtin."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel,
        "DJ rolü başarıyla kaydedildi: <@&" + role.id + ">"
      );
    }
  },
};
