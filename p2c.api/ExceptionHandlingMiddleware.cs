namespace p2c.api;

using System.Text.Json;

public class ExceptionHandlingMiddleware(
    ILogger<ExceptionHandlingMiddleware> logger) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Request Method: {req}, Path: {path}, Date Added: {date}",
                context.Request.Method,
                context.Request.Path,
                DateTime.Now);

            var statusCode = StatusCodes.Status500InternalServerError;

            var response = new Response<string>
            {
                data = null,
                status = false,
                message = "An unexpected error occurred. Please try again later.",
                statusCode = statusCode,
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}