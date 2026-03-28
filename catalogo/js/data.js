// Exporta uma lista de categorias que serão usadas para gerar os carrosséis
export const categories = [
    {
        // Título da seção de categoria
        title: "Mais Assistidos",
        items: [
            {
                // URL da imagem do cartaz
                img: "https://img.tribunahoje.com/ret9e_VJvQI2Xd0Zp3LSE9Ikfp4=/840x520/smart/s3.tribunahoje.com/uploads/imagens/dna-do-crime-capa.jpg",
                top10: true, // bandeira Top 10
                badge: "Clássico", // rótulo de badge mostrado no card
                badgeColor: "red", // cor do badge
                progress: 0, // progresso de visualização em %
                youtube: "https://www.youtube.com/watch?v=L7YeC_quE-o" // link do trailer no YouTube
            },
            {
                img: "http://7marte.com/wp-content/uploads/2015/02/fury_movie-wide-1024x640.jpg",
                progress: 35,
                youtube: "https://www.youtube.com/watch?v=OoKSKzqpPy4"
            },
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABSEfG1DrBswlAtagzZQ44olgfwAjKlUNy3mQ6SYkpJ3VbzUNpsGw8p_7aJll2J9LrdKBGWKkZ8RWgGr0c3C94-6HpgOQaO6NNW0.webp?r=757.jpg",
                progress: 0,
                youtube: "https://www.youtube.com/watch?v=pHQw09ppJZ4"
            },
            {
                img: "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcJZ_5ko0F3WLPBgXTqDBT8spNL3WXsW4iS0U0FYJCIGbO74N1NjiVgAJ-N9PWzlTxsVkd8imiZ33dNRTwubyakMOHLf8UuI487G6CRlvDzrGZQM3hPood0vaxsC6FZ2xTYkgw.webp?r=a7b.jpg",
                progress: 80,
                youtube: "https://www.youtube.com/watch?v=pfY3j-3uQhk"
            },
        ]
    },
    {
        title: "Séries",
        items: [
            {
                img: "https://i0.wp.com/lesbout.com.br/wp-content/uploads/2020/06/control-z-1.jpg?w=1024&ssl=1.jpg",
                top10: true,
                badge: "Nova temporada",
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=3GU_SDZ_wJs"
            },
            {
                img: "https://static1.purepeople.com.br/articles/9/32/79/99/@/3706386--round-6-esta-prestes-a-se-tornar-a-ser-580x0-1.jpg",
                top10: true,
                youtube: "https://www.youtube.com/watch?v=siNr47WV0Wk"
            },
            {
                img: "https://portalpopline.com.br/wp-content/uploads/2020/12/3d3b7d5d68132cc424920deb43e754bb-scaled-1-1536x879.jpg",
                badge: "Novo episódio",
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=xsODpM3Rwdg"
            },
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABTKCjY_J0GMrxByPBMl8yJZ_9yjC9To6salywJEyO8I1c1xz3ZXtHfEYs_YLS-Yg7BilxWp6E3zG5KqAyDWBGED5cmn-w95KYxo.webp?r=84e.jpg",
                badge: "Novidade",
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=RMmGQNNl164"
            },
        ]
    },
    {
        title: "Para maratonar",
        items: [
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABa1N6AAzYZ12UKS0Ba0pYJC8G7rWUtccF7_4tcdQXNngqv36OJ7UnyhFjAorfX4LzUxAt1-pFuT-K4eKTuqA4uoxSn0hd4dWXKU.webp?r=f35.jpg",
                top10: true,
                youtube: "https://www.youtube.com/watch?v=IgVyroQjZbE"
            },
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABWar8pLzfXkEt_pecA1cU7K_H842eS5RwTjpDHkNCWdxtKTYHlH3AlFSrr47lhBYn4rcadVazkDdFrEBH_HyKPNxZMlWQEdrZyI.webp?r=9ef.jpg",
                top10: true,
                badge: "Novidade",
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=tNcDHWpselE"
            },
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABY3SkuJ676wWCTnvaQrL5-i_O3wZon_2lzZM10g0Tks-HAUL1HMtUOn0MkasDp8liXQs1-EJ-yCcLtuw7wRUmRlXFOnEth7Kbho.jpg?r=7cc.jpg",
                badge: "Novo episódio",
                top10: true,
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=svmIUWMVo2Y"
            },
            {
                img: "https://occ-0-4029-185.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABZozzIT6Q0pVlthNws4VrbZeIKWGfV6eWcP4YVbwVVEMzeuY2bSeoB6nKamHfWzvrJp1drx1qIEdvSbBTLUN0n3veIE2IPUG5q4.webp?r=bd5",
                progress: 59,
                top10: true,
                badge: "Novo episódio",
                badgeColor: "red",
                youtube: "https://www.youtube.com/watch?v=Ab2YIbP5xw8"
            },
        ]
    }
];
