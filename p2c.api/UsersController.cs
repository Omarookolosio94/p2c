using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using p2c.api;
using p2c.api.Services;

[ApiController]
[Route("api/users")]
public class UsersController(IUserService userService) : ControllerBase
{
    /// <summary>
    ///   Get User Profile By Id
    /// </summary>
    /// <response code="200">Success</response>
    /// <response code="404">User Not Found</response>
    /// <response code="500">Internal Server Error</response>
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<User?>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(Response<User?>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Response<User?>))]
    [HttpGet("{id}")]
    [AllowAnonymous]
    public IActionResult GetUserById(string id)
    {
        var res = Response<User?>.Create(null);

        var user = userService.GetUserById(id);
        if (user == null)
        {
            res = Response<User?>.Create(null, "User profile not found", StatusCodes.Status404NotFound, false);
            return StatusCode(res.statusCode, res);
        }

        res = Response<User?>.Create(user, "User profile retrieved", StatusCodes.Status200OK, true);
        return StatusCode(res.statusCode, res);
    }

    /// <summary>
    ///   Get All Users
    /// </summary>
    /// <response code="200">Success</response>
    /// <response code="500">Internal Server Error</response>
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<List<User>>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Response<List<User>>))]
    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetAllUsers()
    {
        var res = Response<List<User>>.Create(null);

        var users = userService.GetOnlineUsers().ToList();
        if (!users.Any())
        {
            res = Response<List<User>>.Create(new List<User>(), "No users found", StatusCodes.Status404NotFound, false);
            return StatusCode(res.statusCode, res);
        }

        res = Response<List<User>>.Create(users, "Users retrieved successfully", StatusCodes.Status200OK, true);
        return StatusCode(res.statusCode, res);
    }

    /// <summary>
    ///   Register new user
    /// </summary>
    /// <response code="201">User Registered Successfully</response>
    /// <response code="400">Bad Request</response>
    /// <response code="500">Internal Server Error</response>
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Response<User?>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Response<NewUser?>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Response<User?>))]
    [HttpPost()]
    [AllowAnonymous]
    public IActionResult RegisterUser([FromBody] NewUser newUser)
    {
        var res = Response<User?>.Create(null);

        if (userService.GetOnlineUsers().Any(u => u.Email == newUser.Email))
        {
            res = Response<User?>.Create(null, "A user with this email already exists", StatusCodes.Status400BadRequest,
                false);
            return StatusCode(res.statusCode, res);
        }

        var user = new User
        {
            UserId = Guid.NewGuid().ToString(),
            Name = newUser.Name,
            Email = newUser.Email,
            PhoneNumber = newUser.PhoneNumber,
            IsOnline = true,
            LastSeen = DateTime.Now
        };

        userService.AddOrUpdateUser(user);

        res = Response<User?>.Create(user, $"Hello, {user.Name}! Your registration was successful.",
            StatusCodes.Status201Created, true);
        return StatusCode(res.statusCode, res);
    }

    /// <summary>
    ///   Sign in User
    /// </summary>
    /// <response code="200">Sign-In Successful</response>
    /// <response code="404">User Not Found</response>
    /// <response code="500">Internal Server Error</response>
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response<User?>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(Response<User?>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Response<User?>))]
    [HttpPost("auth")]
    [AllowAnonymous]
    public IActionResult SignInUser([FromBody] AuthData authData)
    {
        var res = Response<User?>.Create(null);

        var user = userService.GetOnlineUsers().FirstOrDefault(u => u.Email == authData.Email);
        if (user == null)
        {
            res = Response<User?>.Create(null, "User does not exist. Please check your email and password.",
                StatusCodes.Status404NotFound, false);
            return StatusCode(res.statusCode, res);
        }

        user.LastSeen = DateTime.Now;
        userService.AddOrUpdateUser(user);

        res = Response<User?>.Create(user, $"Welcome back, {user?.Name}!", StatusCodes.Status200OK, true);
        return StatusCode(res.statusCode, res);
    }
}