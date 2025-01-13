using System.Collections.Concurrent;

namespace p2c.api.Services;

public class ChatService(IUserService userService) : IChatService
{
    private readonly ConcurrentDictionary<string, ChatRoom> _chatRooms = new();

    /// <summary>
    /// Generates a consistent chat ID based on user IDs.
    /// </summary>
    private static string GenerateChatId(string user1Id, string user2Id)
    {
        return string.Compare(user1Id, user2Id) < 0 ? $"{user1Id}_{user2Id}" : $"{user2Id}_{user1Id}";
    }

    public ChatRoom CreateOrGetChatRoom(string user1Id, string user2Id)
    {
        var chatId = GenerateChatId(user1Id, user2Id);

        var user1 = userService.GetUserById(user1Id);
        var user2 = userService.GetUserById(user2Id);

        // If the chat room exists, return it; otherwise, create a new one.
        var chatRoom = _chatRooms.GetOrAdd(chatId, _ => new ChatRoom
        {
            ChatId = chatId,
            User1Id = user1Id,
            User1Name = user1?.Name,
            User2Id = user2Id,
            User2Name = user2?.Name,
            Messages = new List<Message>()
        });

        return chatRoom;
    }

    public bool SendMessage(string chatId, Message message)
    {
        if (!_chatRooms.TryGetValue(chatId, out var chatRoom))
        {
            return false;
        }

        chatRoom.Messages.Add(message);
        return true;
    }

    public List<Message> GetMessages(string chatId)
    {
        if (_chatRooms.TryGetValue(chatId, out var chatRoom))
        {
            return chatRoom.Messages;
        }

        return new List<Message>();
    }

    public List<ChatRoom> GetChatRooms(string userId)
    {
        return _chatRooms.Values
            .Where(room => room.User1Id == userId || room.User2Id == userId)
            .ToList();
    }
}

public interface IChatService
{
    /// <summary>
    /// Creates or retrieves an existing chat room by user IDs.
    /// </summary>
    /// <param name="user1Id">The first user's ID.</param>
    /// <param name="user2Id">The second user's ID.</param>
    /// <returns>The chat room.</returns>
    ChatRoom CreateOrGetChatRoom(string user1Id, string user2Id);

    /// <summary>
    /// Sends a message to a chat room.
    /// </summary>
    /// <param name="chatId">The ID of the chat room.</param>
    /// <param name="message">The message to send.</param>
    /// <returns>True if the message was sent successfully, false otherwise.</returns>
    bool SendMessage(string chatId, Message message);

    /// <summary>
    /// Gets the messages for a chat room.
    /// </summary>
    /// <param name="chatId">The ID of the chat room.</param>
    /// <returns>The list of messages in the chat room.</returns>
    List<Message> GetMessages(string chatId);

    /// <summary>
    /// Gets all chat rooms for a user.
    /// </summary>
    /// <param name="userId">The user's ID.</param>
    /// <returns>A list of chat rooms the user is part of.</returns>
    List<ChatRoom> GetChatRooms(string userId);
}