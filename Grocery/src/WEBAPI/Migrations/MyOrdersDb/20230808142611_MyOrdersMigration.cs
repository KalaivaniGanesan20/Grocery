using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WEBAPI.Migrations.MyOrdersDb
{
    /// <inheritdoc />
    public partial class MyOrdersMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orderdata",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    paymentid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    userid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    paymentmode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cardnumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cvvnumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    upicode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalAmount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    paiddate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    deliverydate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orderdata", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Address",
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
                    MyOrdersid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.id);
                    table.ForeignKey(
                        name: "FK_Address_Orderdata_MyOrdersid",
                        column: x => x.MyOrdersid,
                        principalTable: "Orderdata",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Orderedcart",
                columns: table => new
                {
                    orderid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id = table.Column<int>(type: "int", nullable: false),
                    productid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    quantity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageurl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productcount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MyOrdersid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orderedcart", x => x.orderid);
                    table.ForeignKey(
                        name: "FK_Orderedcart_Orderdata_MyOrdersid",
                        column: x => x.MyOrdersid,
                        principalTable: "Orderdata",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_MyOrdersid",
                table: "Address",
                column: "MyOrdersid");

            migrationBuilder.CreateIndex(
                name: "IX_Orderedcart_MyOrdersid",
                table: "Orderedcart",
                column: "MyOrdersid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Orderedcart");

            migrationBuilder.DropTable(
                name: "Orderdata");
        }
    }
}
