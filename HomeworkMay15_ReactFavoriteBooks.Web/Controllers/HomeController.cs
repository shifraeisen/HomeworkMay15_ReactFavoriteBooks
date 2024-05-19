using HomeworkMay15_ReactFavoriteBooks.Data;
using HomeworkMay15_ReactFavoriteBooks.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HomeworkMay15_ReactFavoriteBooks.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet("Search")]
        [AllowAnonymous]
        public List<Book> SearchBooks (string searchText)
        {
            using var client = new HttpClient();
            var result = client.GetFromJsonAsync<SearchResult>($"https://openlibrary.org/search.json?q={searchText}", new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }).Result;
            var books = result.Docs.Select(d => new Book
            {
                Id = d.Key,
                Title = d.Title,
                Author = d.Author?.Length > 0 ? d.Author[0] : "Unknown Author",
                CoverUrl = d.CoverImage.HasValue ? $"https://covers.openlibrary.org/b/id/{d.CoverImage}-M.jpg" : "https://via.placeholder.com/150"
            }).ToList();

            return books;
        }
        [HttpGet("IsFavorite")]
        public bool IsFavorite (string id)
        {
            
            string email = User.FindFirst(ClaimTypes.Email)?.Value;

            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(email);

            var faveBookRepo = new FavoriteBooksRepository(_connectionString);
            return faveBookRepo.IsFavorite(id, user.Id);
        }
        [HttpPost("AddToFavorites")]
        public void AddToFavorites(Book b)
        {
            string email = User.FindFirst(ClaimTypes.Email)?.Value;
            var repo = new UserRepository(_connectionString);
            var user = repo.GetByEmail(email);
            b.UserID = user.Id;
            var faveBooksRepo = new FavoriteBooksRepository(_connectionString);
            faveBooksRepo.AddToFavorites(b);
        }
        [HttpPost("RemoveFromFavorites")]
        public void RemoveFromFavorites(RemoveFromFavesModel m)
        {
            string email = User.FindFirst(ClaimTypes.Email)?.Value;
            var repo = new UserRepository(_connectionString);
            var user = repo.GetByEmail(email);

            var faveBooksRepo = new FavoriteBooksRepository(_connectionString);
            faveBooksRepo.RemoveFromFavorites(m.Id, user.Id);
        }
        [HttpGet("GetFaveIds")]
        [AllowAnonymous]
        public List<string> GetFaveIDs()
        {
            var faveBooksRepo = new FavoriteBooksRepository(_connectionString);
            return faveBooksRepo.GetFaveIDs();
        }
        [HttpGet("GetFaveBooks")]
        public List<Book> GetFaveBooks()
        {
            string email = User.FindFirst(ClaimTypes.Email)?.Value;
            var repo = new UserRepository(_connectionString);
            var user = repo.GetByEmail(email);

            var faveBooksRepo = new FavoriteBooksRepository(_connectionString);
            return faveBooksRepo.GetFaveBooks(user.Id);
        }
        [HttpPost("AddNote")]
        public void AddNote(AddNoteModel m)
        {
            var faveBooksRepo = new FavoriteBooksRepository(_connectionString);
            faveBooksRepo.AddNote(m.Id, m.AddNote);
        }
    }
    public class SearchResult
    {
        public Doc[] Docs { get; set; }
    }
    public class Doc
    {
        public string Key { get; set; }
        public string Title { get; set; }
        [JsonPropertyName("author_name")]
        public string[] Author { get; set; }
        [JsonPropertyName("cover_i")]
        public int? CoverImage { get; set; }
    }
}
