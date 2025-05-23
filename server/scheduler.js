const cron = require('node-cron');
const moment = require('moment');
const User = require('./models/User');
const Quotation = require('./models/Quotation');
const { sendEmail } = require('./utils/emailService');

// Schedule task to run every minute
cron.schedule('* * * * *', async () => {
  const now = moment().format('HH:mm');
  console.log('⏰ Scheduler tick:', now);

  try {
    const users = await User.find({ isActive: true });

    for (const user of users) {
      const userTime24 = moment(user.deliveryTime, ["h:mm A"]).format('HH:mm');

      if (userTime24 === now) {
        const selectedGenre = user.isRandomGenre
          ? getRandomGenre()
          : user.quoteGenre;

        // Fetch one random quote from DB
        const quote = await Quotation.aggregate([
          { $match: { genre: selectedGenre } },
          { $sample: { size: 1 } }
        ]);

        const message = quote.length
          ? `Hello ${user.name},\n\n"${quote[0].content}"\n\n– ${quote[0].author}`
          : `Hello ${user.name},\n\nSorry, we couldn't find a quote in the genre "${selectedGenre}".`;

        await sendEmail(
          user.email,
          'Your Scheduled Quote from StayOnTrack',
          message
        );

        console.log(`✅ Email sent to ${user.email} at ${now}`);
      }
    }
  } catch (err) {
    console.error('❌ Scheduler error:', err.message);
  }
});

// Helper function
function getRandomGenre() {
  const genres = [
    'motivational', 'spiritual', 'self-belief', 'love-life',
    'wisdom', 'developer-tips', 'dsa-tips', 'random'
  ];
  return genres[Math.floor(Math.random() * genres.length)];
}
