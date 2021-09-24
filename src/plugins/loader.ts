import * as fs from 'fs';
import * as path from "path";

import {Command, isCommand} from "./commands/command";
import {CronBindable} from "./crons/bindable";


export class Loader {
    public commands: Command[] = [];
    public crons: CronBindable[] = [];

    public loadAll(): void {
        this.loadCommands();
        this.loadCrons();
    }

    private loadCommands() {
        this.commands = [];
        let dir = path.resolve('out', 'plugins', 'commands')
        let files = fs.readdirSync(dir).map((f) => `${dir}\\${f}`);
        files.forEach((file_path: string) => {
            if (fs.statSync(file_path).isDirectory()) {
                let o = require(`${file_path}\\index.js`).default;
                if(isCommand(o)) {
                    this.commands.push(o as Command);
                }
            }
        });
        console.log(`Loaded ${this.commands.length} commands.`);
    }

    private loadCrons() {
        this.crons = [];
        let dir = path.resolve('out', 'plugins', 'crons')
        let files = fs.readdirSync(dir).map((f) => `${dir}\\${f}`);
        files.forEach((file_path: string) => {
            if (fs.statSync(file_path).isDirectory()) {
                let o = require(`${file_path}\\index.js`).default;
                // if (o instanceof CronBindable)
                    this.crons.push(o as CronBindable)
                // }
            }
        });
    }

    public get(command_prefix: string|undefined): Command|null {
        if( command_prefix === undefined) {
            return null;
        }
        for(let command of this.commands) {
            if (command.prefixes.includes(command_prefix)) {
                return command;
            }
        }
        return null;
    }
}
