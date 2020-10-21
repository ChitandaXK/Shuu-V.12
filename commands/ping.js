module.exports = {
    name: "ping",
    aliases: ["pg"],
    category: "info",
    description: "Pinging the bot",
    usage: "[command | aliases]",
    async execute (client, message, args) {

     const msg = await message.channel.send('💥 Pinging....');
      msg.edit(`💥 Pong!! ${client.ws.ping}ms`)
  }
};
