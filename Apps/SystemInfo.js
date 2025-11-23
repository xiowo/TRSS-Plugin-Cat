import puppeteer from "../../../lib/puppeteer/puppeteer.js"
import { AnsiUp } from "ansi_up"
const ansi_up = new AnsiUp

const htmlDir = `${process.cwd()}/plugins/TRSS-Plugin-Cat/Resources/Code/`,
  tplFile = `${htmlDir}Code.html`,
  errorTips = "出错了喵~",
  cmds = `fastfetch --pipe false`,
  cmd = `fastfetch --pipe -l none`

export class SystemInfo extends plugin {
  constructor() {
    super({
      name: "系统信息",
      dsc: "系统信息",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#系统信息$",
          fnc: "SystemInfo"
        },
        {
          reg: "^#系统信息图片$",
          fnc: "SystemInfoPic"
        }
      ]
    })
  }

  async SystemInfo(e) {
    const ret = await Bot.exec(cmd)

    if (ret.error) {
      logger.error(`系统信息错误：${logger.red(ret.error)}`)
      await this.reply(`系统信息错误：${ret.error}`, true)
      await this.reply(errorTips)
    }

    await this.reply(ret.stdout.trim(), true)
  }

  async SystemInfoPic(e) {
    const ret = await Bot.exec(cmds)

    if (ret.error) {
      logger.error(`系统信息错误：${logger.red(ret.error)}`)
      await this.reply(`系统信息错误：${ret.error}`, true)
      await this.reply(errorTips)
    }

    const Code = await ansi_up.ansi_to_html(ret.stdout.trim())
    const img = await puppeteer.screenshot("Code", { tplFile, htmlDir, Code })
    await this.reply(img, true)
  }
}