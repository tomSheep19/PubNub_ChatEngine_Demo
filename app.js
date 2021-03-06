const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-261ef9c7-14f5-4054-ba58-8e4b1b2a5df6',
    subscribeKey: 'sub-c-facd2856-23f1-11e8-a8f3-22fca5d72012'
});
var globalUsr;
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

const appendPrivateMessage = (username, text) => {
    let message =
        $(`<div class="list-group-item" />`)
            .append($('<strong>').text(username + ': '))
            .append($('<span>').text(text));

    $('#privateLog').append(message);
    $("#privateLog").animate({scrollTop: $('#privateLog').prop("scrollHeight")}, "slow");
    // $("#log").animate({color:color},1000);

};

let me = ChatEngine.connect(getUsername(), null);




ChatEngine.on('$.ready', (data) => {

    let me = data.me;


    let chat = new ChatEngine.Chat('new-chat');
    //let secretChat = null;

    me.direct.on('$.invite', (payload) => {
        console.log("IIIIIIIIIII");
        let secretChat = new ChatEngine.Chat(payload.data.channel);
        document.getElementById("log").style.display = 'none';
        document.getElementById("privateLog").style.display = 'inline';
        document.getElementById("message").style.display='none';
        document.getElementById("privateMessage").style.display='inline';
        secretChat.on('message', (payload) => {
            console.log(payload);
            appendPrivateMessage(payload.sender.uuid, payload.data.text);
        });
        $('#privateLog').append("Now you are in a Private Chat with " + globalUsr );
        console.log(secretChat);
        $("#privateMessage").keypress(function (event) {
            if (event.which == 13) {
                secretChat.emit('message', {
                    text: $('#privateMessage').val()
                });
                $("#privateMessage").val('');
                event.preventDefault();
            }
        });

    });

    chat.on('$.connected', (payload) => {
        appendMessage(me.uuid, 'Connected to chat!');
    });

    chat.on('$.online.here', (payload) => {
        appendMessage('Status', payload.user.uuid + ' is in the channel!');
    });

    chat.on('$.online.join', (payload) => {
        appendMessage('Status', payload.user.uuid + ' has come online!');
    });

    chat.on('message', (payload) => {
        console.log(payload);
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


    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

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

            globalUsr = pickedUsr;
            //Redirect pickedUsr's page to the privatepage
            //console.log(chat);
            let secretChat = new ChatEngine.Chat('secret-channel');
            var usr = new ChatEngine.User(pickedUsr,secretChat);

            secretChat.invite(usr);
            console.log('Sec');
            console.log(secretChat);

            // someoneElse in another instance of ChatEngine




            //Encede the peers' name
            var encodedName = pickedUsr + "+" + me.uuid;
            var url = 'randomlyPickedChat.html?' + encodedName;
            var win = window.open(url);
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost/~miemie/serverSide.php", false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(name + "=" + value);
    console.log(xhttp.responseText);
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


