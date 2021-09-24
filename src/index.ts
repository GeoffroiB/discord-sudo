// import i18n from "i18n";
// i18n.configure({
//   locales: ["fr", "en"],
//   defaultLocale: "en",
//   directory: "./locales",
//   extension: ".json",
//   register: global,
// });
//
// import DiscordJS from "discord.js";
// import dotenv from "dotenv";
// dotenv.config();
//
// import * as db from "./db";
// import commands from "./_commands";
// import onVoiceChannelJoin from "./plugins/listeners/onVoiceChannelJoin";
// import { startCronJobs } from "./plugins/crons";
//
// if (!process.env.TOKEN) {
//   console.error("missing token");
//   process.exit(1);
// }
//
// const client: DiscordJS.Client = new DiscordJS.Client()
//   .on("ready", () => {
//     console.log("connected :)");
//     startCronJobs(client);
//   })
//   .on("rateLimit", (rateLimit: DiscordJS.RateLimitData) =>
//     console.warn("rateLimit", rateLimit)
//   )
//   .on("error", (err: Error) => console.error("error", err))
//   .on("disconnect", () => console.log("disconnected :("))
//   .on("message", (message: DiscordJS.Message) => commands.execute(message))
//   .on("voiceStateUpdate", (oldState, newState) => {
//     if (newState.channel && oldState.channel?.id !== newState.channel.id) {
//       onVoiceChannelJoin(oldState, newState);
//     }
//   });
//
// db.init().then(() => client.login(process.env.TOKEN));
