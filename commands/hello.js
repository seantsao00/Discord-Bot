const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Say hello to you!'),
	async execute(interaction) {
		await interaction.reply('Hello!');
	},
};