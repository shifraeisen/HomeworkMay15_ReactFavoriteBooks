using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkMay15_ReactFavoriteBooks.Data
{
    public class FavoriteBooksRepository
    {
        private readonly string _connectionString;

        public FavoriteBooksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public bool IsFavorite(string id, int userId)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Any(b => b.Id == id && b.UserID == userId);
        }
        public void AddToFavorites(Book b)
        {
            using var context = new BooksDataContext(_connectionString);
            context.FavoriteBooks.Add(b);
            context.SaveChanges();
        }
        public void RemoveFromFavorites(string id, int userId)
        {
            using var context = new BooksDataContext(_connectionString);
            var book = context.FavoriteBooks.FirstOrDefault(b => b.Id == id && b.UserID == userId);
            if(book == null)
            {
                return;
            }
            context.FavoriteBooks.Remove(book);
            context.SaveChanges();
        }
        public List<string> GetFaveIDs()
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Select(b => b.Id).ToList();
        }
        public List<Book> GetFaveBooks(int userId)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Where(b => b.UserID == userId).ToList();
        }
        public void AddNote(string id, string note)
        {
            using var context = new BooksDataContext(_connectionString);
            var book = context.FavoriteBooks.First(b => b.Id == id);
            book.Note = note;
            context.SaveChanges();
        }
    }
}
