const { getPrefix } = global.utils;
const { commands } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "3.0",
    author: "KARLI",
    countDown: 5,
    role: 0,
    description: { en: "Liste des commandes" },
    category: "infos",
    guide: { en: "{pn}help | {pn}help <commande>" }
  },
  langs: {
    en: {
      help: "%1",
      commandNotFound: "Commande \"%1\" introuvable",
      usage: "Mode d'emploi"
    },
    fr: {
      help: "%1",
      commandNotFound: "Commande \"%1\" introuvable",
      usage: "Mode d'emploi"
    }
  },
  onStart: async function ({ message, args, event, api, getLang }) {
    const prefix = getPrefix(event.threadID);
    function small(t){
      const m={a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
      return t.toLowerCase().split('').map(c=>m[c]||c).join('');
    }

    // ===== SI TU FAIS !help <commande> =====
    if(args[0]){
      const cmd = commands.get(args[0].toLowerCase());
      if(!cmd) return message.reply(getLang("commandNotFound", args[0]));
      let name = "Ami";
      try{ const u = await api.getUserInfo(event.senderID); name = u[event.senderID]?.name || "Ami"; }catch{}
      return message.reply(`🔮✨🌟 𝙏𝙀𝙍𝙍𝙀 𝙋𝙍𝙊𝙈𝙄𝙎𝙀 🌟✨🔮\n💠━━━━━━━━━━━━━━━━━━━━━━💠\n📖 ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ : ᴀɴᴀʟʏꜱᴇ ᴅᴇ́ᴛᴀɪʟʟᴇ́ᴇ.\n\n╭──〔 🔮 ${small(cmd.config.name)} 〕\n┃ 📖 ${cmd.config.description?.en || "Pas de description"}\n┃ 🗂️ ᴄᴀᴛᴇ́ɢᴏʀɪᴇ : ${small(cmd.config.category || "autre")}\n┃ ⚡ ᴜꜱᴀɢᴇ : ${prefix}${cmd.config.name}\n╰─────────────\n\n👑 ᴍᴀɪ̂ᴛʀᴇ : ᴋᴀʀʟɪ ᴋɪᴛᴏᴋᴏ`);
    }

    // ===== !help NORMAL - STYLE RAPHAEL + TERRE PROMISE =====
    let userName = "Ami";
    try{ const u = await api.getUserInfo(event.senderID); userName = u[event.senderID]?.name || "Ami"; }catch{}

    const cats={};
    for(const [name, cmd] of commands){
      const cat=(cmd.config.category||"autre").toLowerCase();
      if(!cats[cat]) cats[cat]=[];
      cats[cat].push(name);
    }

    const emojiMap={
      administration:"🛡️", amour:"💞", anime:"🌸", casino:"🎰",
      configuration:"⚙️", "contact admin":"📞", "contacts admin":"📞", divertissement:"🎉",
      economie:"💰", "économie":"💰", groupe:"💬", ia:"🤖",
      images:"🖼️", image:"🖼️", infos:"ℹ️", info:"ℹ️",
      jeux:"🎮", game:"🎮", logiciels:"💻", software:"💻",
      medias:"📺", "médias":"📺", media:"📺", niveaux:"🏆", rank:"🏆",
      outils:"🧰", tools:"🧰", personnalise:"✨", "personnalisé":"✨", custom:"✨",
      proprietaire:"👑", "propriétaire":"👑", owner:"👑",
      rpg:"⚔️", "sans prefixe":"⚡", "sans préfixe":"⚡",
      systeme:"🖥️", "système":"🖥️", texte:"📝", wiki:"📚",
      "box chat":"💬", config:"⚙️", economy:"💰", fun:"🎉",
      other:"🧰", utility:"🔧"
    };

    let body=`💬 ʀᴇ́ᴘᴏɴꜱᴇ : ${small(userName)}, ᴠᴏɪᴄɪ ʟᴇꜱ ${commands.size} ᴄᴏᴍᴍᴀɴᴅᴇꜱ ᴀ̀ ᴛᴀ ᴅɪꜱᴘᴏꜱɪᴛɪᴏɴ, ʀᴇ́ᴘᴀʀᴛɪᴇꜱ ᴇɴ ${Object.keys(cats).length} ᴄᴀᴛᴇ́ɢᴏʀɪᴇꜱ ✨\n\n`;
    for(const cat of Object.keys(cats).sort()){
      const list=cats[cat].sort();
      const emoji=emojiMap[cat]||"✨";
      body+=`╭──〔 ${emoji} ${small(cat)} 〕· ${list.length}\n`;
      for(let i=0;i<list.length;i+=3){
        body+=`┃ ${list.slice(i,i+3).map(n=>`✧ ${small(n)}`).join("  ")}\n`;
      }
      body+=`╰─────────────\n\n`;
    }
    body+=`╭━━〔 📊 ʀᴇɢɪꜱᴛʀᴇ 〕\n┃ 🧩 ᴄᴏᴍᴍᴀɴᴅᴇꜱ : ${commands.size}\n┃ 🗂️ ᴄᴀᴛᴇ́ɢᴏʀɪᴇꜱ : ${Object.keys(cats).length}\n┃ ⚡ ᴘʀᴇ́ꜰɪxᴇ : ${prefix}\n┣━━━━━━━━━━━━━━━━━━━━━\n┃ 🔍 ${prefix}ʜᴇʟᴘ <ᴄᴏᴍᴍᴀɴᴅᴇ> : ᴀɴᴀʟʏꜱᴇ ᴅᴇ́ᴛᴀɪʟʟᴇ́ᴇ\n┃ 📘 ${prefix}ʜᴇʟᴘ <ᴄᴏᴍᴍᴀɴᴅᴇ> -ᴜ : ᴍᴏᴅᴇ ᴅ'ᴇᴍᴘʟᴏɪ\n╰━━━━━━━━━━━━━━━━━━━━━\n👑 ᴍᴀɪ̂ᴛʀᴇ : ᴋᴀʀʟɪ ᴋɪᴛᴏᴋᴏ`;

    return message.reply(`🔮✨🌟 𝙏𝙀𝙍𝙍𝙀 𝙋𝙍𝙊𝙈𝙄𝙎𝙀 🌟✨🔮\n💠━━━━━━━━━━━━━━━━━━━━━━💠\n📖 ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ : ᴄᴏɴꜱᴜʟᴛᴀᴛɪᴏɴ ᴅᴜ ʀᴇɢɪꜱᴛʀᴇ ᴅᴇꜱ ᴄᴀᴘᴀᴄɪᴛᴇ́ꜱ.\n${body}`);
  }
};
