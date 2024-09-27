using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {

    }

    public DbSet<Order> Orders { get; set; }
}