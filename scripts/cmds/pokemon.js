module.exports = {
  config: {
    name: "pokemon",
    version: "1.0",
    author: "Karli",
    countDown: 5,
    role: 0,
    shortDescription: "Attrape des Pokemon",
    longDescription: "Un Pokemon apparait, le plus rapide l'attrape",
    category: "game",
    guide: "{pn} | {pn} attraper <nom>"
  },
  onStart: async function ({ message, args, event }) {
    const pokemons = [
      { nom: "Elektek", type: "ELECTRIK", niv: 18, pv: 51, atk: 29, def: 33, vit: 17, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png", rarete: "COMMUN" },
      { nom: "Pikachu", type: "ELECTRIK", niv: 12, pv: 35, atk: 55, def: 40, vit: 90, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", rarete: "COMMUN" },
      { nom: "Dracaufeu", type: "FEU", niv: 36, pv: 78, atk: 84, def: 78, vit: 100, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", rarete: "RARE" },
      { nom: "Mewtwo", type: "PSY", niv: 70, pv: 106, atk: 110, def: 90, vit: 130, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png", rarete: "LEGENDAIRE" }
    ];
    const sub = args[0]?.toLowerCase();
    if (sub === "attraper") {
      const poke = global.pokemonSpawn?.[event.threadID];
      if (!poke) return message.reply("Aucun Pokemon pour le moment. Tape !pokemon");
      delete global.pokemonSpawn[event.threadID];
      return message.reply(`BRAVO ! Tu as attrape ${poke.nom} NIV ${poke.niv} ! Il est a toi 🔥`);
    }
    const poke = pokemons[Math.floor(Math.random() * pokemons.length)];
    if (!global.pokemonSpawn) global.pokemonSpawn = {};
    global.pokemonSpawn[event.threadID] = poke;
    const msg = `POKEMON SAUVAGE\nUn Pokemon apparait !\n\n${poke.nom} - NIV ${poke.niv}\nType : ${poke.type} | ${poke.rarete}\n\nPV : ${poke.pv}\nAttaque : ${poke.atk}\nDefense : ${poke.def}\nVitesse : ${poke.vit}\n\nTape : !pokemon attraper ${poke.nom}`;
    return message.reply({ body: msg, attachment: await global.utils.getStreamFromURL(poke.img) });
  }
};
