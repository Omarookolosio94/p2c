using System.Reflection;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using p2c.api;
using p2c.api.Services;

var builder = WebApplication.CreateBuilder(args);

var allowedHosts = builder.Configuration["AllowedHosts"]?.Split(',', StringSplitOptions.RemoveEmptyEntries) ??
                   Array.Empty<string>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressMapClientErrors = true;
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "p2c",
        Description = "Peer to Peer Communication",
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    options.IncludeXmlComments(xmlPath);
});

builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IChatService, ChatService>();

builder.Services.AddControllers(options => { options.Filters.Add(new ValidationFilter()); });

builder.Services.AddSignalR(options =>
{
    options.KeepAliveInterval = TimeSpan.FromSeconds(40);
    options.ClientTimeoutInterval = TimeSpan.FromMinutes(2);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStatusCodePages(async context =>
{
    context.HttpContext.Response.ContentType = "application/json";

    var response = new Response<string>
    {
        data = null,
        message = "",
        statusCode = context.HttpContext.Response.StatusCode,
        status = false
    };

    switch (context.HttpContext.Response.StatusCode)
    {
        case (int)HttpStatusCode.NotFound:
            response.message = "The requested resource was not found.";
            break;
        case (int)HttpStatusCode.UnsupportedMediaType:
            response.message = "Unsupported Media Type";
            break;
        case (int)HttpStatusCode.Unauthorized:
            response.message = "Unauthorized";
            break;
        case (int)HttpStatusCode.Forbidden:
            response.message = "Unauthorized access";
            break;
        case (int)HttpStatusCode.MethodNotAllowed:
            response.message = "Method not allowed";
            break;
        default:
            break;
    }

    await context.HttpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
});

app.UseRouting();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());

// register hubs

app.UseHttpsRedirection();

app.MapControllers();

app.MapHub<ChatHub>("/chathub");

app.Run();