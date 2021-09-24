import * as db from "./db";
import DiscordJS, {VoiceState} from "discord.js";
// import {startCronJobs} from "./plugins/crons";
// import commands from "./_commands";
import onVoiceChannelJoin from "./plugins/listeners/onVoiceChannelJoin";

import dotenv from "dotenv";
import {Loader} from "./plugins/loader";
import {Command} from "./plugins/commands/command";


class Sudo extends DiscordJS.Client {
    static prefixes = ['sudo'];

    private loader: Loader = new Loader();

    public constructor() {
        super();
    }

    private loadClientToken(): void {
        dotenv.config();
        console.log('TOKEN:', process.env.TOKEN);
        if(process.env.TOKEN === undefined) {
            console.error('Missing client token');
            process.exit(1);
        }
        this.token = process.env.TOKEN as string;
    }

    public init(): void {
        this.loadClientToken();

        (this // BIND EVENTS
            .on("ready", () => {
                console.log("connected :)");
                this.loader.loadAll();
                for(let cron of this.loader.crons) {
                    cron.bindTo(this);
                }
            })
            .on("rateLimit", (rateLimit: DiscordJS.RateLimitData) => {
                console.warn("rateLimit", rateLimit);
            })
            .on("error", (err: Error) => {
                console.error("error", err)
            })
            .on("disconnect", () => {
                console.log("disconnected :(");
            })
            .on("message", this.handleMessage.bind(this))
            .on("voiceStateUpdate", this.handleVoiceStateUpdate.bind(this))
        );

        db.init().then(() => {
            super.login(process.env.TOKEN); // todo
        });
    }

    private handleMessage(message: DiscordJS.Message): void {
        message.content = message.content.trim();
        if (!message.content) {
            // Empty message
            return;
        }

        const message_chunks: string[] = message.content.split(' ');
        if (message_chunks.length < 2 || !Sudo.prefixes.includes(message_chunks[0].toLowerCase())) {
            // Not a command
            console.log(`${message.author.username}: ${message.content}`); // Log message
            return;
        }

        const command: Command|null = this.loader.get(message_chunks[1].toLowerCase());
        if (command === null) {
            // Not a valid command
            // TODO: error message?
            return;
        }

        command.execute(message, ...message_chunks).then(() => {
            console.log(`EXECUTED ${message_chunks[1].toLowerCase()} command`);
        });
    }

    private handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): void {
        if (newState.channel && oldState.channel?.id !== newState.channel.id) { // todo
            onVoiceChannelJoin(oldState, newState);
        }
    }
}

let sudoClient = new Sudo();
export {sudoClient};
console.log('OUT THIS BITCH');
