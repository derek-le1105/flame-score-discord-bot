const { SlashCommandBuilder } = require("discord.js");
const Tesseract = require("tesseract.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flame")
    .setDescription("Replies with Flame Score")
    .addAttachmentOption((option) =>
      option
        .setName("input")
        .setDescription("Attach a clear image of equipment to calculate flame ")
    ),
  async execute(interaction) {
    try {
      var attachment = interaction.options.getAttachment("input");
      var imageURL = attachment.proxyURL;
      await Tesseract.recognize(imageURL, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        // Replying with the extracted test
        console.log(text);
        interaction.reply(`>>> ${text}`);
      });
    } catch (e) {
      if (e instanceof TypeError) {
        interaction.reply(">>> Please provide an attachment");
      }
    }
  },
};
