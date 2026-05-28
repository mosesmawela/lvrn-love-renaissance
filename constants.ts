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
    quote: "A decade in, 6LACK trades the shadows for something steadier — and somehow gets sharper.",
    bio: "6LACK (pronounced black) is Atlanta's preeminent alt-R&B voice, closing out his first decade on the heels of his fourth studio album Love Is The New Gangsta, released May 2026 via LVRN/Interscope. Conceived after welcoming daughter Blaze in 2025, the record reframes his brooding template into something warmer and more lived-in, featuring Leon Thomas, Mereba, Odeal and partner Quin. A five-time Grammy nominee, he's currently mid-rollout on the 44-date 10 Years of 6LACK Tour — opening September 2026 in Oslo and closing December in Minneapolis. With East Atlanta Love Letter certified Gold and over 8B streams, 6LACK remains one of R&B's most quietly influential figures.",
    stats: { followers: "18.5M", streams: "8.2B", playlists: "35K", charts: "2100" },
    spotifyEmbedId: "artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicEmbedId: "za/artist/6lack/1016633280",
    spotifyArtistUrl: "https://open.spotify.com/artist/4IVAbR2w4JJNJDDRFP3E83",
    appleMusicArtistUrl: "https://music.apple.com/us/artist/6lack/1016633280",
    videoId: "xHtLTXBmtQA"
  },
  {
    name: "Summer Walker",
    category: "Signed",
    role: "Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg?updatedAt=1769932110266",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "She built a trilogy out of heartbreak — and turned the last chapter into a victory lap.",
    bio: "Summer Walker closed her Over It trilogy in November 2025 with Finally Over It, her third LVRN/Interscope album. The record debuted at No. 2 on the Billboard 200 — her third consecutive Top 2 debut — featuring Doja Cat, Mariah the Scientist, Chris Brown, 21 Savage, Brent Faiyaz and GloRilla. Lead visual FMT earned two 2026 Grammy nominations for Best R&B Performance and Best R&B Song. She is currently on the Still Finally Over It arena tour, which launched May 2026 in Toronto with Odeal and Monaleo in support. Two albums deep into motherhood, Walker operates at full creative voltage — unapologetic, genre-defining, and undeniable.",
    stats: { followers: "27M", streams: "13.1B", playlists: "42.4K", charts: "3146" },
    spotifyEmbedId: "57LYzLEk2LcFghVwuWbcuS",
    appleMusicEmbedId: "za/artist/summer-walker/990402287",
    spotifyArtistUrl: "https://open.spotify.com/artist/57LYzLEk2LcFghVwuWbcuS",
    appleMusicArtistUrl: "https://music.apple.com/us/artist/summer-walker/1326483550",
    videoId: "cSmwU9qG9zs"
  },
  {
    name: "Odeal",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/odeal.jpeg?updatedAt=1769932110159",
    bookingRate: "Inquire for Rates",
    bookingRegion: "UK / Europe / US",
    quote: "Alté R&B's most considered new voice — slow-burn vocals, Afrobeats foundation, LVRN's first European signing.",
    bio: "Odeal is London-born, Angolan-rooted R&B — LVRN's first European signing. His OVMBR: Lustropolis EP (2024) paired an Aaliyah interpolation with a Summer Walker duet and earned Billboard's African Rookie of the Month. He doubled down in November 2025 with The Fall That Saved Us, featuring Wizkid on Nights In The Sun and Leon Thomas on Miami. His signature is airy, falsetto-led vocals over Afrobeats percussion and slow-burn soul chords — what UK press calls alté R&B. In 2026 he is LVRN's clearest crossover bet between UK afrofusion and American R&B radio.",
    stats: { followers: "1.37M", streams: "616M", playlists: "5,969", charts: "946" },
    spotifyId: "4Z8vY9vY9vY9vY9vY9vY",
    appleMusicId: "1456156156",
    youtubeId: "UC_O_D_E_A_L_L_L_L_L",
    videoId: "LUEojiBiW1w",
    spotifyEmbedId: "4Z8vY9vY9vY9vY9vY9vY",
    appleMusicEmbedId: "1485652541"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/4IvAbR4ZE6Z3FaaWUJDPjk"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/odeal/1466514351"
  },
  {
    name: "CIZA",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "Amapiano's biggest export of 2025 — and the LVRN Africa cornerstone in 2026.",
    bio: "Born Nkululeko Nciza, South African artist CIZA sits at the centre of amapiano's global breakout moment. His 2025 single Isaka (6AM) was crowned Spotify South Africa's most-streamed song of the year, crossing 20M streams and spawning a remix featuring Tems and Omah Lay. Billboard named him African Rookie of the Month in September 2025. His LVRN-backed EP CIZA'S PALACE (June 2026) cemented him as a frontman threading amapiano log drums into Afrobeats melody, moving easily between isiZulu, English and pidgin. In 2026 he swept the Metro FM Music Awards and is building out a European touring footprint.",
    stats: { followers: "320K", streams: "94.8M", shazams: "856K", charts: "#1 SA" },
    spotifyEmbedId: "artist/71hPkbyih5bdlHVPBgav33",
    appleMusicEmbedId: "za/artist/ciza/1472059692",
    spotifyArtistUrl: "https://open.spotify.com/artist/71hPkbyih5bdlHVPBgav33",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/ciza/1531768593",
    videoId: "hRwaJFcbXzM"
  },
  {
    name: "Belly Gang Kushington",
    videoId: "bGx7sOyTRTA",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Belly%20Gang%20Kushington",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "Bringing the motivation back to Atlanta rap — Jeezy-era trap, single-father grit, Drake's co-sign.",
    bio: "Real name Victor Thomas, Belly Gang Kushington is the Atlanta rapper LVRN signed in late 2024 after a viral year that included selling $100 white tees packaged as cocaine bricks and freestyling on a shutdown I-285. His April 2025 debut album The Streets Is Yours arrived with endorsements from Drake, Chris Brown, J. Cole, 21 Savage and Kevin Gates, earning him Billboard's Hip-Hop Rookie of the Month for March 2026. He reaches back to the motivational lineage of Jeezy and T.I. — and his story as a single father raising a son with autism gives the music a weight most of Atlanta's new wave doesn't carry.",
    stats: { followers: "45K", streams: "41.5M", saves: "551K", charts: "#1 Apple" },
    spotifyEmbedId: "3i2l7bO5O1o5b9oO6x5J9x",
    appleMusicEmbedId: "123456789"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7oHPIc7BYAIUhYFF6hSggI"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/belly-gang-kushington/1662748050"
  },
  {
    name: "TxC",
    videoId: "8JZZvo-gJaU",
    category: "Signed",
    role: "DJs / Performers",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/TXC",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Two women running point on the biggest amapiano single of 2025 — built the room, hosted Davido in it.",
    bio: "TxC is the Johannesburg DJ-and-production duo of Tarryn Reid and Chase Cohen — two of the few women steering amapiano's mainstream sound. Their December 2025 single Nakupenda, a six-artist collision with Davido, Shoday, Scotts Maphuma, Zlatan and Al Xapo, crossed five million YouTube views and became one of the most-shared amapiano records of the year, weaving Swahili, Yoruba, Zulu and Nigerian pidgin into a single hook. Released through TXC Enterprises under licence to LVRN, it is the clearest evidence of the label's pan-African build. TxC's distinction: they're producers first, DJs second.",
    stats: { followers: "680K", streams: "2.1M", creates: "80K", shazams: "271K" },
    spotifyEmbedId: "artist/25j9xL1MTyuycuB2xy2Q9g",
    appleMusicEmbedId: "za/artist/txc/1626508795",
    spotifyArtistUrl: "https://open.spotify.com/artist/2WqDeTYFkLpYrJxLcgFLCp",
    appleMusicArtistUrl: "https://music.apple.com/za/artist/txc/1547282091"
  },
  {
    name: "ThisIzLondon",
    category: "Signed",
    role: "Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/ThisizLondon.jpg",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / UK",
    quote: "The producer behind Calm Down — now LVRN's bridge between Lagos and Atlanta.",
    bio: "Born Michael Hunter, Thisizlondon is the Nigerian-British producer behind Rema's Billboard Hot 100 No. 3 hit Calm Down, Ayra Starr's Bloody Samaritan, and cuts on Wizkid's Grammy-nominated Made in Lagos. In August 2024 he stepped out as a lead artist with PINACOLADA featuring Ayra Starr and 6LACK, debuting at No. 15 on Nigeria's Official Top 100. The track spawned a 2025 remix with Colombian star Beele. He officially signed to LVRN in 2024 via Rogue Collective — the label's first behind-the-boards-turned-artist signing and a key plank in the LVRN Africa strategy.",
    stats: { followers: "15K", streams: "41.4M" },
    videoId: "-obm4F_YKI4",
    spotifyEmbedId: "5qR9V9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "987654321"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/6FQqM6QCG8VlPpVdKqQwHa"
  ,
    appleMusicArtistUrl: "https://music.apple.com/gb/artist/thisizlondon/1738989497"
  },
  {
    name: "Sadboi",
    videoId: "Bjzz9cfA9dY",
    category: "Signed",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sadboi",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / CA",
    quote: "Toronto's most genre-agnostic export — garage, dancehall, drill and rap stitched into one voice.",
    bio: "SadBoi — real name Ebhoni Cato O'Garro — is the Toronto artist LVRN signed in 2024, the first Canadian act on the roster. Her debut LVRN project BARE CHAT (2024) and follow-up EP DRY CRY built a sound fusing UK garage, Jersey club and baile funk with the Caribbean diaspora rhythms she grew up around. Her February 2026 single Pop Shit, co-produced by Grammy winner David Dos Dias Bishop, is her most confident statement yet. She picked up two 2026 JUNO Award nominations and is building toward her third LVRN project GYAL 6.",
    stats: { followers: "85K", streams: "1.2M", playlists: "150+" },
    spotifyEmbedId: "0AAt9vGg5Oa8Fqg5p5lqA",
    appleMusicEmbedId: "1456156156"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7kpAW7boBJFRFCMydZpjUd"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/sadboi/1652325115"
  },
  {
    name: "Nektunez",
    videoId: "5dR3OfSI7gM",
    category: "Signed",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Nektunze",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "The producer behind Ameno Amapiano — now LVRN Africa's in-house architect for cross-continental records.",
    bio: "Born Noble, Nektunez is the Ghanaian-born, Atlanta-based producer who first crossed over with the viral Ameno Amapiano remix, topping Global Shazam. In 2025 he dropped Baddi Ah featuring Tiwa Savage, CIZA and Shoday, produced solo through LVRN. His value to the label is structural: he can sit a Tanzanian superstar, a South African amapiano lead and a Nigerian vocalist on the same beat without any of them sounding ported in. In 2026 he functions as LVRN Africa's in-house A&R/producer hybrid.",
    stats: { followers: "210K", streams: "150M", shazams: "10M+" },
    spotifyEmbedId: "4X9zO9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "246813579"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/4n7aqhk0RIdeWKkBxvhN72"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/nektunez/1292740171"
  },
  {
    name: "BRS Kash",
    category: "Signed",
    role: "Rapper",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/BRS%20Kash",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "The man who made an entire genre lean closer to the speaker — still unbothered, still uncensored.",
    bio: "BRS Kash is the Atlanta rapper who turned a viral confession into a chart record — 2020's Throat Baby (Go Baby) broke the Top 10 of Billboard's Hot R&B/Hip-Hop Songs and spawned a DaBaby/City Girls remix that re-architected the trap-R&B come-on for a new generation. Signed to LVRN/Interscope, he followed with Kash Only and the Latto collab Kash App, building a catalog around frank, comedic sex-positivity. His joint cut Rich & Famous with LVRN signee North Ave Jax extended his run in 2024 — irreverent, unfiltered, and built for the exact moment when streaming turned an unfiltered hook into a career.",
    stats: { followers: "560K", streams: "250M", charts: "#1" },
    videoId: "3j-k3Mvj_xM",
    spotifyEmbedId: "5s87W9vGg5Oa8Fqg5p5lqA",
    appleMusicEmbedId: "135792468"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/5jJjvmEwRr8epuGZq4eUUa"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/brs-kash/1522674112"
  },
  {
    name: "North Ave Jax",
    category: "Signed",
    role: "Artist",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US",
    quote: "From a small Vermont town to Atlanta's roster — North Ave Jax sings like he has everything to say.",
    bio: "North Ave Jax is the Vermont-born, Atlanta-based vocalist signed to LVRN/Interscope and Zack Bia's Field Trip Recordings. His 2025 EP Lazy, but I Have Goals frames a deeply specific origin story — a kid in a small town told he'd amount to nothing — through melodic rap, emo-tinged R&B and Atlanta-grade trap. Breakout singles Play Dumb, Eastside and 2 High 2 Speak built a TikTok footprint in the tens of millions. His joint single Rich & Famous with BRS Kash positions him as the connective tissue between LVRN's rap and crossover worlds.",
    stats: { followers: "25K", streams: "3.5M" }
  ,
    videoId: "Q5uUN5j8Ofs"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7t3WSgiRVbVsTIbsgcHVrY"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/north-ave-jax/1524753406"
  },

  // Africa (Formerly HGA)
  {
    name: "Kwamzy",
    category: "Africa",
    role: "DJ / Producer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Kwamzy",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / UK",
    quote: "3-step is what happens when amapiano stops apologizing for being a UK garage cousin.",
    bio: "Kwamzy — Kwadwo Badu — was born in southeast London and raised in Ghana. His production reads exactly like that geography: West African rhythmic DNA fused to a UK club sensibility, aimed at South Africa's amapiano and gqom underground. Celebrated as the UK's leading 3-step and amapiano producer, he carries a Beatport No. 1, executive-produced MORDA's CR4ZY EP, and co-produced Kabza De Small's Soundtrack Steppin 2024. His 2025 link with LVRN — the Isaka (6am) 3-Step Remix alongside CIZA — formalized his role as LVRN's bridge between Joburg and the London dance circuit.",
    stats: { followers: "11.5K", streams: "500K", listeners: "52K" }
  ,
    videoId: "chkcBZidD64"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0dux37MiMxJs46rUbtm8h1"
  },
  {
    name: "Sushi.B",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Sushi%20B",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "I make the music. The hype can catch up.",
    bio: "Kenny Katleho Magampa — Sushi.B — is a Johannesburg-born producer, vocalist and engineer who started making beats at 14 and now operates as one of amapiano's most DIY-minded crossover voices. His sound stitches amapiano, hip-hop and R&B with raw vocals over punchy productions. His run of singles — Sunday Service, 7de Laan, Heh Mama and Dali Dali — picked up SA club and radio rotation. His breakout Shakespeare went viral after his own mother heard it in a store and called to ask if it was his — pulling in thousands of new followers overnight.",
    stats: { followers: "213K", streams: "14.6M", listeners: "217K" }
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0LL65Vn5QZSZZ5fYSvdUKF"
  },
  {
    name: "Tango Supreme",
    category: "Africa",
    role: "DJ Duo",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Tango%20Supreme",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "Two women, one sound — amapiano on a one-way ticket to the moon.",
    bio: "Tango Supreme is a South African amapiano DJ duo made up of Tiisetso Moncho and Nomfundo Khumalo, born and raised in SA. One of the most-booked DJ acts in South Africa, the pair have helped push amapiano toward global status through dance trends and viral moments. Signed to LVRN, they released the album 2 The Moon in 2026 and dropped Tholumuntu with ShennyDaDeejay and Candy Flow RSA in September 2025. They currently sit at 1.5M monthly Spotify listeners — a milestone for representation in SA dance music.",
    stats: { followers: "30K", streams: "24M", listeners: "420K" }
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0QUhFTQrwcAXcidFIFpqZD"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/tango-supreme/1606305970"
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
    quote: "Log drums, late nights, and a city that won't stop dancing.",
    bio: "Sthibo de Beat (born Thabang Tlou Kgomo) is an award-winning South African DJ, producer, sound engineer and entrepreneur from Ga-Matlala, Limpopo, now based in Gauteng. His productions are built around rolling log drums, sharp percussion and layered melodic elements — the street-leaning, club-driven side of amapiano. Known for collaborations including Yizo Yizo featuring Baby S.O.N, Maestro SA and Don De Guitarist, his Young Wild and Free ethos resonates through every production and set.",
    stats: { followers: "6K", streams: "245K", listeners: "2K" }
  },
  {
    name: "Boibizza",
    category: "Africa",
    role: "Vocalist / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Boibizza",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "From Soweto to the world — same drums, bigger rooms.",
    bio: "Boibizza is a South African amapiano producer with credits across some of the genre's most internationally visible records. He co-produced Uncle Waffles' breakout single Tanzania, which appeared on her debut EP Red Dragon and helped push amapiano onto global festival stages. He also contributed to Love I Need alongside Uncle Waffles, Tony Duardo and Dinky Kunene, and worked with East African artists including Tanzania's Chege on Ola Mama! — part of amapiano's wider cross-border spread.",
    stats: { followers: "131K", streams: "65M", listeners: "1.65M" }
  },
  {
    name: "Leandra.Vert",
    category: "Africa",
    role: "Singer / Songwriter",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Leandra.Vert",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Sade in one ear, Kabza in the other — that's the whole sound.",
    bio: "Leandra.Vert is the Vaal-raised vocalist who treats amapiano like an R&B record disguised as a club track. She moved from waitressing to recording moody R&B in the Alina Baraz and SZA tradition before Musa Keys pulled her into the amapiano world in 2022. She smuggled the R&B in rather than abandoning it, collaborating with Kabza De Small, DJ Maphorisa and Musa Keys on Zonke Ekhoneni and UTHANDO. In 2025 she added Inyembezi with Sfarzo Rtee and Masithandaneni with DJ Stoks — both staples on amapiano playlists through the back half of the year.",
    stats: { followers: "27.7K", streams: "10M", listeners: "84K" }
  ,
    videoId: "hMBpiCexmNU"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0QyhpBoL8IOay4rryRdQ8l"
  },
  {
    name: "Optimist Music ZA",
    category: "Africa",
    role: "Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Optimist%20Music%20Za",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Choir taught me that the voice is the first instrument — everything else negotiates around it.",
    bio: "Thabo Musa — Optimist Music ZA — found his voice in Grade 10 inside the Mamelodi High School choir and was conducting it by Grade 11. He broke through with DBN Gogo's French Kiss in 2020, then spent 2025-26 sliding deep into the LVRN Africa orbit — most visibly as the co-credited voice on Al Xapo and Benzoo's Stance (February 2026, HGA/LVRN). His range across the sgubhu collaborator cluster has made him one of amapiano's most-used soulful tenors — the guy producers call when a beat needs a melody that can carry a radio edit.",
    stats: { followers: "24.7K", streams: "23.6M", listeners: "383K" }
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/69FMBSIEqfCYBg5xqWdDQV"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/optimist-music-za/1477185106"
  },
  {
    name: "Tony Duardo",
    category: "Africa",
    role: "Producer / Executive",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "I was a ghost for a decade — now I'd rather sign the building than haunt it.",
    bio: "Tony Duardo — Antonio-David Hampton Eduardo — spent a decade as amapiano's ghost producer, building the sub-architecture under Uncle Waffles' Tanzania and major cuts for TxC, Major League and Daliwonga. He now steps into his own name. From Johannesburg, he runs Hampton Group Africa (HGA), the independent label feeding directly into LVRN's African pipeline and housing Optimist Music ZA and Al Xapo. As a player he is a singer, drummer, guitarist, pianist, engineer and composer. 2025 brought solo singles including Johnny and pan-African work with Tanzania's Chege on Ola Mama!",
    stats: { followers: "140K", streams: "15M" },
    spotifyEmbedId: "2v9Xo9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "123456789"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/6qF0eiWwQF073J1MuVFs5z"
  },
  {
    name: "Ggoldie",
    category: "Africa",
    role: "DJ",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Sets should feel like a conversation — you can't just drop logs and pray.",
    bio: "Ggoldie — born Tshegofatso Mashabele in Tembisa — is the DJ and producer Spotify tapped as one of Southern Africa's Rising Stars, with her face anchoring the platform's Amapiano Grooves cover playlist. She broke through with Asambe, a million-stream posse cut featuring Chley and Ceeka RSA, then dropped Sandla Sam in December 2025 — a rolling, street-rooted jam with CowBoii, Ez Maestro and Al Xapo, released via LVRN. Cotton Fest, Porry Land and Greasy Tunes have all hosted her; cross-border bookings into Mozambique signal she is outgrowing the Tembisa-to-Joburg corridor.",
    stats: { followers: "85K", streams: "500K" },
    spotifyEmbedId: "0k1O9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "987654321"
  ,
    videoId: "bo-Ail7Tn2Y"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0Y9fl3wZHb6H3QvoeIYI3L"
  },
  {
    name: "Al Xapo",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/al%20xapo.jpg?updatedAt=1769932118440",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa / Intl",
    quote: "Sgubhu is amapiano with no manners — it's how we play it at home.",
    bio: "Al Xapo is the South African amapiano architect bending the genre's center of gravity toward sgubhu — the harder, log-drum-driven club mutation eating dancefloors from Johannesburg to Lagos to London. Signed to HGA/LVRN Records and pulling 2.6M monthly Spotify listeners, he broke wide with the SNOKONOKO series alongside Benzoo and EeQue, then pushed it pan-African with SNOKONOKO II featuring Shallipopi in March 2026. The Continental Stacks EP confirmed him as the moment's most strategic collaborator. His Stance single with Optimist Music ZA hardened the thesis: amapiano as global swagger music, exported from the source.",
    stats: { followers: "10K", streams: "1.2M", creates: "139K" },
    spotifyEmbedId: "2v9Xo9w5X6vWqH6oJ6w9P9",
    appleMusicEmbedId: "246813579",
    videoId: "bnoGzqxTUYQ"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7aFmc9LckA1On33CWWFgDD"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/al-xapo/1533340100"
  },
  {
    name: "Chley",
    category: "Africa",
    role: "Vocalist",
    image: "https://ik.imagekit.io/mosesmawela/chley.jpg?updatedAt=1769932121339",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "I'd rather disappear for a year than release something I don't believe.",
    bio: "Chley — Siphesihle Nkosi from Johannesburg — is one of amapiano's most identifiable voices, the soulful counterweight to its harder log-drum impulses. He arrived in 2021 as a featured vocalist on Kancane with Konke and Musa Keys, a track that went 3x platinum. After a deliberate stretch of silence, he returned in October 2025 with Iqiniso (The Truth), released via UYABABONA/LVRN — a comeback single that landed on Apple Music's Africa Now Radio Big 5 and reset expectations for his forthcoming album.",
    stats: { followers: "110K", streams: "8M" }
  ,
    videoId: "tVrFSg7jWJA"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7HpriU9gAJThxAfPfXpZ6N"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/chley/1564735077"
  },
  {
    name: "Ezmaestro",
    category: "Africa",
    role: "Artist / DJ",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ezmaestro",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "The car is still my best studio — that's where Why Le Jola was born.",
    bio: "Ez Maestro is the Limpopo-born amapiano hitmaker who turned a TikTok clip filmed in his car into Why Le Jola, a dance anthem that announced his arrival in 2023. He builds songs in Sepedi and SePitori — a deliberately regional palette that cuts against amapiano's drift toward English-language pop. His hits: Smart Mampara, Head Movement (now past 2M Spotify streams), and the 2024 club staple Betha Sghubu with TooValid and Loony Q. In 2025 he surfaced on Ggoldie's Sandla Sam and multiple LVRN Africa collaborative releases.",
    stats: { followers: "45K", streams: "3.2M" },
    videoId: "cWujxkqXk-U"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/3IMFYyZbvXrXDCRdrajyT2"
  ,
    appleMusicArtistUrl: "https://music.apple.com/za/artist/ez-maestro/1683681081"
  },
  {
    name: "Colkaze",
    category: "Africa",
    role: "Producer / Artist",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Colkaze",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Piano riffs, big drops, and hooks the dancefloor finishes for you.",
    bio: "Colkaze is a South African amapiano artist whose work sits at the energetic, club-leaning end of the genre. He broke through with the 2024 single Intwe Nami featuring Carter IV and Dooushii, then expanded his profile with Magiya alongside Al Xapo and Xduppy. He followed in September 2025 with Soka Lam and has appeared as a featured vocalist on Tyler ICU and Visca's Cela Intombi — signaling growing crossover credibility inside the mainstream amapiano ecosystem.",
    stats: { followers: "28K", streams: "1.8M" },
    videoId: "tzKBwhg5CM4"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/3f6UNjHAy4DiEtL0sWLZqq"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/colkaze/1604697329"
  },
  {
    name: "Seekay",
    category: "Africa",
    role: "Performer",
    image: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Seekay",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Africa",
    quote: "Acting paid the rent. Amapiano feels like home.",
    bio: "Seekay (real name Sicelo) is a South African actor, dancer and amapiano artist who balances a screen career — including a run on SABC drama Gomora — with a music catalogue that leans into commercial private-school yanos. His 2024 single Location with Tshepi P and Tony Duardo gave him one of his most visible musical moments with an official YouTube video. He followed with Harare alongside Tony Duardo, drawing on amapiano, Afrobeats and Chimurenga influences from Zimbabwe. His path — high school dropout to TV regular to charting amapiano collaborator — makes him a recognisable crossover figure in SA youth culture.",
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
    quote: "Ten years in, DVSN still owns 2 a.m. — and they just changed labels to prove it.",
    bio: "DVSN — Toronto's Daniel Daley and producer Nineteen85 — spent a decade as one of OVO Sound's defining acts before moving to Jermaine Dupri's relaunched So So Def Recordings/HYBE America in June 2025, becoming the imprint's first new signing. Their dual singles Excited (built around a Floetry interpolation) and Love On You reintroduced the duo's after-hours slow-jam blueprint. With a catalog including A Muse, Morning After and Working On My Karma with Ty Dolla Sign, DVSN remains one of the most reliable rooms in modern R&B — lights low, tempo slower than you remember.",
    stats: { followers: "4.2M", streams: "2.1B", playlists: "12K" }
  ,
    videoId: "IJuVKZ2C6Yw"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/7e1ICztHM2Sc4JNLxeMXYl"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/dvsn/1041061735"
  },
  {
    name: "Baby Tate",
    category: "Management",
    role: "Artist",
    bookingRate: "Inquire for Rates",
    bookingRegion: "US / Intl",
    quote: "Producer, rapper, pop hook architect — Baby Tate is the whole studio.",
    bio: "Baby Tate is the Atlanta-born rapper, singer and producer whose viral Hey Mickey! flip turned her into a TikTok-era pop-rap fixture without flattening her producer-songwriter chops. Daughter of singer Dionne Farris, she self-produces much of her own catalog — a rarity in her lane. Her 2023 EP Sexploration the Musical paired theatrical concept work with hook-first rap; her 2025 single FINE with Izye extended her run. Managed through LVRN with releases via Warner, Baby Tate sits at the intersection of femme rap, R&B and pop — sharp-tongued, internet-fluent, and one of the few artists who can write, rap, sing and engineer the whole room herself.",
    stats: { followers: "2.8M", streams: "850M", creates: "2M+" },
    videoId: "BGTskpDnXp4"
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/3IJ21966TwNZI24MwZHMu4"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/baby-tate/1159898541"
  },
  {
    name: "Spinall",
    category: "Management",
    role: "DJ / Producer",
    bookingRate: "Inquire for Rates",
    bookingRegion: "Global",
    quote: "Africa to the world — one record, one room, one rhythm at a time.",
    bio: "DJ Spinall (Sodamola Oluseye Desmond) is a Nigerian DJ, producer and label founder widely regarded as one of Africa's most influential selectors. He launched TheCAP Music in 2014 and has built a career bridging Afrobeats with global pop, jazz and dance — collaborating with Wizkid, Burna Boy, Davido, Tiwa Savage, Omah Lay and Fireboy DML. In 2025 he signed with Epic Records and released his seventh studio album Eko Groove, a love letter to Lagos, followed in 2026 by jazz-leaning When Lagos Sleeps — a left turn proving his range beyond the club.",
    stats: { followers: "2.5M", streams: "300M" }
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/2yePxX0u9JJpopHTLgaGTu"
  ,
    appleMusicArtistUrl: "https://music.apple.com/us/artist/spinall/813737832"
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
    quote: "Wrote it for everyone else first. This one I'm keeping.",
    bio: "Storm Ford is an Atlanta-based singer-songwriter and producer from Providence, Rhode Island, signed to LVRN with a publishing deal alongside Warner Chappell Music. She started writing in high school and released her debut EP Highest Mountain as a graduation requirement. Since 2018 she has become an in-demand songwriter with credits for Mary J. Blige, Ari Lennox, Summer Walker and Westside Boogie — notably the trio cut Queen Space with Walker and Lennox. Her 2025/26 project arc Down Payment and full-length Deposit marks a deliberate rollout from the songwriter's room to lead artist.",
    stats: { followers: "5K", streams: "350K" }
  ,
    spotifyArtistUrl: "https://open.spotify.com/artist/0On2yf7ZQXFJJ4CbZoYty2"
  ,
    appleMusicArtistUrl: "https://music.apple.com/sa/artist/storm-ford/1352139868"
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
    quote: "New Lagos doesn't sound like old Lagos — and that's the point.",
    bio: "Genio Bambino and GMK (Abdulqudus King) are Nigerian producers and core members of the Monster Boys collective — a Lagos-rooted group that signed a global publishing deal with Warner Chappell Music in February 2021. GMK is also signed to LVRN, with production credits including Cruel Santino's Gangsta Fear, Lady Donli's Cash and Burna Boy's Different. As a duo, Genio and GMK sit at the experimental edge of the new Lagos sound — alte-leaning, sample-literate, and built for the post-Afrobeats generation that grew up on Frank Ocean and Wizkid in equal measure.",
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
  { year: "2025", title: "Trilogy Complete", description: "Summer Walker releases 'Finally Over It', completing her acclaimed trilogy." },
  { year: "2026", title: "A Decade of 6LACK", description: "6LACK releases 'Love Is The New Gangsta' and launches the 44-date 10 Years of 6LACK World Tour." },
  { year: "2026", title: "CIZA Goes Global", description: "CIZA sweeps Metro FM Music Awards, releases CIZA'S PALACE EP, and begins his European touring push." }
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
  { name: 'Website', url: 'https://love-renaissance.lvrn.dev' },
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
  { id: 'v46', title: "LVRN Executive Interview", artist: "LVRN", thumbnail: "https://i.ytimg.com/vi/ULRLKglyVN8/hqdefault.jpg", embedUrl: "https://www.youtube.com/embed/ULRLKglyVN8", duration: "20:00", views: "100K", category: "Interview" },

  // 2025-2026 New Additions
  { id: 'v47', title: 'Isaka (6AM) ft. Tems, Omah Lay, Thukuthela & Jazzworx', artist: 'CIZA', thumbnail: 'https://i.ytimg.com/vi/hRwaJFcbXzM/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/hRwaJFcbXzM', duration: '3:55', views: '8.2M', category: 'Music Video' },
  { id: 'v48', title: 'FMT (Official Music Video)', artist: 'Summer Walker', thumbnail: 'https://i.ytimg.com/vi/cSmwU9qG9zs/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/cSmwU9qG9zs', duration: '4:12', views: '12.4M', category: 'Music Video' },
  { id: 'v49', title: 'Nakupenda ft. Davido, Shoday, Scotts Maphuma, Zlatan & Al Xapo', artist: 'TxC', thumbnail: 'https://i.ytimg.com/vi/8JZZvo-gJaU/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/8JZZvo-gJaU', duration: '4:05', views: '5.8M', category: 'Music Video' },
  { id: 'v50', title: 'Excited (Official Visualizer)', artist: 'DVSN', thumbnail: 'https://i.ytimg.com/vi/IJuVKZ2C6Yw/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/IJuVKZ2C6Yw', duration: '3:40', views: '1.8M', category: 'Music Video' },
  { id: 'v51', title: 'Call Back Kush (Official Music Video)', artist: 'Belly Gang Kushington', thumbnail: 'https://i.ytimg.com/vi/bGx7sOyTRTA/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/bGx7sOyTRTA', duration: '3:28', views: '2.4M', category: 'Music Video' },
  { id: 'v52', title: 'Pop Shit (Official Visualizer)', artist: 'Sadboi', thumbnail: 'https://i.ytimg.com/vi/Bjzz9cfA9dY/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/Bjzz9cfA9dY', duration: '2:58', views: '680K', category: 'Music Video' },
  { id: 'v53', title: 'Iqiniso (Official Audio)', artist: 'Chley', thumbnail: 'https://i.ytimg.com/vi/tVrFSg7jWJA/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/tVrFSg7jWJA', duration: '3:35', views: '1.1M', category: 'Music Video' },
  { id: 'v54', title: 'The Fall That Saved Us (Full Album Stream)', artist: 'Odeal', thumbnail: 'https://i.ytimg.com/vi/g0g3veoOo2k/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/g0g3veoOo2k', duration: '28:40', views: '2.2M', category: 'Music Video' },
  { id: 'v55', title: 'FINE ft. Baby Tate (Official Music Video)', artist: 'Izye & Baby Tate', thumbnail: 'https://i.ytimg.com/vi/BGTskpDnXp4/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/BGTskpDnXp4', duration: '3:05', views: '1.5M', category: 'Music Video' },
  { id: 'v56', title: 'The Fall (Official Music Video)', artist: 'North Ave Jax', thumbnail: 'https://i.ytimg.com/vi/Q5uUN5j8Ofs/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/Q5uUN5j8Ofs', duration: '3:18', views: '920K', category: 'Music Video' },
  { id: 'v57', title: 'Tholu Muntu ft. Cowboii & Uncool MC', artist: 'Tango Supreme', thumbnail: 'https://i.ytimg.com/vi/ZPlUK8V67Gk/hqdefault.jpg', embedUrl: 'https://www.youtube.com/embed/ZPlUK8V67Gk', duration: '3:50', views: '450K', category: 'Music Video' }
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
  // Summer Walker — Still Finally Over It Arena Tour 2026
  { id: 'sw-tor', artist: 'Summer Walker', city: 'Toronto', country: 'Canada', venue: 'Scotiabank Arena', date: '2026-05-26', status: 'current', coordinates: { lat: 43.6532, lng: -79.3832 }, ticketUrl: 'https://www.ticketmaster.com/summer-walker-tickets/artist/2537562' },
  { id: 'sw-bkn', artist: 'Summer Walker', city: 'Brooklyn', country: 'USA', venue: 'Barclays Center', date: '2026-06-02', status: 'upcoming', coordinates: { lat: 40.6826, lng: -73.9754 }, ticketUrl: 'https://www.ticketmaster.com/summer-walker-tickets/artist/2537562' },
  { id: 'sw-atl', artist: 'Summer Walker', city: 'Atlanta', country: 'USA', venue: 'State Farm Arena', date: '2026-06-12', status: 'upcoming', coordinates: { lat: 33.7490, lng: -84.3880 }, ticketUrl: 'https://www.ticketmaster.com/summer-walker-tickets/artist/2537562' },
  { id: 'sw-la', artist: 'Summer Walker', city: 'Los Angeles', country: 'USA', venue: 'Crypto.com Arena', date: '2026-06-25', status: 'upcoming', coordinates: { lat: 34.0430, lng: -118.2673 }, ticketUrl: 'https://www.ticketmaster.com/summer-walker-tickets/artist/2537562' },
  { id: 'sw-lon', artist: 'Summer Walker', city: 'London', country: 'UK', venue: 'The O2', date: '2026-08-01', status: 'upcoming', coordinates: { lat: 51.5030, lng: 0.0032 }, ticketUrl: 'https://www.ticketmaster.com/summer-walker-tickets/artist/2537562' },

  // 6LACK — 10 Years of 6LACK World Tour
  { id: '6l-osl', artist: '6LACK', city: 'Oslo', country: 'Norway', venue: 'Sentrum Scene', date: '2026-09-08', status: 'upcoming', coordinates: { lat: 59.9139, lng: 10.7522 }, ticketUrl: 'https://www.ticketmaster.com/6lack-tickets/artist/2313062' },
  { id: '6l-lon', artist: '6LACK', city: 'London', country: 'UK', venue: 'OVO Arena Wembley', date: '2026-09-25', status: 'upcoming', coordinates: { lat: 51.5560, lng: -0.2817 }, ticketUrl: 'https://www.ticketmaster.com/6lack-tickets/artist/2313062' },
  { id: '6l-por', artist: '6LACK', city: 'Portland', country: 'USA', venue: 'Roseland Theater', date: '2026-10-21', status: 'upcoming', coordinates: { lat: 45.5152, lng: -122.6784 }, ticketUrl: 'https://www.ticketmaster.com/6lack-tickets/artist/2313062' },
  { id: '6l-atl', artist: '6LACK', city: 'Atlanta', country: 'USA', venue: 'The Eastern', date: '2026-11-15', status: 'upcoming', coordinates: { lat: 33.7490, lng: -84.3880 }, ticketUrl: 'https://www.ticketmaster.com/6lack-tickets/artist/2313062' },
  { id: '6l-min', artist: '6LACK', city: 'Minneapolis', country: 'USA', venue: 'The Fillmore Minneapolis', date: '2026-12-11', status: 'upcoming', coordinates: { lat: 44.9778, lng: -93.2650 }, ticketUrl: 'https://www.ticketmaster.com/6lack-tickets/artist/2313062' },

  // DVSN
  { id: 'dv-hou', artist: 'DVSN', city: 'Houston', country: 'USA', venue: 'House of Blues', date: '2026-03-22', status: 'past', coordinates: { lat: 29.7604, lng: -95.3698 }, ticketUrl: 'https://www.bandsintown.com/a/4824146-dvsn' },
  { id: 'dv-tor', artist: 'DVSN', city: 'Toronto', country: 'Canada', venue: 'Massey Hall', date: '2026-03-27', status: 'past', coordinates: { lat: 43.6532, lng: -79.3832 }, ticketUrl: 'https://www.bandsintown.com/a/4824146-dvsn' },
  { id: 'dv-la', artist: 'DVSN', city: 'Los Angeles', country: 'USA', venue: 'The Fonda Theatre', date: '2026-03-30', status: 'past', coordinates: { lat: 34.0522, lng: -118.2437 }, ticketUrl: 'https://www.bandsintown.com/a/4824146-dvsn' },
  { id: 'dv-chi', artist: 'DVSN', city: 'Chicago', country: 'USA', venue: 'House of Blues', date: '2026-04-01', status: 'past', coordinates: { lat: 41.8781, lng: -87.6298 }, ticketUrl: 'https://www.bandsintown.com/a/4824146-dvsn' },

  // TxC
  { id: 'txc-par', artist: 'TxC', city: 'Paris', country: 'France', venue: 'Le Kilowatt', date: '2026-06-20', status: 'upcoming', coordinates: { lat: 48.7872, lng: 2.4028 }, ticketUrl: 'https://www.bandsintown.com/a/15549234-txc' },
  { id: 'txc-nyc', artist: 'TxC', city: 'New York', country: 'USA', venue: 'SummerStage Central Park', date: '2026-07-18', status: 'upcoming', coordinates: { lat: 40.7128, lng: -74.0060 }, ticketUrl: 'https://www.bandsintown.com/a/15549234-txc' },

  // Odeal
  { id: 'od-dal', artist: 'Odeal', city: 'Dallas', country: 'USA', venue: 'American Airlines Center', date: '2026-06-17', status: 'upcoming', coordinates: { lat: 32.7767, lng: -96.7970 }, ticketUrl: 'https://www.ticketmaster.com/odeal-tickets/artist/3090685' },
  { id: 'od-la', artist: 'Odeal', city: 'Los Angeles', country: 'USA', venue: 'Crypto.com Arena', date: '2026-06-25', status: 'upcoming', coordinates: { lat: 34.0430, lng: -118.2673 }, ticketUrl: 'https://www.ticketmaster.com/odeal-tickets/artist/3090685' },
  { id: 'od-lon', artist: 'Odeal', city: 'London', country: 'UK', venue: 'The O2', date: '2026-08-01', status: 'upcoming', coordinates: { lat: 51.5030, lng: 0.0032 }, ticketUrl: 'https://www.ticketmaster.com/odeal-tickets/artist/3090685' },

  // CIZA
  { id: 'cz-jnb', artist: 'CIZA', city: 'Johannesburg', country: 'South Africa', venue: 'TBA', date: '2026-07-01', status: 'announced', coordinates: { lat: -26.2041, lng: 28.0473 }, ticketUrl: '#' },

  // Spinall
  { id: 'sp-lag', artist: 'Spinall', city: 'Lagos', country: 'Nigeria', venue: 'TBA', date: '2026-12-15', status: 'announced', coordinates: { lat: 6.5244, lng: 3.3792 }, ticketUrl: '#' },
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
