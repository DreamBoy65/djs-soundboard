<p ="center">
   <img src="https://img.shields.io/npm/dt/djs-soundboard?style=for-the-badge">
   <img src="https://img.shields.io/npm/v/djs-soundboard?style=for-the-badge">
   <a href = "https://discord.gg/7UQaVPBQka" > <img src="https://img.shields.io/badge/Server-Invite-brightgreen" href = "">
   </a>
</p>

# About
A discord soundboard package with 100+ sounds, package used: [soundboard-src](https://npmjs.com/package/soundboard-src)

# Invite Bot:

+ [Waifu](https://dsc.gg/waifu.gg)


# Example

+ Soundboard:
```js
const SoundBoard = require("djs-soundboard")

let sound = new SoundBoard()

let channel = message.member.voice.channel // required*

sound.play(channel, "bruh") //Sound
```

+ TTS
```js
const SoundBoard = require("djs-soundboard")

let sound = new SoundBoard()

let channel = message.member.voice.channel // required*

sound.tts(channel, "bruh") //Text
```

```js
+ Functions:
+ - 1: getAllSounds => get all soundboard sounds
Type: Array.

+ - 2: getAllLocales => get all supported languages for tts
Type: Array.
```

+ Bot:
```js
// Require the necessary discord.js classes
const {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder
} = require('discord.js');
const {
  token
} = require('./config.json');
const SoundBoard = require("djs-soundboard")
let sound = new SoundBoard()

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// new command data
const data = new SlashCommandBuilder()
.setName('bruh') // name
.setDescription('bruh sound!') // description

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once("ready", c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  c.guilds.cache.get("//GuildId").commands.set([data.toJSON()]) // registering command
});

// i = Interaction class
client.on("InteractionCreate", i => {
  if (i.commandName === "bruh") {
    sound.play(i.member.voice.channel, "bruh")
  }
})

client.on("messageCreate", msg => {
  if (msg.content === "!bruh") {
    sound.play(msg.member.voice.channel, "bruh")
  }
})

// Log in to Discord with your client's token
client.login(token);
```