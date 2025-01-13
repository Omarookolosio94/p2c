namespace p2c.api;

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using p2c.api.Services;

public class ChatHub(IChatService chatService) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        if (httpContext.Request.Query.TryGetValue("referenceId", out var referenceId))
        {
            var (user1Id, user2Id) = Helpers.SplitReferenceId(referenceId);

            if (!string.IsNullOrEmpty(user1Id) && !string.IsNullOrEmpty(user2Id))
            {
                // Create or join the chat room using the extracted IDs
                var chatRoom = chatService.CreateOrGetChatRoom(user1Id, user2Id);
                await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatId);
            }
            else if (!string.IsNullOrEmpty(user1Id))
            {
                await JoinAllUserGroups(user1Id);
            }
            else
            {
                await Clients.Caller.SendAsync("Error", "Invalid or missing reference ID.");
            }
        }

        await base.OnConnectedAsync();
    }

    /*
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var httpContext = Context.GetHttpContext();

        if (httpContext.Request.Query.TryGetValue("referenceId", out var referenceId))
        {
            try
            {
                var (user1Id, user2Id) = Helpers.SplitReferenceId(referenceId);
                var chatRoom = chatService.CreateOrGetChatRoom(user1Id, user2Id);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatRoom?.ChatId!);
            }
            catch (Exception)
            {
            }
        }

        // Call the base method to complete the disconnect process
        await base.OnDisconnectedAsync(exception);
    }*/

    /// <summary>
    /// Creates or joins a chat room between two users.
    /// </summary>
    /// <param name="user1Id">The first user's ID.</param>
    /// <param name="user2Id">The second user's ID.</param>
    /// <returns></returns>
    public async Task CreateOrJoinRoom(string user1Id, string user2Id)
    {
        var chatRoom = chatService.CreateOrGetChatRoom(user1Id, user2Id);
        await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatId);

        // Notify the user that they have joined the room
        await Clients.Caller.SendAsync("RoomJoined", chatRoom.ChatId);
    }

    /// <summary>
    /// Sends a message to a chat room.
    /// </summary>
    /// <param name="chatId">The chat room ID.</param>
    /// <param name="senderId">The sender's user ID.</param>
    /// <param name="receiverId">The receiver's user ID.</param>
    /// <param name="content">The message content.</param>
    /// <returns></returns>
    public async Task SendMessage(string chatId, string senderId, string receiverId, string content)
    {
        var message = new Message
        {
            MessageId = Guid.NewGuid().ToString(),
            SenderUserId = senderId,
            ReceiverUserId = receiverId,
            Content = content,
            Timestamp = DateTime.UtcNow.ToString("o"),
            ChatId = chatId
        };

        if (chatService.SendMessage(chatId, message))
        {
            // Broadcast the message to the chat room
            await Clients.Group(chatId).SendAsync("ReceiveMessage", message);
        }
        else
        {
            // Notify the sender about the failure
            await Clients.Caller.SendAsync("Error", "Failed to send the message. Chat room does not exist.");
        }
    }

    /// <summary>
    /// Retrieves the chat history for a specific chat room.
    /// </summary>
    /// <param name="chatId">The chat room ID.</param>
    /// <returns></returns>
    public async Task GetChatHistory(string chatId)
    {
        var messages = chatService.GetMessages(chatId);

        // Send the chat history to the caller
        await Clients.Caller.SendAsync("ChatHistory", messages);
    }

    /// <summary>
    /// Automatically adds a user to all the chat groups they belong to based on their user ID.
    /// </summary>
    /// <param name="userId">The user's ID.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task JoinAllUserGroups(string userId)
    {
        // Retrieve all chat rooms for the given user
        var chatRooms = chatService.GetChatRooms(userId);

        if (chatRooms != null && chatRooms.Count > 0)
        {
            foreach (var chatRoom in chatRooms)
            {
                // Add the user to each chat room group
                await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatId);
            }

            // Notify the user about the groups they have joined
            await Clients.Caller.SendAsync("UserChatRooms", chatRooms);
        }
        else
        {
            // Notify the user if they have no groups
            await Clients.Caller.SendAsync("UserChatRooms", new List<ChatRoom>());
        }
    }

    /// <summary>
    /// Retrieves all chat rooms for a specific user.
    /// </summary>
    /// <param name="userId">The user's ID.</param>
    /// <returns></returns>
    public async Task GetUserChatRooms(string userId)
    {
        var chatRooms = chatService.GetChatRooms(userId);

        // Send the list of chat rooms to the caller
        await Clients.Caller.SendAsync("UserChatRooms", chatRooms);
    }
}