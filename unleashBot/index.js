const { Client, Events, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
const Web3 = require("web3");
const fs = require('node:fs');
const path = require('node:path');

dotenv.config();

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.MessageContent, 
		GatewayIntentBits.GuildMessages
		] 
});

client.commands = new Collection();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK));
const account = process.env.ACCOUNT;
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		if (command.data.name === 'lazymint'){
			await command.execute(interaction).then(tokenId => {

				// channel 선언 방법 : https://discordjs.guide/sharding/extended.html#sending-messages-across-shards
				const channel = client.channels.cache.get("947163179190997025");
	``
				const exampleEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor({ name: `Token Id : ${tokenId}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setDescription('Some description here')
				.setThumbnail('https://gateway.pinata.cloud/ipfs/QmTvCzeZtAFJTg4B2eAwqSP9kxg8mR22dHdX2Hk8pAQcn8/1.png')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
				.setImage('https://i.imgur.com/AfFp7pu.png')
				.setTimestamp()
				.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

				channel.send({ embeds: [exampleEmbed] });
			})
		}

		// 추가되는 커맨드 넣을 곳.
		// else if(FILL_ME_IN)

	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.TOKEN_ID);
