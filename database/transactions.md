# 交易

當我們在使用資料庫時，常常會需要將操作一組一組執行，藉由這樣的方式，當其中一個操作失敗時，我們還能夠將資料庫返回到原本安全的狀態。在**交易典範**當中詳細地描述了這個做法，而許多的資料庫引擎都有實作這個被稱作 ACID 的特性。（原子性 <small>Atomicity</small>、一致性 <small>Consistency</small>、隔離性 <small>Isolation</small>、持久性 <small>Durability</small>）[^ACID]

帶著這個概念，我們來看看以下的範例：

這邊我們有兩個帳戶（每一個帳戶都含有姓名和帳戶金額）

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
```

在某個時間點，發生一筆轉帳交易。例如：**John 轉了 $50 給 Sarah**

這邊我們有兩個帳戶（每一個帳戶都含有姓名和帳戶金額）

```crystal
deposit db, "Sarah", 50
withdraw db, "John", 50
```

這邊有很重要的一點就是，當只有其中的一項操作失敗時，會導致最後的狀態變得不一致。所以我們需要將這**兩個操作**（出帳和入帳）當作**一個操作**來執行。如果發生失敗，我們可以及時返回原本的狀態，就好像這個操作從來沒有被執行一樣。

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100

db.transaction do |tx|
  cnn = tx.connection

  transfer_amount = 1000
  deposit cnn, "Sarah", transfer_amount
  withdraw cnn, "John", transfer_amount
end
```

在上面的範例中，我們用 `Database#transaction` 開始一個交易（我們只需要知道 `database` 物件是從方法 `get_bank_db` 中取得，而這個方法的內容在範例中並不重要）。
在 `block` 中為交易的內容，當 `block` 被成功執行（意即沒有發生任何錯誤），那麼 Crystal 會執行一個**隱含的 commit**，並且會永久的改變資料庫內容。
如果操作發生了例外狀況，那麼 Crystal 則會執行一個**隱含的 rollback**，將資料庫帶回原本執行交易前的狀態。

## 例外處理與 Rollback

如同我們之前提到的，當例外發生時，Crystal 會執行一個**隱含的 rollback**，在 `rescue` 中，列出是發生了什麼樣的例外導致失敗，對我們來說可能會是一件有意義的事情。

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100

begin
  db.transaction do |tx|
    cnn = tx.connection

    transfer_amount = 1000
    deposit(cnn, "Sarah", transfer_amount)
    # John 的帳戶沒有足夠的餘額!
    withdraw(cnn, "John", transfer_amount)
  end
rescue ex
  puts "交易被 rollback 由於： #{ex}"
end
```

當然，我們也可以在交易中產生例外狀況：

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100

begin
  db.transaction do |tx|
    cnn = tx.connection

    transfer_amount = 50
    deposit(cnn, "Sarah", transfer_amount)
    withdraw(cnn, "John", transfer_amount)
    raise Exception.new "由於 ..."
  end
rescue ex
  puts "交易被 rollback 由於： #{ex}"
end
```

在上面的範例中，例外導致交易被 rollback 並由我們 `rescue`。

有一個 `exception` 會有不一樣的行為。當 `DB::Rollback` 在區塊中被產生，則 Crystal 會執行一個**隱含的 rollback**，但是這個例外並不會跑到區塊的外部。

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100

begin
  db.transaction do |tx|
    cnn = tx.connection

    transfer_amount = 50
    deposit(cnn, "Sarah", transfer_amount)
    withdraw(cnn, "John", transfer_amount)

    # rollback 例外
    raise DB::Rollback.new
  end
rescue ex
  # ex 不會是 DB::Rollback 類別
end
```

## 直接 commit 與 rollback

在上述所有的範例中，rollback 都是由 Crystal **隱含地**執行，但是我們也能告訴交易何時該 rollback：

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100

begin
  db.transaction do |tx|
    cnn = tx.connection

    transfer_amount = 50
    deposit(cnn, "Sarah", transfer_amount)
    withdraw(cnn, "John", transfer_amount)

    tx.rollback

    puts "Rollback 所有改動!"
  end
rescue ex
  # 注意，在這個例子中不會發生例外
end
```

而我們也可以使用 `commit` 方法：

```crystal
db = get_bank_db

db.transaction do |tx|
  cnn = tx.connection

  transfer_amount = 50
  deposit(cnn, "Sarah", transfer_amount)
  withdraw(cnn, "John", transfer_amount)

  tx.commit
end
```

**注意：** 在使用了 `commit` 或是 `rollback` 方法後，交易會變得不再可用。連線雖然不會斷開，但之後執行的 SQL 語法都不被算在已結束的交易中。

## 巢狀交易

顧名思義，所謂巢狀交易，就是在交易中又產生了另一個交易，以下是一個範例：

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
create_account db, "Jack", amount: 0

begin
  db.transaction do |outer_tx|
    outer_cnn = outer_tx.connection

    transfer_amount = 50
    deposit(outer_cnn, "Sarah", transfer_amount)
    withdraw(outer_cnn, "John", transfer_amount)

    outer_tx.transaction do |inner_tx|
      inner_cnn = inner_tx.connection

      # John => 50 （未執行的 commit）
      # Sarah => 150 （未執行的 commit）
      # Jack => 0

      another_transfer_amount = 150
      deposit(inner_cnn, "Jack", another_transfer_amount)
      withdraw(inner_cnn, "Sarah", another_transfer_amount)
    end
  end
