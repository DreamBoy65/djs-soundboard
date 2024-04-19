const { Get, All } = require("soundboard-src");
const fs = require("fs");
const {
    createAudioResource,
    getVoiceConnection,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus,
    StreamType
} = require("@discordjs/voice");
const path = require("path");
const { getVoiceStream, getAllLocales, findLocale } = require("./functions");

class SoundBoard {
    constructor(options) {}

    async play(channel, sound) {
        let Sound = getSound(sound);

        if (!Sound) throw new TypeError("[soundboard]: InValid Sound.");

        let connection = getVoiceConnection(channel.guild.id);

        if (!connection) {
            connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
        }

        let allSounds = await All();
        let s = allSounds.find(c => c.sounds.find(e => c.name === sound));
        s = await Get(s.cat, sound);

        let player = createAudioPlayer();
        let res = createAudioResource(s);

        player.play(res);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }

    async getAllSounds() {
        return await All();
    }

    tts(channel, text, Lang, Speed) {
        if (Lang && !findLocale(Lang))
            throw new TypeError("[soundboard]: InValid Locale.");

        let connection = getVoiceConnection(channel.guild.id);

        if (!connection) {
            connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
        }

        let player = createAudioPlayer();

        let stream = getVoiceStream(text, {
            lang: Lang ? Lang : "en",
            slow: Speed ? Speed : false
        });

        let res = createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
            inlineVolume: true
        });

        player.play(res);

        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }

    getAllLocales() {
        let array = getAllLocales();

        return array;
    }
}

module.exports = SoundBoard;
