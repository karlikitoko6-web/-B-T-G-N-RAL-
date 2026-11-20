const { getPrefix } = global.utils;
const { commands } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "KARLI",
    countDown: 5,
    role: 0,
    description: { en: "Liste des commandes" },
    category: "info",
    guide: { en: "{pn}help" }
  },
  langs: {
    en: {
      help: "🔮✨🌟 𝙏𝙀𝙍𝙍𝙀 𝙋𝙍𝙊𝙈𝙄𝙎𝙀 🌟✨🔮\n💠━━━━━━━━━━━━━━━━━━━━━━💠\n📖 ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ : ᴄᴏɴꜱᴜʟᴛᴀᴛɪᴏɴ ᴅᴜ ʀᴇɢɪꜱᴛʀᴇ ᴅᴇꜱ ᴄᴀᴘᴀᴄɪᴛᴇ́ꜱ.\n%1",
      commandNotFound: "Commande \"%1\" introuvable"
    },
    fr: {
      help: "🔮✨🌟 𝙏𝙀𝙍𝙍𝙀 𝙋𝙍𝙊𝙈𝙄𝙎𝙀 🌟✨🔮\n💠━━━━━━━━━━━━━━━━━━━━━━💠\n📖 ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ : ᴄᴏɴꜱᴜʟᴛᴀᴛɪᴏɴ ᴅᴜ ʀᴇɢɪꜱᴛʀᴇ ᴅᴇꜱ ᴄᴀᴘᴀᴄɪᴛᴇ́ꜱ.\n%1",
      commandNotFound: "Commande \"%1\" introuvable"
    }
  },
  onStart: async function ({ message, args, event, getLang }) {
    const prefix = getPrefix(event.threadID);
    function small(t){
      const m={a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
      return t.toLowerCase().split('').map(c=>m[c]||c).join('');
    }
    const emojiMap={administration:"🛡️",amour:"💞",anime:"🌸",casino:"🎰",configuration:"⚙️",jeux:"🎮",economie:"💰",groupe:"💬",ia:"🤖",images:"🖼️",info:"ℹ️",infos:"ℹ️",medias:"📺",niveaux:"🏆",outils:"🧰",rpg:"⚔️",systeme:"🖥️",texte:"📝",wiki:"📚",divers:"🎉",divertissement:"🎉"};
    if(args[0]){
      const cmd = commands.get(args[0].toLowerCase());
      if(!cmd) return message.reply(getLang("commandNotFound", args[0]));
      return message.reply(`🔮 ${cmd.config.name}\n📖 ${cmd.config.description?.en || ""}\n⚡ Usage: ${prefix}${cmd.config.name}`);
    }
    const cats={};
    for(const [name, cmd] of commands){
      const cat=(cmd.config.category||"autre").toLowerCase();
      if(!cats[cat]) cats[cat]=[];
      cats[cat].push(name);
    }
    let body=`💬 ʀᴇ́ᴘᴏɴꜱᴇ : ᴠᴏɪᴄɪ ʟᴇꜱ ${commands.size} ᴄᴏᴍᴍᴀɴᴅᴇꜱ ᴀ̀ ᴛᴀ ᴅɪꜱᴘᴏꜱɪᴛɪᴏɴ, ʀᴇ́ᴘᴀʀᴛɪᴇꜱ ᴇɴ ${Object.keys(cats).length} ᴄᴀᴛᴇ́ɢᴏʀɪᴇꜱ ✨\n\n`;
    for(const cat of Object.keys(cats).sort()){
      const list=cats[cat].sort();
      const emoji=emojiMap[cat]||"✨";
      body+=`╭──〔 ${emoji} ${small(cat)} 〕· ${list.length}\n`;
      for(let i=0;i<list.length;i+=3){
        body+=`┃ ${list.slice(i,i+3).map(n=>`✧ ${small(n)}`).join("  ")}\n`;
      }
      body+=`╰─────────────\n\n`;
    }
    body+=`╭━━〔 📊 ʀᴇɢɪꜱᴛʀᴇ 〕\n┃ 🧩 ᴄᴏᴍᴍᴀɴᴅᴇꜱ : ${commands.size}\n┃ 🗂️ ᴄᴀᴛᴇ́ɢᴏʀɪᴇꜱ : ${Object.keys(cats).length}\n┃ ⚡ ᴘʀᴇ́ꜰɪxᴇ : ${prefix}\n┣━━━━━━━━━━━━━━━━━━━━━\n┃ 🔍 ${prefix}ʜᴇʟᴘ <ᴄᴏᴍᴍᴀɴᴅᴇ> : ᴀɴᴀʟʏꜱᴇ ᴅᴇ́ᴛᴀɪʟʟᴇ́ᴇ\n╰━━━━━━━━━━━━━━━━━━━━━\n👑 ᴍᴀɪ̂ᴛʀᴇ : ᴋᴀʀʟɪ ᴋɪᴛᴏᴋᴏ`;
    return message.reply(getLang("help", body));
  }
};
