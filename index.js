require('events').EventEmitter.prototype._maxListeners = 100;
const sourcebin = require('sourcebin_js');
const { AuditLogEvent } = require('discord.js');
const fetch = require("node-fetch");
const simplydjs = require("simply-djs")
const { version } = require("discord.js");
const m = require("moment-duration-format");
const ms = require("ms")

let os = require('os')
let cpuStat = require("cpu-stat")
const child = require('child_process');
const { channel } = require('diagnostics_channel');
const Discord = require("discord.js")
const axios = require("axios")
const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
const moment = require('moment')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const { Client, Collection, MessageEmbed, MessageAttachment, MessageButton, Permissions, WebhookClient, VoiceState, NewsChannel } = require('discord.js');
const { MessageActionRow, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
const client = new Discord.Client(
  { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION"] })

client.login("token")


client.on('ready', () => {
  console.log(`${client.user.username} ON | Ready for use - By error.jsx`);
})


//Status

client.on('ready', () => {
  const statusArray = ['error.jsx', ' By error.jsx']

  setInterval(() => {
    const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
    const status = random[0]
    const mode = random[1]
    client.user.setActivity(status, { type: mode })
  }, 10000)
})


// +ticket command
client.on("messageCreate", async (message) => {
  if (message.content == "+ticket") {
    const user = await (await (message.guild?.members.fetch(message.author.id))).permissions.has("MANAGE_MESSAGES")
    if (!user) return message.channel.send({ embeds: [new MessageEmbed().setColor("2f3136").setDescription("  Permessi Insufficienti").setThumbnail("https://media.discordapp.net/attachments/996873679449370634/1003571604552437840/Flast-Advanced-Gif.gif?width=293&height=293")] }).then(msg => { setTimeout(() => msg.delete(), 10000) })
    var select = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Seleziona un opzione...')
          .addOptions([
            {
              label: 'Support',
              description: 'Apri un ticket per richiedere supporto.',
              value: 'supp',
              emoji: '📁',
            },
            {
              label: 'Buy',
              description: 'Apri questo ticket per comprare qualcosa.',
              value: 'bug',
              emoji: '💸',
            },
            {
              label: 'Fps',
              description: 'Apri questo ticket per parlare con il gestore boost.',
              value: 'rep',
              emoji: '🔫',
            },
            {
              label: 'Partner',
              description: 'Apri questo ticket per effettuare una partner.',
              value: 'proofs',
              emoji: '🤝',
            },
          ]),
      );
    var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
      .setDescription(` \`ATTENZIONE!\`\n  Non aprire un TICKET senza una motivazione valida. Leggi il nostro <#1013398933067796480> per evitare warns o bans.\n\n \`ATTENCTION!\`\n Do not open a TICKET without a valid reason. Read our <#1013398933067796480> to avoid warns or bans.`)
      .setColor("#2f3136")
      .setFooter(" By error.jsx")

    message.channel.send({ embeds: [embed], components: [select] })
  }
})

// ticket support interaction
client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'select') {
    if (interaction.values == 'supp') {

      const retorno = new Discord.MessageEmbed()
        .setDescription(`  <@${interaction.user.id}> Hai già un ticket aperto`)
        .setColor("#2f3136")
      const channels = (await interaction.guild.channels.cache.find((c) => c.topic === `  ID Membro・${interaction.user.id}`))
      if (channels) return interaction.reply({ embeds: [retorno], ephemeral: true })
      var currentdate = new Date();
      var horar = "" + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      interaction.message.guild.channels.create(`📁・support-${interaction.user.username}`, {
        parent: ('put category id'),
        topic: `  ID Membro・${interaction.user.id}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
          },
          {
            id: interaction.guild.roles.cache.get('put staff id'),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async channel => {

        const ticket = new Discord.MessageEmbed()

          .setDescription(`<@${interaction.user.id}> Ticket creato nel canale <#${channel.id}>`, { ephemeral: true })
          .setColor("#2f3136")

        interaction.reply({ embeds: [ticket], ephemeral: true })
        channel.send(`<@${interaction.user.id}> - <@&put staff id>`)

        const embedd = new Discord.MessageEmbed()
          .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
          .setDescription(`\`BENVENUTO\`\n<@${interaction.user.id}>, Benevenuto nel tuo \`TICKET SUPPORT\`, spiega nel modo più chiaro possibile perchè hai aperto il ticket.`)
          .setColor("#2f3136")
          .setFooter(" By error.jsx")

        const ticketf = new MessageButton()
          .setLabel('Close Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013814008547119144')
          .setCustomId('fecharticket');

        const exx = new MessageButton()
          .setLabel('Settings Staff')
          .setStyle('SECONDARY')
          .setEmoji('1013814770878648361')
          .setCustomId('extr')

        const claim = new MessageButton()
          .setLabel('Claim Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815229743898765')
          .setCustomId('cl')

        const exit = new MessageButton()
          .setLabel('Exit The Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815712743166063')
          .setCustomId('exit')

        const buttons = new MessageActionRow()
          .addComponents(ticketf, exx, claim, exit)
        channel.send({ embeds: [embedd], components: [buttons] })
      });
    }
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'select') {
    if (interaction.values == 'bug') {

      const retorno = new Discord.MessageEmbed()
        .setDescription(`  <@${interaction.user.id}> Hai già un ticket aperto`)
        .setColor("#2f3136")
      const channels = (await interaction.guild.channels.cache.find((c) => c.topic === `  ID Membro・${interaction.user.id}`))
      if (channels) return interaction.reply({ embeds: [retorno], ephemeral: true })
      var currentdate = new Date();
      var horar = "" + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      interaction.message.guild.channels.create(`💸・donazioni-${interaction.user.username}`, {
        parent: ('put category id'),
        topic: `  ID Membro・${interaction.user.id}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
          },
          {
            id: interaction.guild.roles.cache.get('put staff id'),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async channel => {

        const ticket = new Discord.MessageEmbed()

          .setDescription(`<@${interaction.user.id}> Ticket creato nel canale <#${channel.id}>`, { ephemeral: true })
          .setColor("#2f3136")

        interaction.reply({ embeds: [ticket], ephemeral: true })
        channel.send(`<@${interaction.user.id}> - <@&put staff id>`)

        const embedd = new Discord.MessageEmbed()
          .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
          .setDescription(`\`BENVENUTO\`\n<@${interaction.user.id}>, Benevenuto nel tuo \`TICKET DONAZIONE\`, spiega nel modo più chiaro possibile perchè hai aperto il ticket.`)
          .setColor("#2f3136")
          .setFooter(" By error.jsx")

          const ticketf = new MessageButton()
          .setLabel('Close Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013814008547119144')
          .setCustomId('fecharticket');

        const exx = new MessageButton()
          .setLabel('Settings Staff')
          .setStyle('SECONDARY')
          .setEmoji('1013814770878648361')
          .setCustomId('extr')

        const claim = new MessageButton()
          .setLabel('Claim Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815229743898765')
          .setCustomId('cl')

        const exit = new MessageButton()
          .setLabel('Exit The Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815712743166063')
          .setCustomId('exit')

        const buttons = new MessageActionRow()
          .addComponents(ticketf, exx, claim, exit)
        channel.send({ embeds: [embedd], components: [buttons] })
      });
    }
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'select') {
    if (interaction.values == 'rep') {

      const retorno = new Discord.MessageEmbed()
      .setDescription(`  <@${interaction.user.id}> Hai già un ticket aperto`)
        .setColor("#2f3136")
        const channels = (await interaction.guild.channels.cache.find((c) => c.topic === `  ID Membro・${interaction.user.id}`))
      if (channels) return interaction.reply({ embeds: [retorno], ephemeral: true })
      var currentdate = new Date();
      var horar = "" + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      interaction.message.guild.channels.create(`🔫・fps-${interaction.user.username}`, {
        parent: ('put category id'),
        topic: `  ID Membro・${interaction.user.id}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
          },
          {
            id: interaction.guild.roles.cache.get('put staff id'),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async channel => {

        const ticket = new Discord.MessageEmbed()

        .setDescription(`<@${interaction.user.id}> Ticket creato nel canale <#${channel.id}>`, { ephemeral: true })
          .setColor("#2f3136")

        interaction.reply({ embeds: [ticket], ephemeral: true })
        channel.send(`<@${interaction.user.id}> - <@&put staff id>`)

        const embedd = new Discord.MessageEmbed()
        .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
        .setDescription(`\`BENVENUTO\`\n<@${interaction.user.id}>, Benevenuto nel tuo \`TICKET FPS\`, spiega nel modo più chiaro possibile perchè hai aperto il ticket.`)
        .setColor("#2f3136")
        .setFooter(" By error.jsx")

        const ticketf = new MessageButton()
        .setLabel('Close Ticket')
        .setStyle('SECONDARY')
        .setEmoji('1013814008547119144')
        .setCustomId('fecharticket');

      const exx = new MessageButton()
        .setLabel('Settings Staff')
        .setStyle('SECONDARY')
        .setEmoji('1013814770878648361')
        .setCustomId('extr')

      const claim = new MessageButton()
        .setLabel('Claim Ticket')
        .setStyle('SECONDARY')
        .setEmoji('1013815229743898765')
        .setCustomId('cl')

      const exit = new MessageButton()
        .setLabel('Exit The Ticket')
        .setStyle('SECONDARY')
        .setEmoji('1013815712743166063')
        .setCustomId('exit')

        const buttons = new MessageActionRow()
          .addComponents(ticketf, exx, claim, exit)
        channel.send({ embeds: [embedd], components: [buttons] })
      });
    }
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'select') {
    if (interaction.values == 'proofs') {

      const retorno = new Discord.MessageEmbed()
      .setDescription(`  <@${interaction.user.id}> Hai già un ticket aperto`)
        .setColor("#2f3136")
        const channels = (await interaction.guild.channels.cache.find((c) => c.topic === `  ID Membro・${interaction.user.id}`))
      if (channels) return interaction.reply({ embeds: [retorno], ephemeral: true })
      var currentdate = new Date();
      var horar = "" + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " | " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      interaction.message.guild.channels.create(`🤝・partner-${interaction.user.username}`, {
        parent: ('put category id'),
        topic: `  ID Membro・${interaction.user.id}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
          },
          {
            id: interaction.guild.roles.cache.get('put staff id'),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async channel => {

        const ticket = new Discord.MessageEmbed()

          .setDescription(`<@${interaction.user.id}> Ticket created in the channel: <#${channel.id}>`, { ephemeral: true })
          .setColor("#2f3136")

        interaction.reply({ embeds: [ticket], ephemeral: true })
        channel.send(`<@${interaction.user.id}> - <@&put staff id>`)

        const embedd = new Discord.MessageEmbed()
        .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
        .setDescription(`\`BENVENUTO\`\n<@${interaction.user.id}>, Benevenuto nel tuo \`TICKET PARTNER\`, spiega nel modo più chiaro possibile perchè hai aperto il ticket.`)
        .setColor("#2f3136")
        .setFooter(" By error.jsx")

          const ticketf = new MessageButton()
          .setLabel('Close Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013814008547119144')
          .setCustomId('fecharticket');

        const exx = new MessageButton()
          .setLabel('Settings Staff')
          .setStyle('SECONDARY')
          .setEmoji('1013814770878648361')
          .setCustomId('extr')

        const claim = new MessageButton()
          .setLabel('Claim Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815229743898765')
          .setCustomId('cl')

        const exit = new MessageButton()
          .setLabel('Exit The Ticket')
          .setStyle('SECONDARY')
          .setEmoji('1013815712743166063')
          .setCustomId('exit')

        const buttons = new MessageActionRow()
          .addComponents(ticketf, exx, claim, exit)
        channel.send({ embeds: [embedd], components: [buttons] })
      });
    }
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'fecharticket') {
    interaction.deferUpdate()


    let channel2 = interaction.message.channel.topic
    channel2 = channel2.split("・")[1]
    const user6 = client.users.cache.get(channel2)

    interaction.channel.permissionOverwrites.set([
      {
        id: user6,
        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      },
      {
        id: interaction.guild.roles.cache.get("put staff id"),
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      },
      {
        id: interaction.guild.id,
        deny: ['VIEW_CHANNEL'],
      },
    ]);
    interaction.channel.setName(`⛔・closed-ticket`)

    const chiuso = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Ticket chiuso da <@${interaction.user.id}>`)

    const ticketc = new MessageButton()
      .setLabel('Conferma')
      .setStyle('SECONDARY')
      .setEmoji('1013816607644069968')
      .setCustomId('fcticket');

    const ticketrr = new MessageButton()
      .setLabel('Riapri')
      .setStyle('SECONDARY')
      .setEmoji('1013816513469349938')
      .setCustomId('rrticket');

    const bt = new MessageActionRow()
      .addComponents(ticketc, ticketrr)
    interaction.message.channel.send({ embeds: [chiuso], components: [bt] })
  }
})

//chiusura ticket
client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'fcticket') {
    interaction.deferUpdate()
    const logticket2 = interaction.message.guild.channels.cache.find(channel => channel.name === `put category name`)

    let channel2 = interaction.channel.topic
    channel2 = channel2.split("・")[1]
    const user = client.users.cache.get(channel2)

    clic = interaction.user.id;

    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " | "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    const embedd = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Il tuo ticket verrà eliminato tra 5 secondi`)

    const embed4 = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Il tuo ticket verrà eliminato tra 4 secondi`)

    const embed3 = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Il tuo ticket verrà eliminato tra 3 secondi`)

    const embed2 = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Il tuo ticket verrà eliminato tra 2 secondi`)

    const embed1 = new MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Il tuo ticket verrà eliminato tra 1 secondo`)

    interaction.message.edit({ embeds: [embedd] })
      .then((msg) => {

        setTimeout(function () {

          interaction.message.edit({ embeds: [embed4] })
          setTimeout(function () {

            interaction.message.edit({ embeds: [embed3] })
            setTimeout(function () {

              interaction.message.edit({ embeds: [embed2] })
              setTimeout(function () {

                interaction.message.edit({ embeds: [embed1] })
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      });

    interaction.message.channel.messages.fetch().then(async (messages) => {
      const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('pt-br')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

      let response;
      try {
        response = await sourcebin.create([
          {
            name: ' ',
            content: output,
            languageId: 'text',
          },
        ], {
          title: `Ticket Logs`,
          description: 'error.jsx Logs - https://discord.gg/error.jsx',
        });
      }
      catch (e) {
        console.log(e)
        return
      }
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Transcript URL')
            .setStyle('LINK')
            .setEmoji('997447476065869885')
            .setURL(response.url)
        )

        try {
          const embedlog = new Discord.MessageEmbed()
              .setColor("2f3136")
              .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
              .addField(`Closed by`, `<@${interaction.user.id}>`, true)
              .addField('Opened by', `<@${user.id}>`, true)
              .addField('Transcript:', `[\`📄 Click here\`](${response.url})`, true)
              .addField('Closed Time', `${datetime}`, true)
              .setTimestamp()
              const row = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setLabel('Transcript URL')
                      .setStyle('LINK')
                      .setEmoji('1004704418295459840')
                      .setURL(response.url)
              )
          user.send({ embeds: [embedlog], components: [row] })
          logticket2.send({ embeds: [embedlog], components: [row] })
          await sleep(5000)
          interaction.message.channel.delete();
      } catch (err) {
          console.log(err)
      }
  })
}
})


client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'cl') {

    await interaction.deferUpdate()

    const perm = new Discord.MessageEmbed()
      .setDescription(` <@${interaction.user.id}> Non sei autorizzato`)
      .setColor("#2f3136")

    const user = await (await (interaction.guild?.members.fetch(interaction.user.id))).permissions.has("MANAGE_MESSAGES")
    if (!user) {
      return interaction.channel.send(perm).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
    }

    let channel2 = interaction.message.channel.topic
    channel2 = channel2.split("・")[1]
    const user3 = client.users.cache.get(channel2)

    claimer = interaction.user.id;

    const pv = new Discord.MessageEmbed()

      .setDescription(` Uno staff ha claimato il tuo ticket.\n Clicca per vedere il ticket: ${interaction.message.channel}`)
      .setColor("#2f3136")

    user3.send({ embeds: [pv] })

    const embedd = new Discord.MessageEmbed()
      .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
      .setDescription(`<:attenction:1009027568009236490>\`BENVENUTO\`\n<@${interaction.user.id}>, Benevenuto nel tuo \`TICKET\`, spiega nel modo più chiaro possibile perchè hai aperto il ticket\nClaimato da ${claimer}`)
      .setColor("#2f3136")
      .setFooter(" By error.jsx")

      const ticketf = new MessageButton()
      .setLabel('Close Ticket')
      .setStyle('SECONDARY')
      .setEmoji('1013814008547119144')
      .setCustomId('fecharticket');

    const exx = new MessageButton()
      .setLabel('Settings Staff')
      .setStyle('SECONDARY')
      .setEmoji('1013814770878648361')
      .setCustomId('extr')

    const exit = new MessageButton()
      .setLabel('Exit The Ticket')
      .setStyle('SECONDARY')
      .setEmoji('1013814008547119144')
      .setCustomId('exit')

    const bt = new MessageActionRow()
      .addComponents(ticketf, exx, exit)

    await interaction.message.edit({ embeds: [embedd], components: [bt] })
  }
})


