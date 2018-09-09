PubNub_ChatEngine_Demo
====
PubNub_ChatEngine_Demo  Randomly Customized Match up chats
------
#Supperted by Pub Nub Chat Engine SDK

## Updated on Mar 10:

Configure local Apache Server to handle the AJAX request to send selected Sex, Age, Hobby features' value

Local Test Info: 
- Put the folder into local Apache Server
- Copy serverSide.php to Apache Server
- Then start serverSide.php first

### Strategy of creating new Private chat between two selected users:

- After clicking on the 'Start Anonymous Chat' button, current user's browser would open a new page called 'private-chat'.

- Then by using:

`let secretChat = new ChatEngine.Chat('secret-channel'); `

`secretChat.invite(someoneElse);`

to invite another user to join the secret channel
 

# Info
- SDK and Source: https://www.pubnub.com/products/chatengine/

- Blog: https://medium.com/@tomsheep19/pubnub-chat-engine-demo-with-customized-searching-and-randomly-match-up-chats-e84e76919fa1

- Video: https://www.youtube.com/watch?v=z5DSEXSlEVs

- Images
### Multi-Users Chat Room (Named as user A)
![image](https://github.com/tomSheep19/ReadMe_Imgs/blob/master/1.png)



### Alert: No other users in the Chat Room
![image](https://github.com/tomSheep19/ReadMe_Imgs/blob/master/2.png)



### New Tab, Private Chat Room (User A)
![image](https://github.com/tomSheep19/ReadMe_Imgs/blob/master/3.png)



### The guy who is matched (Named as User B)
![image](https://github.com/tomSheep19/ReadMe_Imgs/blob/master/4.png)



# Steps

- 1. Configure Environment: NodeJS->Bootstrap->jQuery->Chat Engine SDK

- 2. Create simple UI :

The whole page contains message area, input boxes, selection area and a start Matching button.

- 3. Whenever user joined the chat room, I will record them as objects in an ArrayList, I called it as a ‘Pool’.

    My idea is giving tags to those people in the chat room(e.g: male/female; like sports/like watching films or some other customized features), then randomly match people with their tags into a private chat room. When the scale of data is huge, something interesting would happen.

Whenever the user clicks on the start button to search matches, if there is only one user in the pool, the page would send an alert to the user, so that the user need to wait.

- 4. When there would be a target(s) in the pool, a page would turn into a new tab called private chat, which contains only 2 people(our matches).

# The Next Steps:

What to do next:

Finishing the tag feature for all the objects in the chat room(like the tag search, in the current repository it is only an interface);

Turn the guy who was matched’s page into private chat room page

and Better UI…
