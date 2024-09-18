import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect,
    useParams,
    NavLink

} from 'react-router-dom';
import Swal from 'sweetalert2';

import '../../App.css';
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks'; //https://react-code-block.netlify.app/usage#basic-example
// import { useCopyToClipboard } from 'react-use';
import { getBlogPost } from '../../store/blogPost-action';
import Loading from '../../components/Loader/Loading';

// function Blog() {
function Blog() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);// default as loading, since it will redirect

    return (
        <>
            <div className="container">
                <div className="blog-header-container" style={{textAlign: 'center', padding: '20px'}}>
                    <h1>Blog Post List</h1>
                    {/* {title} */}
                </div>

                <div className="blog-body-container">                
                    <div className="column content-list" style={{visibility:'hidden'}}>
                        <h2>Content List</h2>
                        <ul>
                            <li><a href="#">Item 1</a></li>
                            <li><a href="#">Item 2</a></li>
                            <li><a href="#">Item 3</a></li>
                        </ul>
                    </div>

                    {/* <div className="column blog-content"> */}
                    <div className='column blog-list'>
                        {/* {content} */}
                                                
                        <div className='row blog-row'>
                            <div className='blog-row-header'>
                                <h2>Manage Concurrent Requests in C# Middleware with SemaphoreSlim and Cache</h2>
                            </div>
                            <div className='blog-row-body'>
                                <p>Concurrency control is essential in systems. Without proper control, issues like race conditions and duplicate records can arise, leading to inconsistencies and unwanted behavior. Let's walk through an issue I encountered at work involving race conditions and duplicate records, and how I resolved it by a Concurrent Control Middleware implemented with <span className='code-display'>SemaphoreSlim</span> and <span className='code-display'>caching</span>...</p>
                                <NavLink to="Manage-Concurrent-Requests-in-Csharp-Middleware-with-SemaphoreSlim-and-Cache"><button class="read-more-btn">Read More</button></NavLink>
                            </div>
                        </div>

                        {/* Example of Blog Post */}
                        {/* <h2>Manage Concurrent Requests in C# Middleware with SemaphoreSlim and Cache</h2>
                        <hr/>
                        <p>
                            Concurrency control is essential in systems. Without proper control, issues like <strong>race conditions and duplicate records </strong> can arise, leading to inconsistencies and unwanted behavior. Let's walk through an issue I encountered at work involving race conditions and duplicate records, and how I resolved it by a Concurrent Control Middleware implemented with <span className='code-display'>SemaphoreSlim</span> and <span className='code-display'>caching</span>. I will show a simple version of the code and the ideas on how it works.
                        </p>
                        <p>
                            The issue occurred when multiple concurrent requests were <strong>processed simultaneously</strong>, with some of these requests occasionally targeting the same resources. This eventually led to <span className='code-display'>race conditions</span> and <span className='code-display'>duplicate records</span> being created. What even worse is you will receive a lot of complaints messages from the users about the system's behavior.
                        </p>


                        <h3 className='new-paragraph'>The Solution: Concurrent Control middleware with Cache + SemaphoreSlim</h3>
                        <p>
                            This code snippet creates and manages a cache using <span className='code-display'>SemaphoreSlim</span> to handle concurrent requests. If a cache entry for a given key does not exist, it creates one; otherwise, it proceeds with the <span className='code-display'>ControlRequest()</span> function (will go through later). Here's a concise:
                        </p>

                        <li>
                            <strong>Cache Key:</strong> The key for the cache is generated based on the HTTP method and path of the request, ensuring that each API endpoint and method combination has a unique key. You definitely would want to make it more unique with a combination of user ID, user token, etc.
                        </li>
                        <li> 
                            <strong>SemaphoreSlim:</strong> The <span className='code-display'>SemaphoreSlim(1, 1)</span> object is used to limit access to a resource. This means only one request can access the resource at a time. You can adjust this setting based on your needs.
                        </li>
                        <li> 
                            <strong>Cache Management:</strong> The cache entry is set to expire after 60 seconds. This is important because it ensures that the cache doesn't persist indefinitely. If a request is closed, aborted, or rejected, clearing the cache helps prevent persistent errors (e.g., <span className='code-display'>ErrorCode=429</span>), ensuring that the resource remains accessible.
                        </li>
                        <p>
                            <CodeBlock
                                language='c#'
                                // text={`string apiMethod = context.Request.Method.ToString().Trim();\nstring apiPath = context.Request.Path.ToString().Trim();\nstring key = $"{apiMethod}_{apiPath}"; //unique key for cache\n// Check if a user-specific semaphore exists\nif (!_memoryCache.TryGetValue(key, out SemaphoreSlim semaphoreData))\n{\nvar concurrentLimitSemaphore = new SemaphoreSlim(1, 1); \n semaphoreData = concurrentLimitSemaphore;\n_memoryCache.Set(key, concurrentLimitSemaphore, new MemoryCacheEntryOptions\n{\n    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(60)\n});\n}\nawait ControlRequest(context, semaphoreData);`}
                                text={`string apiMethod = context.Request.Method.ToString().Trim();\nstring apiPath = context.Request.Path.ToString().Trim();\nstring key = $\"{apiMethod}_{apiPath}\"; //unique key for cache\n// Check if a user-specific semaphore exists\nif (!_memoryCache.TryGetValue(key, out SemaphoreSlim semaphoreData))\n{\n\t\t    var concurrentLimitSemaphore = new SemaphoreSlim(1, 1); \n\t\t    semaphoreData = concurrentLimitSemaphore;\n\t\t    _memoryCache.Set(key, concurrentLimitSemaphore, new MemoryCacheEntryOptions\n\t\t    {                   \n\t\t\t        AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(60)\n\t\t    });\n\t}\nawait ControlRequest(context, semaphoreData);`}
                                theme={dracula}
                                showLineNumbers={true}
                            />                         
                        </p>

                        <p className='new-paragraph'>
                        This part of the code is responsible for managing access to resources using <span className='code-display'>SemaphoreSlim</span>, ensuring that requests are controlled based on resource availability. Here's a breakdown of how it works:
                        </p>

                        <li>
                            <strong>Semaphore Control:</strong> 
                            The await <span className='code-display'>semaphore.WaitAsync(0)checks</span> if the resource is available. By setting to <span className='code-display'>0</span>, the method will not wait if the resource is currently unavailable; it will simply skip the request. You can adjust this setting based on your needs.
                        </li>
                        <li> 
                            <strong>Resource Management:</strong> 
                            The <span className='code-display'>semaphore.Release()</span> method is crucial as it ensures that the resource is released after it has been used. This allows other requests to access the resource.
                        </li>
                        <li> 
                            <strong>Error Handling:</strong> If the resource is unavailable, the code returns an HTTP 429 (Too Many Requests) status. It also provides a detailed error message in the response body, using the <span className='code-display'>ProblemDetails</span> class to help clients understand the issue and try again later.
                        </li>
                        <p>
                            <CodeBlock
                                // language="go"
                                language='c#'
                                text={`private async Task ControlRequest(HttpContext context, SemaphoreSlim semaphore)\n{\n\t    // Try to enter the semaphore\n\t    if (await semaphore.WaitAsync(0))\n\t    {\n\t\t        try\n\t\t        {\n\t\t\t            await _next(context); // Allow to access the resouce\n\t\t        }\n\t\t        finally\n\t\t        {\n\t\t\t            semaphore.Release();  // Release resouce after used\n\t\t        }\n\t    }\n\t    else\n\t    {\n\t\t        Exception ex = new Exception(\"Too many requests.\");\n\t\t\n\t\t        context.Response.Clear();\n\t\t        context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;\n\t\t\n\t\t        var problemDetails = new ProblemDetails\n\t\t        {\n\t\t\t            Title = \"Too many requests. Please try again later.\",\n\t\t\t            Detail = \"Rate limit exceeded. Too many requests.\",\n\t\t\t            Instance = context.Request.Path,\n\t\t\t            Status = (int)HttpStatusCode.TooManyRequests\n\t\t        };\n\t\t\n\t\t        // Serialize the problem details to the response body\n\t\t        context.Response.ContentType = \"application/problem+json\";\n\t\t        await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(problemDetails));\n\t    }\n}`}
                                codeBlock
                                theme={dracula}
                                showLineNumbers={true}
                            />                         
                        </p>

                        <h3 className='new-paragraph'>Possible Enhancement</h3>
                        <li>
                            <strong>Redis Cache:</strong> 
                            If your service operates across multiple servers, consider replacing <span className='code-display'>IMemoryCache</span> with Redis Cache. Using a distributed Redis cache for semaphore implementation can ensure that concurrency control is consistently applied across the entire infrastructure by sharing the same cache. This approach helps maintain synchronized access limits even in a distributed environment.
                        </li>
                        <li> 
                            <strong>Whitelisting Optimization:</strong> 
                            For API paths that don't require concurrent request control, implementing a whitelist mechanism can improve performance. By bypassing the concurrency checks for certain paths, you can reduce unnecessary overhead and optimize the efficiency of your resource management.
                        </li>


                        <h3 className='new-paragraph'>Conclusion</h3>
                        <p>
                            This approach offers a flexible and robust solution for managing concurrent requests. By utilizing <span className='code-display'>SemaphoreSlim</span> and caching mechanisms, it ensures stability and prevents resource exhaustion during high traffic periods. Additionally, it helps avoid issues such as duplicate records and race conditions. This method provides a scalable way to handle requests efficiently and maintain the integrity of your application.
                        </p>     

                        <h3>Complete Code</h3> 
                        <p>
                            <strong>#note#:</strong> Don't forget to put <span className='code-display'>app.UseConcurrentControlMiddleware()</span> and <span className='code-display'>services.AddMemoryCache()</span> in <strong>startup.cs</strong>
                        </p>      
                        <p>
                            <CodeBlock
                                // language="go"
                                language='c#'
                                text={`using System;\nusing System.IO;\nusing System.Net;\nusing System.Threading.Tasks;\nusing Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Http;\nusing Microsoft.AspNetCore.Mvc;\nusing Microsoft.Extensions.Caching.Memory;\nusing Microsoft.Extensions.Configuration;\nusing System.Collections.Generic;\nusing System.Threading;\nusing System.Linq;\n\npublic class ConcurrentControlMiddleware\n{\n    private readonly RequestDelegate _next;\n    private readonly IMemoryCache _memoryCache;\n\n    public ConcurrentControlMiddleware(\n        RequestDelegate next, \n        IMemoryCache memoryCache\n    )\n    {\n        _next = next\n        _memoryCache = memoryCache\n    }\n\n    public async Task InvokeAsync(HttpContext context)\n    {\n        try\n        {\n            string apiMethod = context.Request.Method.ToString().Trim();\n            string apiPath = context.Request.Path.ToString().Trim();\n\n            string key = $"{apiMethod}_{apiPath}"; //unique key for cache\n\n            // Check if a user-specific semaphore exists\n            if (!_memoryCache.TryGetValue(key, out SemaphoreSlim semaphoreData))\n            {\n                var concurrentLimitSemaphore = new SemaphoreSlim(1, 1); \n                semaphoreData = concurrentLimitSemaphore;\n                _memoryCache.Set(key, concurrentLimitSemaphore, new MemoryCacheEntryOptions\n                {                   \n                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(60)\n                });\n            }\n            await ControlRequest(context, semaphoreData);\n\n        }catch(Exception ex)\n        {\n            context.Response.Clear();\n            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // Internal Server Error\n\n            var problemDetails = new ProblemDetails\n            {\n                Title = "An unexpected error occurred",\n                Detail = "Error Detected",\n                Instance = context.Request.Path,\n                Status = (int)HttpStatusCode.InternalServerError\n            };\n\n            // Serialize the problem details to the response body\n            context.Response.ContentType = "application/problem+json";\n            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(problemDetails));\n        }\n        \n    }\n\n    private async Task ControlRequest(HttpContext context, SemaphoreSlim semaphore)\n    {\n        // Try to enter the semaphore\n        if (await semaphore.WaitAsync(0))\n        {\n            try\n            {\n                await _next(context); // Allow to access the resouce\n            }\n            finally\n            {\n                semaphore.Release();  // Release resouce after used\n            }\n        }\n        else\n        {\n            Exception ex = new Exception("Too many requests.");\n\n            context.Response.Clear();\n            context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;\n\n            var problemDetails = new ProblemDetails\n            {\n                Title = "Too many requests. Please try again later.",\n                Detail = "Rate limit exceeded. Too many requests.",\n                Instance = context.Request.Path,\n                Status = (int)HttpStatusCode.TooManyRequests\n            };\n\n            // Serialize the problem details to the response body\n            context.Response.ContentType = "application/problem+json";\n            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(problemDetails));\n        }\n    }\n}\n\n// Extension method used to add the middleware to the HTTP request pipeline.\npublic static class ConcurrentControlMiddlewareExtensions\n{\n    public static IApplicationBuilder UseConcurrentControlMiddleware(this IApplicationBuilder builder)\n    {\n        return builder.UseMiddleware<ConcurrentControlMiddleware>();\n    }\n}`}
                                // codeBlock
                                theme={dracula}
                                showLineNumbers={true}
                            />                         
                        </p> */}
                                    

                    </div>

                    <div className="column ads-display" style={{visibility:'hidden'}}>
                        <h2>Ads</h2>
                        <p>Ad content goes here. You can embed ads or display other promotional content.</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Blog;
