import { Founder, Artist, Milestone, Stat, PhilosophyItem, SocialLink, TeamMember, DJPack } from './types';
export type { TeamMember, DJPack };

// New Interface for Playroom
export interface PlayroomAlbum {
  id: string;
  artist: string;
  title: string;
  year: string;
  coverUrl: string;
  spotifyEmbedUrl: string;
  color: string;
}

export interface VideoItem {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  embedUrl: string;
  duration: string;
  views: string;
}

export interface MerchProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  description: string;
}

export interface TourDate {
  id: string;
  artist: string;
  city: string;
  country: string;
  venue: string;
  date: string;
  status: 'upcoming' | 'current' | 'past' | 'announced';
  coordinates: {
    lat: number;
    lng: number;
  };
  ticketUrl: string;
}

export const FOUNDERS: Founder[] = [
  { name: "Tunde Balogun", role: "CEO & President", description: "Co-founded LVRN from humble beginnings as a party promoter." },
  { name: "Justice Baiden", role: "Head of A&R", description: "Visionary behind the label's creative direction and artist discovery." },
  { name: "Sean \"Famoso\" McNichol", role: "Head of Marketing", description: "Drives brand partnerships and the label's unique marketing strategies." },
  { name: "Carlon Ramong", role: "Creative Director", description: "Ensures the visual and aesthetic integrity of the brand." },
  { name: "Junia Abaidoo", role: "Head of Operations", description: "Manages the logistical backbone of touring and operations." }
];

