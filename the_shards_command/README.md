# 有關 Shards

Crystal 是一個被 Shards —— 它的相依管理器 —— 圍繞的語言。

在 Crystal 的世界裡，我們稱呼每個 Crystal 專案為一個 shard。而 Shards 可以協助我們在專案裡面管理套件們之間的相依性，並在不同的環境中安裝這些套件。

## 安裝

Shards 通常會跟 Crystal 一起散佈，也可以透過直接安裝 `shards` 套件來取得。

如果要從原始碼安裝 Shards，可以從這個 [Git 倉儲（Repository）](https://github.com/crystal-lang/shards)中取得原始碼並執行 `make CRFLAGS=--release`，編譯好的執行檔會被放置於 `bin/shards`，使用前記得加到 `PATH` 中。

## 用法

Shards 需要在一個 shard 專案下使用，每個 shard 專案目錄（工作目錄）下都會有一個 `shard.yml` 檔案，而這個檔案會用來描述整個專案的資訊以及列出其相依清單。
我們可以透過 [`shards init`](#shards-install) 指令來產生預設的 `shard.yml` 檔案。
有關 `shard.yml` 內容的解釋可以查看[〈撰寫 Shards 指南〉](../guides/writing_shards.md)一章，而詳細的定義可以查看 [shard.yml specification](https://github.com/crystal-lang/shards/blob/master/SPEC.md) 一頁。

執行 [`shards install`](#shards-install) 可以解析所有的相依套件並且安裝他們。
所有已安裝的版本資訊都會被寫到 `shard.lock` 檔案中，供下次執行 `shards install` 時直接使用相同的版本。

如果你的 shard 是一個應用程式專案，那麼 `shard.yml` 及 `shard.lock` 檔案都應該被納入版本控制之中以復現這些相依套件的安裝版本。
如果你的 shard 是一個函式庫專案，那麼 `shard.lock` 則不該被放入版本控制中，你可以透過 `.gitignore` 來自動忽略他們。而通常 [`crystal init`](../using_the_compiler/README.md#crystal-init) 指令會在建立函式庫專案時順便幫我們做好這件事。

## Shards 指令

```bash
shards [<options>...] [<command>]
```

如果沒有給定 `<command>`，則預設會使用 `install`：

- [`shards build`](#shards-build)：建置執行檔
- [`shards check`](#shards-check)：驗證所有相依套件皆已安裝
- [`shards init`](#shards-init)：產生一個全新的 `shard.yml` 檔案
- [`shards install`](#shards-install)：解析相依並安裝套件
- [`shards list`](#shards-list)：列出所有已安裝的相依套件
- [`shards prune`](#shards-prune)：移除未被使用的套件
- [`shards update`](#shards-update)：重新解析相依並更新套件
- [`shards version`](#shards-version)：顯示 Shard 的版本資訊

如果想知道每個指令的詳細說明，可以在後面加上 `--help`。

**通用選項：**

- `--version`：顯示 `shards` 指令的版本資訊
- `-h, --help`：印出使用說明
- `--no-color`：關閉彩色輸出
- `--production`：發行模式，開發用相依套件不會在此模式下被安裝，而且只有被鎖定的相依套件會被安裝。也就是說如果 `shard.yml` 與 `shard.lock` 之間沒有同步的話指令會失敗（適用於 `install`、`update`、`check` 及 `list`）
- `-q, --quiet`：減少日誌輸出，僅輸出警告及錯誤
- `-v, --verbose`：增加日誌輸出，會輸出所有偵錯用資訊

### `shards build`

```bash
shards build [<targets>] [<options>...]
```

建置指定的目標並放置於 `bin` 目錄中，如果沒有指定目標，則會建置所有目標。
這個指令會先確保所有的相依套件已安裝，所以在執行這個指令前其實不需要特別執行 `shards install`。

所有送給這個指令的參數都會被傳遞到底層呼叫的 `crystal build`。

### `shards check`

```bash
shards check
```

驗證所有相依套件是否皆已安裝並滿足需求。

狀態碼（Status Code）：

- `0`： 所有已安裝的套件皆已滿足相依
- `1`： 有些相依套件未被安裝

### `shards init`

```bash
shards init
```

初始化一個 shard 專案並產生全新的 `shard.yml` 檔案。

### `shards install`

```bash
shards install
```

解析並安裝相依套件到 `lib` 目錄。如果 `shard.lock` 不存在，`shards` 會將解析完的版本（或 Git 提交）鎖定並描述在 `shard.lock` 中。

反之，如果 `shard.lock` 存在，則 `shards install` 會使用已鎖定的版本。若已鎖定的版本與相依需求不符或衝突，則指令可能會失敗。如果有新的依賴套件被加入，在不衝突的情況下會自動更新 `shard.lock`。

### `shards list`

```bash
shards list
```

列出所有已被安裝的相依套件及其版本。

### `shards prune`

```bash
shards prune
```

從 `lib` 目錄中移除已經不在相依列表中的套件。

### `shards update`

```bash
shards update
```

重新解析並安裝相依套件到 `lib` 目錄，並更新 `shard.lock` 檔案。

### `shards version`

```bash
shards version [<path>]
```

印出 `shards` 的版本。
