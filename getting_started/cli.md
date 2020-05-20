# 命令列應用程式 <small>Command Line Interface (CLI) Application</small>

開發者們時常會開發一些有趣的命令列應用程式，所以我們也來使用 Crystal 打造我們的第一個命令列應用程式看看吧 ：）

我們把建構一個命令列應用程式分成兩個主要的部分：

* [輸入](#輸入)
* [輸出](#輸出)

## 輸入

這個部分會包含下列兩個項目：

* [傳遞至應用程式的參數](#參數)
* [請求使用者輸入](#請求使用者輸入)

### 參數

如何讓我們的應用程式判斷傳遞進來的參數是一個很常見的問題。 打個比方，我們可以執行 `crystal -v` 並得到下面的結果：

```shell-session
$ crystal -v
Crystal 0.31.1 (2019-10-02)

LLVM: 8.0.1
Default target: x86_64-apple-macosx
```

或是我們執行 `crystal -h`，這時 Crystal 便會顯示所有的參數列表以及如何使用他們。

那麼，現在的問題是：「我們需要自己實作一個參數剖析器嗎？」
答案是……否！Crystal 已經幫我們準備好了一個方便的剖析器 —— `OptionParser` —— 來協助我們。

讓我們來試試看如果搭配上了這個方便的剖析器會變成什麼樣子吧！

假設我們一開始只需要以下兩個參數：

* `-v` / `--version`：顯示應用程式版本
* `-h` / `--help`：顯示應用程式說明

```crystal
# 檔案：help.cr
require "option_parser"

OptionParser.parse do |parser|
  parser.banner = "歡迎使用五六不能亡應用程式！"

  parser.on "-v", "--version", "顯示版本" do
    puts "1.0 版"
    exit
  end
  parser.on "-h", "--help", "顯示說明" do
    puts parser
    exit
  end
end
```

「什麼？這樣就結束了嗎？這是什麼黑魔法……」初次體驗到 Crystal 魔力的我也不由得發出了這樣的讚嘆。
當我們的應用程式開始執行時，傳遞給 `OptionParser#parse` 的區塊就會被執行。
在這個區塊裡，我們定義了所有的參數，並且剖析器會在這個區塊執行結束後對傳遞給此應用程式的參數進行判斷，一旦它發現了哪個參數符合了我們透過 `parser#on` 所設定的條件，它將會去執行對應的區塊。

關於 `OptionParser` 的所有資訊我們都可以透過[官方 API 文件](https://crystal-lang.org/api/latest/OptionParser.html)來取得，並且可以在那邊找到對應的實作程式碼來發現其實這一切都不是什麼黑魔法，只是 Crystal 的貼心小設計而已。

現在，我們有兩種方式來[透過編譯器](../using_the_compiler/README.md)執行我們的應用程式：

1. [建置執行檔](../using_the_compiler/README.md#產生執行檔)後執行
2. 直接透過編譯器[編譯並執行](../using_the_compiler/README.md#編譯並執行)

這裡我們先採用後者的方式：

```shell-session
$ crystal ./help.cr -- -h

歡迎使用五六不能亡應用程式！
    -v, --version                    顯示版本
    -h, --help                       顯示說明
```

接下來我們就可以為這個應用程式加入一些**炫炮**的功能：

在預設情況下（即不帶任何參數時），這個應用程式會輸出所有的 5566 成員姓名。但如果我們加上了 `-f/--first-name` 參數，那麼就會只顯示他們姓名中的名子的部分：

```crystal
# 檔案：double_five_double_six.cr
require "option_parser"

double_five_double_six = [
  "孫協志",
  "王仁甫",
  "許孟哲",
  "王少偉",
  "彭康育"
]
first = false

option_parser = OptionParser.parse do |parser|
  parser.banner = "歡迎使用五六不能亡應用程式！"

  parser.on "-v", "--version", "顯示版本" do
    puts "2.0 版"
    exit
  end
  parser.on "-h", "--help", "顯示說明" do
    puts parser
    exit
  end
  parser.on "-f", "--first-name", "只要名子" do
    first = true
  end
end

members = double_five_double_six
members = double_five_double_six.map &.[1..] if first

puts ""
puts "成員名單："
puts "=============="
members.each do |member|
  puts member
end
```

在執行應用程式時同時帶上 `-f` 參數就會出現如下結果：

```shell-session
$ crystal run ./double_five_double_six.cr -- -f

成員名單：
==============
協志
仁甫
孟哲
少偉
康育
```

#### 帶值參數

讓我們再打造另外一個功能：當帶上 `-g`/`--goodbye-hello` 參數時，5566 成員會跟你**傳入的名字**打招呼。

```crystal
# 檔案：hello_goodbye.cr
require "option_parser"

double_five_double_six = [
  "孫協志",
  "王仁甫",
  "許孟哲",
  "王少偉",
  "彭康育"
]
say_hi_to = ""

option_parser = OptionParser.parse do |parser|
  parser.banner = "歡迎使用五六不能亡應用程式！"

  parser.on "-v", "--version", "顯示版本" do
    puts "3.0 版"
    exit
  end
  parser.on "-h", "--help", "顯示說明" do
    puts parser
    exit
  end
  parser.on "-g NAME", "--goodbye-hello=NAME", "想跟誰打招呼" do |name|
    say_hi_to = name
  end
end

unless say_hi_to.empty?
  puts ""
  puts "別急著說再見，#{double_five_double_six.sample}還沒跟#{say_hi_to}打招呼呢！"
end
```

在這個範例中，區塊會得到一個參數來表達從命令列中傳入的參數值。

試試看吧！

```shell-session
$ crystal ./hello_goodbye.cr -- -g "王小明"

別急著說再見，許孟哲還沒跟王小明打招呼呢！
```

很好，這個應用程式看起來惟妙惟肖！但……**如果我們傳入的是沒有說清楚該怎麼做的參數**呢……？例如 `-n`：

```shell-session
$ crystal ./hello_goodbye.cr -- -n
Unhandled exception: Invalid option: -n (OptionParser::InvalidOption)
  from ...
```

哦不！他好像爛掉惹 G_G
我們必須針對**錯誤的參數**以及**錯誤的值**做一些額外的處理。而針對這兩個情況，`OptionParser` 也幫我們想好了，只要透過下面兩個方法就可以輕鬆的捕捉到這些錯誤的發生：`#invalid_option` 及 `#missing_option`。

那麼我們就來把錯誤處理的部分也加進我們的應用程式中並做出一個最終完整版吧！

#### 大合體： 我的最強應用程式出生啦！

下面是最終的結果，集錯誤處理跟更炫炮的選項於一身的嘔心瀝血之作：

```crystal
# 檔案：all_my_cli.cr
require "option_parser"

double_five_double_six = [
  "孫協志",
  "王仁甫",
  "許孟哲",
  "王少偉",
  "彭康育"
]
first = false
say_hi_to = ""
strawberry = false

option_parser = OptionParser.parse do |parser|
  parser.banner = "歡迎使用五六不能亡應用程式！"

  parser.on "-v", "--version", "顯示版本" do
    puts "青春不再 4.0 終極豪華版"
    exit
  end
  parser.on "-h", "--help", "顯示說明" do
    puts parser
    exit
  end
  parser.on "-f", "--first-name", "只要名子" do
    first = true
  end
  parser.on "-g NAME", "--goodbye_hello=NAME", "想跟誰打招呼" do |name|
    say_hi_to = name
  end
  parser.on "-r", "--random_goodbye_hello", "跟隨機的 56 成員打招呼" do
    say_hi_to = double_five_double_six.sample
  end
  parser.on "-s", "--strawberry", "草莓模式！！！" do
    strawberry = true
  end
  parser.missing_option do |option_flag|
    STDERR.puts "錯誤：#{option_flag} 好像忘了他的值"
    STDERR.puts ""
    STDERR.puts parser
    exit(1)
  end
  parser.invalid_option do |option_flag|
    STDERR.puts "錯誤：#{option_flag} 不是一個合法的參數"
    STDERR.puts parser
    exit(1)
  end
end

members = double_five_double_six
members = double_five_double_six.map &.[1..] if first

puts "草莓模式！！！" if strawberry

puts ""
puts "成員名單："
puts "=============="
members.each do |member|
  puts "#{strawberry ? "🍓" : "-"} #{member}"
end

unless say_hi_to.empty?
  puts ""
  puts "別急著說再見，人家還沒跟#{say_hi_to}打招呼呢！"
end
```

### 請求使用者輸入

有時候我們也需要跟使用者來點互動，這時候我們就會需要要求使用者輸入一些資訊。
那麼，我們要怎麼去讀取這些內容呢？
非常簡單，我們假設這裡有一個新的應用程式讓 5566 會唱出我們指定的歌詞，我們只要在執行這個程式的時候按照下面的方式讓使用者輸入就可以了：

```crystal
# 檔案：let_it_cli.cr
puts "歡迎來到 5566 KTV"
puts "請輸入想讓 56 唱出來的歌詞"
print "> "
user_input = gets
puts "5566 正在唱： 🎵#{user_input}🎶🎸🥁"
```

使用 [`gets`](https://crystal-lang.org/api/latest/toplevel.html#gets%28*args,**options%29-class-method) 方法會暫時停止應用程式的執行直到使用者結束了他的輸入（也就是按下 `Enter` 按鍵）。
當使用者按下了 `Enter`，程式就會繼續執行並把剛剛使用者輸入的值放入 `user_input` 中。

但如果使用者沒有輸入任何的值呢？
這時候我們就必須分成兩種情況來討論：

* 當使用者只輸入了 `Enter` 的時候，我們會得到一個空的字串；
* 當使用者取消了輸入（例如按下了 `Ctrl+D`）時，我們會得到一個 `Nil` 值

為了比較好地理解到底會發生什麼事情，我們這邊來做一個示範，假設我們想讓歌手唱出來的歌聲都得更變大聲點：

```crystal
# 檔案：let_it_cli.cr
puts "歡迎來到 5566 KTV"
puts "請輸入想讓 56 唱出來的歌詞"
print "> "
user_input = gets
puts "5566 正在唱： 🎵#{user_input.upcase}🎶🎸🥁"
```

當我們嘗試執行的時候就會得到 Crystal 這樣跟我們抱怨：

```shell-session
$ crystal ./let_it_cli.cr
Showing last frame. Use --error-trace for full trace.

In let_it_cli.cr:5:24

 5 | puts "5566 正在唱： 🎵#{user_input.upper_case}
                            ^---------
Error: undefined method 'upper_case' for Nil (compile-time type is (String | Nil))
```

啊哈，其實這裡的使用者輸入是一個 `String | Nil` 的[聯合型別](../syntax_and_semantics/type_grammar.md)，所以我們必須分別針對 `Nil` 跟空字串來個別做處理：

```crystal
# 檔案：let_it_cli.cr
puts "歡迎來到 5566 KTV"
puts "請輸入想讓 56 唱出來的歌詞"
print "> "
user_input = gets

exit if user_input.nil? # Ctrl+D

default_lyrics = "Hu~ Hu~ Ah I~" \
                 " / " \
                 "Hu~ Hu~ Ah I~"

lyrics = user_input.presence || default_lyrics

puts "5566 正在唱： 🎵#{lyrics.upcase}🎶🎸🥁"
```

## 輸出

現在我們來專注到另一個主題上：應用程式的輸出。
儘管我們的程式已經會顯示一些訊息了，但我們可以做的更好，讓我們來讓這個程式活起來（例如加一點顏色！）。

為了讓輸出添加一些色彩，我們會使用 [`Colorize`](https://crystal-lang.org/api/latest/Colorize.html) 模組來幫我們的忙。

下面是一個稍微簡單一點的程式，並且已經帶有一些色彩了！我們把字體變成黃色，而讓背景呈現黑色：

```crystal
# 檔案：yellow_cli.cr
require "colorize"

puts "歡迎來到 #{"5566".colorize(:yellow).on(:black)} KTV"
```

很簡單吧！如果我們想要把這個效果放在剖析器的說明裡面的話，我們只要直接放進 `parser.banner` 裡面就可以了：

```crystal
  parser.banner = "歡迎來到 #{"5566".colorize(:yellow).on(:black)} KTV"
```

我們剛剛的 KTV 程式顯然需要一些這樣的裝飾，我們來讓文字會閃爍好了：

```crystal
# 檔案：let_it_cli.cr
require "colorize"

puts "歡迎來到 5566 KTV"
puts "請輸入想讓 56 唱出來的歌詞"
print "> "
user_input = gets

exit if user_input.nil? # Ctrl+D

default_lyrics = "Hu~ Hu~ Ah I~" \
                 " / " \
                 "Hu~ Hu~ Ah I~"

lyrics = user_input.presence || default_lyrics

puts "5566 正在唱： #{"🎵#{user_input}🎶🎸🥁".colorize.mode(:blink)}"
```

如此這般，我們就可以來執行看看新的程式是不是會讓歌詞產生什麼美妙的變化～
至此，我們已經打造了兩個酷炫的命令列應用程式了！

如果想知道更多可以使用的**顏色**以及更多的**文字裝飾**的話，可以參閱 [`Colorize` 的 API 文件](https://crystal-lang.org/api/latest/Colorize.html)。

## 測試

就像其他的應用程式一樣，我們也會需要為了各種不同的功能[寫點測試](../guides/testing.md)。

到目前爲止，我們把所有的邏輯都跟 `OptionParser` 綁在一起，所以我們第一件要做的事情應該是重構我們的程式碼，將關鍵部分抽離出來並獨立成可以被引入的檔案們，再來我們就可以針對個別的邏輯或檔案撰寫測試了！不過這部分就留下來給各位作為練習吧，仔細想想看改如何重構以及撰寫測試呢？

## 使用 `Readline` 及 `NCurses`

如果我們想要打造更複雜的命令列應用程式的話，可以使用更多其他的函式庫來幫助我們。例如這兩個很有名的函式庫：`Readline` 以及 `NCurses`。

從 [GNU Readline 函式庫](http://www.gnu.org/software/readline/)的文件中就可以看到，`Readline` 提供一系列讓使用者編輯命令列的功能。`Readline` 有一些很厲害的功能，例如：檔案名稱自動完成、自訂自動完成方法、按鍵綁定等。
如果我們想要嘗試看看的話，可以透過 [crystal-lang/crystal-readline](https://github.com/crystal-lang/crystal-readline) 這個 Shard 包裝好的 API 來使用 `Readline`。

至於 `NCurses`（New Curses）則是提供開發者在終端機中建構圖形化的界面，就如果它的名字那樣，這是由 `Curses` 函式庫（原本被用來打造一個叫做 Rouge 的文字地下城冒險遊戲）改進而來。
這裡也有一堆[與 `NCurses` 有關的 Shards](https://crystalshards.org/?filter=ncurses) 來提供我們在 Crystal 中使用它的方法。

對了，這一章也就到此為止，希望大家玩的愉快 😎🎶