// staff functions
client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'extr') {

    await interaction.deferUpdate()

    const perm = new Discord.MessageEmbed()
      .setDescription(`<@${interaction.user.id}> You are not allowed`)
      .setColor("#2f3136")

    const user = await (await (interaction.guild?.members.fetch(interaction.user.id))).permissions.has("MANAGE_MESSAGES")
    if (!user) {
      return interaction.channel.send(perm).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
    }

    const extra = new Discord.MessageEmbed()

    .setAuthor(`${interaction.guild.name} Tickets`, `https://cdn.discordapp.com/attachments/928694083092873227/1013733248247017512/538814058c2668a32cff5b395453c4d9.png`, 'https://discord.gg/error.jsx')
      .setDescription(`<:a_icon_discord:997253027255824474> **Settings Staff**\n\n<@${interaction.user.id}> queste funzioni possono essere usate solo dallo staff`)
      .setColor("#2f3136")
      .setFooter(" By error.jsx")

      const add = new MessageButton()
      .setLabel('Add Member')
      .setStyle('SECONDARY')
      .setEmoji('1004704410657628210')
      .setCustomId('addm')

  const rem = new MessageButton()
      .setLabel('Remove Member')
      .setStyle('SECONDARY')
      .setEmoji('1004704416911331349')
      .setCustomId('remm')

  const renom = new MessageButton()
      .setLabel('Renom Channel')
      .setStyle('SECONDARY')
      .setEmoji('1004704418295459840')
      .setCustomId('renomm')

  const poke = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel("POKE")
      .setEmoji('1004704415539810364')
      .setCustomId('poke')

    const row = new MessageActionRow()
      .addComponents(add, rem, renom, poke)

    interaction.followUp({ embeds: [extra], components: [row], ephemeral: true })

  }
})
// add member

