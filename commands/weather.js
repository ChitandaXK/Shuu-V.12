const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
  name: "weather",
  liases: ["wr"],
  description: "Get info the weather",
  category: "info",
  usage: "weathet <>",
  execute (client, message, args) {
    
    
    if(!args.length) {
      return message.channel.send("Please input the weather location city")
    }
    
 weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {
 
let embed = new MessageEmbed()
.setTitle(`Weather - ${result[0].location.name}`)
.setColor("#ff2050")
.setDescription("Temperature units can may be differ some time")
.addField("Temperature", `${result[0].current.temperature} Celcius`, true)
.addField("Sky Text", result[0].current.skytext, true)
.addField("Humidity", result[0].current.humidity, true)
.addField("Wind Speed", result[0].current.windspeed, true)//What about image
.addField("Observation Time", result[0].current.observationtime, true)
.addField("Wind Display", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
   message.channel.send(embed)
} catch(err) {
  return message.channel.send(`Input To Get the data of Given \`<city>\` location`)
}
});
    
  }
}
