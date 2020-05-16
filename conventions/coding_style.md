# Coding Style

本風格被用於標準的函式庫中。
我們可以在自己的專案中使用相同的風格，如此一來這些專案的風格就可以輕鬆融入其他開發者的風格之中。

## 命名規則

**型別名稱**使用駝峰式命名。 範例：

```crystal
class ParseError < Exception
end

module HTTP
  class RequestHandler
  end
end

alias NumericValue = Float32 | Float64 | Int32 | Int64

lib LibYAML
end

struct TagDirective
end

enum Time::DayOfWeek
end
```

**方法名稱**使用小寫底線分隔。 範例：

```crystal
class Person
  def first_name
  end

  def date_of_birth
  end

  def homepage_url
  end
end
```

**變數名稱**使用小寫底線分隔。 範例：

```crystal
class Greeting
  @@default_greeting = "Hello world"

  def initialize(@custom_greeting = nil)
  end

  def print_greeting
    greeting = @custom_greeting || @@default_greeting
    puts greeting
  end
end
```

**常數**使用全大寫底線分隔 <small>screaming-cased</small>。 範例：

```crystal
LUCKY_NUMBERS     = [3, 7, 11]
DOCUMENTATION_URL = "http://crystal-lang.org/docs"
```

### 縮寫

類別名稱中縮寫，使用**全大寫**。 如 `HTTP`、`LibXML`。

方法名稱中縮寫，使用**全小寫**。 如 `#from_json`、`#to_io`。

### 函式庫

函式庫命名皆須以 `Lib` 為前綴。 如 `LibC`、`LibEvent2`。

### 目錄及檔案名稱

在專案中：

- `/` 包含說明文件，與專案相關的所有設定檔（例如 CI 設定或者編輯器設定），以及所有是專案層級的相關文件（例如更新日誌或貢獻指南）
- `src/` 包含專案的原始碼
- `spec/` 包含可以用 `crystal spec` 執行的[專案 specs](../guides/testing.md)
- `bin/` 包含所有可執行檔案

路徑會依照該檔案的命名空間（namespace）分類，而檔名則會以**小寫底線分隔**方式表達該檔案所定義的類別（class）或子命名空間（namespace）。

例如，`HTTP::WebSocket` 應該被定義於 `src/http/web_socket.cr` 之中。

## 空白字元

使用**兩個空白字元**縮排我們的程式碼，用於命名空間、方法、程式碼區塊（blocks）或是任何巢狀的項目中（nested contexts）。 範例：

```crystal
module Scorecard
  class Parser
    def parse(score_text)
      begin
        score_text.scan(SCORE_PATTERN) do |match|
          handle_match(match)
        end
      rescue err : ParseError
        # 錯誤處理 ...
      end
    end
  end
end
```
在類別中，用**單一換行**分隔方法定義（method definition）、常數（constant）與內部類別（inner class）。 範例：

```crystal
module Money
  CURRENCIES = {
    "EUR" => 1.0,
    "ARS" => 10.55,
    "USD" => 1.12,
    "JPY" => 134.15,
  }

  class Amount
    getter :currency, :value

    def initialize(@currency, @value)
    end
  end

  class CurrencyConversion
    def initialize(@amount, @target_currency)
    end

    def amount
      # 實作轉換 ...
    end
  end
end
```
