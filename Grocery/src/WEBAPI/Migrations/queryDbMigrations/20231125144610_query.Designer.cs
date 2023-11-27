﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using query;

#nullable disable

namespace WEBAPI.Migrations.queryDbMigrations
{
    [DbContext(typeof(queryDb))]
    [Migration("20231125144610_query")]
    partial class query
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("query.querydata", b =>
                {
                    b.Property<int>("queryid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("queryid"));

                    b.Property<string>("query")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("query_date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("replied_date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("reply")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("queryid");

                    b.ToTable("queries");
                });
#pragma warning restore 612, 618
        }
    }
}
