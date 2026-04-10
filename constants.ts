import { Founder, Artist, Milestone, Stat, PhilosophyItem, SocialLink, TeamMember, DJPack, VideoItem, PlayroomAlbum, MerchProduct, TourDate } from './types';
export type { TeamMember, DJPack, VideoItem };

export const FOUNDERS: Founder[] = [
  { name: "Tunde Balogun", role: "CEO & President", description: "Co-founded LVRN from humble beginnings as a party promoter." },
  { name: "Justice Baiden", role: "Head of A&R", description: "Visionary behind the label's creative direction and artist discovery." },
  { name: "Sean \"Famoso\" McNichol", role: "Head of Marketing", description: "Drives brand partnerships and the label's unique marketing strategies." },
  { name: "Carlon Ramong", role: "Creative Director", description: "Ensures the visual and aesthetic integrity of the brand." },
  { name: "Junia Abaidoo", role: "Head of Operations", description: "Manages the logistical backbone of touring and operations." }
];

// LVRN Exclusive Tracks - Vimeo Playroom
export const PLAYROOM_ALBUMS: PlayroomAlbum[] = [
  {
    id: "lvrn-exclusive-1",
    artist: "LVRN Exclusive",
    title: "Playroom Session 1",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://player.vimeo.com/video/1170803259",
    color: "#ec4899",
    type: "vimeo"
  },
  {
    id: "lvrn-exclusive-2",
    artist: "LVRN Exclusive",
    title: "Playroom Session 2",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://player.vimeo.com/video/1170803082",
    color: "#3b82f6",
    type: "vimeo"
  },
  {
    id: "lvrn-exclusive-3",
    artist: "LVRN Exclusive",
    title: "Playroom Session 3",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://player.vimeo.com/video/1170802951",
    color: "#d97706",
    type: "vimeo"
  },
  {
    id: "lvrn-exclusive-4",
    artist: "LVRN Exclusive",
    title: "Playroom Session 4",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://player.vimeo.com/video/1170802832",
    color: "#ef4444",
    type: "vimeo"
  },
  {
    id: "lvrn-exclusive-hero",
    artist: "LVRN Exclusive",
    title: "The Renaissance Vision",
    year: "2025",
    coverUrl: "https://ik.imagekit.io/mosesmawela/LOGO/logo.svg?updatedAt=1769936404900",
    spotifyEmbedUrl: "https://player.vimeo.com/video/1170800625",
    color: "#f97316",
    type: "vimeo"
  }
];

export const ARTIST_MAP: Record<string, Artist> = {};

