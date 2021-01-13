export default class SettingProvider {
  private settings: Record<string, string | number | boolean | null>;

  constructor (file: string) {
    this.settings = require(file);
  }

  public loadSettings (): string | number | boolean | null {
    const env = process.env.NODE_ENV;

    if (env != "production" &&  env != "development" && env != "testing") {
      throw new Error("NODE_ENV variable is invalid. Expected (development/production/testing) but received " + env + ".");
    }

    const settings: string | number | boolean | null = this.settings[ env ] || this.settings [ "development" ];
    if (!settings) {
      throw new Error("Configuration section \"" + env + "\" isn't definned on settings.json");
    }

    return settings;
  }

}
