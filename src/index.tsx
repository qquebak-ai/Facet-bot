import "dotenv/config";
import { Telegraf, Markup } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN;
const MINIAPP_URL = process.env.MINIAPP_URL || "https://example.com";

if (!BOT_TOKEN) {
  throw new Error("Не задан BOT_TOKEN");
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать в Faceta 👋",
    Markup.inlineKeyboard([
      Markup.button.webApp("🚀 Открыть приложение", MINIAPP_URL),
    ])
  );
});

bot.telegram.setChatMenuButton({
  menuButton: {
    type: "web_app",
    text: "Открыть Faceta",
    web_app: { url: MINIAPP_URL },
  },
});

bot.launch();
console.log("Бот запущен");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