export const ARTISTS: Artist[] = [
  // Label Artists (Signed)
  {
    name: "6LACK",
    category: "Signed",
    role: "Rapper / Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/6lack?updatedAt=1769944097697",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "6LACK Pronounced 'black', the alternative R&B and three time GRAMMY nominated rapper/singer/songwriter is the #2 most streamed R&B artist.",
    bio: "6LACK Pronounced 'black', the alternative R&B and three time GRAMMY-nominated rapper/singer/songwriter is the #2 most streamed R&B artist. His debut project FREE 6LACK recently went platinum, his sophomore album East Atlanta Love Letter (now certified GOLD) peaked at #3 on the Billboard 200 and #1 on the Top R&B Albums. 6LACK has been the most featured artist of 2019-2020 with over 30 features, and hasn't missed a beat releasing his latest project 6 PC HOT EP.",
    stats: { followers: "18.5M", streams: "8.2B", playlists: "35K", charts: "2100" },
    spotifyEmbedId: "artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicEmbedId: "za/artist/6lack/1016633280",
    spotifyArtistUrl: "https://open.spotify.com/artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/6lack/1016633280",
    videoId: "xHtLTXBmtQA"
  },
  {
    name: "Summer Walker",
    category: "Signed",
    role: "Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg?updatedAt=1769932110266",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Summer Walker has established a new narrative for expressive and unapologetic music from female artists.",
    bio: "A songstress from Atlanta, Summer Walker has established a new narrative for expressive and unapologetic music from female artists. Growing up in solitude in an Atlanta home, she represents the coalescence of introversion and untamed expressionism. Her debut studio album, Over It was released on October 4, 2019 and received universal acclaim from critics, debuting at number two on the Billboard 200.",
    stats: { followers: "27M", streams: "13.1B", playlists: "42.4K", charts: "3146" },
    spotifyEmbedId: "57LYzLEk2LcFghVwuWbcuS",
    appleMusicEmbedId: "za/artist/summer-walker/990402287",
    spotifyArtistUrl: "https://open.spotify.com/artist/57LYzLEk2LcFghVwuWbcuS",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/summer-walker/990402287",
    videoId: "1ipRd0WgB0c"
  },
  {
    name: "Odeal",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/odeal.jpeg?updatedAt=1769932110159",
    bookingRate: "Inquire for Rates",
    bookingRegion: "UK / Europe / US",
    quote: "Odeal's single 'Coffee (Don't Read Signs)' surpassed 33M streams.",
    bio: "Over the past few years, Odeal has consistently proven himself to be a formidable artistic force. His single 'Coffee (Don't Read Signs)' surpassed 33 million streams, serving as a testament to his talent and resonating with listeners. 2023 saw significant growth in his commercial success with singles like 'Last Thing' and 'Be Easy'.",
    stats: { followers: "1.37M", streams: "616M", playlists: "5,969", charts: "946" },
    spotifyId: "4Z8vY9vY9vY9vY9vY9vY",
    appleMusicId: "1456156156",
    youtubeId: "UC_O_D_E_A_L_L_L_L_L",
    videoId: "LUEojiBiW1w",
    spotifyEmbedId: "4Z8vY9vY9vY9vY9vY9vY",
    appleMusicEmbedId: "1485652541"
  },
  {
    name: "CIZA",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "CIZA is poised to lead a new era of African music rooted in unity, cultural pride and global appeal.",
    bio: "Ciza born Nkululeko Nciza is a South African artist redefining African sound with his bold, genre-blending music. Bursting onto the scene in 2020 with hits like Come Alive and Adje, he quickly gained traction across the continent. CIZA has carved his own path with his debut EP Golden Boy Pack.",
    stats: { followers: "320K", streams: "94.8M", shazams: "856K", charts: "#1 SA" },
    spotifyEmbedId: "artist/71hPkbyih5bdlHVPBgav33",
    appleMusicEmbedId: "za/artist/ciza/1472059692",
    spotifyArtistUrl: "https://open.spotify.com/artist/71hPkbyih5bdlHVPBgav33",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/ciza/1472059692",
    videoId: "sel1mCYFJ8U"
  },
  {
    name: "Belly Gang Kushington",
    videoId: "WkLBlEMoiaA",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Belly%20Gang%20Kushington",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Kush doesn't just create music; he narrates his life.",
    bio: "Born and bred in the city of Atlanta, Belly Gang Kushington found his calling in the heart of the city's rap scene. Kush doesn't just create music; he narrates his life. Every song is a page from his experiences, a snapshot of his reality. From the struggle of leaving the drug world behind to dealing with incarceration.",
    stats: { followers: "45K", streams: "41.5M", saves: "551K", charts: "#1 Apple" },
    spotifyEmbedId: "3i2l7bO5O1o5b9oO6x5J9x",
    appleMusicEmbedId: "123456789"
  },
  {
    name: "TxC",
    videoId: "fT3-zWk92S4",
    category: "Signed",
    role: "DJs / Performers",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/TXC",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Trailblazing artists hailing from South Africa who have set out to redefine the music landscape.",
    bio: "Tarryn and Clairise, collectively known as TxC, are trailblazing artists hailing from South Africa who have set out to redefine the music landscape. Their debut EP, 'A Fierce Piano', and latest release, 'Turn Off The Lights', showcase their commitment to evolving sound and challenging the status quo.",
    stats: { followers: "680K", streams: "2.1M", creates: "80K", shazams: "271K" },
    spotifyEmbedId: "artist/25j9xL1MTyuycuB2xy2Q9g",
    appleMusicEmbedId: "za/artist/txc/1626508795",
    spotifyArtistUrl: "https://open.spotify.com/artist/25j9xL1MTyuycuB2xy2Q9g",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/txc/1626508795"
  },
  {
    name: "ThisIzLondon",
    category: "Signed",
    role: "Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/ThisizLondon.jpg",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / UK",
    quote: "With a growing portfolio, he has crafted chart-topping records for some of the biggest names in Pop and Afrobeats.",
    bio: "Grammy-nominated Producer Thisizlondon, born Michael Ovie Hunter in Kaduna, Nigeria, spent his youth moving across northern Nigeria. He taught himself production and relocated to Lagos, where he honed his skills. He notably contributed to Wizkid's 'Made in Lagos' and Rema's 'Rave & Roses'.",
    stats: { followers: "15K", streams: "41.4M" },
    videoId: "iMPsIFgYscc",
    spotifyEmbedId: "5qR9V9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "987654321"
  },
  {
    name: "Sadboi",
    videoId: "PpapqWrIN9U",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sadboi",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / CA",
    quote: "SadBoi expertly weaves elements of reggae, dancehall, and Caribbean culture into her captivating sound.",
    bio: "Ebhoni Cato O'Garro, aka 'SadBoi,' is an Atlanta-based artist originally from Toronto, Canada. With a Jamaican & Antiguan heritage deeply ingrained in her musical roots, SadBoi expertly weaves elements of reggae, dancehall, and Caribbean culture into her captivating sound, blending R&B, rap, rock, and pop.",
    stats: { followers: "85K", streams: "1.2M", playlists: "150+" },
    spotifyEmbedId: "0AAt9vGg5Oa8Fqg5p5lqA",
    appleMusicEmbedId: "1456156156"
  },
  {
    name: "Nektunez",
    videoId: "5dR3OfSI7gM",
    category: "Signed",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Nektunze",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "He entered the global music scene in 2021 with Ameno Amapiano (Remix), which topped Global Shazam.",
    bio: "Nektunez (Nobel Zogli) is an Atlanta-based Ghanaian DJ, producer, and singer-songwriter shaping global music with his fusion of Afrobeats, Amapiano, and electronic sounds. He entered the global music scene in 2021 with 'Ameno Amapiano (Remix)', which topped Global Shazam and iTunes in 22 countries.",
    stats: { followers: "210K", streams: "150M", shazams: "10M+" },
    spotifyEmbedId: "4X9zO9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "246813579"
  },
  {
    name: "BRS Kash",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/BRS%20Kash",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "His single 'Throat Baby' trended #1 in the US on Apple Music.",
    bio: "Born Kenneth Duncan, BRS Kash started writing at the age of 12. His southern flare, connection to the streets, and royalty status in Atlanta's nightlife culture make him one of Hip-Hop's most exciting rising acts. His single 'Throat Baby' trended #1 in the US on Apple Music.",
    stats: { followers: "560K", streams: "250M", charts: "#1" },
    videoId: "3j-k3Mvj_xM",
    spotifyEmbedId: "5s87W9vGg5Oa8Fqg5p5lqA",
    appleMusicEmbedId: "135792468"
  },
  {
    name: "North Ave Jax",
    category: "Signed",
    role: "Artist",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "At 2, he picked up drums. His mom introduced him to the likes of Smashing Pumpkins, Pearl Jam, etc.",
    bio: "When you think of Vermont, you think of maple syrup. North Ave Jax chose a much louder path. The Burlington native took the unexpected route personally and creatively, threading soundscapes punctuated by punk rock, pop ambition, and even R&B. After catching the attention of LVRN Records, he introduces a scorching signature style.",
    stats: { followers: "25K", streams: "3.5M" }
  },

  // Africa (Formerly HGA)
  {
    name: "Kwamzy",
    category: "Africa",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Kwamzy",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / UK",
    quote: "Kwamzy has captivated audiences with his infectious energy, distinct sound, and unparalleled talent.",
    bio: "Kwamzy is a dynamic force in the Amapiano, Afro House, and 3-step music scenes. His deep understanding and mastery of these genres have earned him respect and recognition from numerous South African artists. His signature tagline, \"Let's go!\" is synonymous with his high-energy performances.",
    stats: { followers: "11.5K", streams: "500K", listeners: "52K" }
  },
  {
    name: "Sushi.B",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sushi%20B",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "A groundbreaking Johannesburg-born producer reshaping the global Amapiano scene with his 'Private School' sound.",
    bio: "Kenny Katleho Magampa, known as Sushi.B, is a groundbreaking Johannesburg-born producer and artist reshaping the global Amapiano scene with his signature \"Private School\" sound—a sophisticated fusion of Amapiano, Latin, Spanish, Blues, RnB, and Jazz. His viral hits, including Shakespeare, Amigos, and Bruce Lee, have solidified his status as an international force.",
    stats: { followers: "213K", streams: "14.6M", listeners: "217K" }
  },
  {
    name: "Tango Supreme",
    category: "Africa",
    role: "DJ Duo",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Tango%20Supreme",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "IT TAKES TWO TO TANGO.",
    bio: "Tango Supreme is a dynamic international DJ duo made up of two ladies namely Tiisetso Moncho & Nomfundo Khumalo, born and raised in South Africa. Tango Supreme is a pivotal duo in ensuring that the Amapiano genre reaches a global status, creating trends and dance moves that breakout on the internet.",
    stats: { followers: "30K", streams: "24M", listeners: "420K" }
  },
  {
    name: "Buddy Kay",
    category: "Africa",
    role: "Producer / DJ",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Buddy%20Kay",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "A multi-hyphenate talent establishing himself through high-profile collaborations.",
    bio: "Buddy Kay (often credited as Kutlwano Mokgola) is an emerging South African Amapiano producer, DJ, and composer hailing from Soshanguve, Pretoria. Recognized as a multi-hyphenate talent, he has quickly established himself as a significant voice in the Amapiano scene. He views Amapiano as a movement to tell the stories of South African youth.",
    stats: { followers: "71.9K", streams: "3.2M", listeners: "84K" }
  },
  {
    name: "Sthibo de Beat",
    category: "Africa",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sthibo%20De%20Beat",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "A sonic architect turning roots into rhythms—forever young, wild, and free.",
    bio: "Sthibo de Beat (born Thabang Tlou Kgomo) is an award-winning South African DJ, producer, sound engineer, and entrepreneur. Originating from Ga-Matlala, Limpopo, and now based in Gauteng, his \"Young, Wild, and Free\" ethos resonates through his dynamic productions and electrifying performances.",
    stats: { followers: "6K", streams: "245K", listeners: "2K" }
  },
  {
    name: "Boibizza",
    category: "Africa",
    role: "Vocalist / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Boibizza",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Boibizza continues to make waves in the music scene with vocal artistry.",
    bio: "Hailing from Daveyton but raised in Kwa-Thema, Boibizza's journey into music began at a young age. As his name spread, he consistently delivered high-energy performances. His big break came through a collaboration with Tony Duardo and Ciza on the track 'Tanzania', which was featured on Uncle Waffles' debut EP.",
    stats: { followers: "131K", streams: "65M", listeners: "1.65M" }
  },
  {
    name: "Leandra.Vert",
    category: "Africa",
    role: "Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Leandra.Vert",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "One of Amapiano's most distinctive new voices.",
    bio: "Leandra.Vert (born Tshireletso Chantelle Mokau) is a South African singer-songwriter who has emerged as one of Amapiano's most distinctive new voices. She blends the soulful feel of R&B with the house-driven rhythms of Amapiano. Her influences include artists like Ari Lennox, Sade, Sabrina Claudio and SZA.",
    stats: { followers: "27.7K", streams: "10M", listeners: "84K" }
  },
  {
    name: "Optimist Music ZA",
    category: "Africa",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Optimist%20Music%20Za",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "A vibrant blend of soulful vocals, melodic hooks, and contemporary Afro-house beats.",
    bio: "Optimist Music ZA, whose real name is Thabo Musa, is an artist from Mamelodi, Pretoria, South Africa, specializing in Afro-Pop, Amapiano, and Soulful Pop. His signature sound is a vibrant blend of soulful vocals, melodic hooks, and contemporary Afro-house beats, earning him the name \"Optimist.\"",
    stats: { followers: "24.7K", streams: "23.6M", listeners: "383K" }
  },
  {
    name: "Tony Duardo",
    category: "Africa",
    role: "Producer / Executive",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "Duardo's mission is deeply intertwined with his personal faith.",
    bio: "Antonio-David Hampton; Tony Duardo, is an illustrious Pan-African record producer, DJ, creative director, Multi-Instrumentalist and entrepreneur. He leads HGA (Home of African Stars), one of the leading Independent Labels Across Africa. He played a pivotal role in developing talents such as Uncle Waffles and TxC.",
    stats: { followers: "140K", streams: "15M" },
    spotifyEmbedId: "2v9Xo9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "123456789"
  },
  {
    name: "Ggoldie",
    category: "Africa",
    role: "DJ",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Ggoldie is a versatile DJ hailing from Tembisa, South Africa.",
    bio: "Ggoldie is a versatile DJ hailing from Tembisa, South Africa. She has been active in the music scene since 2021, carving out a distinctive path for herself within the Amapiano genre. She has graced some of South Africa's most prominent stages, including Cotton Fest and Boiler Room.",
    stats: { followers: "85K", streams: "500K" },
    spotifyEmbedId: "0k1O9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "987654321"
  },
  {
    name: "Al Xapo",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/al%20xapo.jpg?updatedAt=1769932118440",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "Al Xapo is a young versatile and talented producer, Dj, and vocalist.",
    bio: "Al Xapo, AKA 'Public Enemy' is a young versatile and talented producer & beat maker as well as artist & DJ who started his musical journey at the tender age of 15. He started by being on the decks then later exploring his production and vocal talents.",
    stats: { followers: "10K", streams: "1.2M", creates: "139K" },
    spotifyEmbedId: "2v9Xo9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "246813579",
    videoId: "7cQz60N88Jg"
  },
  {
    name: "Chley",
    category: "Africa",
    role: "Vocalist",
    image: "https://ik.imagekit.io/mosesmawela/chley.jpg?updatedAt=1769932121339",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "The 18 year old vocalist only began making music recently in 2021.",
    bio: "Siphesihle Nkosi affectionately known as Chley is a South African talent sensation born in the East Rand, Benoni. Her big breakthrough was in 2022 when she worked with Musa Keys on 'M'nike' which made considerable waves in the industry.",
    stats: { followers: "110K", streams: "8M" }
  },
  {
    name: "Ezmaestro",
    category: "Africa",
    role: "Artist / DJ",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ezmaestro",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "An artist and DJ shaping the new Amapiano sound under HGA/LVRN.",
    bio: "Ezmaestro is an emerging artist and DJ who has quickly gained traction within the Amapiano scene. Working closely with HGA and LVRN Records, he represents the new wave of South African musical exports.",
    stats: { followers: "45K", streams: "3.2M" },
    videoId: "GIVoX0yfjlo"
  },
  {
    name: "Colkaze",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Colkaze",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Colkaze's 'Riddim' EP showcases his versatility as a producer and artist.",
    bio: "Colkaze is a South African producer and artist who blends diverse riddims and sounds. His work with HGA/LVRN Records has established him as a key figure in the label's African expansion strategy.",
    stats: { followers: "28K", streams: "1.8M" },
    videoId: "tzKBwhg5CM4"
  },
  {
    name: "Seekay",
    category: "Africa",
    role: "Performer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Seekay",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Seekay's magnetic energy and genre-blending tracks have made him a breakout star.",
    bio: "Seekay is a South African performer known for his infectious energy and successful singles like 'Location' and 'Khululeka'. His collaboration with Tony Duardo and LVRN has propelled him to new heights across the continent.",
    stats: { followers: "95K", streams: "12M" },
    videoId: "c7asU1UIExk"
  },

  // Management
  {
    name: "DVSN",
    category: "Management",
    role: "R&B Duo",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Toronto duo DVSN are best known for their narcotic slow-jams that R&B lovers live for.",
    bio: "Toronto duo DVSN, consisting of vocalist Daniel Daley and Grammy Award Winning producer Nineteen85, are best known for their narcotic slow-jams that R&B lovers live for. Their music balances the right combination of falsetto deliveries and contemporary production.",
    stats: { followers: "4.2M", streams: "2.1B", playlists: "12K" }
  },
  {
    name: "Baby Tate",
    category: "Management",
    role: "Artist",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / Intl",
    quote: "Fueled by self-love and manifested dreams, Baby Tate is forever evolving.",
    bio: "Fueled by self-love and manifested dreams, Baby Tate is forever evolving. Within a single body of work, you'll hear summery pop, amorous R&B, and hard-hitting hip-hop. Baby Tate has a knack for creating viral moments in music and is the unofficial Queen of TikTok.",
    stats: { followers: "2.8M", streams: "850M", creates: "2M+" },
    videoId: "W_zzCnGp70c"
  },
  {
    name: "Spinall",
    category: "Management",
    role: "DJ / Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Spinall is one of Africa's most recognizable and successful dj's to date.",
    bio: "Spinall is one of Africa's most recognizable and successful DJ's. The DJ, producer, and songwriter, with his signature African cap is well known for his large catalog of hit singles. Spinall has collaborated with the likes of Burna Boy, WizKid, Davido.",
    stats: { followers: "2.5M", streams: "300M" }
  },

  // Publishing
  {
    name: "Slim Wav",
    category: "Publishing",
    role: "Producer / Musical Director",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Slim Wav is a multi-talented musician, producer, artist, multi-instrumentalist, and writer.",
    bio: "Slim Wav (aka Jerome Monroe) is a multi-talented musician, producer, artist, multi-instrumentalist, and writer hailing from Augusta, Georgia. He currently serves as the lead Musical Director for Grammy-nominated artist, 6lack. He produced LVRN's hit Christmas album, 'Home for the Holidays'.",
    stats: { followers: "12K", streams: "100M" }
  },
  {
    name: "300it",
    category: "Publishing",
    role: "Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "His ambition is to become one of the few producers with multiple diamond records.",
    bio: "300it (pronounced three Hunnit) music journey began when he fell in love with the keyboard at 4 years old. Because of his Jamaican heritage, he was exposed to Reggae and Dancehall music at an early age. He has worked with North Ave Jax, Swae Lee, MoneyBagg Yo, and others.",
    stats: { followers: "8K", streams: "50M" }
  },
  {
    name: "Storm Ford",
    category: "Publishing",
    role: "Singer / Songwriter / Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Storm's music has been streamed over 350,000 times and healed listeners in over 60 countries.",
    bio: "Storm Ford is a 21-year old Atlanta based singer-songwriter, producer, and guitarist from Providence, Rhode Island. In 2021, after being introduced to LVRN's Head of A&R, Justice Baiden, through Instagram Live, Storm has worked closely with the label and its roster.",
    stats: { followers: "5K", streams: "350K" }
  },
  {
    name: "DJ Tonee",
    category: "Publishing",
    role: "DJ / Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Currently, DJ Tonee is the Official DJ for Multi Platinum recording Artist '6lack'.",
    bio: "Antonio Morgan, also known as DJ Tonee, is an emerging hip-hop DJ / Producer from Atlanta, Georgia. His process to create songs is completely different and unorthodox. Currently, DJ Tonee is the Official DJ for Multi Platinum recording Artist '6lack'.",
    stats: { followers: "15K", streams: "5M" }
  },
  {
    name: "Crack God",
    category: "Publishing",
    role: "Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Crack God has solidified his place as a Billboard charting music producer.",
    bio: "In the ever-evolving landscape of music production, Crack God emerges as a force to be reckoned with. He has solidified his place as a Billboard charting music producer and a RIAA Gold Producer, amassing over 300 million streams along the way.",
    stats: { followers: "10K", streams: "300M" }
  },
  {
    name: "Genio & GMK",
    category: "Publishing",
    role: "Producers",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Intl",
    quote: "Genio's project aims to bring popular Western energy to Afrocentric production.",
    bio: "A frequent name you'll see on the credits for 'Subaru Boys: FINAL HEAVEN' is the producer duo Monster Boys, made of GMK and Genio Bambino. The Duo from Nigeria are signed to LVRN Publishing and are also working on their own producer projects.",
    stats: { followers: "8K", streams: "75M" }
  }
];

