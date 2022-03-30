const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('button1')
					.setLabel('AAA')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('button2')
					.setLabel('BBB')
					.setStyle("SECONDARY")
			);
		const row2 = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Option one',
							description: 'This first option',
							value: 'option_one'
						},
						{
							label: 'Option two',
							description: 'This is second option',
							value: 'option_two'
						}
					])
			);

		await interaction.reply({ content: 'Pong!', components: [row1, row2] });

		const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
		collector.on('collect', i => {
			console.log('The button has been pressed');
			if (i.user.id === interaction.user.id) {
				i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
			}
			else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} interactions.`);
		});
	},
};