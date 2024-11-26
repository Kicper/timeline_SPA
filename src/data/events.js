// Import images for each event (musicians and bands)
import dua_lipa from "../assets/dua_lipa.jpg";
import miles_davis from "../assets/miles_davis.jpg";
import michael_jackson from "../assets/michael_jackson.jpg";
import ed_sheeran from "../assets/ed_sheeran.jpg";
import bob_dylan from "../assets/bob_dylan.jpg";
import john_coltrane from "../assets/john_coltrane.jpg";
import louis_armstrong from "../assets/louis_armstrong.jpg";
import led_zeppelin from "../assets/led_zeppelin.jpg";
import nirvana from "../assets/nirvana.jpg";
import queen from "../assets/queen.jpg";
import kendrick_lamar from "../assets/kendrick_lamar.jpg";
import fryderyk_chopin from "../assets/fryderyk_chopin.jpg";
import claude_debussy from "../assets/claude_debussy.jpg";

// Array of events, each representing a musician/band with various properties
const events = [
    {
        id: "1",
        title: "Dua Lipa",
        description: "British singer and songwriter known for her disco-influenced pop.",
        category: "Pop",
        startDate: new Date("1995-08-22"),
        endDate: null,
        image: dua_lipa,
    },
    {
        id: "2",
        title: "Miles Davis",
        description: "American jazz trumpeter and composer known for his influential style.",
        category: "Jazz",
        startDate: new Date("1926-05-26"),
        endDate: new Date("1991-09-28"),
        image: miles_davis,
    },
    {
        id: "3",
        title: "Ed Sheeran",
        description: "English singer-songwriter known for his melodic pop hits.",
        category: "Pop",
        startDate: new Date("1991-02-17"),
        endDate: null,
        image: ed_sheeran,
    },
    {
        id: "4",
        title: "Michael Jackson",
        description: "American singer, songwriter, and dancer, known as the King of Pop.",
        category: "Pop",
        startDate: new Date("1958-08-29"),
        endDate: new Date("2009-06-25"),
        image: michael_jackson,
    },
    {
        id: "5",
        title: "Bob Dylan",
        description: "American singer-songwriter known for his influential folk music.",
        category: "Folk",
        startDate: new Date("1941-05-24"),
        endDate: null,
        image: bob_dylan,
    },
    {
        id: "6",
        title: "John Coltrane",
        description: "American jazz saxophonist and composer known for his innovative work.",
        category: "Jazz",
        startDate: new Date("1926-09-23"),
        endDate: new Date("1967-07-17"),
        image: john_coltrane,
    },
    {
        id: "7",
        title: "Louis Armstrong",
        description: "American trumpeter and singer known for his influential jazz style.",
        category: "Jazz",
        startDate: new Date("1901-08-04"),
        endDate: new Date("1971-07-06"),
        image: louis_armstrong,
    },
    {
        id: "8",
        title: "Led Zeppelin",
        description: "British rock band known for their heavy sound and complex compositions.",
        category: "Rock",
        startDate: new Date("1968-01-01"),
        endDate: null,
        image: led_zeppelin,
    },
    {
        id: "9",
        title: "Nirvana",
        description: "American rock band known for bringing grunge music to mainstream.",
        category: "Rock",
        startDate: new Date("1987-01-01"),
        endDate: new Date("1994-04-05"),
        image: nirvana,
    },
    {
        id: "10",
        title: "Queen",
        description: "British rock band known for their theatrical style and hits like \"Bohemian Rhapsody\".",
        category: "Rock",
        startDate: new Date("1970-01-01"),
        endDate: new Date("1991-11-24"),
        image: queen,
    },
    {
        id: "11",
        title: "Kendrick Lamar",
        description: "American rapper known for his profound lyrics and storytelling.",
        category: "Hip-hop",
        startDate: new Date("1987-06-17"),
        endDate: null,
        image: kendrick_lamar,
    },
    {
        id: "12",
        title: "Fryderyk Chopin",
        description: "Polish composer and virtuoso pianist of the Romantic period.",
        category: "Classical",
        startDate: new Date("1810-03-01"),
        endDate: new Date("1849-10-17"),
        image: fryderyk_chopin,
    },
    {
        id: "13",
        title: "Claude Debussy",
        description: "French composer, considered the first Impressionist composer.",
        category: "Classical",
        startDate: new Date("1862-08-22"),
        endDate: new Date("1918-03-25"),
        image: claude_debussy,
    },
];

export default events;