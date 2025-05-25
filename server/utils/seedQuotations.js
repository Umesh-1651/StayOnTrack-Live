
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quotation = require('../models/Quotation');

// Initialize environment variables
dotenv.config();

// Sample quotation data
const quotations = [
   {
    "content": "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
    "author": "Caroline Myss",
    "genre": "spiritual",
    "tags": ["healing", "soul", "silence"],
    "source": "Anatomy of the Spirit"
  },
  {
    "content": "You are not a drop in the ocean. You are the entire ocean in a drop.",
    "author": "Rumi",
    "genre": "spiritual",
    "tags": ["unity", "consciousness", "self"],
    "source": "The Essential Rumi"
  },
  {
    "content": "Peace comes from within. Do not seek it without.",
    "author": "Buddha",
    "genre": "spiritual",
    "tags": ["peace", "inner self", "awareness"],
    "source": "Dhammapada"
  },
  {
    "content": "When you realize there is nothing lacking, the whole world belongs to you.",
    "author": "Lao Tzu",
    "genre": "spiritual",
    "tags": ["abundance", "perception", "peace"],
    "source": "Tao Te Ching"
  },
  {
    "content": "Enlightenment is when a wave realizes it is the ocean.",
    "author": "Thich Nhat Hanh",
    "genre": "spiritual",
    "tags": ["mindfulness", "unity", "consciousness"],
    "source": "The Heart of the Buddha’s Teaching"
  },
  {
    "content": "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    "author": "Buddha",
    "genre": "spiritual",
    "tags": ["present", "mindfulness", "concentration"],
    "source": "Dhammapada"
  },
  {
    "content": "What you seek is seeking you.",
    "author": "Rumi",
    "genre": "spiritual",
    "tags": ["purpose", "desire", "awareness"],
    "source": "The Essential Rumi"
  },
  {
    "content": "Silence is the language of God, all else is poor translation.",
    "author": "Rumi",
    "genre": "spiritual",
    "tags": ["silence", "spirituality", "truth"],
    "source": "The Essential Rumi"
  },
  {
    "content": "In the midst of movement and chaos, keep stillness inside of you.",
    "author": "Deepak Chopra",
    "genre": "spiritual",
    "tags": ["stillness", "chaos", "peace"],
    "source": "The Seven Spiritual Laws of Success"
  },
  {
    "content": "Prayer is not asking. It is a longing of the soul.",
    "author": "Mahatma Gandhi",
    "genre": "spiritual",
    "tags": ["prayer", "soul", "spirituality"],
    "source": "Collected Works of Mahatma Gandhi"
  },
  {
    "content": "Believe you can and you're halfway there.",
    "author": "Theodore Roosevelt",
    "genre": "self-belief",
    "tags": ["confidence", "motivation", "belief"],
    "source": "Speech"
  },
  {
    "content": "No one can make you feel inferior without your consent.",
    "author": "Eleanor Roosevelt",
    "genre": "self-belief",
    "tags": ["self-worth", "confidence", "empowerment"],
    "source": "This Is My Story"
  },
  {
    "content": "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    "author": "Brian Tracy",
    "genre": "self-belief",
    "tags": ["inner strength", "resilience", "confidence"],
    "source": "Maximum Achievement"
  },
  {
    "content": "Don't wait for the stars to align, reach up and rearrange them the way you want.",
    "author": "Pharrell Williams",
    "genre": "self-belief",
    "tags": ["ambition", "self-belief", "action"],
    "source": "Interview"
  },
  {
    "content": "It is confidence in our bodies, minds, and spirits that allows us to keep looking for new adventures.",
    "author": "Oprah Winfrey",
    "genre": "self-belief",
    "tags": ["confidence", "growth", "exploration"],
    "source": "The Oprah Winfrey Show"
  },
  {
    "content": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "author": "Ralph Waldo Emerson",
    "genre": "self-belief",
    "tags": ["authenticity", "identity", "belief"],
    "source": "Essays"
  },
  {
    "content": "Don’t let the noise of others’ opinions drown out your own inner voice.",
    "author": "Steve Jobs",
    "genre": "self-belief",
    "tags": ["focus", "independence", "inner voice"],
    "source": "Stanford Commencement Address, 2005"
  },
  {
    "content": "Confidence comes not from always being right but from not fearing to be wrong.",
    "author": "Peter T. McIntyre",
    "genre": "self-belief",
    "tags": ["confidence", "growth", "courage"],
    "source": "Speech"
  },
  {
    "content": "Act as if what you do makes a difference. It does.",
    "author": "William James",
    "genre": "self-belief",
    "tags": ["purpose", "confidence", "action"],
    "source": "Principles of Psychology"
  },
  {
    "content": "You are more powerful than you know; you are beautiful just as you are.",
    "author": "Melissa Etheridge",
    "genre": "self-belief",
    "tags": ["self-worth", "power", "acceptance"],
    "source": "Interview"
  },
  {
    "content": "To love and be loved is to feel the sun from both sides.",
    "author": "David Viscott",
    "genre": "love-life",
    "tags": ["love", "life", "warmth"],
    "source": "Finding Your Strength in Difficult Times"
  },
  {
    "content": "Love is composed of a single soul inhabiting two bodies.",
    "author": "Aristotle",
    "genre": "love-life",
    "tags": ["philosophy", "connection", "soulmates"],
    "source": "Nicomachean Ethics"
  },
  {
    "content": "In the end, the love you take is equal to the love you make.",
    "author": "Paul McCartney",
    "genre": "love-life",
    "tags": ["karma", "giving", "affection"],
    "source": "The End, The Beatles"
  },
  {
    "content": "Life without love is like a tree without blossoms or fruit.",
    "author": "Kahlil Gibran",
    "genre": "love-life",
    "tags": ["life", "growth", "affection"],
    "source": "The Prophet"
  },
  {
    "content": "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    "author": "Lao Tzu",
    "genre": "love-life",
    "tags": ["strength", "courage", "relationships"],
    "source": "Tao Te Ching"
  },
  {
    "content": "Love doesn’t make the world go round. Love is what makes the ride worthwhile.",
    "author": "Franklin P. Jones",
    "genre": "love-life",
    "tags": ["joy", "life", "love"],
    "source": "Quote Magazine"
  },
  {
    "content": "The best thing to hold onto in life is each other.",
    "author": "Audrey Hepburn",
    "genre": "love-life",
    "tags": ["togetherness", "support", "romance"],
    "source": "Interview"
  },
  {
    "content": "We are shaped and fashioned by what we love.",
    "author": "Johann Wolfgang von Goethe",
    "genre": "love-life",
    "tags": ["influence", "identity", "passion"],
    "source": "Letters"
  },
  {
    "content": "Love is not about how many days, months, or years you’ve been together. Love is about how much you love each other every single day.",
    "author": "Unknown",
    "genre": "love-life",
    "tags": ["everyday love", "presence", "commitment"],
    "source": "Popular Saying"
  },
  {
    "content": "True love stories never have endings.",
    "author": "Richard Bach",
    "genre": "love-life",
    "tags": ["eternity", "romance", "connection"],
    "source": "Bridge Across Forever"
  },
  {
    "content": "Knowing yourself is the beginning of all wisdom.",
    "author": "Aristotle",
    "genre": "wisdom",
    "tags": ["self-awareness", "philosophy", "knowledge"],
    "source": "Nicomachean Ethics"
  },
  {
    "content": "The only true wisdom is in knowing you know nothing.",
    "author": "Socrates",
    "genre": "wisdom",
    "tags": ["humility", "knowledge", "learning"],
    "source": "Plato’s Apology"
  },
  {
    "content": "Turn your wounds into wisdom.",
    "author": "Oprah Winfrey",
    "genre": "wisdom",
    "tags": ["resilience", "growth", "life-lessons"],
    "source": "The Oprah Winfrey Show"
  },
  {
    "content": "It is not that we have a short time to live, but that we waste much of it.",
    "author": "Seneca",
    "genre": "wisdom",
    "tags": ["time", "life", "stoicism"],
    "source": "On the Shortness of Life"
  },
  {
    "content": "Wise men speak because they have something to say; fools because they have to say something.",
    "author": "Plato",
    "genre": "wisdom",
    "tags": ["speech", "judgment", "intelligence"],
    "source": "Dialogues"
  },
  {
    "content": "Do not seek to follow in the footsteps of the wise. Seek what they sought.",
    "author": "Matsuo Bashō",
    "genre": "wisdom",
    "tags": ["originality", "learning", "perspective"],
    "source": "Haiku Collection"
  },
  {
    "content": "A wise person should have money in their head, but not in their heart.",
    "author": "Jonathan Swift",
    "genre": "wisdom",
    "tags": ["money", "values", "prudence"],
    "source": "Thoughts on Various Subjects"
  },
  {
    "content": "Silence is the sleep that nourishes wisdom.",
    "author": "Francis Bacon",
    "genre": "wisdom",
    "tags": ["silence", "reflection", "growth"],
    "source": "Essays"
  },
  {
    "content": "The fool doth think he is wise, but the wise man knows himself to be a fool.",
    "author": "William Shakespeare",
    "genre": "wisdom",
    "tags": ["humility", "self-awareness", "introspection"],
    "source": "As You Like It"
  },
  {
    "content": "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    "author": "Albert Einstein",
    "genre": "wisdom",
    "tags": ["learning", "education", "experience"],
    "source": "Letter to a Student"
  },
   {
    "content": "Programs must be written for people to read, and only incidentally for machines to execute.",
    "author": "Harold Abelson",
    "genre": "developer-tips",
    "tags": ["readability", "coding", "software-design"],
    "source": "Structure and Interpretation of Computer Programs"
  },
  {
    "content": "The best code is no code at all.",
    "author": "Jeff Atwood",
    "genre": "developer-tips",
    "tags": ["minimalism", "efficiency", "best-practices"],
    "source": "Coding Horror Blog"
  },
  {
    "content": "First, solve the problem. Then, write the code.",
    "author": "John Johnson",
    "genre": "developer-tips",
    "tags": ["problem-solving", "planning", "development"],
    "source": "Software Engineering Wisdom"
  },
  {
    "content": "Simplicity is the soul of efficiency.",
    "author": "Austin Freeman",
    "genre": "developer-tips",
    "tags": ["simplicity", "performance", "design"],
    "source": "Programming Principles"
  },
  {
    "content": "Code is like humor. When you have to explain it, it’s bad.",
    "author": "Cory House",
    "genre": "developer-tips",
    "tags": ["clean-code", "clarity", "readability"],
    "source": "Software Conference Talk"
  },
  {
    "content": "Before software can be reusable, it first has to be usable.",
    "author": "Ralph Johnson",
    "genre": "developer-tips",
    "tags": ["reusability", "usability", "software-engineering"],
    "source": "Design Patterns Book"
  },
  {
    "content": "Don't comment bad code — rewrite it.",
    "author": "Brian Kernighan",
    "genre": "developer-tips",
    "tags": ["refactoring", "clean-code", "development"],
    "source": "The Elements of Programming Style"
  },
  {
    "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "author": "Martin Fowler",
    "genre": "developer-tips",
    "tags": ["readability", "quality", "best-practices"],
    "source": "Refactoring Book"
  },
  {
    "content": "Testing leads to failure, and failure leads to understanding.",
    "author": "Burt Rutan",
    "genre": "developer-tips",
    "tags": ["testing", "debugging", "learning"],
    "source": "Tech Conference Keynote"
  },
  {
    "content": "In programming, the hard part isn’t solving problems, but deciding what problems to solve.",
    "author": "Paul Graham",
    "genre": "developer-tips",
    "tags": ["prioritization", "problem-solving", "development"],
    "source": "Essays on Programming"
  },
  {
    "content": "Mastering DSA is less about memorizing and more about recognizing patterns.",
    "author": "NeetCode",
    "genre": "dsa-tips",
    "tags": ["patterns", "practice", "interview"],
    "source": "NeetCode.io"
  },
  {
    "content": "When in doubt, draw the problem. Visual thinking reveals hidden insights.",
    "author": "Clement Mihailescu",
    "genre": "dsa-tips",
    "tags": ["visualization", "thinking", "strategy"],
    "source": "AlgoExpert Advice"
  },
  {
    "content": "Edge cases aren’t just bugs — they are the blueprint of robustness.",
    "author": "Abdul Bari",
    "genre": "dsa-tips",
    "tags": ["edge cases", "robustness", "debugging"],
    "source": "DSA Lectures"
  },
  {
    "content": "A brute-force solution is a stepping stone, not a final destination.",
    "author": "Rachit Jain",
    "genre": "dsa-tips",
    "tags": ["brute force", "optimization", "problem solving"],
    "source": "Coding Blocks"
  },
  {
    "content": "Use a hashmap when you need to remember the past.",
    "author": "William Lin",
    "genre": "dsa-tips",
    "tags": ["hashmap", "memory", "lookup"],
    "source": "Competitive Programming Guide"
  },
  {
    "content": "Greedy doesn’t always work — prove your choice is optimal.",
    "author": "Kevin Naughton Jr.",
    "genre": "dsa-tips",
    "tags": ["greedy", "optimal", "proof"],
    "source": "Tech Interview Handbook"
  },
  {
    "content": "Use sliding window to reduce time complexity without nested loops.",
    "author": "Aditya Verma",
    "genre": "dsa-tips",
    "tags": ["sliding window", "time complexity", "technique"],
    "source": "DSA Playlist"
  },
  {
    "content": "Understand recursion by tracing its call stack — not just writing code.",
    "author": "TheCodingTrain",
    "genre": "dsa-tips",
    "tags": ["recursion", "call stack", "understanding"],
    "source": "YouTube Tutorials"
  },
  {
    "content": "Backtracking is trying every possibility—but smartly and with pruning.",
    "author": "Kunal Kushwaha",
    "genre": "dsa-tips",
    "tags": ["backtracking", "DFS", "optimization"],
    "source": "Open Source Java DSA"
  },
  {
    "content": "Memoization trades time for space — and that's often a great deal.",
    "author": "Amigoscode",
    "genre": "dsa-tips",
    "tags": ["memoization", "dynamic programming", "efficiency"],
    "source": "Tech Tutorials"
  },
  {
    "content": "Choosing the right data structure can halve the execution time of your program.",
    "author": "Robert Sedgewick",
    "genre": "dsa-tips",
    "tags": ["data structures", "performance", "optimization"],
    "source": "Algorithms 4th Edition"
  },
  {
    "content": "Algorithms + Data Structures = Programs.",
    "author": "Niklaus Wirth",
    "genre": "dsa-tips",
    "tags": ["algorithms", "data structures", "programming"],
    "source": "Wirth's Programming Wisdom"
  },
  {
    "content": "Understand the problem. The correct algorithm will follow naturally.",
    "author": "Donald Knuth",
    "genre": "dsa-tips",
    "tags": ["problem-solving", "thinking", "algorithm design"],
    "source": "The Art of Computer Programming"
  },
  {
    "content": "Recursion is not a problem-solving technique; it’s a mindset.",
    "author": "Gayle Laakmann McDowell",
    "genre": "dsa-tips",
    "tags": ["recursion", "mindset", "interview-prep"],
    "source": "Cracking the Coding Interview"
  },
  {
    "content": "Practice dry-running your algorithm on paper before coding.",
    "author": "Clément Mihailescu",
    "genre": "dsa-tips",
    "tags": ["debugging", "dry-run", "coding interview"],
    "source": "AlgoExpert"
  },
  {
    "content": "Time complexity tells you how fast; space complexity tells you how expensive.",
    "author": "Mehul Mohan",
    "genre": "dsa-tips",
    "tags": ["complexity", "optimization", "performance"],
    "source": "Coding Minutes"
  },
  {
    "content": "The easiest problem can turn hard with the wrong data structure.",
    "author": "Tushar Roy",
    "genre": "dsa-tips",
    "tags": ["data structures", "problem-solving", "tutorial"],
    "source": "Tushar Roy - YouTube"
  },
  {
    "content": "Every problem is a graph problem if you look hard enough.",
    "author": "William Fiset",
    "genre": "dsa-tips",
    "tags": ["graph", "data structures", "advanced topics"],
    "source": "Graph Theory Series"
  },
  {
    "content": "You don’t really understand a concept until you can explain it to a 10-year-old.",
    "author": "Rohit Kumar",
    "genre": "dsa-tips",
    "tags": ["understanding", "teaching", "clarity"],
    "source": "DSA Mentorship Notes"
  },
  {
    "content": "Binary search isn’t just an algorithm; it’s a way of thinking.",
    "author": "Errichto",
    "genre": "dsa-tips",
    "tags": ["binary search", "thinking", "problem solving"],
    "source": "Competitive Programming Lecture"
  }
,{
    content: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
    genre: "motivational",
    tags: ["future", "creation", "inspiration"],
    source: "Speech"
  },
  {
    content: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    genre: "motivational",
    tags: ["time", "life", "authenticity"],
    source: "Stanford Commencement Address, 2005"
  },
  {
    content: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
    genre: "spiritual",
    tags: ["silence", "awareness", "mindfulness"],
    source: "Be Here Now"
  },
  {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    genre: "self-belief",
    tags: ["mindset", "belief", "attitude"],
    source: "Interview"
  },
  {
    content: "Love is not about possession. Love is about appreciation.",
    author: "Osho",
    genre: "love-life",
    tags: ["love", "appreciation", "relationships"],
    source: "Teachings"
  },
  {
    content: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    genre: "wisdom",
    tags: ["knowledge", "humility", "philosophy"],
    source: "Ancient writings"
  },
  {
    content: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
    genre: "developer-tips",
    tags: ["clean-code", "programming", "craftsmanship"],
    source: "Clean Code"
  },
  {
    content: "When in doubt, use binary search.",
    author: "Anonymous",
    genre: "dsa-tips",
    tags: ["algorithms", "optimization", "problem-solving"],
    source: "Programming community"
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    genre: "random",
    tags: ["life", "planning", "surprise"],
    source: "Song 'Beautiful Boy'"
  }
];

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing quotations
    await Quotation.deleteMany({});
    console.log('Cleared existing quotations');
    
    // Insert sample quotations
    await Quotation.insertMany(quotations);
    console.log('Successfully seeded quotations collection');
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
