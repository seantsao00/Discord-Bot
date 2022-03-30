const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playurl')
		.setDescription('Play a music!')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Enter a URL to play the music')
                .setRequired(true)),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guildId);

        let resource = createAudioResource(ytdl(interaction.options.getString('url')));

        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

		await interaction.reply('Music are plying now!');
	},
};