import QR from "qrcode"
import { Jimp } from "jimp"
import jsQR from "jsqr"

export class QRCode extends plugin {
  constructor() {
    super({
      name: "二维码生成",
      dsc: "二维码生成",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#(二维码|[Qq][Rr]).+",
          fnc: "QRCode"
        },
        {
          reg: "^#识别(二维码|[Qq][Rr])$",
          fnc: "DecodeQR"
        }
      ]
    })
  }

  async QRCode(e) {
    const msg = this.e.msg.replace(/^#(二维码|qr|Qr|QR)/, "").trim()
    logger.mark(`[二维码生成] 信息：${logger.blue(msg)}`)
    const img = (await QR.toDataURL(msg)).replace("data:image/png;base64,", "base64://")
    await this.reply(segment.image(img), true)
  }

  async DecodeQR(e) {
    let source = this.e.source
    if (!source) {
      const reply = this.e.message.find(i => i.type == "reply")
      if (reply) {
        source = { seq: reply.id }
      }
    }

    if (!source) {
      await this.reply("请回复一张包含二维码的图片", true)
      return false
    }

    let replyMsg
    if (this.e.isGroup) {
      replyMsg = await this.e.group.getChatHistory(source.seq, 1)
    } else {
      replyMsg = await this.e.friend.getChatHistory(source.seq, 1)
    }

    if (!replyMsg || !replyMsg.length) {
      await this.reply("获取消息失败", true)
      return false
    }

    const imgUrl = replyMsg[0]?.message?.find(i => i.type == "image")?.url

    if (!imgUrl) {
      await this.reply("未找到图片", true)
      return false
    }

    try {
      const image = await Jimp.read(imgUrl)
      const { data, width, height } = image.bitmap
      const code = jsQR(data, width, height)

      if (code) {
        await this.reply(`二维码内容：\n${code.data}`, true)
      } else {
        await this.reply("未识别到二维码", true)
      }
    } catch (err) {
      logger.error(`[识别二维码] 错误：${err}`)
      await this.reply("识别失败，请稍后重试", true)
    }
  }
}
