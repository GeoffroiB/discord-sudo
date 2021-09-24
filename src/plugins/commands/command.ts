import DiscordJS from "discord.js";

export interface Command {
    description: string;
    prefixes: string[];

    execute(message: DiscordJS.Message, ...args: string[]): Promise<any>;
}

export function isCommand(object: any): boolean {
    return (
        'description' in object
        && 'prefixes' in object
    );
}
