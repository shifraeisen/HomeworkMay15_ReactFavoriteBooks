using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkMay15_ReactFavoriteBooks.Data;

public class BooksDataContextFactory : IDesignTimeDbContextFactory<BooksDataContext>
{
    public BooksDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}HomeworkMay15_ReactFavoriteBooks.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new BooksDataContext(config.GetConnectionString("ConStr"));
    }
}