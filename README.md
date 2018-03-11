# PubNub_ChatEngine_Demo
PubNub_ChatEngine_Demo
Randomly Customized Match up chats

#Supperted by Pub Bub Chat Engine SDK

SDK and Source: https://www.pubnub.com/products/chatengine/

Blog: https://medium.com/@tomsheep19/pubnub-chat-engine-demo-with-customized-searching-and-randomly-match-up-chats-e84e76919fa1

Video: https://www.youtube.com/watch?v=77ocoSlIVY4


1. Configure Environment: NodeJS->Bootstrap->jQuery->Chat Engine SDK

2. Create simple UI :

The whole page contains message area, input boxes, selection area and a start Matching button.

3. Whenever user joined the chat room, I will record them as objects in an ArrayList, I called it as a ‘Pool’.

My idea is giving tags to those people in the chat room(e.g: male/female; like sports/like watching films or some other customized feature), then randomly match people with their tags into a private chat room. When the scale of data is huge, something interesting would happen.

Whenever the user clicks on the start button to search matches, if there is only one user in the pool, the page would send an alert to the user, so that the user need to wait.

4. When there would be a target(s) in the pool, a page would turn into a new tab called private chat, which contains only 2 people(our matches).


What to do next:

Finishing the tag feature for all the objects in the chat room(like the tag search, in the current repository it is only an interface);

Turn the guy who was matched’s page into private chat room page

and Better UI…
