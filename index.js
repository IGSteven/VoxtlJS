"use strict";

// Requirements
const getJSON = require('get-json');
const socket = require('socket.io-client')
const EventEmitter = require('events');

// Initializing a constructor function
class VoxtlJS extends EventEmitter {

    constructor(channel) {
        if (channel === undefined) return console.log('VoxtlJS: No voxtl channel has been defined.');
        super(); // Event Emitter
        this.io = new socket('https://chat.voxtl.com'); // Make a new Socket when New is run on VoxtlJS
        this.token = undefined;
        this.bot = {
            username: 'Steve',
            token: this.token
        }

        // Channel Data (we update this later just a inital placeholder)
        this.channel = {
            name: channel,
            followers: 0,
            viewers: 0,
            stream: {
                title: 'Loading Title.',
                catagory: 'Loading Catagory.'
            }
        }

        function interval() {
            return new Promise(function (resolve, reject) {
                setInterval(function () {
                    getJSON(`https://api.voxtl.com/comet/stream/info?channel=${channel}`)
                        .then(function (data) {
                            channel = {
                                name: channel,
                                followers: data.result.followers,
                                viewers: data.result.viewers,
                                stream: {
                                    title: data.result.stream.title,
                                    catagory: data.result.stream.category
                                }
                            }
                            return resolve(channel);
                        }).catch(function (error) {
                            return reject(error);
                        });
                }, 25000)
            })
        };
        interval().then((data) => {
            this.channel = data;
        });
    }

    // END OF CONSTRUCTOR

    // Enable Debug Mode
    debug = function (Bool) {
        if (Bool == true) {
            console.log('VoxtlJS: Debugger now enabled!');
            var debugListeners = [
                this.io.on('connect', function () { console.log('VoxtlJS: Connected to Voxtl chat server!') }),
                this.io.on('event', function (data) { console.log('VoxtlJS: '.data) }),
                this.io.on('chatMessage', function (data) { console.log('VoxtlJS: '.data) }),
                this.io.on('disconnect', function () { console.log('VoxtlJS: Disconnected from Voxtl chat server!') })
            ]
        }
        else if (Bool == false) {
            console.log('VoxtlJS: Debugger now disabled!');
            if (debugListeners == undefined) return;
            debugListeners.forEach(Listener => {
                this.removeListener('connection', Listener);
            });
        }
        else return console.log('VoxtlJS: Debug setting ether must be true or false')
    }

    // Login with Token
    login = function (username, token) {
        this.bot.username = username;
        this.token = token;

        //if (!token) return console.log("VoxtlJS: No Token was provided.")
        this.io.on('connect', client => {
            this.io.emit('joinChannel', {
                'type': 'connect',
                'time': Math.floor(Date.now() / 1000),
                'token': this.token,
                'data': {
                    'username': this.bot.username,
                    'channel': this.channel.name
                }
            })

            // Client Events
            // Chat Message
            this.io.on('chatMessage', data => { this.emit('chatMessage', data) })
        })
        this.emit('ready', { 'state': 'ready', 'channel': this.channel })
    }

    // Send Message
    sendMessage = function (msg) {
        // if (this.token === undefined) return console.log('VoxtlJS: you must login to send chat messages')
        let messageData = {
            'type': 'message',
            'time': Math.floor(Date.now() / 1000),
            'token': this.token,
            'data': {
                'username': this.bot.username,
                'message': msg
            }
        }
        this.io.emit('chatMessage', messageData)
    }
}

// Module Export
module.exports = VoxtlJS;