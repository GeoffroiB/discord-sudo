import cron, {CronCommand, CronJob} from "cron";
import DiscordJS, {VoiceChannel} from "discord.js";

import {waitFor} from "../../../util";
import {CronBindable} from "../bindable";


class BlazeIt implements CronBindable {
    private cron: CronJob;
    public bindTo: any;

    public constructor() {
        this.cron = new CronJob(
            // "0 20 4,16 * * *",
            "*/10 * * * * *",
            ()=>{},
            null,
            true,
            "America/Montreal");
        this.bindTo = (client: DiscordJS.Client) => {
            this.cron.fireOnTick = () => {
                client.guilds?.cache.each(async ({ channels }) => {
                    const generalVoice = channels.cache.find(
                        (c) => c.type === "voice" && c.name === "General"
                    ) as VoiceChannel;

                    if (!generalVoice) return;
                    if (generalVoice.members.size == 0) return;

                    const connection = await generalVoice.join();
                    const dispatcher = connection.play(
                        "./assets/audio/smokeweed-everyday.mp3"
                    );
                    await waitFor(dispatcher, "finish");
                    dispatcher.end();
                    generalVoice.leave();
                });
            }
        }
    }
}

export default new BlazeIt();
