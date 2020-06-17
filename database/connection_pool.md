# 連線池

當我們建立資料庫連線時，通常這代表著一條 TCP 連線或是 Socket 連線的建立。Socket 會一次處理一個資料庫語法。如果我們的程式需要同時執行很多的查詢，或者它需要處理並行化的資料庫請求，在這種情況下，我們會需要使用一條以上的資料庫連線。

資料庫從應用程式中分離後，我們面臨許多的問題，例如：連線可能斷開、應用程式重啟，以及許多我們不希望是我們的程式要處理的問題。

通常來說，連線池能夠乾淨俐落的幫我們解決上述的問題。

當我們使用 `crystal-db` 開啟資料庫時，其實已經有一個可用的連線池了。`DB.open` 回傳一個 `DB::Database` 物件，`DB::Database` 會管理整個連線池而非僅僅一條連線。

```crystal
DB.open("mysql://root@localhost/test") do |db|
  # db 為 DB::Database 物件
end
```

當我們執行一些資料庫語法如 `db.query`、 `db.exec`、`db.scalar` 的時候，會執行下面的步驟：

1. 從連線池中找到一條可用的連線
   1. 當有需要的時候，建立一條連線
   2. 如果連線池不允許建立新的連線，會等待一段時間直到有連線是可用的
      1. 若等待的時間太長，則會自動退出
2. 切換到該條可用的連線上
3. 執行 SQL 語法
4. 如果沒有返回任何的 `DB::ResultSet` 將連線還回連線池。否則，在 ResultSet 結束前連線不會返回連線池。
5. 回傳資料庫語法結果

如果無法建立連線，或是在過程中連線段開了，`crystal-db` 會重複上述的過程。

> 只有當我們使用 `DB::Database` 來執行資料庫語句的時候才會重新執行。如果我們是藉由 `DB::Connection` 或是 `DB::Transaction` 來執行資料庫語句則不會重新執行，因為程式碼會預期 connection 物件應該會被使用。

## 設定

我們可以藉由連線 URI 中的參數來設定連線池的行為。

| 名稱 | 預設值 |
| :--- | :--- |
| initial\_pool\_size | 1 |
| max\_pool\_size | 0 \(unlimited\) |
| max\_idle\_pool\_size | 1 |
| checkout\_timeout | 5.0 \(seconds\) |
| retry\_attempts | 1 |
| retry\_delay | 1.0 \(seconds\) |

當 `DB::Database` 被建立時，會以 `initial_pool_size` 決定初始的連線數建立連線。而連線池連線數的上限不會超過 `max_pool_size` 的值。當連線池中的閒置連線達到 `max_idle_pool_size` 設置的數量時，返回至連線池的連線會被關閉。

當連線數已經達到最大，而有需要新的連線的時候，會以 `checkout_timeout` 設置的秒數作為等待可用連線的時間。

當連線斷開，或是無法建立時，會以 `retry_attempts` 做為最多重新嘗試的次數，而我們可以使用 `retry_delay` 來設置每次重新嘗試連線的間隔時間。

## 範例

下面的範例程式會印出從 MySQL 拿到的時間，如果連線斷開或是 MySQL 伺服器暫時不能使用，程式仍會繼續執行，不發生例外。

```crystal
# file: sample.cr
require "mysql"

DB.open "mysql://root@localhost?retry_attempts=8&retry_delay=3" do |db|
  loop do
    pp db.scalar("SELECT NOW()")
    sleep 0.5
  end
end
```

```
$ crystal sample.cr
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:57
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:57
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:58
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:58
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:59
db.scalar("SELECT NOW()") # => 2016-12-16 16:36:59
# 停止 MySQL 伺服器幾秒鐘
db.scalar("SELECT NOW()") # => 2016-12-16 16:37:06
db.scalar("SELECT NOW()") # => 2016-12-16 16:37:06
db.scalar("SELECT NOW()") # => 2016-12-16 16:37:07
```
