const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require("yt-search");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playkeyword')
		.setDescription('Play a music!')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Enter a key word to play the music')
                .setRequired(true)),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guildId);

        const vedio = await yts(interaction.options.getString('keyword'))

        let resource = createAudioResource(ytdl(vedio.videos[0].url));

        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

		await interaction.reply('Music are plying now!');
	},
};