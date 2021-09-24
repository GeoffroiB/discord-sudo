import DiscordJS from "discord.js";

export interface CronBindable {
    bindTo(client: DiscordJS.Client): void;
}