client.on("interactionCreate", async interaction => {
  if (interaction.customId == 'poke') {

    await interaction.deferUpdate()

    let channel2 = interaction.message.channel.topic
    channel2 = channel2.split("・")[1]
    const user3 = client.users.cache.get(channel2)

  const embedate = new MessageEmbed()
    .setColor("2f3136")
    .setDescription(` ${interaction.member.toString()} notifica inviata a ${user3}`)

  const embedalui = new MessageEmbed()
    .setColor("2f3136")
    .setDescription(`Hey ${user3}, ${interaction.member.toString()} ha richiesto una tua risposta nel ticket <#${interaction.channel.id}>, se non risponderai il tuo ticket verrà automaticamente **chiuso**`)

  const buttonalui = new MessageButton()
  .setStyle("LINK")
  .setLabel('Vai al ticket')
  .setEmoji("997801311389089854")
  .setURL(`https://discord.com/channels/989275227395588136/${interaction.channel.id}`)

  const row = new MessageActionRow()
  .addComponents(buttonalui)

  interaction.followUp({embeds: [embedate], ephemeral: true})
  user3.send({embeds: [embedalui], components: [row]})
}
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'addm') {
    const modal2 = new Modal()
      .setCustomId('modallo2')
      .setTitle('Add Member to the Ticket');
    const id = new TextInputComponent()
      .setCustomId('id')
      .setLabel("ID")
      .setStyle('SHORT')
      .setMaxLength(18)
      .setMinLength(18)
    const motivo = new TextInputComponent()
      .setCustomId('motivo')
      .setLabel("Motivo")
      .setStyle('SHORT')
      .setMaxLength(30)
      .setMinLength(2)
    const idRow = new MessageActionRow().addComponents(id);
    const motivoRow = new MessageActionRow().addComponents(motivo);
    modal2.addComponents(idRow, motivoRow);
    await interaction.showModal(modal2);
  }
})


