module.exports = {
	name: 'mute',
    usage: '<p>mute <user>',
    permission: 2,
    help: 'Mutes a specified user.',
	main: function(bot, msg) {
		const Discord = require("discord.js");
		var mutee = msg.mentions.users.array();
		if (msg.member.hasPermission('KICK_MEMBERS') || msg.member.hasPermission('ADMINISTRATOR')) {
			for(var k = 0; k < mutee.length; k++) {
				var member = msg.guild.members.get(mutee[k].id);
				var user = bot.users.get(mutee[k].id);
				var guild = msg.guild;
				var channels = msg.guild.channels.array();
				
				for(var i = 0; i < channels.length; i++) {
					if(channels[i].type == 'text')
						channels[i].overwritePermissions(member, {SEND_MESSAGES: null})
				}
				msg.reply(member + ' has been unmuted.')
				
				var mute = new Discord.RichEmbed();
				
				mute.setColor(0x00FF00)
					.setAuthor(user.username, user.avatarURL)
					.addField('Member Unmuted', `**${user.username}#${user.discriminator} (${user.id}) was unmuted.**`)
					.addField('Responsible Moderator', msg.member.displayName)
					.setFooter(`${guild.name}`, `${guild.iconURL}`)
					.setTimestamp()
				try {
					var log = msg.guild.channels.find('name', 'mod-logs');
					log.sendEmbed(mute);
				} catch (e) {
					msg.channel.sendEmbed(mute);
				}
			}
		} else {
			msg.reply('you do not have permission to perform this action!');
		}
	}
};