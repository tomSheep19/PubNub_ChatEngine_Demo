const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-261ef9c7-14f5-4054-ba58-8e4b1b2a5df6',
    subscribeKey: 'sub-c-facd2856-23f1-11e8-a8f3-22fca5d72012'
});


const getUsername = () => {
    const usrs = ['Spider Man', 'Yang', 'Thor', 'Black Widow', 'Captain Marvel', 'Medusa', 'Iron Man', 'Hulk'];
    return usrs[Math.floor(Math.random() * usrs.length)];
};

const getColor = () => {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "teal"];
    return colors[Math.floor(Math.random() * colors.length)];
};


const appendMessage = (username, text, color) => {
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
        appendMessage(me.uuid, 'Connected to chat!', "black");
    });

    chat.on('$.online.here', (payload) => {
        appendMessage('Status', payload.user.uuid + ' is in the channel! Their color is ' + payload.user.state.color + '.');
    });

    chat.on('$.online.join', (payload) => {
        appendMessage('Status', payload.user.uuid + ' has come online! Their color is ' + payload.user.state.color + '.', "black");
        //appendMessage('Status', payload.user.uuid + ' has come online!');
    });

    chat.on('message', (payload) => {
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
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    $("#randomButton").click(function () {
        var curUsers = chat.users;
        var nameSet = [], i = 0;
        var length = nameSet.length;
        var pickedUsr;
        for (var obj in curUsers) {
            nameSet[i] = obj;
            i++;
            //console.log(obj);
        }
        if (length == 1) {
            alert("Currently no matches in this chat room. Please Wait :)");
        } else {
            //Continuing to select until find sb not ME
            while (pickedUsr != me.uuid) {
                pickedUsr = Math.floor(Math.random() * length);
            }

            //initiate newChat
            /*
            var win = window.open('randomlyPickedChat.html');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
            */

            //console.log(nameSet[pickedUsr]);


        }

        //console.log(array);
        //console.log(curUsers);

        //var len = curUsers.size();
        //console.log(curUsers);
        //console.log(chat);
        /*
        array =[];

        for (i = 0; i < len; i++) {
            array.append(curUsers[i]);
        }
        console.log(curUsers);
        */
    })

});
