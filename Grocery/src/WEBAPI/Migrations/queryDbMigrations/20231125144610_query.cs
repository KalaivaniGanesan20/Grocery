using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WEBAPI.Migrations.queryDbMigrations
{
    /// <inheritdoc />
    public partial class query : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "queries",
                columns: table => new
                {
                    queryid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userid = table.Column<int>(type: "int", nullable: false),
                    query = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    query_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    replied_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    reply = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_queries", x => x.queryid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "queries");
        }
    }
}
