const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lazymint')
    .setDescription('input token id')
    .addStringOption(option =>
      option
        .setName('token_id')
        .setDescription('Plz input tokenId you wanna mint')
        .setRequired(true)
    ),

  async execute(interaction) {
    const tokenId =
      interaction.options.getString('token_id') ?? 'No reason provided';
    await interaction.reply(`Minting Token... (ID: ${tokenId}) `);
    console.log('minting...');
    await wait(100);
    await interaction.deleteReply();
    return tokenId;
  },
};