rescue ex
  puts "交易被 rollback 由於： #{ex}"
end
```

從上面的範例中我們可以觀察到：
雖然 `outer_tx` 的操作並沒有被 commit，但是 `inner_tx` 仍是基於 `outer_tx` 操作後的值來進行操作。 
且 `outer_tx` 和 `inner_tx` 所使用的連線是**同一條連線**。這是因為 `inner_tx` 在被建立時繼承了從 `outer_tx` 中的連線。

### Rollback 巢狀交易

如同我們所見的，rollback 可以在任何時候發生（藉由例外或者直接執行 `rollback` 方法）

所以，讓我們看看這個範例，它從**外層的交易產生一個例外引發 rollback**：

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
create_account db, "Jack", amount: 0

begin
  db.transaction do |outer_tx|
    outer_cnn = outer_tx.connection

    transfer_amount = 50
    deposit(outer_cnn, "Sarah", transfer_amount)
    withdraw(outer_cnn, "John", transfer_amount)

    outer_tx.transaction do |inner_tx|
      inner_cnn = inner_tx.connection

      # John => 50 （未執行的 commit）
      # Sarah => 150 （未執行的 commit）
      # Jack => 0

      another_transfer_amount = 150
      deposit(inner_cnn, "Jack", another_transfer_amount)
      withdraw(inner_cnn, "Sarah", another_transfer_amount)
    end

    raise Exception.new("Rollback 所有的東西！")
  end
rescue ex
  puts "發生例外，由於： #{ex}"
end
```

這個 rollback 在 `outer_tx` 區塊中發生，它 rollback 了所有的改動，其中包含了 `inner_tx` 的區塊產生的改動（**直接執行 rollback** 也會是同樣的情況）。

如果 **rollback 是藉由在 inner_tx 區塊中的例外發生的**，所有的改動，包含 `outer_tx` 所產生的改動，都會被 rollback。

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
create_account db, "Jack", amount: 0

begin
  db.transaction do |outer_tx|
    outer_cnn = outer_tx.connection

    transfer_amount = 50
    deposit(outer_cnn, "Sarah", transfer_amount)
    withdraw(outer_cnn, "John", transfer_amount)

    outer_tx.transaction do |inner_tx|
      inner_cnn = inner_tx.connection

      # John => 50 （未執行的 commit）
      # Sarah => 150 （未執行的 commit）
      # Jack => 0

      another_transfer_amount = 150
      deposit(inner_cnn, "Jack", another_transfer_amount)
      withdraw(inner_cnn, "Sarah", another_transfer_amount)

      raise Exception.new("Rollback 所有的東西！")
    end
  end
rescue ex
  puts "發生例外，由於： #{ex}"
end
```

有一個方法，可以讓我們只 rollback 在 `inner_tx` 中的改動，而保有 `outer_tx` 的改動。那就是在 `inner_tx` 中使用 `rollback` 方法。這樣就**只有內部交易**的部分會被 rollback。我們來看看以下的範例：

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
create_account db, "Jack", amount: 0

begin
  db.transaction do |outer_tx|
    outer_cnn = outer_tx.connection

    transfer_amount = 50
    deposit(outer_cnn, "Sarah", transfer_amount)
    withdraw(outer_cnn, "John", transfer_amount)

    outer_tx.transaction do |inner_tx|
      inner_cnn = inner_tx.connection

      # John => 50 （未執行的 commit）
      # Sarah => 150 （未執行的 commit）
      # Jack => 0

      another_transfer_amount = 150
      deposit(inner_cnn, "Jack", another_transfer_amount)
      withdraw(inner_cnn, "Sarah", another_transfer_amount)

      inner_tx.rollback
    end
  end
rescue ex
  puts "發生例外，由於： #{ex}"
end
```

如果是 `inner_tx` 中發生了 `DB::Rollback` 例外的話，也會是同樣**只有內部交易**的部分會被 rollback。

```crystal
db = get_bank_db

create_account db, "John", amount: 100
create_account db, "Sarah", amount: 100
create_account db, "Jack", amount: 0

begin
  db.transaction do |outer_tx|
    outer_cnn = outer_tx.connection

    transfer_amount = 50
    deposit(outer_cnn, "Sarah", transfer_amount)
    withdraw(outer_cnn, "John", transfer_amount)

    outer_tx.transaction do |inner_tx|
      inner_cnn = inner_tx.connection

      # John => 50 （未執行的 commit）
      # Sarah => 150 （未執行的 commit）
      # Jack => 0

      another_transfer_amount = 150
      deposit(inner_cnn, "Jack", another_transfer_amount)
      withdraw(inner_cnn, "Sarah", another_transfer_amount)

      # Rollback 例外
      raise DB::Rollback.new
    end
  end
rescue ex
  puts "發生例外，由於： #{ex}"
end
```

[^ACID]: Theo Haerder and Andreas Reuter. 1983. Principles of transaction-oriented database recovery. ACM Comput. Surv. 15, 4 (December 1983), 287-317. DOI=http://dx.doi.org/10.1145/289.291
