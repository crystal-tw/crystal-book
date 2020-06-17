# 資料庫

要連接一個關聯式資料庫，我們需要根據資料庫的種類，挑選特定的 shard 來使用。[crystal-lang/crystal-db](https://github.com/crystal-lang/crystal-db) 提供了統一的 API 來連接各種的資料庫驅動程式。

以下為幾個符合 crystal-db API 實作的套件：

* sqlite 套件 [crystal-lang/crystal-sqlite3](https://github.com/crystal-lang/crystal-sqlite3)
* mysql & mariadb 套件 [crystal-lang/crystal-mysql](https://github.com/crystal-lang/crystal-mysql)
* postgres 套件 [will/crystal-pg](https://github.com/will/crystal-pg)

這份文件會介紹 crystal-db 的 API，我們之所以會需要 crystal-db 是因為不同的資料庫（如：postgres、mysql 和 sqlite）之間的 SQL 語法細節不盡相同需要轉換。

並且某些的資料庫驅動提供了一些比較特別的功能，如 postgres 中的 `LISTEN` 和 `NOTIFY`。

## 安裝 shard

從上述的列表選擇合適的驅動程式，將它加入到 `shard.yml` 檔案中，就像你在新增其他的 shard 時做的一樣。

在使用這些 shard 時我們不需要明確的在 `shard.yml` 宣告使用 `crystal-lang/crystal-db`。

而在這份指南中我們會使用 `crystal-lang/crystal-mysql`。

```yaml
dependencies:
  mysql:
    github: crystal-lang/crystal-mysql
```

## 開啟資料庫

`DB.open` 指令讓我們能夠簡單地藉由資料庫 uri 來連上資料庫。Uri 的 schema 會決定預期要使用的驅動。下面是一個用 root 帳號及空白密碼連線至本機的 mysql 資料庫的範例。

```crystal
require "db"
require "mysql"

DB.open "mysql://root@localhost/test" do |db|
  # ... 使用 db 執行查詢
end
```

其他的連線 uri

* `sqlite3:///path/to/data.db`
* `mysql://user:password@server:port/database`
* `postgres://server:port/database`

或者是我們可以使用不帶程式區塊的方式呼叫 `DB.open`，只要我們記得在最後呼叫 `Database#close` 即可。

```crystal
require "db"
require "mysql"

db = DB.open "mysql://root@localhost/test"
begin
  # ... 使用 db 執行查詢
ensure
  db.close
end
```

## 執行 SQL

我們可以使用 `Database#exec` 執行 sql 語句

```crystal
db.exec "create table contacts (name varchar(30), age int)"
```

為了避免 [SQL 注入攻擊](https://owasp.org/www-community/attacks/SQL_Injection) 我們可以用參數化的方式來傳遞我們想傳遞的值。參數化的語法取決於你所使用的資料庫驅動，因為這些驅動會原封不動的將語句傳遞給資料庫。在 MySQL 中使用 `?` 當作
參數展開並且根據引數的順序賦值。PostgreSQL 使用 `$n`，其中 `n` 是根據引數數量從 1 開始的一連串數字。

```crystal
# MySQL
db.exec "insert into contacts values (?, ?)", "John", 30
# Postgres
db.exec "insert into contacts values ($1, $2)", "Sarah", 33
```

## 查詢

我們可以操作 `Database#query` 方法執行查詢並且拿回結果，而我們也能夠使用相同的參數來操作 `Database#exec` 方法。

如同 `Database#open` 方法，`Database#query` 會回傳一組需要被關閉的 `ResultSet`，同樣的若是藉由程式區塊呼叫方法，則 Crystal 會自動地幫我們關閉 `ResultSet`。

```crystal
db.query "select name, age from contacts order by age desc" do |rs|
  rs.each do
    # ... 利用 ResultSet 對每一行進行操作
  end
end
```

當從資料庫讀取資料時，Crystal 在編譯時並不曉得資料的型別資訊，所以我們會需要使用 `rs.read(T)` 來特定型別 `T` 作為我們預期從資料庫拿到的結果。

```crystal
db.query "select name, age from contacts order by age desc" do |rs|
  rs.each do
    name = rs.read(String)
    age = rs.read(Int32)
    puts "#{name} (#{age})"
    # => Sarah (33)
    # => John Doe (30)
  end
end
```

Crystal 有需多方便的查詢方法建立在 `#query` 之上。

我們可以一次讀取多行：

```crystal
name, age = rs.read(String, Int32)
```

或是一次讀取一行：

```crystal
name, age = db.query_one "select name, age from contacts order by age desc limit 1", as: {String, Int32}
```

我們也可以不需要通過 ResultSet 來獲得一個單純的值：

```crystal
max_age = db.scalar "select max(age) from contacts"
```

而在 `DB::QueryMethods` 定義了所有能用來執行資料庫語句的方法。
