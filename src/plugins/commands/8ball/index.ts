import DiscordJS from 'discord.js';
import { __ } from "i18n";

import {Command} from '../command';
import random from '../../../utils/random';


class _8ball implements Command {
    public readonly description = '8Ball';
    public readonly prefixes = ['8ball', '8b'];

    public execute(message: DiscordJS.Message, ...args: string[]): Promise<DiscordJS.Message> {
        return message.reply(`${random.pick(__("8ball") as any)} :8ball:`);
    }
}

export default new _8ball();
