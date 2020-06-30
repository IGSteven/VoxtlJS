<h1>VoxtlJS</h1>
<hr>

Installation
```
npm i -s https://github.com/IGSteven/VoxtlJS/
```

<hr>

import module and create client for channel
```
const VoxtlJS = require('VoxtlJS');
const client = new VoxtlJS('Steve');
```

Start bot and Wait for messages
```
client.on('ready', data => {
    // Once connections Established.
}

// Listen for Messages
client.on('chatMessage', msg => {
    console.log(msg);

    if (msg.data.message.startsWith("!ping"){
        client.sendMessage(`Pong\!`)
   }

})
```

Send Messages
```
    client.sendMessage('YOUR_MESSAGE');
```

To send messages you will have to login to the chat. (optional if you just want to creep)
```
client.login('BOT_USERNAME', 'YOUR_TOKEN_HERE');
```

<hr>
<h3>More Documentation will be coming soon once js.org approve my site<h3>
