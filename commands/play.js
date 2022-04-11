const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, createAudioPlayer, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require("yt-search");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const player = createAudioPlayer();

const playMusic = (url, interaction, player) => {
    const connection = getVoiceConnection(interaction.guildId);

    let resource = createAudioResource(ytdl(url));

    connection.subscribe(player);
    player.play(resource);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a music!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Enter a keyword or URL to play the music')
                .setRequired(true)),
    player: player,
    async execute(interaction) {
        const input = interaction.options.getString('input');

        if (ytdl.validateURL(input)) {
            playMusic(input, interaction, player);

            await interaction.reply('Music are plying now!');
        }
        else {
            const video = await yts(input);

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('There are the search result')
                        .addOptions([
                            {
                                label: `${video.videos[0].title}(${video.videos[0].timestamp})`,
                                description: video.videos[0].author.name,
                                value: video.videos[0].url
                            },
                            {
                                label: `${video.videos[1].title}(${video.videos[1].timestamp})`,
                                description: video.videos[1].author.name,
                                value: video.videos[1].url
                            },
                            {
                                label: `${video.videos[2].title}(${video.videos[2].timestamp})`,
                                description: video.videos[2].author.name,
                                value: video.videos[2].url
                            }
                        ])
                )

            await interaction.reply({ components: [row] });

            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', i => {
                if (i.user.id !== interaction.user.id) {
                    i.reply('That is not your message!');
                    return;
                }
                playMusic(i.values[0], interaction, player);

                interaction.editReply({ content: 'Music is plying now!', components: [] });
                i.deferUpdate();
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        }
    },
};