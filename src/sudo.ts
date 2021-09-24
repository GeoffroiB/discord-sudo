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
        if (message.content) {
            let message_chunks: string[] = message.content.split(' ');
            const message_prefix: string|undefined = message_chunks.shift();
            console.log(`prefix:[${message_prefix}]`);
            if (message_prefix) {
                if(Sudo.prefixes.includes(message_prefix)) {
                    console.log('Message is sudo command');
                    const command_prefix: string|undefined = message_chunks.shift();
                    const command: Command|null = this.loader.get(command_prefix);
                    if (command !== null) {
                        console.log('Found', command)
                        command.execute(message, ...message_chunks);// todo
                    } else {
                        console.log(`Command '${command_prefix}' not implemented`)
                    }
                }
            } else {
                console.log(`${message.author.username}: ${message.content}`);
            }
        }
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
