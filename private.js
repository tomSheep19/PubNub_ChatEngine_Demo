const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-261ef9c7-14f5-4054-ba58-8e4b1b2a5df6',
    subscribeKey: 'sub-c-facd2856-23f1-11e8-a8f3-22fca5d72012'
});
var id = window.location.href.split('?').pop();
var first = id.split('+')[0];
var second = id.split('+')[1];
console.log(first);
console.log(second);
const getUsername = () => {
    const usrs = ['SpiderMan', 'Yang', 'Thor', 'BlackWidow', 'CaptainMarvel', 'Medusa', 'IronMan', 'Hulk'];
    return usrs[Math.floor(Math.random() * usrs.length)];
};

const getColor = () => {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "teal"];
    return colors[Math.floor(Math.random() * colors.length)];
};


const appendMessage = (username, text) => {
    let message =
        $(`<div class="list-group-item" />`)
            .append($('<strong>').text(username + ': '))
            .append($('<span>').text(text));

    $('#log').append(message);
    $("#log").animate({scrollTop: $('#log').prop("scrollHeight")}, "slow");
    // $("#log").animate({color:color},1000);

};

let me = ChatEngine.connect(getUsername(), {color: getColor()});

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    let chat = new ChatEngine.Chat('new-chat');


    chat.on('$.connected', (payload) => {
        appendMessage(me.uuid, 'Connected to chat!');
    });

    chat.on('$.online.here', (payload) => {
        appendMessage('Status', payload.user.uuid + ' is in the channel! Their color is ' + payload.user.state.color + '.');
    });

    chat.on('$.online.join', (payload) => {
        appendMessage('Status', payload.user.uuid + ' has come online! Their color is ' + payload.user.state.color + '.', "black");
        //appendMessage('Status', payload.user.uuid + ' has come online!');
    });

    chat.on('message', (payload) => {
        console.log(payload);
        appendMessage(payload.sender.uuid, payload.data.text, "black");
    });

    chat.on('randomButton', (payload) => {
        console.log(payload);
    });


    $("#message").keypress(function (event) {
        if (event.which == 13) {
            chat.emit('message', {
                text: $('#message').val()
            });
            $("#message").val('');
            event.preventDefault();
        }
    });
});
