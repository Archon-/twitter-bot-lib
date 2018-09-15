/**
 * Utils
 * =====================
 * Logger and other functions...
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1.0
 * @changelog:  0.1 initial release
 *
 */
require("colors");
class Utils {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;
        this.LOG_NAME = "utils";
        this.LOG = require("../logger/types");
        this.MAP_COLORS = require("../logger/types").MAP_COLORS;
        this.Log = require("../logger/Log");
        this.log = new this.Log(this.LOG_NAME, this.config);
    }

    /**
     * Donate
     * =====================
     * Patreon link
     *
     */
    donate() {
        this.log.warning("Bot work? Please donate for support this project!");
        this.log.warning("Donate with patreon: http://patreon.ptkdev.io");
        this.log.warning("Donate with paypal: http://paypal.ptkdev.io");
    }

    /**
     * Check updates
     * =====================
     * Bot is updated? Yes/no
     *
     */
    check_updates(version) {
        let request = require("request");
        let log = this.log;
        request.get("https://api.ptkdev.io/v1/bot/twitter/version/", function(err, res, last_release) {
            if (err) {
                log.error("Is impossible contact api.ptkdev.io server, wifi is on?");
            } else {
                if (version !== last_release) {
                    log.warning("Bot release v" + last_release + " available! Current version: v" + version);
                } else {
                    log.info("Bot is updated! :D");
                }
            }
        });
    }

    /**
     * Fix ui configs params
     * =====================
     * String aparms to booleans from social-manager-tools
     *
     */
    fixui(config) {
        config.bot_likeday_min = parseInt(config.bot_likeday_min);
        config.bot_likeday_max = parseInt(config.bot_likeday_max);
        if (config.chrome_headless == "enabled") {
            config.chrome_headless = false;
        } else {
            config.chrome_headless = true;
        }

        return config;
    }

    /**
     * Fix config
     * =====================
     * Fix previous and deprecated params
     *
     */
    fixconfig(config) {
        let max = 0;
        do {
            max++;
        } while ((60 / max * 24 * 20) > config.bot_likeday_min);
        config.bot_fastlike_max = max--;

        let min = 0;
        do {
            min++;
        } while ((60 / min * 24 * 20) > config.bot_likeday_max);
        config.bot_fastlike_min = min--;

        return config;
    }

    /**
     * Default config.js
     * =====================
     * Get default value if config.js is not updated from config.js.tpl
     *
     */
    default_config(config) {
        if (typeof config.debug === "undefined") {
            config.debug = true;
            this.log.error("config.debug use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.login === "undefined") {
            config.login = true;
            this.log.error("config.login use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.twitter_username === "undefined") {
            config.twitter_username = "ptkdev";
            this.log.error("config.twitter_username use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.twitter_password === "undefined") {
            config.twitter_password = "password";
            this.log.error("config.twitter_password use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.twitter_hashtag === "undefined") {
            config.twitter_hashtag = ["follow"];
            this.log.error("config.twitter_hashtag use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.twitter_pin === "undefined") {
            config.twitter_pin = "sms";
            this.log.error("config.twitter_pin use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_mode === "undefined") {
            config.bot_mode = "likemode_classic";
            this.log.error("config.bot_mode use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_likeday_min === "undefined") {
            config.bot_likeday_min = 300;
            this.log.error("config.bot_likeday_min use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_likeday_max === "undefined") {
            config.bot_likeday_max = 600;
            this.log.error("config.bot_likeday_max use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_sleep_night === "undefined" || (config.bot_sleep_night !== true && config.bot_sleep_night !== false)) {
            config.bot_sleep_night = true;
            this.log.error("config.bot_sleep_night use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_stop_sleep === "undefined") {
            config.bot_stop_sleep = "7:00";
            this.log.error("config.bot_stop_sleep use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_fastlike_min === "undefined") {
            config.bot_fastlike_min = 15;
            this.log.error("config.bot_fastlike_min use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_fastlike_max === "undefined") {
            config.bot_fastlike_max = 20;
            this.log.error("config.bot_fastlike_max use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.chrome_headless === "undefined") {
            config.chrome_headless = false;
            this.log.error("config.chrome_headless use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.chrome_options === "undefined") {
            config.chrome_options = ["--disable-gpu", "--no-sandbox", "--window-size=1920x1080"];
            this.log.error("config.chrome_options use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.executable_path === "undefined") {
            config.executable_path = "";
            this.log.error("config.executable_path use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.screenshot_path === "undefined") {
            config.screenshot_path = "./logs/screenshot/";
            this.log.error("config.screenshot_path use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.logerr_path === "undefined") {
            config.logerr_path = "./logs/errors.log";
            this.log.error("config.logerr_path use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.log_path === "undefined") {
            config.log_path = "./logs/debug.log";
            this.log.error("config.log_path use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.pin_path === "undefined") {
            config.pin_path = "./loginpin.txt";
            this.log.error("config.pin_path use the default value, update your config.js from config.js.tpl");
        }

        return config;
    }

    /**
     * Screenshot
     * =====================
     * Save screenshot from chrome
     *
     */
    async screenshot(func, name) {
        if (this.config.log.screenshot) {
            try {
                await this.bot.screenshot({ path: this.config.screenshot_path + this.config.twitter_username + "_" + func + "_" + name + ".jpg" });
                this.log.info("Cheese! Screenshot!");
            } catch (err) {
                this.log.error(this.LOG.WARNING, "screenshot", "error " + err);
            }
        }
    }

    /**
     * Random
     * =====================
     * Random number between two numbers
     *
     */
    random_interval(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    }

    /**
     * Get random number between two numbers
     * @param min
     * @param max
     * @return {number}
     */
    random_number() {
        return (Math.floor(Math.random() * (20 - 10 + 1)) + 10);
    }

    /**
     * Mix array element
     * @param arr
     * @return array
     */
    mix_array(arr) {
        return arr.sort(function() {
            return 0.5 - Math.random(); 
        });
    }

    /**
     * Sleep
     * =====================
     * Zzz
     *
     */
    sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec));
    }

    /**
     * Check is debug
     * @return {boolean}
     */
    is_debug() {
        return this.config.debug === true;
    }

    /**
     * Get random hash tag from config file
     * @return {string}
     */
    get_random_hash_tag() {
        return this.config.twitter_hashtag[Math.floor(Math.random() * this.config.twitter_hashtag.length)];
    }
}

module.exports = (bot, config, utils) => {
    return new Utils(bot, config, utils); 
};