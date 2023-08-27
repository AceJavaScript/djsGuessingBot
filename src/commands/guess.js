const words = ['incomprehensible', 'reinforced', 'ozone', 'handkerchief', 'insomnia', 'prehistoric', 'malfunction', 'simultaneously', 'abundant', 'partially'];

module.exports = {
    data: {
        name: 'guess',
        description: "Guess the word!",
    },

    /**
     * @param {Object} param0 
     * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
     */
    run: async ({ interaction }) => {
        const answer = words[Math.floor(Math.random() * words.length)];

        await interaction.reply(
            '**Game has started!** You have **15 seconds** to correctly guess. Choose a word from the following list:\n\n' + words.join('\n')
        );

        const collector = interaction.channel.createMessageCollector({
            filter: (message) => message.content === answer,
            time: 15_000,
        });

        let answered = false;

         collector.on('collect', (message) => {
            message.reply('You correctly guessed the word! Run **/guess** to play again.')

            answered = true;
            collector.stop();
         });

         collector.on('end', () => {
            if (!answered) {
                interaction.channel.send(
                    `No one guessed the word correctly. The correct word was: **${answer}.** Run **/guess** to play again.`
                );
            }
         })
    },
};
