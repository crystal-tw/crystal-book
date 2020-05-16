# 賦值

使用等號（`=`）來進行賦值。

```crystal
# 賦值給一個區域變數
local = 1

# 賦值給一個實例變數
@instance = 2

# 賦值給一個類別變數
@@class = 3
```

我們會在後面的章節裡解釋上述的各種變數。

這裡也有一些與等號相關的語法糖：

```crystal
local += 1  # 等同於 local = local + 1

# 這些運算子都套用上述的規則：
# +, -, *, /, %, |, &, ^, **, <<, >>

# 這裡還有兩個不太一樣的規則
local ||= 1 # 等同於 local || (local = 1)
local &&= 1 # 等同於 local && (local = 1)
```

對於結尾帶有等號的方法，這裡也有一些語法糖：

```crystal
# Set 存取子 (Setter)
person.name=("John")

# 也可以寫成這樣：
person.name = "John"

# 使用索引的 Set 存取子來賦值
objects.[]=(2, 3)

# 也可以寫成這樣：
objects[2] = 3

# 下面這個並「不是賦值」，但也有類似的語法糖：
objects.[](2, 3)

# 也可以寫成這樣：
objects[2, 3]
```

賦值的語法糖也可以用在 Set 存取子<small>(Setter)</small>與索引子（`[]`）上。另外，`||` 與 `&&` 會使用 `[]?` 方法來確認該索引鍵是否存在。

```crystal
person.age += 1        # 等同於 person.age = person.age + 1

person.name ||= "John" # 等同於 person.name || (person.name = "John")
person.name &&= "John" # 等同於 person.name && (person.name = "John")

objects[1] += 2        # 等同於 objects[1] = objects[1] + 2

objects[1] ||= 2       # 等同於 objects[1]? || (objects[1] = 2)
objects[1] &&= 2       # 等同於 objects[1]? && (objects[1] = 2)
```

# Chained assignment

You can assign the same value to multiple variables using chained assignment:

```crystal
a = b = c = 123

# Now a, b and c have the same value:
a # => 123
b # => 123
c # => 123
```

The chained assignment is not only available to [local variables](local_variables.md) but also to [instance variables](methods_and_instance_variables.md), [class variables](class_variables.md) and setter methods (methods that end with `=`).

# 多項賦值

我們可以使用逗號（`,`）來同時進行多項變數的賦值（當然，也包括宣告）：

```crystal
name, age = "Crystal", 1

# 相當於：
temp1 = "Crystal"
temp2 = 1
name  = temp1
age   = temp2
```

我們可以發現在過程中使用了一些變數來暫存這些右值（也就是即將被賦予的值），所以多項賦值也可以用來交換變數的內容：

```crystal
a = 1
b = 2
a, b = b, a
a #=> 2
b #=> 1
```

如果右側只有一個表達式的話，將會套用下面介紹的語法糖：

```crystal
name, age, source = "Crystal, 123, GitHub".split(", ")

# 等同於下面的做法：
temp = "Crystal, 123, GitHub".split(", ")
name = temp[0]
age = temp[1]
source = temp[2]
```

在對於結尾帶有等號的方法上也可以進行多項賦值：

```crystal
person.name, person.age = "John", 32

# Same as:
temp1 = "John"
temp2 = 32
person.name = temp1
person.age = temp2
```

當然，在[索引存取子上](operators.md#assignments)（`[]=`）也可以如此應用：

```crystal
objects[1], objects[2] = 3, 4

# Same as:
temp1 = 3
temp2 = 4
objects[1] = temp1
objects[2] = temp2
```