ARTISTS.forEach(artist => {
  ARTIST_MAP[artist.name] = artist;
});

export const MILESTONES: Milestone[] = [
  { year: "2012", title: "Inception", description: "LVRN founded by five Georgia State University students to bring authentic emotion back to music." },
  { year: "2013", title: "First Signing", description: "Signed first artist, singer-songwriter Raury." },
  { year: "2016", title: "Mainstream Break", description: "Major expansion with 6LACK and DRAM. 'Free 6LACK' released." },
  { year: "2017", title: "LVRN Studios", description: "Secured Interscope deal and launched Atlanta-based creative studios." },
  { year: "2019", title: "Over It", description: "Summer Walker's debut album smashes records for female R&B debuts." },
  { year: "2021", title: "Billboard #1", description: "Summer Walker's 'Still Over It' debuts at #1 on Billboard 200." },
  { year: "2023", title: "$100M Valuation", description: "Investment from Matt Pincus' MUSIC values LVRN over $100M." },
  { year: "2024", title: "Genre Expansion", description: "Signed country artist Tanner Adell, bridging country, pop, and hip-hop." },
  { year: "2025", title: "Trilogy Complete", description: "Summer Walker releases 'Finally Over It', completing her acclaimed trilogy." }
];

export const STATS: Stat[] = [
  { label: "Valuation", value: "$100M", suffix: "+" },
  { label: "Experience", value: "13", suffix: " Years" },
  { label: "Billboard 200", value: "#1", suffix: " Debuts" },
  { label: "Grammy", value: "Multi", suffix: " Noms" }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  { title: "Artist Development", description: "We discover talent early and invest heavily in their unique brand and long-term career strategies." },
  { title: "Creative Innovation", description: "Groundbreaking campaigns like AR experiences and socially distanced listening parties." },
  { title: "Mental Health", description: "Free therapy services for everyone in the organization, prioritizing wellness over fixing problems." },
  { title: "Cultural Mission", description: "Committed to uplifting the community and supporting Black-owned businesses." }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Website', url: 'https://lvrn.com' },
  { name: 'Instagram', url: 'https://www.instagram.com/lvrngram' },
  { name: 'X', url: 'https://twitter.com/LVRN' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/vx7zuhzujq48tyyjsrzw2u1h5' },
  { name: 'Facebook', url: 'https://www.facebook.com/loverenaissance' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@lvrn' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCILhhbWqZU3b5x2KVRnspfQ' }
];

export const VIDEOS: VideoItem[] = [
  { id: 'v12', title: 'The Blackprint: Tunde Balogun Interview', artist: 'Tunde Balogun', thumbnail: 'https://i.ytimg.com/vi/zneGWJroa_Y/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/zneGWJroa_Y', duration: '52:14', views: '250K', category: 'Interview' },
  { id: 'v6', title: 'SNOKONOKO II', artist: 'Al Xapo, ShalliPoppi, Benzoo & Eeque', thumbnail: 'https://i.ytimg.com/vi/bnoGzqxTUYQ/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/bnoGzqxTUYQ', duration: '4:21', views: '1.5M', category: 'Music Video' },
  { id: 'v1', title: 'Rent Due', artist: 'Belly Gang Kushington', thumbnail: 'https://i.ytimg.com/vi/G1l_yUbex0g/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/G1l_yUbex0g', duration: '3:12', views: '2.1M', category: 'Music Video' },
  { id: 'v2', title: 'Snokonoko', artist: 'Al Xapo, Benzoo & Eeque', thumbnail: 'https://i.ytimg.com/vi/YxU-vshDkAA/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/YxU-vshDkAA', duration: '3:54', views: '4.8M', category: 'Music Video' },
  { id: 'v3', title: 'Nakupenda', artist: 'TxC, Davido, Shoday & Scotts Maphuma ft. Zlatan & Al Xapo', thumbnail: 'https://i.ytimg.com/vi/86pC4vqOi80/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/86pC4vqOi80', duration: '4:08', views: '1.2M', category: 'Music Video' },
  { id: 'v4', title: 'PINACOLADA', artist: 'Thisizlondon ft. Ayra Starr & 6LACK', thumbnail: 'https://i.ytimg.com/vi/peH96cvRmls/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/peH96cvRmls', duration: '3:35', views: '3.1M', category: 'Music Video' },
  { id: 'v5', title: 'Yebo', artist: 'TXC & Davido ft. Tony Duardo, LeeMckrazy & DJ Biza', thumbnail: 'https://i.ytimg.com/vi/zrW2Zap7R4k/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/zrW2Zap7R4k', duration: '4:15', views: '2.4M', category: 'Music Video' },
  { id: 'v7', title: 'SNOKONOKO', artist: 'Al Xapo, Benzoo & EeQue', thumbnail: 'https://i.ytimg.com/vi/wgGa9SgxhJI/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/wgGa9SgxhJI', duration: '3:50', views: '1.1M', category: 'Music Video' },
  { id: 'v8', title: 'STANCE', artist: 'Al Xapo, Benzoo & Optimist MusicZA', thumbnail: 'https://i.ytimg.com/vi/KHf9unwLGH8/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/KHf9unwLGH8', duration: '4:02', views: '850K', category: 'Music Video' },
  { id: 'v9', title: 'Sandla Sam', artist: 'Ggoldie, CowBoii & Al Xapo', thumbnail: 'https://i.ytimg.com/vi/C18pDqqtdgg/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/C18pDqqtdgg', duration: '3:40', views: '500K', category: 'Music Video' },
  { id: 'v10', title: 'Snokonoko (Lyric Video)', artist: 'Al Xapo, Benzoo & Eeque', thumbnail: 'https://i.ytimg.com/vi/BGpdaPA5M1s/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/BGpdaPA5M1s', duration: '3:54', views: '2.2M', category: 'Lyric Video' },
  { id: 'v11', title: 'STANCE (Lyric Video)', artist: 'Al Xapo, Benzoo & Optimist Music ZA', thumbnail: 'https://i.ytimg.com/vi/_TR4QP7y_TI/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/_TR4QP7y_TI', duration: '4:02', views: '1.4M', category: 'Lyric Video' },
  { id: 'v13', title: 'ThisIzLondon Interview Part 1', artist: 'ThisIzLondon', thumbnail: 'https://i.ytimg.com/vi/XCiTI7gtcC4/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/XCiTI7gtcC4', duration: '12:15', views: '45K', category: 'Interview' },
  { id: 'v14', title: 'ThisIzLondon Interview Part 2', artist: 'ThisIzLondon', thumbnail: 'https://i.ytimg.com/vi/vbn6WJniylw/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/vbn6WJniylw', duration: '10:40', views: '32K', category: 'Interview' },
  { id: 'v15', title: 'ThisIzLondon Interview Part 3', artist: 'ThisIzLondon', thumbnail: 'https://i.ytimg.com/vi/fNkz_q-Ao78/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/fNkz_q-Ao78', duration: '15:20', views: '28K', category: 'Interview' },
  { id: 'v16', title: 'Summer Walker Interview Part 1', artist: 'Summer Walker', thumbnail: 'https://i.ytimg.com/vi/VPNq8se13U4/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/VPNq8se13U4', duration: '18:45', views: '1.2M', category: 'Interview' },
  { id: 'v17', title: 'Summer Walker Interview Part 2', artist: 'Summer Walker', thumbnail: 'https://i.ytimg.com/vi/FghRBq_rc7o/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/FghRBq_rc7o', duration: '22:10', views: '950K', category: 'Interview' },
  { id: 'v18', title: 'Summer Walker Interview Part 3', artist: 'Summer Walker', thumbnail: 'https://i.ytimg.com/vi/CqmhXDss1t8/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/CqmhXDss1t8', duration: '14:30', views: '820K', category: 'Interview' },
  { id: 'v19', title: 'TxC Interview Part 1', artist: 'TxC', thumbnail: 'https://i.ytimg.com/vi/isHJIIzkWA8/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/isHJIIzkWA8', duration: '8:12', views: '110K', category: 'Interview' },
  { id: 'v20', title: 'TxC Interview Part 2', artist: 'TxC', thumbnail: 'https://i.ytimg.com/vi/2rSd-Wm3o0k/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/2rSd-Wm3o0k', duration: '10:05', views: '85K', category: 'Interview' },
  { id: 'v21', title: 'Al Xapo Interview Part 1', artist: 'Al Xapo', thumbnail: 'https://i.ytimg.com/vi/XSJcWlZ25hM/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/XSJcWlZ25hM', duration: '12:30', views: '45K', category: 'Interview' },
  { id: 'v22', title: 'Al Xapo Interview Part 2', artist: 'Al Xapo', thumbnail: 'https://i.ytimg.com/vi/g1J6KfrteQo/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/g1J6KfrteQo', duration: '14:15', views: '38K', category: 'Interview' },
  { id: 'v23', title: 'Al Xapo Interview Part 3', artist: 'Al Xapo', thumbnail: 'https://i.ytimg.com/vi/52GwXridrvk/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/52GwXridrvk', duration: '11:50', views: '32K', category: 'Interview' },
  { id: 'v24', title: 'Ggoldie Interview', artist: 'Ggoldie', thumbnail: 'https://i.ytimg.com/vi/OuO6quhdAiU/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/OuO6quhdAiU', duration: '9:40', views: '65K', category: 'Interview' },
  { id: 'v25', title: 'Chley Interview Part 1', artist: 'Chley', thumbnail: 'https://i.ytimg.com/vi/7laYKYi5xpk/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/7laYKYi5xpk', duration: '15:20', views: '28K', category: 'Interview' },
  { id: 'v26', title: 'Chley Interview Part 2', artist: 'Chley', thumbnail: 'https://i.ytimg.com/vi/rgApfcH73tY/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/rgApfcH73tY', duration: '12:10', views: '22K', category: 'Interview' },
  { id: 'v27', title: 'Tango Supreme Interview', artist: 'Tango Supreme', thumbnail: 'https://i.ytimg.com/vi/IfnIcUu5cHk/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/IfnIcUu5cHk', duration: '18:30', views: '15K', category: 'Interview' },
  { id: 'v28', title: 'DVSN Interview Part 1', artist: 'DVSN', thumbnail: 'https://i.ytimg.com/vi/diYyu-Ynj4M/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/diYyu-Ynj4M', duration: '25:40', views: '210K', category: 'Interview' },
  { id: 'v29', title: 'DVSN Interview Part 2', artist: 'DVSN', thumbnail: 'https://i.ytimg.com/vi/rBeXSSHWxGI/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/rBeXSSHWxGI', duration: '22:15', views: '180K', category: 'Interview' },
  { id: 'v30', title: 'Spinall Interview', artist: 'Spinall', thumbnail: 'https://i.ytimg.com/vi/YgbYxQGWsW8/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/YgbYxQGWsW8', duration: '14:20', views: '75K', category: 'Interview' },
  { id: 'v31', title: 'Sushi.B Interview', artist: 'Sushi.B', thumbnail: 'https://i.ytimg.com/vi/d2gpbmlZDuw/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/d2gpbmlZDuw', duration: '11:05', views: '32K', category: 'Interview' },
  { id: 'v32', title: 'Selectcon 005: How to Be Independent w| LVRN', artist: 'LVRN', thumbnail: 'https://i.ytimg.com/vi/M3pmpfr4O30/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/M3pmpfr4O30', duration: '45:30', views: '120K', category: 'Interview' },
  { id: 'v33', title: "Founder Of LVRN Justice Talks How LVRN Was Built, Summer Walker's Success, Artist Development & More", artist: 'Justice Baiden', thumbnail: 'https://i.ytimg.com/vi/J2Q-DKPpBXA/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/J2Q-DKPpBXA', duration: '58:20', views: '350K', category: 'Interview' },
  { id: 'v34', title: "LVRN Co-Founder Justice Baiden On Summer Walker's 'Finally Over It' | Hey Janeé Podcast | Episode 27", artist: 'Justice Baiden & Summer Walker', thumbnail: 'https://i.ytimg.com/vi/bxC-oiZddN0/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/bxC-oiZddN0', duration: '1:12:40', views: '450K', category: 'Interview' },
  { id: 'v35', title: "Friend Do Remix ft. YKNIECE (Official Music Video)", artist: "Belly Gang Kushington", thumbnail: "https://i.ytimg.com/vi/WkLBlEMoiaA/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/WkLBlEMoiaA", duration: "3:45", views: "1.2M", category: "Music Video" },
  { id: 'v36', title: "Baddi Ah (Official Visualizer) ft. Tripcy, P.M.F & Megaej", artist: "Nektunez, Ciza, Tiwa Savage & Shoday", thumbnail: "https://i.ytimg.com/vi/5dR3OfSI7gM/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/5dR3OfSI7gM", duration: "4:12", views: "850K", category: "Music Video" },
  { id: 'v37', title: "Betha Sghubu 2.0 Feat. M00tion & T00Valid (Official Visualiser)", artist: "Ez Maestro, Ch'cco & Eeque", thumbnail: "https://i.ytimg.com/vi/GIVoX0yfjlo/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/GIVoX0yfjlo", duration: "3:58", views: "620K", category: "Music Video" },
  { id: 'v38', title: "Many Girls ft. BRUME (Official Visualizer)", artist: "Thisizlondon", thumbnail: "https://i.ytimg.com/vi/iMPsIFgYscc/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/iMPsIFgYscc", duration: "3:24", views: "450K", category: "Music Video" },
  { id: 'v39', title: "PINACOLADA REMIX ft. Beéle, Ayra Starr & 6LACK", artist: "Thisizlondon", thumbnail: "https://i.ytimg.com/vi/-obm4F_YKI4/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/-obm4F_YKI4", duration: "4:05", views: "2.1M", category: "Music Video" },
  { id: 'v40', title: "Bird Flu", artist: "6LACK", thumbnail: "https://i.ytimg.com/vi/xHtLTXBmtQA/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/xHtLTXBmtQA", duration: "3:15", views: "3.5M", category: "Music Video" },
  { id: 'v41', title: "Nights In The Sun (feat. Wizkid)", artist: "Odeal", thumbnail: "https://i.ytimg.com/vi/LUEojiBiW1w/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/LUEojiBiW1w", duration: "3:42", views: "5.6M", category: "Music Video" },
  { id: 'v42', title: "INTWE NAMI [OFFICIAL] VISUALIZER", artist: "Colkaze", thumbnail: "https://i.ytimg.com/vi/tzKBwhg5CM4/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/tzKBwhg5CM4", duration: "4:30", views: "320K", category: "Music Video" },
  { id: 'v43', title: "Baddies (Official Video)", artist: "Sadboi", thumbnail: "https://i.ytimg.com/vi/PpapqWrIN9U/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/PpapqWrIN9U", duration: "3:10", views: "1.1M", category: "Music Video" },
  { id: 'v44', title: "Straight (prod by @Lucas Scharff)", artist: "Baby Tate", thumbnail: "https://i.ytimg.com/vi/W_zzCnGp70c/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/W_zzCnGp70c", duration: "2:55", views: "940K", category: "Music Video" },
  { id: 'v45', title: "Location (Official Music Video)", artist: "Seekay, Tshepi P, Tony Duardo", thumbnail: "https://i.ytimg.com/vi/c7asU1UIExk/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/c7asU1UIExk", duration: "3:48", views: "4.2M", category: "Music Video" },
  { id: 'v46', title: "LVRN Executive Interview", artist: "LVRN", thumbnail: "https://i.ytimg.com/vi/ULRLKglyVN8/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/ULRLKglyVN8", duration: "20:00", views: "100K", category: "Interview" }
];

import type { Release } from './types';

// Comprehensive Release Catalog
export const FULL_RELEASES: Release[] = [
    // Summer Walker Releases
    {
        id: 1,
        artist: "Summer Walker",
        title: "Still Over It",
        type: "Album",
        date: "2021",
        cover: "https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg",
        link: "https://music.apple.com/za/album/still-over-it/1592652174",
        spotifyId: "1Ba4tVkFViKy6KmRyd9adZ",
        appleId: "1592652174",
        tracks: [
            { title: "Bitter (feat. Cardi B)", duration: "2:52", featured: ["Cardi B"] },
            { title: "Ex For A Reason", duration: "3:45", writers: ["Summer Walker", "Tricky Stewart"] },
            { title: "No Love (feat. SZA)", duration: "3:51", featured: ["SZA"] },
            { title: "Throw It Away", duration: "2:31" },
            { title: "Reciprocate", duration: "3:02" },
            { title: "You Don't Know Me", duration: "3:24" },
            { title: "Circus", duration: "3:48" },
            { title: "Broken Promises", duration: "3:08" },
            { title: "Dat Right There (feat. Pharrell Williams)", duration: "3:12", featured: ["Pharrell Williams"] },
            { title: "Toxic", duration: "2:49" }
        ],
        totalTracks: 20,
        genre: ["R&B", "Alternative R&B"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 1200000000, monthlyListeners: 8500000, popularity: 78 },
            appleMusic: { plays: 450000000 },
            youtube: { views: 2800000000 }
        },
        popularity: 85,
        isExplicit: true,
        parentalAdvisory: true,
        description: "Summer Walker's debut album featuring massive hits and collaborations with Cardi B, SZA, and Pharrell Williams."
    },
    {
        id: 2,
        artist: "6LACK",
        title: "East Atlanta Love Letter",
        type: "Album",
        date: "2018",
        cover: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/6lack",
        link: "https://music.apple.com/za/album/east-atlanta-love-letter/1435201630",
        spotifyId: "42IozonD99Uf6i2D6v567v",
        appleId: "1435201630",
        tracks: [
            { title: "Unfair", duration: "3:01" },
            { title: "Loaded Gun", duration: "3:18" },
            { title: "East Atlanta Love Letter", duration: "4:06", writers: ["6LACK", "Jermaine Cole"] },
            { title: "Let Her Go", duration: "3:24" },
            { title: "Sorry", duration: "4:18" }
        ],
        totalTracks: 14,
        genre: ["Hip Hop", "R&B", "Alternative Hip Hop"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 950000000, monthlyListeners: 6200000, popularity: 72 },
            appleMusic: { plays: 320000000 },
            youtube: { views: 1800000000 }
        },
        popularity: 78,
        isExplicit: true,
        parentalAdvisory: true,
        description: "6LACK's critically acclaimed debut album featuring production from J. Cole and a unique blend of hip-hop and R&B."
    },
    {
        id: 3,
        artist: "CIZA",
        title: "Golden Boy Pack",
        type: "EP",
        date: "2023",
        cover: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza",
        link: "https://music.apple.com/za/album/golden-boy-pack/1585641561",
        spotifyId: "29nC0u1p1zM8Z3yU4X3Z0u",
        appleId: "1585641561",
        tracks: [
            { title: "Bank Notification", duration: "4:20", producers: ["Mellow & Sleazy"] },
            { title: "Come Alive", duration: "3:50", producers: ["Mellow & Sleazy"] },
            { title: "Jiggy", duration: "3:15", producers: ["Mellow & Sleazy"] },
            { title: "Ngempela", duration: "4:05", producers: ["Mellow & Sleazy"] },
            { title: "Golden Boy", duration: "3:42", producers: ["Mellow & Sleazy"] },
            { title: "Come Alive (Remix)", duration: "4:12", producers: ["Mellow & Sleazy"] }
        ],
        totalTracks: 6,
        genre: ["Amapiano", "Afrobeats", "South African House"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 150000000, monthlyListeners: 1200000, popularity: 65 },
            appleMusic: { plays: 85000000 },
            youtube: { views: 450000000 }
        },
        popularity: 68,
        isExplicit: false,
        description: "CIZA's breakthrough EP that introduced him to the global stage with infectious Amapiano beats."
    },
    // Additional Releases
    {
        id: 4,
        artist: "DVSN",
        title: "A Muse In Her Feelings",
        type: "EP",
        date: "2020",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/ca/album/a-muse-in-her-feelings/1500599161",
        spotifyId: "1jzF8ZFJXJCgwE8eWVv2Ww",
        appleId: "1500599161",
        tracks: [
            { title: "Mood", duration: "3:22" },
            { title: "Miss Me?", duration: "3:12" },
            { title: "Dear Summer Sixteen", duration: "2:58" },
            { title: "No Cryin (feat. Future)", duration: "3:35", featured: ["Future"] }
        ],
        totalTracks: 7,
        genre: ["R&B", "Contemporary R&B"],
        label: "LVRN/Warner Records",
        streamingStats: {
            spotify: { streams: 450000000, monthlyListeners: 3200000, popularity: 70 },
            appleMusic: { plays: 180000000 },
            youtube: { views: 950000000 }
        },
        popularity: 72,
        isExplicit: true,
        description: "DVSN's intimate EP exploring themes of love and relationships."
    },
    {
        id: 5,
        artist: "Odeal",
        title: "Odeal",
        type: "EP",
        date: "2022",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/gb/album/odeal-ep/1609095397",
        spotifyId: "2CwXGgP8Kj1q6rR4FfGbJB",
        appleId: "1609095397",
        tracks: [
            { title: "Be Easy", duration: "3:28" },
            { title: "Sena", duration: "3:15" },
            { title: "Soweto Blues", duration: "4:02" },
            { title: "Want You", duration: "3:45" }
        ],
        totalTracks: 4,
        genre: ["Alternative R&B", "Afrobeats"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 85000000, monthlyListeners: 800000, popularity: 58 },
            appleMusic: { plays: 42000000 },
            youtube: { views: 180000000 }
        },
        popularity: 60,
        isExplicit: false,
        description: "Odeal's debut EP showcasing his soulful vocals and unique sound."
    },
    {
        id: 6,
        artist: "Baby Tate",
        title: "After The Party!",
        type: "EP",
        date: "2021",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/after-the-party/1570489934",
        spotifyId: "6WJ8XKJZ7Xg6t1qO0mFkJB",
        appleId: "1570489934",
        tracks: [
            { title: "Pedi", duration: "2:18" },
            { title: "Rainbow Cadillac", duration: "2:43" },
            { title: "Hey, Mickey!", duration: "2:29" },
            { title: "Mood", duration: "2:35" }
        ],
        totalTracks: 7,
        genre: ["Hip Hop", "Rap"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 120000000, monthlyListeners: 950000, popularity: 62 },
            appleMusic: { plays: 65000000 },
            youtube: { views: 280000000 }
        },
        popularity: 64,
        isExplicit: true,
        description: "Baby Tate's vibrant and energetic EP full of personality and catchy hooks."
    },
    {
        id: 7,
        artist: "6LACK",
        title: "FREE 6LACK",
        type: "Album",
        date: "2016",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/free-6lack/1162497294",
        spotifyId: "3r8CQO9X0y8HfYsxEdYx0L",
        appleId: "1162497294",
        tracks: [
            { title: "Never Know", duration: "3:32" },
            { title: "Rules", duration: "4:22" },
            { title: "PRBLMS", duration: "3:35" },
            { title: "Free", duration: "2:59" }
        ],
        totalTracks: 14,
        genre: ["Hip Hop", "R&B"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 680000000, monthlyListeners: 4800000, popularity: 68 },
            appleMusic: { plays: 250000000 },
            youtube: { views: 1200000000 }
        },
        popularity: 70,
        isExplicit: true,
        description: "6LACK's debut mixtape that put him on the map with its introspective lyricism."
    },
    {
        id: 8,
        artist: "Summer Walker",
        title: "Last Day Of Summer",
        type: "Album",
        date: "2024",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/last-day-of-summer/1761426013",
        spotifyId: "7zfY4R7YdgZYl2jz0ZFP4d",
        appleId: "1761426013",
        tracks: [
            { title: "To Be Young", duration: "3:25", featured: ["Doja Cat"] },
            { title: "BP", duration: "3:42" },
            { title: "Mind Control", duration: "3:15" },
            { title: "You Don't Know Me", duration: "3:28" }
        ],
        totalTracks: 18,
        genre: ["R&B", "Pop"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 280000000, monthlyListeners: 2500000, popularity: 75 },
            appleMusic: { plays: 120000000 },
            youtube: { views: 650000000 }
        },
        popularity: 76,
        isExplicit: true,
        description: "Summer Walker's latest album featuring collaborations and her signature emotional R&B."
    },
    {
        id: 9,
        artist: "TxC",
        title: "A Fierce Piano",
        type: "EP",
        date: "2023",
        cover: "https://images.unsplash.com/photo-1571266028243-3716f02d2e18?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/za/album/a-fierce-piano/1659123456",
        spotifyId: "4X8nF8Y7Z9aB2cD3eF4gH5i",
        appleId: "1659123456",
        tracks: [
            { title: "Turn Off The Lights", duration: "4:12" },
            { title: "Piano Fever", duration: "3:58" },
            { title: "Fierce Love", duration: "4:05" },
            { title: "Midnight Groove", duration: "3:42" }
        ],
        totalTracks: 6,
        genre: ["Amapiano", "Piano House"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 95000000, monthlyListeners: 750000, popularity: 55 },
            appleMusic: { plays: 48000000 },
            youtube: { views: 220000000 }
        },
        popularity: 57,
        isExplicit: false,
        description: "TxC's powerful Amapiano EP featuring infectious piano-driven beats."
    },
    {
        id: 10,
        artist: "Nektunez",
        title: "Bad Since '97",
        type: "Album",
        date: "2024",
        cover: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/ng/album/bad-since-97/1789456123",
        spotifyId: "5Y6z7X8aB9cD0eF1gH2iJ3k",
        appleId: "1789456123",
        tracks: [
            { title: "Ameno Amapiano (Remix)", duration: "3:45", featured: ["Goya Menor", "Nektunez"] },
            { title: "Oyinbo", duration: "3:12" },
            { title: "Logba Logba", duration: "3:28" },
            { title: "Emergency", duration: "3:55" }
        ],
        totalTracks: 14,
        genre: ["Afrobeats", "Amapiano"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 180000000, monthlyListeners: 1500000, popularity: 68 },
            appleMusic: { plays: 95000000 },
            youtube: { views: 480000000 }
        },
        popularity: 69,
        isExplicit: false,
        description: "Nektunez's global breakthrough album featuring massive hits and Afrobeats innovation."
    },
    {
        id: 11,
        artist: "6LACK",
        title: "Since I Have A Lover",
        type: "Album",
        date: "2023",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/since-i-have-a-lover/1696997264",
        spotifyId: "1l8o80X7BjQX0jKGzq6KjP",
        appleId: "1696997264",
        tracks: [
            { title: "Since I Have A Lover", duration: "4:12" },
            { title: "Hostile", duration: "3:45", featured: ["FKA Twigs"] },
            { title: "Vintage", duration: "3:28" },
            { title: "Talkback", duration: "3:55" }
        ],
        totalTracks: 11,
        genre: ["R&B", "Alternative R&B"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 220000000, monthlyListeners: 1900000, popularity: 71 },
            appleMusic: { plays: 105000000 },
            youtube: { views: 580000000 }
        },
        popularity: 72,
        isExplicit: true,
        description: "6LACK's introspective album exploring love, loss, and personal growth."
    },
    {
        id: 12,
        artist: "CIZA",
        title: "Come Alive",
        type: "Single",
        date: "2022",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/za/album/come-alive/1623456789",
        spotifyId: "6Z7y8X9aB0cD1eF2gH3iJ4k",
        appleId: "1623456789",
        tracks: [
            { title: "Come Alive", duration: "3:50", producers: ["Mellow & Sleazy"] }
        ],
        totalTracks: 1,
        genre: ["Amapiano", "Afrobeats"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 75000000, monthlyListeners: 600000, popularity: 60 },
            appleMusic: { plays: 38000000 },
            youtube: { views: 195000000 }
        },
        popularity: 62,
        isExplicit: false,
        description: "CIZA's breakout single that introduced him to the international music scene."
    },
    {
        id: 13,
        artist: "DVSN",
        title: "Working On My Karma",
        type: "EP",
        date: "2022",
        cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/ca/album/working-on-my-karma/1634567890",
        spotifyId: "7A8b9C0d1E2f3G4h5I6j7K8l",
        appleId: "1634567890",
        tracks: [
            { title: "Keep It Cool", duration: "3:15" },
            { title: "Working On My Karma", duration: "3:42" },
            { title: "No Guidance (Remix)", duration: "4:22", featured: ["Drake"] }
        ],
        totalTracks: 5,
        genre: ["R&B", "Contemporary R&B"],
        label: "LVRN/Warner Records",
        streamingStats: {
            spotify: { streams: 320000000, monthlyListeners: 2400000, popularity: 69 },
            appleMusic: { plays: 145000000 },
            youtube: { views: 780000000 }
        },
        popularity: 70,
        isExplicit: true,
        description: "DVSN's sultry EP featuring smooth vocals and intimate production."
    },
    {
        id: 14,
        artist: "Odeal",
        title: "Sena",
        type: "Single",
        date: "2023",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/gb/album/sena/1645678901",
        spotifyId: "8B9c0D1e2F3g4H5i6J7k8L9m",
        appleId: "1645678901",
        tracks: [
            { title: "Sena", duration: "3:15", producers: ["P2J"] }
        ],
        totalTracks: 1,
        genre: ["Alternative R&B", "Afrobeats"],
        label: "LVRN",
        streamingStats: {
            spotify: { streams: 45000000, monthlyListeners: 380000, popularity: 52 },
            appleMusic: { plays: 22000000 },
            youtube: { views: 120000000 }
        },
        popularity: 54,
        isExplicit: false,
        description: "Odeal's soulful single showcasing his emotive vocals and unique sound."
    },
    {
        id: 15,
        artist: "Summer Walker",
        title: "Over It",
        type: "Album",
        date: "2019",
        cover: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/over-it/1466870585",
        spotifyId: "1FJGqWwKB3OYGdVjWqGbJK",
        appleId: "1466870585",
        tracks: [
            { title: "Over It", duration: "2:30" },
            { title: "Playing Games", duration: "4:11", featured: ["Bryson Tiller"] },
            { title: "Come Thru", duration: "3:57", featured: ["Usher"] },
            { title: "Break Up 2 Make Up", duration: "3:42" }
        ],
        totalTracks: 18,
        genre: ["R&B", "Contemporary R&B"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 850000000, monthlyListeners: 5800000, popularity: 74 },
            appleMusic: { plays: 380000000 },
            youtube: { views: 1650000000 }
        },
        popularity: 75,
        isExplicit: true,
        description: "Summer Walker's debut album that established her as a major voice in R&B."
    },
    {
        id: 16,
        artist: "6LACK",
        title: "6 PC Hot",
        type: "EP",
        date: "2019",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
        link: "https://music.apple.com/us/album/6-pc-hot-ep/1489012345",
        spotifyId: "2Y3z4A5b6C7d8E9f0G1h2I3j",
        appleId: "1489012345",
        tracks: [
            { title: "Pretty Little Fears", duration: "4:02", featured: ["J. Cole"] },
            { title: "Disconnect", duration: "3:28" },
            { title: "Switch", duration: "3:45" }
        ],
        totalTracks: 6,
        genre: ["Hip Hop", "R&B"],
        label: "LVRN/Interscope Records",
        streamingStats: {
            spotify: { streams: 180000000, monthlyListeners: 1300000, popularity: 65 },
            appleMusic: { plays: 82000000 },
            youtube: { views: 420000000 }
        },
        popularity: 66,
        isExplicit: true,
        description: "6LACK's EP featuring production from J. Cole and introspective lyricism."
    }
];

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'm1',
    name: 'LVRN Anniversary Hoodie',
    price: 85,
    salePrice: 65,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Heavyweight french terry cotton hoodie featuring puff print logo on chest and anniversary graphic on back.",
    badge: 'sale',
    isOnSale: true
  },
  {
    id: 'm2',
    name: 'Summer Walker "Soft Life" Tee',
    price: 45,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Vintage wash oversized tee with tour graphic. 100% Cotton.",
    badge: 'new',
    isNew: true
  },
  {
    id: 'm3',
    name: 'Broadcast Signal Vinyl',
    price: 35,
    category: 'Music',
    images: ['https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Limited edition transparent pink vinyl. Includes exclusive poster.",
    badge: 'limited',
    isLimited: true
  },
  {
    id: 'm4',
    name: 'LVRN Dad Cap',
    price: 30,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['Adjustable'],
    description: "Classic unstructured 6-panel cap with embroidered logo."
  },
  {
    id: 'm5',
    name: '6LACK "East Atlanta" Crewneck',
    price: 65,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium cotton crewneck with East Atlanta Love graphic. Unisex fit.",
    badge: 'limited',
    isLimited: true
  },
  {
    id: 'm6',
    name: 'Odeal "Be Easy" Tank',
    price: 38,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Sleeveless tank top with minimalist Be Easy typography. Perfect for layering."
  },
  {
    id: 'm7',
    name: 'LVRN Logo Sweatpants',
    price: 75,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1506629905607-8b93e9bb94b9?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Comfortable french terry sweatpants with embroidered logo. Elastic waistband and cuffs.",
    badge: 'new',
    isNew: true
  },
  {
    id: 'm8',
    name: 'CIZA "Golden Boy" T-Shirt',
    price: 42,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Classic fit tee featuring the Golden Boy graphic. 100% organic cotton."
  },
  {
    id: 'm9',
    name: 'LVRN Sticker Pack',
    price: 15,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Set of 5 die-cut vinyl stickers featuring LVRN logos and graphics."
  },
  {
    id: 'm10',
    name: 'Summer Walker "Still Over It" CD',
    price: 25,
    category: 'Music',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Deluxe edition CD with bonus tracks and liner notes. Includes digital download."
  },
  {
    id: 'm11',
    name: '6LACK "Free 6LACK" Vinyl',
    price: 40,
    category: 'Music',
    images: ['https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Double vinyl LP pressed on 180g black vinyl. Gatefold sleeve with lyrics.",
    badge: 'sold-out',
    isSoldOut: true
  },
  {
    id: 'm12',
    name: 'LVRN Beanie',
    price: 35,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Cozy acrylic beanie with embroidered LVRN logo. Fold-up cuff design.",
    badge: 'new',
    isNew: true
  }
];

export const TOUR_SCHEDULE: TourDate[] = [
  // Summer Walker (US Tour - Active)
  { id: 'sw-atl', artist: 'Summer Walker', city: 'Atlanta', country: 'USA', venue: 'State Farm Arena', date: '2025-11-20', status: 'current', coordinates: { lat: 33.7490, lng: -84.3880 }, ticketUrl: '#' },
  { id: 'sw-la', artist: 'Summer Walker', city: 'Los Angeles', country: 'USA', venue: 'Crypto.com Arena', date: '2025-11-25', status: 'upcoming', coordinates: { lat: 34.0522, lng: -118.2437 }, ticketUrl: '#' },
  { id: 'sw-nyc', artist: 'Summer Walker', city: 'New York', country: 'USA', venue: 'Barclays Center', date: '2025-12-01', status: 'upcoming', coordinates: { lat: 40.7128, lng: -74.0060 }, ticketUrl: '#' },

  // 6LACK (Europe - Upcoming)
  { id: '6l-lon', artist: '6LACK', city: 'London', country: 'UK', venue: 'O2 Arena', date: '2025-12-10', status: 'upcoming', coordinates: { lat: 51.5074, lng: -0.1278 }, ticketUrl: '#' },
  { id: '6l-par', artist: '6LACK', city: 'Paris', country: 'France', venue: 'Accor Arena', date: '2025-12-12', status: 'upcoming', coordinates: { lat: 48.8566, lng: 2.3522 }, ticketUrl: '#' },
  { id: '6l-ber', artist: '6LACK', city: 'Berlin', country: 'Germany', venue: 'Mercedes-Benz Arena', date: '2025-12-15', status: 'upcoming', coordinates: { lat: 52.5200, lng: 13.4050 }, ticketUrl: '#' },

  // Ciza & LVRN Africa (South Africa - Past/Recent)
  { id: 'cz-jnb', artist: 'Ciza', city: 'Johannesburg', country: 'South Africa', venue: 'FNB Stadium', date: '2025-10-05', status: 'past', coordinates: { lat: -26.2041, lng: 28.0473 }, ticketUrl: '#' },
  { id: 'cz-cpt', artist: 'Ciza', city: 'Cape Town', country: 'South Africa', venue: 'DHL Stadium', date: '2025-10-12', status: 'past', coordinates: { lat: -33.9249, lng: 18.4241 }, ticketUrl: '#' },

  // Odeal (Announced, no dates)
  { id: 'od-lag', artist: 'Odeal', city: 'Lagos', country: 'Nigeria', venue: 'Eko Convention Center', date: 'Coming Soon', status: 'announced', coordinates: { lat: 6.5244, lng: 3.3792 }, ticketUrl: '#' },
  { id: 'od-acc', artist: 'Odeal', city: 'Accra', country: 'Ghana', venue: 'Black Star Square', date: 'Coming Soon', status: 'announced', coordinates: { lat: 5.6037, lng: -0.1870 }, ticketUrl: '#' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Tunde Balogun", role: "CEO & President", department: "Executive", bio: "Co-founded LVRN from humble beginnings as a party promoter." },
  { name: "Justice Baiden", role: "Head of A&R", department: "A&R", bio: "Visionary behind the label's creative direction and artist discovery." },
  { name: "Sean \"Famoso\" McNichol", role: "Head of Marketing", department: "Marketing", bio: "Drives brand partnerships and the label's unique marketing strategies." },
  { name: "Carlon Ramong", role: "Creative Director", department: "Creative", bio: "Ensures the visual and aesthetic integrity of the brand." },
  { name: "Junia Abaidoo", role: "Head of Operations", department: "Operations", bio: "Manages the logistical backbone of touring and operations." },
  { name: "Tomiwa Aladekomo", role: "Chief Operating Officer", department: "Executive", bio: "Oversees day-to-day operations and strategic initiatives." },
  { name: "Romil H. Lewis", role: "VP of Business Development", department: "Operations", bio: "Leads partnership negotiations and business growth strategies." },
  { name: "Khalid Williams", role: "Director of A&R", department: "A&R", bio: "Identifies and develops emerging talent across all genres." }
];

export const DJ_PACKS: DJPack[] = [
  {
    id: "dp-001",
    title: "Summer Walker - Complete Stems Pack",
    artist: "Summer Walker",
    coverUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2025-01-15",
    trackCount: 12,
    downloadUrl: "#",
    size: "245 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-002",
    title: "6LACK - East Atlanta Stems",
    artist: "6LACK",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2024-11-20",
    trackCount: 8,
    downloadUrl: "#",
    size: "180 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-003",
    title: "DVSN - Karma Sessions",
    artist: "DVSN",
    coverUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2024-09-10",
    trackCount: 10,
    downloadUrl: "#",
    size: "320 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-004",
    title: "Odeal - Be Easy Pack",
    artist: "Odeal",
    coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2024-06-22",
    trackCount: 6,
    downloadUrl: "#",
    size: "156 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-005",
    title: "CIZA - Golden Boy Pack",
    artist: "CIZA",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2024-03-15",
    trackCount: 15,
    downloadUrl: "#",
    size: "420 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-006",
    title: "TxC - Turn Off The Lights",
    artist: "TxC",
    coverUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2e18?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2025-02-01",
    trackCount: 9,
    downloadUrl: "#",
    size: "210 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-007",
    title: "Nektunez - Amapiano Masters",
    artist: "Nektunez",
    coverUrl: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2024-12-05",
    trackCount: 11,
    downloadUrl: "#",
    size: "380 MB",
    format: "WAV / STEMS"
  },
  {
    id: "dp-008",
    title: "Broadcast Signal - LVRN Anthology",
    artist: "Various Artists",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    releaseDate: "2025-01-01",
    trackCount: 25,
    downloadUrl: "#",
    size: "650 MB",
    format: "WAV / STEMS"
  }
];

// Populate ARTIST_MAP for rapid lookups and history management
ARTISTS.forEach(artist => {
  ARTIST_MAP[artist.name] = artist;
});
