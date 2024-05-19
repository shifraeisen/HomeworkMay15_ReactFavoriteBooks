using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeworkMay15_ReactFavoriteBooks.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddNotetoBookClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "FavoriteBooks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "FavoriteBooks");
        }
    }
}
