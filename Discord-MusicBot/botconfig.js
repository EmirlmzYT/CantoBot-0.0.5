module.exports = {
  Admins: ["611846254040842255"], //Admins of the bot
  ExpressServer: true, //If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ".", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/sbySMS7m3v", //Support Server Link
  Token: process.env.Token || "ODc0MjUyNTcyNTQ5MDc5MTEx.YRERKA._KczfYp1JD8FiP3Y13JtvwWoBzw", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "874252572549079111", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "E5Nl7iwQUCSkQZWFezn5dCu14bnWVB1I", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  ServerDeafen: true, //If you want bot to stay deafened
  DefaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": true, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://cdn.discordapp.com/attachments/885265710119526400/900675960024739860/CantoV2.jpg", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "#92000A", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 2205281600, //Bot Inviting Permissions
  Website: process.env.Website || "http://Discord-MusicBot.tu-emirlmzemirl.repl.co", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku
  
  Presence: {
    status: "idle", // You can show online, idle, and dnd
    name: "By Emirlmz | .yardım",// The message shown
    type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

  //Lavalink
 Lavalink: {
    id: "Main",
    host: "lavalink3.tu-emirlmzemirl.repl.co",
    port: 443,
    pass: "youshallnotpass", 
    secure: true // Set this to true if you're self-hosting lavalink on replit.
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "342bd86b0ae44e61aa6108747120c9bb", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "8d364ef403174b429eef8d9e1fa6d3e1", //Spotify Client Secret
  },
};
