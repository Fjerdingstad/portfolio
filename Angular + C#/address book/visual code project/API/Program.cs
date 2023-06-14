using Microsoft.EntityFrameworkCore;
using test_project2_backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Inject DbContext
builder.Services.AddDbContext<ContactDBContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("ContactDBConnectionString")));

builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin(); //allowing any UI to talk to API
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");  //use the policy

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
