const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-261ef9c7-14f5-4054-ba58-8e4b1b2a5df6',
    subscribeKey: 'sub-c-facd2856-23f1-11e8-a8f3-22fca5d72012'
});
var id = window.location.href.split('?').pop();
var first = id.split('+')[0];
var second = id.split('+')[1];

//Redirect second one's browser to current page(Or open a new tab)

//console.log(first);
//console.log(second);



const appendMessage = (username, text) => {
    let message =
        $(`<div class="list-group-item" />`)
            .append($('<strong>').text(username + ': '))
            .append($('<span>').text(text));

    $('#log').append(message);
    $("#log").animate({scrollTop: $('#log').prop("scrollHeight")}, "slow");
    // $("#log").animate({color:color},1000);

};

let me = ChatEngine.connect(second, null);


ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    //let chat = new ChatEngine.Chat('private-chat');
    let chat = new ChatEngine.Chat('secret-channel');
    var usr = new ChatEngine.User(second,chat);
    chat.invite(usr);
    console.log('private-chat-info');
    console.log(chat);

    chat.on('$.online.here', (payload) => {
        if (payload.user.uuid != first && payload.user.uuid != second) {
            return;
        }
        appendMessage('Status', payload.user.uuid + ' is in the channel!');
    });

    chat.on('$.online.join', (payload) => {
        if (payload.user.uuid != first && payload.user.uuid != second) {
            return;
        }
        appendMessage('Status', payload.user.uuid + ' has come online!');
    });

    chat.on('message', (payload) => {
        console.log(payload);
        /*if(payload.sender.uuid!= first && payload.sender.uuid!=second){
         return ;
         }*/
        appendMessage(payload.sender.uuid, payload.data.text);
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
