'use strict';

// Requirements
const WebSocket = require('ws');
const EventEmitter = require('events');

// Initializing a constructor function
class VoxtlJS extends EventEmitter {

    // Object Structure
    constructor(definedSettings) {
        super(); // Event Emitter

        var Settings = {
            Sessions: 1,
            Watchonly: false,
            ratelimit: 100, // This will want to be updated to the Voxtl Default.
            debug: false
        }

        this.bot = {
            username: null,
            login: {
                status: false,
                token: null,
                TimeSinceLogin: null,
            }
        }

        this.socket = []; // Creates a array for chat socket sessions (session per channel currently) 
        this.channels = []; // Creates a array for channels
        this.users = []; // Creates a array for users
    }

    // Functions

    // Login to Voxtl with Token
    login = function (token) {
        // This is used to valid and store the token for the bot.
        // This script makes a connection to the chat for the VoxtlJS user and waits for the Ready event to confirm who we are logged in as.

        // If no token is provide this will throw a error
        if (!token) throw "VoxtlJS: No Token was provided.";
        
        // Creates a new socket for the connection to valid the token // Conection uses the VoxtlJS UUID as currently channel names don't work
        let TokenValidationSocket = new WebSocket('wss://ws.voxtl.tv/7046d794-72f2-4366-970b-4142daaca79a')
        // Once this connection is started, we now tell the server we are logging in.
        TokenValidationSocket.on('open', function open() {
            var loginstring = {
                "event": "join",
                "data": token
            }
            // Send data to websocket (chat server)
            TokenValidationSocket.send(JSON.stringify(loginstring))            
        })

        // On Message event, waiting for type ready.
        TokenValidationSocket.on('message', (data) => {
            data = JSON.parse(data);
            if (data.event === 'ready'){
                this.bot.id = data.data.id
                this.bot.username = data.data.username;
                this.bot.login.token = token
                this.bot.login.status = true;
                this.bot.login.TimeSinceLogin = Date();
            }
            console.log(data.data);
        });
    }

    debug = function (Bool) { // Toggle debug (Function can be turned on and off within the application)
        if (Bool == true)
        {
            return 'VoxtlJS: Debugger now enabled!';
        }
        else if (Bool == false)
        {
            return 'VoxtlJS: Debugger now disabled!';
        }
        else
        {
            throw 'VoxtlJS.debugging was called without \'True\' or \'False\' being defined.'
        }
    }

}


class user {
}
class channel {
}


function CodeGen(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

// Module Export
module.exports = VoxtlJS;
