import DiscordJS, {GuildMember, VoiceChannel} from 'discord.js';
import {Command} from '../command';
import {waitFor} from "../../../util";

class Play implements Command {
    public readonly description = 'play track';
    public readonly prefixes = ['play', 'p'];

    public async execute(message: DiscordJS.Message, ...args: string[]): Promise<void> {
        const author = message.author;
        message.client.guilds?.cache.each(async ({channels}) => {
            // console.log('Searching for', author.username, author.id);
            let id: string|undefined;
            for(let channel of channels.cache.values()) {
                let member: GuildMember|undefined = channel.members.find((gm) => {
                    console.log('Found', gm.user.username, gm.id)
                    return gm.id === author.id;
                });
                if(member!==undefined) {
                    id=member.id;
                    break;
                }
            }

            // TODO : use AUTHOR.VOICE: VoiceState

            if(id === undefined) {
                // error
                return;
            }

            const voice = channels.cache.find(
                (c) => c.type === "voice" && c.members.find((gm) => gm.id === id) !== undefined
            ) as VoiceChannel;

            if (!voice) return;
            // if (generalVoice.members.size == 0) return;

            voice.join().then((connection) => {
                connection.play(
                    "./assets/audio/smokeweed-everyday.mp3"
                ).on('finish', () => {
                    voice.leave();
                });
            });

            // await waitFor(dispatcher, "finish");
            // dispatcher.end();
        });
    }
}

export default new Play();