client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'remm') {
    const modal2 = new Modal()
      .setCustomId('modallo3')
      .setTitle('Remove Mmeber from the Ticket');
    const id = new TextInputComponent()
      .setCustomId('id')
      .setLabel("ID")
      .setStyle('SHORT')
      .setMaxLength(18)
      .setMinLength(18)
    const motivo = new TextInputComponent()
      .setCustomId('motivo')
      .setLabel("Motivo")
      .setStyle('SHORT')
      .setMaxLength(30)
      .setMinLength(2)
    const idRow = new MessageActionRow().addComponents(id);
    const motivoRow = new MessageActionRow().addComponents(motivo);
    modal2.addComponents(idRow, motivoRow);
    await interaction.showModal(modal2);
  }
})


client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'renomm') {
    const modal2 = new Modal()
      .setCustomId('m3')
      .setTitle('Rename The Ticket');
    const id = new TextInputComponent()
      .setCustomId('name')
      .setLabel("New Name")
      .setStyle('SHORT')
      .setMaxLength(10)
      .setMinLength(3)
    const motivo = new TextInputComponent()
      .setCustomId('motivo')
      .setLabel("Motivo")
      .setStyle('SHORT')
      .setMaxLength(30)
      .setMinLength(2)
    const idRow = new MessageActionRow().addComponents(id);
    const motivoRow = new MessageActionRow().addComponents(motivo);
    modal2.addComponents(idRow, motivoRow);
    await interaction.showModal(modal2);
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'm3') {
    const perm = new Discord.MessageEmbed()
      .setDescription(`Non puoi farlo!`)
      .setColor("#2f3136")

    const userr = await (await (interaction.guild?.members.fetch(interaction.user.id))).permissions.has("MANAGE_MESSAGES")
    if (!userr) {
      return interaction.followUp({ embeds: [perm], ephemeral: true })
    }
    const name = interaction.fields.getTextInputValue('name');
    const mo = interaction.fields.getTextInputValue('motivo');
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
    if (!name) return interaction.reply({ content: ` Nome invalido - ${name}`, ephemeral: true });
    const canale = client.channels.cache.get("1013398870543310929");
    const embeddd = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(` <@${interaction.user.id}> ha rinominato il ticket ${interaction.channel} - \`${interaction.channel.name}\nNuovo nome: 👤・ticket-${name}\n\nMotivo: \`\`\`${mo}\`\`\`\n\n${dateText}`)
    const negro = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(` <@${interaction.user.id}> hai rinominato il ticket, nuovo nome: ${name}`)
    canale.send({ embeds: [embeddd] });
    interaction.channel.setName("👤・ticket-" + name)
    interaction.reply({ embeds: [negro], ephemeral: true })
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'modallo2') {
    const perm = new Discord.MessageEmbed()
      .setDescription(`Non puoi farlo!`)
      .setColor("#2f3136")

    const userr = await (await (interaction.guild?.members.fetch(interaction.user.id))).permissions.has("MANAGE_MESSAGES")
    if (!userr) {
      return interaction.followUp({ embeds: [perm], ephemeral: true })
    }
    const i = interaction.fields.getTextInputValue('id');
    const mo = interaction.fields.getTextInputValue('motivo');
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
    if (!i) return interaction.reply({ content: ` ID Membro Invalido - <@${i}>`, ephemeral: true });
    if (i == interaction.member.id)
      return interaction.reply({ content: ` Non puoi aggiungere te stesso - <@${i}>`, ephemeral: true });
    const canale = client.channels.cache.get("1013398870543310929");
    if (isNaN(i)) {
      interaction.reply({ content: ` ${interaction.member.toString()} L'**ID** può essere solo un numero`, ephemeral: true })
      return
    } else {
      const embeddd = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription(` <@${interaction.user.id}> ha aggiunto <@${i}> al ticket <#${interaction.channel.id}>\n${interaction.channel.name}\n\nMotivo: \`\`\`${mo}\`\`\`\n\n${dateText}`)
      const negro = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription(` <@${interaction.user.id}> aggiunto <@${i}> al ticket <#${interaction.channel.id}>.`)
      canale.send({ embeds: [embeddd] });
      await client.users.fetch(i).then((user) => {

        let channel2 = interaction.message.channel.topic
        channel2 = channel2.split("・")[1]
        const user6 = client.users.cache.get(channel2)
    
        interaction.channel.permissionOverwrites.set([
          {
            id: user6,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: user,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.cache.get("put staff id"),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ])
      })
      interaction.reply({ embeds: [negro], ephemeral: true })
    }
  }
});


