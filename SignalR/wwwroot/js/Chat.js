
document.addEventListener('DOMContentLoaded', function () {

    var userName = prompt("Please Enter Your Name");

    var messageInput = document.getElementById("messageInp");

    var groupNameInput = document.getElementById("groupNameInp");

    var messageToGroupInput = document.getElementById("messageToGroupInp");

    messageInput.focus();

    // Hub Connection
    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    // Start Connection

    proxyConnection.start().then(function () {
        //Individual
        document.getElementById("sendMessageBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("Send", userName, messageInput.value);
        });

        // Group Join
        document.getElementById("joinGroupBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("JoinGroup", groupNameInput.value, userName);
        });

        // Message Group
        document.getElementById("sendMessageToGroupBtn").addEventListener('click', function (e) {
            e.preventDefault();

            proxyConnection.invoke("SendMessageToGroup", groupNameInput.value, userName, messageToGroupInput.value);
        });


    }).catch(function (error) {
        console.log(error);
    });

    // ReciveMessage

    proxyConnection.on("RecieveMessage", function (userName, message)
    {
        var listElement = document.createElement('li');

        listElement.innerHTML = `<strong>${userName}: </strong> ${message}`;

        document.getElementById("conversation").appendChild(listElement);
    })

    // NewMemberJoin
    proxyConnection.on("NewMemberJoin", function (userName, groupName) {
        var listElement = document.createElement('li');

        listElement.innerHTML = `<strong>${userName} has joined ${groupName} </strong>`;

        document.getElementById("groupConversationUL").appendChild(listElement);
    });

    // RecieveMessageFromGroup

    proxyConnection.on("RecieveMessageFromGroup", function (sender, message) {
        var listElement = document.createElement('li');

        listElement.innerHTML = `<strong>${sender}: </strong> ${message}`;

        document.getElementById("groupConversationUL").appendChild(listElement);
    })



})