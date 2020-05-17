# 讓我們開始吧！

歡迎來到 Crystal 的世界！

首先，我們必須先確定[我們已經安裝好編譯器](https://crystal-lang.org/install/)後，我們就可以開始嘗試接下來的所有範例 ：）

一旦編譯器被安裝至我們的裝置後，我們應該要有一個可以使用的指令 `crystal` 來執行我們的 Crystal 編譯器。

來試試看吧！

## Crystal 版本

我們可以先從確認 Crystal 編譯器的版本開始。 如果我們的編譯器有被正確的安裝的話，依照下面的步驟應該會顯示結果如下：

```terminal-session
$ crystal --version
Crystal 0.34.0 (2020-04-07)

LLVM: 10.0.0
Default target: x86_64-apple-macosx
```

讚ㄛ！

## Crystal 說明

再來，我們可以先列出所有編譯器可以執行的指令，直接執行 `crystal` 而不帶任何參數試試看：

```terminal-session
$ crystal
Usage: crystal [command] [switches] [program file] [--] [arguments]

Command:
    init                     generate a new project
    build                    build an executable
    docs                     generate documentation
    env                      print Crystal environment information
    eval                     eval code from args or standard input
    play                     starts Crystal playground server
    run (default)            build and run program
    spec                     build and run specs (in spec directory)
    tool                     run a tool
    help, --help, -h         show this help
    version, --version, -v   show version

Run a command followed by --help to see command specific information, ex:
    crystal <command> --help
```

更多有關編譯器的指令及使用說明，可以在 manpage 中找到（使用 `man crystal`），或是在[編譯器手冊](../using_the_compiler/README.md)一章中找到更多資訊。

## 哈囉 Crystal

以下是一個簡單的 Hello World 範例，在 Crystal 中看起來像是這樣：

```crystal
# hello_world.cr

puts "你好，世界！"
```

然後使用下面的指令執行看看：

```terminal-session
$ crystal hello_world.cr
你好，世界！
```

**提醒：** 程式的入口就是程式碼本身，我們不需要像部分其他的程式語言一樣再另外定義所謂的 main 函數。

接下來我們還有另外兩個簡單的範例可以讓我們更加熟悉 Crystal：

- [HTTP 伺服器](./http_server.md)
- [命令列應用程式](./cli.md)
