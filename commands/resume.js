const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Restart the music!'),
    async execute(interaction) {
        const player = play.player;

        if (player.state.status === 'paused') {
            player.unpause();
            await interaction.reply('Music has been resumed!');
        } else {
            await interaction.reply('No music can be resumed!')
        }

    },
};