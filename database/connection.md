# 連線

當我們在使用資料庫時，連線絕對扮演著關鍵的角色。它代表了一條從程式通往資料庫的**跑道**。

在 Crystal 中我們有兩種方式來建立連線。是的，我們將會在接下來的範例中示範；並且提供一些建議，關於我們什麼時候該使用那種連線方式。

## DB 模組

> **給我一個支點，我就能舉起地球。**
> 阿基米德

DB 模組，是我們在 Crystal 中進行資料庫工作的立足點。如同在文件中所寫的一樣，**它是一個用於連結資料庫的統一介面**。

在這個模組中提供了一個 `DB#connect` 方法。這個方法，而使用這個方法是讓我們可以建立資料庫連線的**其中一個做法**。讓我們來看看如何使用它。

## DB#connect

使用 `DB#connect` 時，我們正在打開一條資料庫的連線。參數 `uri` 會被傳遞給模組用來決定該使用那種驅動程式（如：`mysql://`、`postgres://`、`sqlite://` ...等）也就是說，我們不需要特別指明我們在使用哪種資料庫。

以範例的 `uri`（`mysql://root:root@localhost/test`） 來說，模組將會使用 `mysql driver` 來連接 MySQL 資料庫。

這邊是實際的範例：

```crystal
require "mysql"

cnn = DB.connect("mysql://root:root@localhost/test")
puts typeof(cnn) # => DB::Connection
cnn.close
```
值得一提的是這個方法會回傳 `DB::Connection` 物件。更精確點來說，它回傳的是 `MySql::Connection` 物件，不過這並不影響什麼，因為所有的連線型別都是繼承自 `DB::Connection`。因此以下我們將會使用 `DB::Connection` 實例進行操作，讓抽象型別幫助我們解決許多個別於資料庫引擎的問題。

當我們**手動**建立連線（就如同我們現在做的一樣），我們必須負責管理它的資源，而且必須要在使用結束時關閉連線。關於後者，這個小小的細節可能導致巨大的 Bug ！Crystal 作為一個**人性化**的語言，提供了更加安全的方式，也就是使用區塊來讓我們**手動**建立連線，就像這樣：

```crystal
require "mysql"

DB.connect "mysql://root:root@localhost/test" do |cnn|
  puts typeof(cnn) # => DB::Connection
end # 連線會在這邊被關閉
```

讚喔，我們現在有一個連線了，讓我們來使用它吧！

```crystal
require "mysql"

DB.connect "mysql://root:root@localhost/test" do |cnn|
  puts typeof(cnn)                         # => DB::Connection
  puts "連線結束: #{cnn.closed?}" # => false

  result = cnn.exec("drop table if exists contacts")
  puts result

  result = cnn.exec("create table contacts (name varchar(30), age int)")
  puts result

  cnn.transaction do |tx|
    cnn2 = tx.connection
    puts "耶黑，這是同一條連線！ #{cnn == cnn2}"

    cnn2.exec("insert into contacts values ('Joe', 42)")
    cnn2.exec("insert into contacts values (?, ?)", "Sarah", 43)
  end

  cnn.query_each "select * from contacts" do |rs|
    puts "名子： #{rs.read}， 年齡： #{rs.read}"
  end
end
```

首先，在這個範例中，我們使用到交易（參照[交易](https://crystal-lang.org/reference/database/transactions.html)章節來獲得更多資訊）
其次，注意到很重要的一點是，交易所使用的連線**跟原本的連線是同一條**。是的，從頭到尾，都只有**一條**連線存在在我們的程式中。
最後，我們使用 `#exec` 和 `#query` 方法。你可以在[資料庫](https://crystal-lang.org/reference/database/)章節中找到更多關於執行查詢的資訊。

現在我們已經有一個很棒的方法來建立連線，接著，讓我們來了解建立資料庫連線的**另一種方法**：`DB#open`

## DB#open

```crystal
require "mysql"

db = DB.open("mysql://root:root@localhost/test")
puts typeof(db) # DB::Database
db.close
```

一旦我們連接上了，我們就應該在不需要這個資料庫時將它關閉。或者是，我們可以使用區塊來讓 Crystal 替我們代勞！

啊，所以我說那個連線呢？
恩...，關於這件事情，我們應該找 **connections** 告訴我們。一旦資料庫被建立後，會建立一系列可用的連線並放置於連線池中。（想知道更多關於連線池的技巧嗎？<small>~~按讚、訂閱，並開啟小鈴鐺~~</small> 在[連線池](https://crystal-lang.org/reference/database/connection_pool.html)這一章中，我們可以學習到關於這個有趣的主題的所有知識！）

我們要如何從 `Database` 中使用連線呢？
要做到這件事情，我們可以用 `Database#checkout` 方法向資料庫拿到連線。不過，這樣做我們會需要使用 `Connection#release` 將拿出的連線歸還給連線池。這邊是實際的範例：

```crystal
require "mysql"

DB.open "mysql://root:root@localhost/test" do |db|
  cnn = db.checkout
  puts typeof(cnn)

  puts "連線結束: #{cnn.closed?}" # => false
  cnn.release
  puts "連線結束: #{cnn.closed?}" # => false
end
```

而我們希望有一個 __安全__ 的方式（也就是說，不需要我們自己釋放這條連線）來從 `Database` 中獲得連線，這邊我們可以使用 `Database#using_connection`：

```crystal
require "mysql"

DB.open "mysql://root:root@localhost/test" do |db|
  db.using_connection do |cnn|
    puts typeof(cnn)
    # 使用連線
  end
end
```

在下一個範例中，我們將會讓 `Database` 物件，__自己管理連線__，就像這樣：

```crystal
require "mysql"

DB.open "mysql://root:root@localhost/test" do |db|
  db.exec("drop table if exists contacts")
  db.exec("create table contacts (name varchar(30), age int)")

  db.transaction do |tx|
    cnn = tx.connection
    cnn.exec("insert into contacts values ('Joe', 42)")
    cnn.exec("insert into contacts values (?, ?)", "Sarah", 43)
  end

  db.query_each "select * from contacts" do |rs|
    puts "名子： #{rs.read}，年齡： #{rs.read}"
  end
end
```

如同我們所注意到的，`DB::Database` 是 `DB::Connection` 的多型，也就是說 `DB::Database` 也實作了 `#exec` 、 `#query` 還有 `#transaction` 方法。使用並管理這些連線，其實是屬於資料庫物件職責的一部份，真是太棒了！

## 什麼時候該用哪一種呢？
根據這上面的例子呢，我們好像能夠注意到，兩個方法的差別在於**連線的數量**。
如果我們是開發的是一個執行完就結束的程式而且只有一個使用者會存取資料庫的話，那麼我們自己來管理一條連線（換言之，一個 `DB::Connection` 物件）就已經非常夠用了（想像一個命令列應用程式，接受參數後查詢資料庫，並將結果顯示給使用者）
另一方面，如過我們建構的是一個大型的系統，可能會有許多使用者的同時在使用，且有大量的資料庫存取，那我們就應該使用 `DB::Database` 物件；`DB::Database` 建立了一系列可用的連線並放置於連線池中(不會在我們需要連線的時候有建立連線的成本)。或者想像你正在建構一個會持續運行的程式（像是一些背景作業程式）那麼連線池可以讓你免於監測這些連線的狀態：這條連線是活著的嗎？還是它需要被重新連接？