client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'modallo3') {
    const perm = new Discord.MessageEmbed()
      .setDescription(`Non puoi farlo`)
      .setColor("#2f3136")

    const userr = await (await (interaction.guild?.members.fetch(interaction.user.id))).permissions.has("MANAGE_MESSAGES")
    if (!userr) {
      return interaction.followUp({ embeds: [perm], ephemeral: true })
    }
    const i = interaction.fields.getTextInputValue('id');
    const mo = interaction.fields.getTextInputValue('motivo');
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
    if (!i) return interaction.reply({ content: ` ID del membro invalido - <@${i}>`, ephemeral: true });
    if (i == interaction.member.id)
      return interaction.reply({ content: ` Non puoi rimuovere te stesso - <@${i}>`, ephemeral: true });
    const canale = client.channels.cache.get("id category");
    if (isNaN(i)) {
      interaction.reply({ content: ` ${interaction.member.toString()} L'**ID** può essere solo un numero`, ephemeral: true })
      return
    } else {
      const embeddd = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription(` <@${interaction.user.id}> ha rimosso <@${i}> dal ticket <#${interaction.channel.id}>\n${interaction.channel.name}\n\nMotivo: \`\`\`${mo}\`\`\`\n\n${dateText}`)
      const negro = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription(` <@${interaction.user.id}> rimosso <@${i}> dal ticket <#${interaction.channel.id}>.`)
      canale.send({ embeds: [embeddd] });
      await client.users.fetch(i).then((user) => {
        let channel2 = interaction.message.channel.topic
        channel2 = channel2.split("・")[1]
        const user6 = client.users.cache.get(channel2)
    
        interaction.channel.permissionOverwrites.set([
          {
            id: user6,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: user,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.cache.get("put staff id"),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ])
      })
      interaction.reply({ embeds: [negro], ephemeral: true })
    }
  }
});



