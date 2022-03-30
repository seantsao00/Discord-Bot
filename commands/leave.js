const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave the channel!'),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guildId,);
		connection.destroy();

		await interaction.reply('Good bye!');
	},
};