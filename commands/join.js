const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the channel where you are!'),
	async execute(interaction) {
		if (interaction.member.voice.channelId != null) {

			joinVoiceChannel({
					channelId: interaction.member.voice.channelId,
					guildId: interaction.guildId,
					adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			await interaction.reply('Successfully join the channel!');
		}
		else {
			await interaction.reply('You are not in a cchannel now!');
		}
	},
};