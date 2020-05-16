# Documenting code

Crystal 能夠使用部分的 [Markdown](https://daringfireball.net/projects/markdown/) 語法註解自動產生文件。

如果想要產生一個專案的文件，你可以使用 `crystal docs` 指令。在預設的情況下，會在 `docs` 目錄下產生 `index.html` 作為專案文件的進入點。請參閱 [Using the compiler – Creating documentation](../using_the_compiler/#crystal-docs)。

* 關於類別、模組和方法的說明，應該被放在它們的正上方，且說明與程式碼之間不留任何空白。

```crystal
# 獨角獸是一種**傳說生物**（請參閱 `Legendary` 模組）自古以來
# 牠的形象通常為頭上長有螺旋狀獨角的白馬。
class Unicorn
end

# 不良示範：這將不會被附加在任何的類別上。

class Legendary
end
```

* 關於方法的說明包含兩個部分，其一是方法的簡介，另一個則是方法的細節。簡介應該且只能有一行，而後者包含了這個方法剩下的所有說明。簡而言之：
  1. 將這個方法的用途或式功能放在第一行。
  2. 在那之後補充它的細節和使用方法。

舉例來說：

``````crystal
# 回傳這隻獨角獸有幾隻角。
#
# ```
# Unicorn.new.horns # => 1
# ```
def horns
  @horns
end
``````

* （在英文中）使用第三人稱視角描述: `(This mtehod) Returns the number of horns this unicorn has` 而不是 `(I, We) Return the number of horns this unicorn has`。

* 參數應該要用**斜體**表示（將其用一個星號 `*` 或是底線 `_` 包圍）：

```crystal
# 創造一支獨角獸，讓它有特定數量的*角*。
def initialize(@horns = 1)
  raise "Not a unicorn" if @horns != 1
end
```
* 包含 Crystal 程式碼的區塊應該被三個重音符（backtick）包圍，或是由四個空白字元進行縮排。

``````crystal
# ```
# unicorn = Unicorn.new
# unicorn.speak
# ```
``````

或是

```crystal
#     unicorn = Unicorn.new
#     unicorn.speak
```
* 文字區塊，如範例輸出，應該由 `text` 關鍵字作為開頭且被三個重音符（backtick）包圍。

``````crystal
# ```text
# "I'm a unicorn"
# ```
``````
* 如果想要自動連結到其他型別，將其以一個重音符（backtick）包圍。

```crystal
# the `Legendary` module
```
* 如果想要自動連結到同一份文件中的方法，使用像是 `#horns` 或是 `#index(char)`，並將其以一個重音符（backtick）包圍。

* 如果想要自動連結到不同型別的方法，使用 `OtherType#method(arg1, arg2)` 或是 `OtherType#method`，並將其以一個重音符（backtick）包圍。

範例：

```crystal
# 使用 `#horns` 來確認獨角獸有幾隻角。
# 使用 `Unicorn#speak` 來看看獨角獸會說些甚麼!
```
* 使用 `# =>` 來表示程式碼區塊中，表達式的值。

```crystal
1 + 2             # => 3
Unicorn.new.speak # => "I'm a unicorn"
```

* 使用 `:ditto:` 表達此註解同上一個宣告。

```crystal
# :ditto:
def number_of_horns
  horns
end
```

* 使用 `:nodoc:` 在最後生成的文件中不顯示此 Public 的宣告。 Private 和 Protected 方法總是不被顯示。

```crystal
class Unicorn
  # :nodoc:
  class Helper
  end
end
```

### 文件的繼承 <small>Inheriting Documentation</small>

當一個方法實例沒有附上文件註解，但在父類別中有相同簽名的方法時，它的文件會自動從父類別被繼承。

範例：

```crystal
abstract class Animal
  # 回傳 `self` 的名子。
  abstract def name : String
end

class Unicorn < Animal
  def name : String
    "unicorn"
  end
end
```

而 `Unicorn#name` 的說明文件將會是：

```
Description copied from `Animal`

回傳 `self` 的名子。
```

子方法可以使用 `:inherit:` 來直接的複製父類別的文件，而不會出現 `Description copied from ...` 的文字。也能夠用將父類別文件使用 `:inherit:` 注入子類別文件中，作為額外的說明。

範例：

```crystal
abstract class Parent
  # 通用的 *id* 說明。
  abstract def id : Int32
end

class Child < Parent
  # `Child` 類別中個別的 *id* 說明。
  #
  # :inherit:
  def id : Int32
    -1
  end
end
```

`Child#id` 的文件將會是：

```
`Child` 類別中個別的 *id* 說明。

通用的 *id* 說明。
```

> **注意：** 文件的繼承只能作用於非建構子的方法上。

### 標示（Flagging）類別、模組與方法

在註解中使用合法的關鍵字，Crystal 將會自動地生成視覺化的標示，用來標示問題（problems）、註記（notes）或者是潛在的問題（possible issues）。

Crystal 提供以下的標示（flag）關鍵字：

- BUG
- DEPRECATED
- FIXME
- NOTE
- OPTIMIZE
- TODO

Crystal 的標示（flag）關鍵字必須要是每一行的第一個字，並且必須是大寫。而結尾的逗號或分號是可選的，它們的存在通常是為了提高可讀性。

``````crystal
# 讓獨角獸能用 STDOUT 說話
#
# NOTE: 雖然一般來說獨角獸不會說話，但這一隻是特別的ㄛ
# TODO: 檢查獨角獸是不是想睡搞搞了，還是有甚麼其他狀況讓牠沒辦法說話
# TODO: 建立另一個 `speak` 方法，讓它可以回傳字串
def speak
  puts "I'm a unicorn"
end

# 讓獨角獸能用 STDOUT 說話
#
# DEPRECATED: 使用 `speak` 替代
def talk
  puts "I'm a unicorn"
end
``````

### 使用 Crystal 的 code formatter

Crystal 內建的 code formatter 不僅僅只能用來格式化我們的程式碼，它還能用來格式化文件區塊中的範例程式碼。

使用 `crystal tool format` 指令，Crystal 會幫你格式化現在目錄下所有的 `.cr` 檔案。

如果想要一次格式化一個檔案：

```
$ crystal tool format file.cr
```

一次格式化目錄下全部的 `.cr` 檔案:

```
$ crystal tool format src/
```

Crystal 本身也是用 Crystal formatter 來格式化程式碼和以及文件中的範例程式碼。

此外，Crystal formatter 非常的快，所以格式化單一個檔案與格式化整個專案時間上並沒有太大的差別。

### 一個完整的範例

``````crystal
# 獨角獸是一種**傳說生物**（請參閱 `Legendary` 模組）自古以來
# 牠的形象通常為頭上長有螺旋狀獨角的白馬。
#
# 創造一隻獨角獸：
#
# ```
# unicorn = Unicorn.new
# unicorn.speak
# ```
#
# 上面的操作將會產生：
#
# ```text
# "I'm a unicorn"
# ```
#
# 使用 `#horns` 來確認獨角獸有幾隻角。
class Unicorn
  include Legendary

  # 創造一支獨角獸，讓它有特定數量的*角*
  def initialize(@horns = 1)
    raise "Not a unicorn" if @horns != 1
  end

  # 回傳這隻獨角獸有幾隻角
  #
  # ```
  # Unicorn.new.horns # => 1
  # ```
  def horns
    @horns
  end

  # :ditto:
  def number_of_horns
    horns
  end

  # 讓獨角獸能用 STDOUT 說話
  def speak
    puts "I'm a unicorn"
  end

  # :nodoc:
  class Helper
  end
end
``````
