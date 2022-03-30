const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the music playing now!'),
    async execute(interaction) {
        const player = play.player;

        if (player.state.status === 'playing') {
            player.pause();
            await interaction.reply('Music has been paused!');
        }else {
            await interaction.reply('There is not music playing now!')
        }

    },
};