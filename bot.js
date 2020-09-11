const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Tiamat has awakened');
	client.user.setActivity('with backer B');
});

const DisTube = require('distube');

const prefix = '!'

var servers = {};

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 25 });

const HelpEmbed = {
	color: 0x003253,
	title: 'Help Commands',
	description: 'A list of all of Tiamat\'s commands!',
	fields: [
		{
			name: 'Fun Commands',
			value: '`!help`, `!holyfishslap [var]`, `!selfdestruct`',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Music commands',
			value: '`!play`, `!stop`, `!autoplay`, `!loop/!repeat`, `!skip`, `!queue`, `!shuffle`',
			inline: true,
		},
		{
			name: 'Music effects',
			value: '`!3d`, `!vaporwave`, `!karaoke`, `!nightcore`, `!bassboost`, `!echo`',
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'Author: Crash',
	},
};

client.on('message', message =>{
    //if (!message.content.startsWith(prefix)) return;
	
	const args = message.content;
	const command = args.toLowerCase();
	
	const args3 = message.content.slice(prefix.length).split(/ +/);
	const command3 = args3.shift().toLowerCase();
	
	const user = message.author;
		
	if(command === `${prefix}help`){
		message.channel.send({ embed: HelpEmbed });
	}
	
	if(command === `${prefix}selfdestruct`){
		message.channel.send("Alright <@" + message.author.id + ">, listen up. I have some bad news! \nThat lever you just pulled... it starts the train\'s self-destruct sequence, and that ain\'t no joke. It\'ll blow up!\nI need a movie with some REAL intense action, so that\'s what we\'re gonna do! The train\'s gonna blow in a few minutes! \nBut you can save us all, lassy! Get to the switch at the front of the train to turn it off! \nAND YER BETTER MAKE IT IN TIME, ALRIGHT? I don't care about the owls or yerself, but you don't DARE blow up me train for real! It\'s my baby! \nThe cameras are gonna be rollin\' lassy, you hurry now! Go! Over and out!");
	}
	
	if(command3 == "holyfishslap"){
		const taggedUser = message.mentions.users.first();
		
		if (message.mentions.users.size) {
			message.channel.send(`${taggedUser.username}`+' was slapped by the holy fish!', {files: ["https://cdn.discordapp.com/attachments/713608015017672774/749742370446376980/holyfishslap.gif"]});
		}
		else{
			message.channel.send(args3+' was slapped by the holy fish!', {files: ["https://cdn.discordapp.com/attachments/660928324125851668/750490662591397918/holyfishslap.gif"]});
		}
	}
	
	const GC = message.content.toLowerCase();
	
	if (GC.includes('game crashed') || GC.includes('hat crashed') || GC.includes('hat in time crashed') || GC.includes('editor crashed')) {
		message.channel.send("<@" + message.author.id + "> " +'https://support.hatintime.com/hc/en-us/articles/115003329214-A-Hat-in-Time-has-crashed-Help-'); 
	}
	
	if (GC.includes('make map') || GC.includes('make a map') || GC.includes('make level') || GC.includes('make a level')) {
		message.channel.send("<@" + message.author.id + "> " +'https://support.hatintime.com/hc/en-us/articles/360001874054-How-do-I-make-new-maps-or-mods-for-A-Hat-in-Time-'); 
	}
	
	
			
	if (command3 === "play"){
		if(message.member.voice.channel != null){
			if(args3[0] != null){
				distube.play(message, args3.join(" "));
			}
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (["repeat", "loop"].includes(command3)){
		if(message.member.voice.channel != null){
			let loopmode = distube.setRepeatMode(message, parseInt(args3[0]));
			if(loopmode === 0){
				message.channel.send("Current loop mode: Off");
			}
			if(loopmode === 1){
				message.channel.send("Current loop mode: This track");
			}
			if(loopmode === 2){
				message.channel.send("Current loop mode: Entire queue");
			}
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (command3 === "stop") {
		if(message.member.voice.channel != null){
			distube.stop(message);
			message.channel.send("Stopped the music!");
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (command3 === "skip") {
		if(message.member.voice.channel != null){
			distube.skip(message);
			message.channel.send("Skipped the song!");
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (command3 === "queue") {
		if(message.member.voice.channel != null){
			let queue = distube.getQueue(message);
			message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
				`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
			).join("\n"));
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (command3 === "shuffle") {
		if(message.member.voice.channel != null){
			let queue = distube.shuffle(message);
			message.channel.send('Queue shuffled');
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if (command3 === "autoplay") {
		if(message.member.voice.channel != null){
			distube.toggleAutoplay(message);
			message.channel.send("Autoplay toggled!");
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
	if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command3)) {
		if(message.member.voice.channel != null){
			let filter = distube.setFilter(message, command3);
			message.channel.send("Current queue filter: " + (filter || "Off"));
		}
		else{
			message.channel.send("You must be in a VC to use this!");
		}
	}
	
});

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, err) => message.channel.send(
        "An error encountered: " + err
    ));
	

client.login('NzQ5NDc5ODY0ODc2NDAwNzQy.X0slhA.C7m3F5TjWInm6DkTALG5GFI_g9k');