export const PLAYROOM_ALBUMS: PlayroomAlbum[] = [
  {
    id: "lvrn-broadcast",
    artist: "LVRN",
    title: "Broadcast Signal",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/1F6HMPZd1izYjwGoFsh7Ny?utm_source=generator",
    color: "#ec4899"
  },
  {
    id: "6lack-fatal",
    artist: "6LACK",
    title: "Fatal Attraction",
    year: "2024",
    coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/1p0zeYPLjmIGtw1DzmshZO?utm_source=generator",
    color: "#3b82f6"
  },
  {
    id: "summer-clear2",
    artist: "Summer Walker",
    title: "Clear 2: Soft Life",
    year: "2023",
    coverUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://open.spotify.com/embed/album/0xMQR9PD1M0Y70uP3VpyBl?utm_source=generator",
    color: "#d97706"
  },
  {
    id: "dvsn-karma",
    artist: "DVSN",
    title: "Working On My Karma",
    year: "2022",
    coverUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://open.spotify.com/embed/album/4ms0fTBX5E76Ho0Ke4az0Q?utm_source=generator",
    color: "#eab308"
  },
  {
    id: "6lack-east",
    artist: "6LACK",
    title: "East Atlanta Love Letter",
    year: "2018",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
    spotifyEmbedUrl: "https://open.spotify.com/embed/album/1Ba4tVkFViKy6KmRyd9adZ?utm_source=generator",
    color: "#ef4444"
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
    bookingRate: "$150k - $250k",
    bookingRegion: "Global",
    quote: "6LACK Pronounced 'black', the alternative R&B and three time GRAMMY nominated rapper/singer/songwriter is the #2 most streamed R&B artist.",
    bio: "6LACK Pronounced 'black', the alternative R&B and three time GRAMMY-nominated rapper/singer/songwriter is the #2 most streamed R&B artist. His debut project FREE 6LACK recently went platinum, his sophomore album East Atlanta Love Letter (now certified GOLD) peaked at #3 on the Billboard 200 and #1 on the Top R&B Albums. 6LACK has been the most featured artist of 2019-2020 with over 30 features, and hasn't missed a beat releasing his latest project 6 PC HOT EP.",
    stats: { followers: "18.5M", streams: "8.2B", playlists: "35K", charts: "2100" },
    spotifyEmbedId: "artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicEmbedId: "za/artist/6lack/1016633280",
    spotifyArtistUrl: "https://open.spotify.com/artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/6lack/1016633280"
  },
  {
    name: "Summer Walker",
    category: "Signed",
    role: "Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg?updatedAt=1769932110266",
    bookingRate: "$200k - $350k",
    bookingRegion: "Global",
    quote: "Summer Walker has established a new narrative for expressive and unapologetic music from female artists.",
    bio: "A songstress from Atlanta, Summer Walker has established a new narrative for expressive and unapologetic music from female artists. Growing up in solitude in an Atlanta home, she represents the coalescence of introversion and untamed expressionism. Her debut studio album, Over It was released on October 4, 2019 and received universal acclaim from critics, debuting at number two on the Billboard 200.",
    stats: { followers: "27M", streams: "13.1B", playlists: "42.4K", charts: "3146" },
    spotifyEmbedId: "artist/57LYzLEk2LcFghVwuWbcuS",
    appleMusicEmbedId: "za/artist/summer-walker/990402287",
    spotifyArtistUrl: "https://open.spotify.com/artist/57LYzLEk2LcFghVwuWbcuS",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/summer-walker/990402287"
  },
  {
    name: "Odeal",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/odeal.jpeg?updatedAt=1769932110159",
    bookingRate: "$30k - $50k",
    bookingRegion: "UK / Europe / US",
    quote: "Odeal's single 'Coffee (Don't Read Signs)' surpassed 33M streams.",
    bio: "Over the past few years, Odeal has consistently proven himself to be a formidable artistic force. His single 'Coffee (Don't Read Signs)' surpassed 33 million streams, serving as a testament to his talent and resonating with listeners. 2023 saw significant growth in his commercial success with singles like 'Last Thing' and 'Be Easy'.",
    stats: { followers: "1.37M", streams: "616M", playlists: "5,969", charts: "946" },
    spotifyId: "4Z8vY9vY9vY9vY9vY9vY",
    appleMusicId: "1456156156",
    youtubeId: "UC_O_D_E_A_L_L_L_L_L"
  },
  {
    name: "CIZA",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza",
    bookingRate: "$15k - $25k",
    bookingRegion: "Africa / Intl",
    quote: "CIZA is poised to lead a new era of African music rooted in unity, cultural pride and global appeal.",
    bio: "Ciza born Nkululeko Nciza is a South African artist redefining African sound with his bold, genre-blending music. Bursting onto the scene in 2020 with hits like Come Alive and Adje, he quickly gained traction across the continent. CIZA has carved his own path with his debut EP Golden Boy Pack.",
    stats: { followers: "320K", streams: "94.8M", shazams: "856K", charts: "#1 SA" },
    spotifyEmbedId: "artist/71hPkbyih5bdlHVPBgav33",
    appleMusicEmbedId: "za/artist/ciza/1472059692",
    spotifyArtistUrl: "https://open.spotify.com/artist/71hPkbyih5bdlHVPBgav33",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/ciza/1472059692"
  },
  {
    name: "Belly Gang Kushington",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Belly%20Gang%20Kushington",
    bookingRate: "$10k - $20k",
    bookingRegion: "US",
    quote: "Kush doesn't just create music; he narrates his life.",
    bio: "Born and bred in the city of Atlanta, Belly Gang Kushington found his calling in the heart of the city's rap scene. Kush doesn't just create music; he narrates his life. Every song is a page from his experiences, a snapshot of his reality. From the struggle of leaving the drug world behind to dealing with incarceration.",
    stats: { followers: "45K", streams: "41.5M", saves: "551K", charts: "#1 Apple" }
  },
  {
    name: "TxC",
    category: "Signed",
    role: "DJs / Performers",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/TXC",
    bookingRate: "$25k - $40k",
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
    stats: { followers: "15K", streams: "41.4M" }
  },
  {
    name: "Sadboi",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sadboi",
    bookingRate: "$15k - $25k",
    bookingRegion: "US / CA",
    quote: "SadBoi expertly weaves elements of reggae, dancehall, and Caribbean culture into her captivating sound.",
    bio: "Ebhoni Cato O'Garro, aka 'SadBoi,' is an Atlanta-based artist originally from Toronto, Canada. With a Jamaican & Antiguan heritage deeply ingrained in her musical roots, SadBoi expertly weaves elements of reggae, dancehall, and Caribbean culture into her captivating sound, blending R&B, rap, rock, and pop.",
    stats: { followers: "85K", streams: "1.2M", playlists: "150+" }
  },
  {
    name: "Nektunez",
    category: "Signed",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Nektunze",
    bookingRate: "$20k - $35k",
    bookingRegion: "Global",
    quote: "He entered the global music scene in 2021 with Ameno Amapiano (Remix), which topped Global Shazam.",
    bio: "Nektunez (Nobel Zogli) is an Atlanta-based Ghanaian DJ, producer, and singer-songwriter shaping global music with his fusion of Afrobeats, Amapiano, and electronic sounds. He entered the global music scene in 2021 with 'Ameno Amapiano (Remix)', which topped Global Shazam and iTunes in 22 countries.",
    stats: { followers: "210K", streams: "150M", shazams: "10M+" }
  },
  {
    name: "BRS Kash",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/BRS%20Kash",
    bookingRate: "$25k - $40k",
    bookingRegion: "US",
    quote: "His single 'Throat Baby' trended #1 in the US on Apple Music.",
    bio: "Born Kenneth Duncan, BRS Kash started writing at the age of 12. His southern flare, connection to the streets, and royalty status in Atlanta's nightlife culture make him one of Hip-Hop's most exciting rising acts. His single 'Throat Baby' trended #1 in the US on Apple Music.",
    stats: { followers: "560K", streams: "250M", charts: "#1" }
  },
  {
    name: "North Ave Jax",
    category: "Signed",
    role: "Artist",
    bookingRate: "$10k - $20k",
    bookingRegion: "US",
    quote: "At 2, he picked up drums. His mom introduced him to the likes of Smashing Pumpkins, Pearl Jam, etc.",
    bio: "When you think of Vermont, you think of maple syrup. North Ave Jax chose a much louder path. The Burlington native took the unexpected route personally and creatively, threading soundscapes punctuated by punk rock, pop ambition, and even R&B. After catching the attention of LVRN Records, he introduces a scorching signature style.",
    stats: { followers: "25K", streams: "3.5M" }
  },

  // Africa (Formerly HGA)
  {
    name: "Tony Duardo",
    category: "Africa",
    role: "Producer / Executive",
    bookingRate: "$15k - $30k",
    bookingRegion: "Africa / Intl",
    quote: "Duardo's mission is deeply intertwined with his personal faith.",
    bio: "Antonio-David Hampton; Tony Duardo, is an illustrious Pan-African record producer, DJ, creative director, Multi-Instrumentalist and entrepreneur. He leads HGA (Home of African Stars), one of the leading Independent Labels Across Africa. He played a pivotal role in developing talents such as Uncle Waffles and TxC.",
    stats: { followers: "140K", streams: "15M" }
  },
  {
    name: "Ggoldie",
    category: "Africa",
    role: "DJ",
    bookingRate: "$8k - $15k",
    bookingRegion: "Africa",
    quote: "Ggoldie is a versatile DJ hailing from Tembisa, South Africa.",
    bio: "Ggoldie is a versatile DJ hailing from Tembisa, South Africa. She has been active in the music scene since 2021, carving out a distinctive path for herself within the Amapiano genre. She has graced some of South Africa's most prominent stages, including Cotton Fest and Boiler Room.",
    stats: { followers: "85K", streams: "500K" }
  },
  {
    name: "Al Xapo",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/al%20xapo.jpg?updatedAt=1769932118440",
    bookingRate: "$10k - $20k",
    bookingRegion: "Africa / Intl",
    quote: "Al Xapo is a young versatile and talented producer, Dj, and vocalist.",
    bio: "Al Xapo, AKA 'Public Enemy' is a young versatile and talented producer & beat maker as well as artist & DJ who started his musical journey at the tender age of 15. He started by being on the decks then later exploring his production and vocal talents.",
    stats: { followers: "10K", streams: "1.2M", creates: "139K" }
  },
  {
    name: "Chley",
    category: "Africa",
    role: "Vocalist",
    image: "https://ik.imagekit.io/mosesmawela/chley.jpg?updatedAt=1769932121339",
    bookingRate: "$10k - $20k",
    bookingRegion: "Africa",
    quote: "The 18 year old vocalist only began making music recently in 2021.",
    bio: "Siphesihle Nkosi affectionately known as Chley is a South African talent sensation born in the East Rand, Benoni. Her big breakthrough was in 2022 when she worked with Musa Keys on 'M'nike' which made considerable waves in the industry.",
    stats: { followers: "110K", streams: "8M" }
  },

  // Management
  {
    name: "DVSN",
    category: "Management",
    role: "R&B Duo",
    bookingRate: "$75k - $150k",
    bookingRegion: "Global",
    quote: "Toronto duo DVSN are best known for their narcotic slow-jams that R&B lovers live for.",
    bio: "Toronto duo DVSN, consisting of vocalist Daniel Daley and Grammy Award Winning producer Nineteen85, are best known for their narcotic slow-jams that R&B lovers live for. Their music balances the right combination of falsetto deliveries and contemporary production.",
    stats: { followers: "4.2M", streams: "2.1B", playlists: "12K" }
  },
  {
    name: "Baby Tate",
    category: "Management",
    role: "Artist",
    bookingRate: "$40k - $70k",
    bookingRegion: "US / Intl",
    quote: "Fueled by self-love and manifested dreams, Baby Tate is forever evolving.",
    bio: "Fueled by self-love and manifested dreams, Baby Tate is forever evolving. Within a single body of work, you'll hear summery pop, amorous R&B, and hard-hitting hip-hop. Baby Tate has a knack for creating viral moments in music and is the unofficial Queen of TikTok.",
    stats: { followers: "2.8M", streams: "850M", creates: "2M+" }
  },
  {
    name: "Spinall",
    category: "Management",
    role: "DJ / Producer",
    bookingRate: "$40k - $60k",
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
  { name: 'Linktree', url: 'https://linktr.ee/loverenaissance' },
  { name: 'Instagram', url: 'https://www.instagram.com/lvrngram' },
  { name: 'X', url: 'https://x.com/lvrn' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@lvrn' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCILhhbWqZU3b5x2KVRnspfQ' }
];

export const VIDEOS: VideoItem[] = [
  { id: 'v5', title: 'SNOKONOKO', artist: 'Al Xapo, Benzoo & EeQue', thumbnail: 'https://img.youtube.com/vi/wgGa9SgxhJI/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/wgGa9SgxhJI', duration: '5:24', views: '150K' },
  { id: 'v6', title: 'Still Finally Over It Tour Trailer', artist: 'Summer Walker', thumbnail: 'https://img.youtube.com/vi/XzcInRty6mc/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/XzcInRty6mc', duration: '1:30', views: '500K' },
  { id: 'v8', title: 'Nakupenda', artist: 'TxC, Davido, Shoday & Scotts Maphuma', thumbnail: 'https://img.youtube.com/vi/8JZZvo-gJaU/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/8JZZvo-gJaU', duration: '4:10', views: '800K' },
  { id: 'v4', title: 'ISAKA (6AM)', artist: 'CIZA ft. Jazzworx & Thukuthela', thumbnail: 'https://img.youtube.com/vi/sel1mCYFJ8U/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/sel1mCYFJ8U', duration: '4:45', views: '1.2M' },
  { id: 'v7', title: 'Modern Day Suicide', artist: 'Odeal', thumbnail: 'https://img.youtube.com/vi/8TBfhOSyexE/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/8TBfhOSyexE', duration: '3:20', views: '300K' },
  { id: 'v1', title: 'Heart of a Woman', artist: 'Summer Walker', thumbnail: 'https://img.youtube.com/vi/g3p6u5PjCMA/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/g3p6u5PjCMA', duration: '4:12', views: '2.4M' },
  { id: 'v2', title: 'Be Easy', artist: 'Odeal', thumbnail: 'https://img.youtube.com/vi/qY2-oF4-vT0/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/qY2-oF4-vT0', duration: '3:45', views: '616K' },
  { id: 'v3', title: 'Since I Have A Lover', artist: '6LACK', thumbnail: 'https://img.youtube.com/vi/jJvDNyI7hG4/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/jJvDNyI7hG4', duration: '4:20', views: '5.1M' }
];

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'm1',
    name: 'LVRN Anniversary Hoodie',
    price: 85,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Heavyweight french terry cotton hoodie featuring puff print logo on chest and anniversary graphic on back."
  },
  {
    id: 'm2',
    name: 'Summer Walker "Soft Life" Tee',
    price: 45,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Vintage wash oversized tee with tour graphic. 100% Cotton."
  },
  {
    id: 'm3',
    name: 'Broadcast Signal Vinyl',
    price: 35,
    category: 'Music',
    images: ['https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['One Size'],
    description: "Limited edition transparent pink vinyl. Includes exclusive poster."
  },
  {
    id: 'm4',
    name: 'LVRN Dad Cap',
    price: 30,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['Adjustable'],
    description: "Classic unstructured 6-panel cap with embroidered logo."
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
