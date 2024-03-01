# Add Migrations

## To add migration for clean architecture

```js
dotnet ef migrations add <Migration Name> -p <Project_to_add> -s <Project.Api> --output-dir <path dir> 
Ex. dotnet ef migrations add FirstMigration -p Boardgame.Infrastructure -s Boardgame.Api --output-dir Persistence/Database/Migrations
```

## To update database for clean architecture

```js
dotnet ef migrations update <Migration Name> -p <Project_to_add> -s <Project.Api>

Ex. dotnet ef database update -p Boardgame.Infrastructure -s Boardgame.Api
```
