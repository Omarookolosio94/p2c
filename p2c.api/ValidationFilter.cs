using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace p2c.api;

public class ValidationFilter : IActionFilter
{
    public void OnActionExecuted(ActionExecutedContext context)
    {
        var jsonNamingPolicy = JsonNamingPolicy.CamelCase;

        if (!context.ModelState.IsValid)
        {
            var errorHashTable = new Hashtable();
            foreach (var x in context.ModelState.Keys)
            {
                var errors = new List<string>();
                if (context.ModelState[x].Errors.Count > 0)
                {
                    foreach (var v in context.ModelState[x].Errors)
                    {
                        errors.Add(v.ErrorMessage);
                    }

                    errorHashTable.Add(jsonNamingPolicy.ConvertName(x), string.Join(",", errors));
                }
            }

            context.Result = new BadRequestObjectResult(new Response<Hashtable>
            {
                data = errorHashTable,
                message = "Please pass in required information",
                statusCode = (int)HttpStatusCode.BadRequest,
                status = false
            });

            return;
        }
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var jsonNamingPolicy = JsonNamingPolicy.CamelCase;

        if (!context.ModelState.IsValid)
        {
            var errorHashTable = new Hashtable();
            foreach (var x in context.ModelState.Keys)
            {
                var errors = new List<string>();
                if (context.ModelState[x].Errors.Count > 0)
                {
                    foreach (var v in context.ModelState[x].Errors)
                    {
                        errors.Add(v.ErrorMessage);
                    }

                    errorHashTable.Add(jsonNamingPolicy.ConvertName(x), string.Join(" ", errors));
                }
            }

            context.Result = new BadRequestObjectResult(new Response<Hashtable>
            {
                data = errorHashTable,
                message = "Please pass in required information",
                statusCode = (int)HttpStatusCode.BadRequest,
                status = false
            });

            return;
        }
    }
}