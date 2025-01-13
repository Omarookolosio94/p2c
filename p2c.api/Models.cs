namespace p2c.api;

using System.ComponentModel.DataAnnotations;

public class Response<T>
{
    public static Response<T> Create(T data,
        string message = "An unknown error has occurred. Please try again.",
        int statusCode = (int)HttpStatusCode.InternalServerError,
        bool success = false)
    {
        return new Response<T>
        {
            status = success,
            message = message,
            statusCode = statusCode,
            data = data
        };
    }

    public bool status { get; set; } = false;
    public int statusCode { get; set; } = (int)HttpStatusCode.InternalServerError;
    public string message { get; set; } = "An unknown error has occurred. Please try again.";
    public T? data { get; set; }
}

public class NewUser
{
    [Required(ErrorMessage = "Your name is required. Please enter your name.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "The email address you entered is invalid.")]
    [EmailAddress(ErrorMessage = "The email address you entered is invalid.")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "The phone number must be exactly 11 digits.")]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "The phone number must be exactly 11 digits.")]
    public string PhoneNumber { get; set; } = "";
}

public class AuthData
{
    [Required(ErrorMessage = "The email address you entered is invalid.")]
    [EmailAddress(ErrorMessage = "The email address you entered is invalid.")]
    public string Email { get; set; } = "";
}

public class User
{
    public string UserId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string ConnectionId { get; set; }
    public bool IsOnline { get; set; }
    public DateTime LastSeen { get; set; }
}

public class ChatRoom
{
    public string ChatId { get; set; }
    public string User1Id { get; set; }
    public string User1Name { get; set; }
    public string User2Id { get; set; }
    public string User2Name { get; set; }
    public List<Message> Messages { get; set; } = new();
}

public class Message
{
    public string MessageId { get; set; }
    public string SenderUserId { get; set; }
    public string ReceiverUserId { get; set; }
    public string Content { get; set; }
    public string Timestamp { get; set; }
    public string ChatId { get; set; }
    public bool IsRead { get; set; }
    public bool IsEncrypted { get; set; }
}