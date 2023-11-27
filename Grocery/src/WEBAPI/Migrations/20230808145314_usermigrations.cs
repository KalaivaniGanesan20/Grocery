using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WEBAPI.Migrations
{
    /// <inheritdoc />
    public partial class usermigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Userdata",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    emailid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phonenumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cpassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    passwordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    passwordsalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    mywallet = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Userdata", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cartdata",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    quantity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageurl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productcount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Offerstatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Userid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cartdata", x => x.id);
                    table.ForeignKey(
                        name: "FK_cartdata_Userdata_Userid",
                        column: x => x.Userid,
                        principalTable: "Userdata",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Useraddress",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApartmentNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApartmentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Userid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Useraddress", x => x.id);
                    table.ForeignKey(
                        name: "FK_Useraddress_Userdata_Userid",
                        column: x => x.Userid,
                        principalTable: "Userdata",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_cartdata_Userid",
                table: "cartdata",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_Useraddress_Userid",
                table: "Useraddress",
                column: "Userid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cartdata");

            migrationBuilder.DropTable(
                name: "Useraddress");

            migrationBuilder.DropTable(
                name: "Userdata");
        }
    }
}
