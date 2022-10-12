# pokedex-back-end
Back-end proyect for [Senpai Academy bootcamp](https://senpaiacademy.com/bootcamp/full-stack-web-developer/) made with [Node.js](https://github.com/nodejs/node) and [Express](https://github.com/expressjs/express)

## Avaible Scripts

In the project directory, you can run:

### `npm install`
### `npm run dev`

Its mandatory to make a .env file with this code:

``` 
DB_HOST =  
DB_USER =
DB_NAME =
DB_PASSWORD =
DB_PORT =
TOKEN = (SECRET-PASSWORD)
```

Create a database with this tables:

``` 
CREATE TABLE  pokemones (
id BIGSERIAL primary key,
name varchar(200),
type1 varchar(100),
type2 varchar(100),
img varchar(200),
height float(4),
weight float(4),
moves text [][],
description varchar(200),
cardColor varchar(200)
);
``` 
``` 
create table stats (
id serial primary key,
hp varchar(4),
atk varchar(4),
def varchar(4),
satk varchar(4),
sdef varchar(4),
spd varchar(4),
id_pokemon int not null,
FOREIGN KEY (id_pokemon) REFERENCES pokemones(id)
);
``` 
``` 
create table users (
id serial primary key,
name varchar(200),
mail varchar (50),
PASSWORD varchar
);
``` 

## Insert the data that is in the [data.txt](https://github.com/CarlosSeguessa/pokedex-back/blob/master/data.txt) file into your database

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
