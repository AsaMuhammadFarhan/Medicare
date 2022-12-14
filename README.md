# Clinic Medicare
Kelompok 4:
- Asa Muhammad Farhan (M0519024)
- Krisna Sanjaya (M0519055)

# Getting Started

## Tools
See instalation software below on internet
- VS Code (download software)
- Node JS (download software)
- Yarn (npm install --global yarn)
- Postgre SQL (download software)
- [Redis server](https://riptutorial.com/redis/example/29962/installing-and-running-redis-server-on-windows)(kalo di mac pake brew)

## Checking Tools
Buka terminal, trus coba masukin beberapa command dibawah
```
node -v
npm -v
yarn --version
```

## Initiation
### Vocabulary Directory
Di respository ini ada 2 folder, namanya "server" sama "web". nah kalo folder utama namanya "umum"
Misal kalau ada perintah "coba yarn install di server" artinya
```
cd server
yarn install
```
(perintah "cd server" atau "cd web" merubah posisi terminal)

### Vocabulary Engineer
BE: Entity, Resolver, Middleware, Migration, Database
FE: Layout, Integration, Route, Cache

#### Entity
Bentuknya kolom db. Nama lain dari model.
Di server, buka folder entity.

#### Resolver
Bentuknya kaya end point untuk integrasi ke FE. Nama lain dari controller.
Di server, buka folder resolver.

#### Migration
Tiap perubahan entity bikin migration. Migration itu untuk generate query database.
Caranya:
- tulis command "npx typeorm migration:create -n NewMigration"

#### Database
Database mah download aja.
jangan lupa bikin akun di database yang dapet semua permission. Diinget passwordnya

#### Layout

#### Integration 
Graphql Playground[http://localhost:4000/graphql]

#### Route

#### Cache
createUrqlClient.ts

### Initial Database
Untuk bikin database secara cepat di awalan. Disini contohnya pake postgres.
Kalo terminalnya udah disetting bisa nyambung ke DB (misal namaDatabase=MuseumTest akunDatabase=farhan):
```
createdb -U farhan MuseumTest 
```
Atau cara lainnya adalah buka file pgAdmin (posgres GUI) di komputer masing-masing lalu bikin db namanya MuseumTest.
Pembuatnya bebas asal ada akun yg punya permit buat CRUD.

### Environment .ENV
Lakukan ini di server
```
cp .env.example .env
```
lalu setting koneksi ke database sesuai dengan database yang digunakan.

### Initiation Dependencies
- buka server lalu
```
yarn install
```
- buka web lalu
```
yarn install
```

## Running Command
Pastikan sudah install dependencies.

Cara developing/testing FE:
- Buka file redis-server
- Buka terminal 1 (server).
- Masuk ke folder server dan nyalakan server dengan:
```
yarn build
```
terlebih dahulu lalu
```
yarn start
```
- Masuk ke folder web dan buka developer mode dengan:
```
yarn dev
```