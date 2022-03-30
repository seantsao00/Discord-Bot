const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, createAudioPlayer, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bgm')
		.setDescription('Play a BGM!'),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guildId);
        
        let resource = createAudioResource('videoplayback.mp3');

        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

		await interaction.reply('BGM are plying now!');
	},
};