const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-261ef9c7-14f5-4054-ba58-8e4b1b2a5df6',
    subscribeKey: 'sub-c-facd2856-23f1-11e8-a8f3-22fca5d72012'
});

const getUsername = () => {
    const usrs = ['SpiderMan', 'Yang', 'Thor', 'BlackWidow', 'CaptainMarvel', 'Medusa', 'IronMan', 'Hulk'];
    return usrs[Math.floor(Math.random() * usrs.length)];
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

let me = ChatEngine.connect(getUsername(), null);

ChatEngine.on('$.ready', (data) => {

    let me = data.me;

    let chat = new ChatEngine.Chat('new-chat');


    chat.on('message', (payload) => {
        console.log(payload);
        appendMessage(payload.sender.uuid, payload.data.text);
    });

    chat.on('$.connected', (payload) => {
        appendMessage(me.uuid, 'Connected to chat! Welcome!');
    });

    chat.on('$.online.here', (payload) => {
        appendMessage('Status', payload.user.uuid + ' is in the channel!');
    });


    chat.on('$.online.join', (payload) => {
        appendMessage('Status', payload.user.uuid + ' has come online!');
    });

    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };


    $("#message").keypress(function (event) {
        if (event.which == 13) {
            chat.emit('message', {
                text: $('#message').val()
            });
            $("#message").val('');
            event.preventDefault();
        }
    });



    $("#randomButton").click(function () {
        postSelectionToServer();
        var curUsers = chat.users;
        var nameSet = [], i = 0;

        var pickedUsr;
        for (var obj in curUsers) {
            nameSet[i] = obj;
            i++;
        }
        console.log(nameSet);
        var length = nameSet.length;
        if (length <= 1) {
            alert("Currently no matches in this chat room. Please Wait :)");
        } else {
            //Continuing to select until find sb not ME
            pickedUsr = nameSet[Math.floor(Math.random() * length)];
            while (pickedUsr == me.uuid) {
                pickedUsr = nameSet[Math.floor(Math.random() * length)];
            }

            //initiate newChat
            alert("Found! Your peer now is: " + pickedUsr);

            //Encede the peers' name
            var encodedName = pickedUsr + "+" + me.uuid;
            var win = window.open('randomlyPickedChat.html?' + encodedName);
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }


        }

    })


});
function ajaxPost(name, value) {
    //Initiate AJAX Request to local server: serverSide.php
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost/~miemie/serverSide.php", false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(name + "=" + value);
    //console.log(xhttp.responseText);
}
function postSelectionToServer() {

    var sex = $('#Sex').find(":selected").text();
    var age = $('#Age').find(":selected").text();
    var hobby = $('#Hobby').find(":selected").text();


    //Post Sex Value
    if (sex == null) {
        sex = 'default';
    }
    ajaxPost('Sex', sex);

    //Post Age Value
    if (age == null) {
        age = 'default';
    }
    ajaxPost('Age', age);

    //Post hobby Value
    if (hobby == null) {
        hobby = 'default';
    }
    ajaxPost('Hobby', hobby);

    //Add more features for uers

}


