import app from './app';
import { Console } from 'captainjs';
import dotenv from 'dotenv';
import SettingProvider from './settings';

/* Format console, add prefixes and colors */
console = new Console();

/* Load environment variables */
dotenv.config();

/* Define default objects */
let settings;

/* Check before run */
async function checkBeforeStart () {
  // Load configuration file
  console.log("Loading configuration from file.");
  const settingProvider = new SettingProvider("../settings.json");
  settings = settingProvider.loadSettings();
}

/* Start application */
async function startApplication () {
  const { port, host } = settings;
  console.log("Starting application.");
  await app.listen(port, host);
  console.log("Listening at http://" + host + ":" + port + "/");
}

/* Task for run application */
async function init () {
  await checkBeforeStart();
  await startApplication();
}

init().catch((e) => {
  console.error(`

§7##### §9Crash Report §7#####
§bSomething has gone wrong and the application has been closed to prevent a malfunction.

§7##### §9Error Summary §7####
§b${e}

§7##### §9Exception §7########
§c${e.stack}

`)});
