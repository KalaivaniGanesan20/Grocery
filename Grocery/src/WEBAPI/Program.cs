
/*
   Title : Online Grocery Store
   Author : Kalaivani G
   Created At : 21-04-2023
   Updated At : 01-08-2023
   Reviewed By :
   Reviewed At : 02-08-2023

*/

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer; //JWTBEARERDEFAULT
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using PaymentData;
using UserDatabase;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MyorderDatabase;
using query;

using Feedback;
#nullable disable
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options=>{
    options.AddSecurityDefinition("oauth2",new OpenApiSecurityScheme{
        Description="Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In=ParameterLocation.Header,
        Name="Authorization",
        Type=SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options=>
{
    options.TokenValidationParameters=new TokenValidationParameters
    {
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Tokens").Value)),
        ValidateIssuer=false,
        ValidateAudience=false
    };
});
builder.Services.AddDbContext<feedbackDbContext>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});

builder.Services.AddDbContext<productDbContext>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});
builder.Services.AddDbContext<MyOrdersDbContext>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});
builder.Services.AddDbContext<UserDbContext>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});
builder.Services.AddDbContext<imageDbContext>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});
builder.Services.AddDbContext<queryDb>(options=>{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionstring"));
});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:4200") // Replace with the URL of your Angular application
        .AllowAnyHeader()
        .AllowAnyMethod()
);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
