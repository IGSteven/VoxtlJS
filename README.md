<h1>VoxtlJS</h1>

Installation
```
npm i -s https://github.com/IGSteven/VoxtlJS/
```

import module and create client for channel
```
const VoxtlJS = require('VoxtlJS');
const client = new VoxtlJS('Steve');
```

Start bot and Wait for messages
```
client.on('ready', data => {

    // Listen for Messages
    client.on('chatMessage', msg => {
        console.log(msg);
    })
)}
```

To send messages you will have to login to the chat
```
client.login('YOUR_TOKEN_HERE');
```


<h3>More Documentation will be coming soon once js.org approve my site<h3>
