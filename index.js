const TelegramBot = require("node-telegram-bot-api");
const config = require("./config.js");

const bot = new TelegramBot(config.token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.from.id, "Hello,  " + msg.from.first_name);

  bot.sendMessage(msg.chat.id, "Вы ввели команду /start", {
    reply_markup: {
      keyboard: [["Отправь мне картинку", "Отправь мне аудио"], ["/start"]],
    },
  });
  bot.on("message", (msg) => {
    var location = "location";
    if (msg.text.indexOf(location) === 0) {
      bot.sendLocation(msg.chat.id, 44.97108, -104.27719);
      bot.sendMessage(msg.chat.id, "Наши координаты");
    }
    bot.on("message", (msg) => {
      if (msg.text.toString() === "Отправь мне картинку") {
        bot.sendPhoto(
          msg.chat.id,
          "https://static.tildacdn.com/tild6364-3230-4537-b661-323034363738/_-14_1.png",
          { caption: "Айтигенио приветствует тебя" }
        );
      }
      if (msg.text.toString() === "Отправь мне аудио") {
        bot.sendAudio(msg.chat.id, "noname.wma");
      }
    });
  });
});
