const discord = require("discord.js");
const { prefix } = require("./config.json");
const client = new discord.Client({
  disableEveryone: true,
  disableEvents: ["TYPING_START"]
});
require('dotenv').config();

const { get } = require("snekfetch");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Ping Received");
  response.sendStatus(200);
})
app.listen(process.env.PORT);
setInterval(() => {
  
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on("ready", async () => {
  console.log(`${client.user.username} Yeeyyy watashi now Online Sensei!`);
  client.user.setActivity(`${prefix}help`, {type: "PLAYING"});
});

client.on("warn", info => console.log(info));
client.on("error", console.error)


client.on("message", message => {
   if (message.author.bot) return null;
  if (!message.guild) return;
  
  if(message.content.startsWith(prefix)) {
    
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();
    
    
    try {
    const commandsFile = require(`./commands/${command}.js`);
    commandsFile.run(client, message, args);
  } catch (e) {
    console.log(e.message)
    message.reply("My commnad error (Maintenance)")
  } finally {
    console.log(`${message.author.tag} used ${prefix}${command}`);
  }
    
  
    }
});


client.login(process.env.BOT_TOKEN)
