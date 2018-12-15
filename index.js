const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready',() => {
    console.log('bot on');
    bot.user.setGame("/help")
});


var prefix = '/'
bot.on('message', (message) => {
    
    if(message.content.startsWith(prefix + 'roll') || message.content.startsWith(prefix + 'dice')){
        var roll = Math.floor(Math.random() * 6) + 1;
        const dice = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#00FFFF').setDescription(':game_die: 6 sided || ' + message.author.username.toString() + ' you have rolled a ' + roll + '!')
        message.channel.sendEmbed(dice, '', { disableEveryone: true });
    }
    
    else if(message.content.startsWith(prefix + '8ball')){
        var ball = Math.floor(Math.random() * 12) + 1;
        if(ball == 11 || ball == 12){
            const embedYes = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#00FF00').setDescription(':8ball: Without question! (yes) :white_check_mark:')
            message.channel.sendEmbed(embedYes, '', { disableEveryone: true });
        }else if(ball == 9 || ball == 10){
            const embedYes = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#00FF00').setDescription(':8ball: Isnt it obvious? (yes) :white_check_mark:')
            message.channel.sendEmbed(embedYes, '', { disableEveryone: true });
        }else if(ball == 7 || ball == 8){
            const embedMaybe = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#FFD700').setDescription(':8ball: I\'m not entirely sure! (maybe) :thinking:')
            message.channel.sendEmbed(embedMaybe, '', { disableEveryone: true });
        }else if(ball == 5 || ball == 6){
            const embedMaybe = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#FFD700').setDescription(':8ball: Possibly! (maybe) :thinking:')
            message.channel.sendEmbed(embedMaybe, '', { disableEveryone: true });
        }else if(ball == 3 || ball == 4){
            const embedNo = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#FF0000').setDescription(':8ball: Definitely not! (no) :x:')
            message.channel.sendEmbed(embedNo, '', { disableEveryone: true });
        }else if(ball == 1 || ball == 2){
            const embedNo = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#FF0000').setDescription(':8ball: LOL No! (no) :x:')
            message.channel.sendEmbed(embedNo, '', { disableEveryone: true });
        }
    }
     

    else if(message.content.startsWith(prefix + 'avatar')){
        message.channel.sendMessage(message.author.avatarURL);
    }

    else if(message.content.startsWith(prefix + 'bedtime') || message.content.startsWith(prefix + 'bed')){
        const bed = new Discord.RichEmbed().setAuthor('RESULTS', '').setColor('#00FFFF').setDescription(':waning_gibbous_moon: || ' + message.author.username.toString() + ' || :waxing_gibbous_moon:' + '\n is going to bed goodnight!')
        message.channel.sendEmbed(bed, '', { disableEveryone: true });
    }

    else if(message.content.startsWith(prefix + 'help')){
        const bed = new Discord.RichEmbed().setAuthor('CURRENT HELP FOR THE MATERIALS', '').setColor('#00FFFF')
        .setDescription('\n **/help - (Brings up this help message in your DM\'s) \n**' + 
        '\n **/roll & /dice - (Rolls a 6 sided dice to get a random number between 1 and 6) \n**' +
        '\n **/8ball [question] - (Creates a yes no or maybe question response for your questions)** \n' +
        '\n **/ping - (Sends a ping message to the bot and in reply sends pong to see the response time)** \n' +
        '\n **/avatar - (Puts a link to your avatar in the chat so you can download it)** \n' +
        '\n **/bed & /bedtime - (Announces to the server that you are going to bed)**' +
        '\n **/report @user reason \n**' +
        '\n **STAFF COMMANDS** \n' +
        '\n **/ban @user (reason)** \n' +
        '\n **/kick @user (reason)** \n' )
        .setColor('RED')
        message.channel.sendEmbed(bed, '', { disableEveryone: true });   
    }
    else if(message.content.startsWith(prefix + 'ping')){
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`**Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms**`);
            message.react('🏓')
        });
    }
    
});
//WELCOME
bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find("name", "》general")
    let memberavatar = member.user.avatarURL
    if (!channel) return;
    let embed = new Discord.RichEmbed()
    .setColor('RED')
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | name : ", `${member}`)
    .addField(":id: | User :", `${member.id}`)
    .addField(":shield: | You are the", `${member.guild.memberCount}` + `  **MEMBER**`)
    .addField("Server", `**${member.guild.name}**`)
    .setFooter(member.guild.name)
    .setTimestamp()
    
    channel.send(embed)
    channel.send(member.toString() +" **Welcome!** **Make sure to check out #self-roles / #colour-role and rules. Have Fun!**");

    
    
    
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    var prefix = '/'
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //KICK
    if(cmd === `${prefix}kick`){
  
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Can't find user!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to kick dumbo");
      
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#e56b00")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Tiime", message.createdAt)
      .addField("Reason", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "logs");
      if(!kickChannel) return message.channel.send("Can't find logs channel.");
  
      message.guild.member(kUser).kick(kReason);
      message.channel.sendEmbed(kickEmbed);
  
      return;
    }
    //BAN
    if(cmd === `${prefix}ban`){
  
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to ban dumbo");
    
  
      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#bc0000")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
  
      let incidentchannel = message.guild.channels.find(`name`, "logs");
      if(!incidentchannel) return message.channel.send("Can't find logs channel.");
  
      message.guild.member(bUser).ban(bReason);
      message.channel.sendEmbed(banEmbed);
  
  
      return;
    }
  
    //REPORT
    if(cmd === `${prefix}report`){
  
      //!report @ned this is the reason
  
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let rreason = args.join(" ").slice(22);
  
      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#15f153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", rreason);
  
      let reportschannel = message.guild.channels.find(`name`, "》reports");
      if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
  
  
      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed)
  
      return;
    }
  
  
  
  
    if(cmd === `${prefix}serverinfo`){
  
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#15f153")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);
  
      return message.channel.send(serverembed);
    }
  
  
});

bot.login(process.env.BOT_TOKEN)