//riapri ticket
client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'rrticket') {

    let channel2 = interaction.message.channel.topic
    channel2 = channel2.split("・")[1]
    const user5 = client.users.cache.get(channel2)

    await interaction.deferUpdate()

    interaction.channel.bulkDelete(1)

    interaction.channel.permissionOverwrites.set([
      {
        id: user5,
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
      },
      {
        id: interaction.guild.roles.cache.get("put staff id"),
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      },
      {
        id: interaction.guild.id,
        deny: ['VIEW_CHANNEL'],
      },
    ])

    interaction.channel.setName(`✅・reopened-${user5}`)

    const apertura = new Discord.MessageEmbed()
      .setColor("2f3136")
      .setDescription(` Ticket riaperto da <@${interaction.user.id}>`)
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
    interaction.channel.send({ embeds: [apertura] }).then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })


    const embeddd = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(` <@${interaction.user.id}> ha riaperto il ticket: <#${interaction.channel.id}>\n ${interaction.channel.name}\n\n${dateText}`)

    const guild = await client.guilds.cache.get("id guild");
    const channel = guild.channels.cache.get("id channels");
    channel.send({ embeds: [embeddd] })
  }
})

//exit the ticket
client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'exit') {

    await interaction.deferUpdate()

    let channel2 = interaction.message.channel.topic
    channel2 = channel2.split("・")[1]
    const user4 = client.users.cache.get(channel2)

    interaction.channel.permissionOverwrites.set([
      {
        id: user4,
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
      },
      {
        id: interaction.user.id,
        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
      },
      {
        id: interaction.guild.roles.cache.get("put staff id"),
        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      },
      {
        id: interaction.guild.id,
        deny: ['VIEW_CHANNEL'],
      },
    ])

    const saiu = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(` <@${interaction.user.id}> è uscito dal ticket`)
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>`
    const saiu2 = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(` <@${interaction.user.id}> è uscito dal ticket <#${interaction.channel.id}>\n ${interaction.channel.name}\n\n${dateText}`)

    interaction.message.channel.send({ embeds: [saiu] }).then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    const guild = await client.guilds.cache.get("id guild");
    const channel = guild.channels.cache.get("id channels");
    channel.send({ embeds: [saiu2] })
  }
})


