# HTTP 伺服器

這邊有一個有趣的例子是打造一個簡單的 HTTP 伺服器：

```crystal
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world! The time is #{Time.local}"
end

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

在讀完整份文件後就能理解上述的程式碼了，但在那之前我們還是能夠推測一些用法：

* 我們可以[引入 (Require)](../syntax_and_semantics/requiring_files.md)其他文件裡面的程式碼：

```crystal
require "http/server"
```

* 我們可以定義[區域變數](../syntax_and_semantics/local_variables.md)而且還不需要指定型態：

```crystal
server = HTTP::Server.new ...
```

* 我們可以透過 `HTTP::Server` 提供的 `bind_tcp` 方法來指定 HTTP 伺服器的埠號 （此處為 8080）：

```crystal
address = server.bind_tcp 8080
```

* 我們可以透過呼叫物件的[方法](../syntax_and_semantics/classes_and_methods.md)（或傳送訊息）來撰寫程式：

```crystal
HTTP::Server.new ...
...
Time.local
...
address = server.bind_tcp 8080
...
puts "Listening on http://#{address}"
...
server.listen
```

* 我們還可以使用[程式區塊 (Blocks)](../syntax_and_semantics/blocks_and_procs.md)，這是個重複利用程式碼的好方法，同時也可以用來模仿函數程式設計的特性。

```crystal
HTTP::Server.new do |context|
    ...
end
```

* 我們可以輕鬆地建立並嵌入內容到一個字串，稱作字串內插<small>(String interpolation)</small>：

```crystal
"Hello world! The time is #{Time.local}"
```

Crystal 語言中還有其他[語法](../syntax_and_semantics/literals.md)可以表達其他種類的物件，例如陣列、雜湊、範圍、序組等等。