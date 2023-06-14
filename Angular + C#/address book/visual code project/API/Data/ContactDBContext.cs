using Microsoft.EntityFrameworkCore;
using test_project2_backend.Models;

namespace test_project2_backend.Data
{
    public class ContactDBContext : DbContext
    {
        public ContactDBContext(DbContextOptions options) : base(options)
        {
        }

        // Dbset, property that acts as a table, replicated from the sql table
        public DbSet<Contact> Contact { get; set; }
    }
}
