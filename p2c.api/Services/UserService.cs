namespace p2c.api.Services;

using System.Collections.Concurrent;

public class UserService : IUserService
{
    private readonly ConcurrentDictionary<string, User> _users = new();

    public void AddOrUpdateUser(User user)
    {
        _users[user.UserId] = user;
    }

    public User? GetUserByConnectionId(string connectionId)
    {
        return _users.Values.FirstOrDefault(user => user.ConnectionId == connectionId);
    }

    public User? GetUserById(string userId)
    {
        _users.TryGetValue(userId, out var user);
        return user;
    }

    public void RemoveUser(string userId)
    {
        _users.TryRemove(userId, out _);
    }

    public IEnumerable<User> GetOnlineUsers()
    {
        return _users.Values?.OrderByDescending(x => x.LastSeen).ToList();
    }
}

public interface IUserService
{
    /// <summary>
    /// Adds or updates a user in the user store.
    /// </summary>
    /// <param name="user">The user to add or update.</param>
    void AddOrUpdateUser(User user);

    /// <summary>
    /// Retrieves a user by their connection ID.
    /// </summary>
    /// <param name="connectionId">The connection ID to search for.</param>
    /// <returns>The user, or null if not found.</returns>
    User? GetUserByConnectionId(string connectionId);

    /// <summary>
    /// Retrieves a user by their user ID.
    /// </summary>
    /// <param name="userId">The user ID to search for.</param>
    /// <returns>The user, or null if not found.</returns>
    User? GetUserById(string userId);

    /// <summary>
    /// Removes a user by their user ID.
    /// </summary>
    /// <param name="userId">The ID of the user to remove.</param>
    void RemoveUser(string userId);

    /// <summary>
    /// Gets all online users.
    /// </summary>
    /// <returns>A list of all online users.</returns>
    IEnumerable<User> GetOnlineUsers();
}