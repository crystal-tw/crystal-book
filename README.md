# Crystal 程式語言

這裡是 Crystal 語言的教學文件，由 [Crystal-TW](http://crystal-tw.github.io) 翻譯，原文連接[在此](http://crystal-lang.org/docs)。

Crystal 是一個程式語言語言，並嘗試完成以下目標：

* Ruby 風格語法（但不會完全相容 Ruby）
* 自動型別推導以及靜態型別檢查
* 容易撰寫 C 函式庫綁紮<small>(Binding)</small>
* 編譯時期展開巨集並產生最佳化程式碼
* 產生高效原生碼

**Crystal's standard library is documented in the [API docs](https://crystal-lang.org/api).**

## 協助翻譯

若內容中有任何錯誤或對於某些章節需要更多說明，
歡迎您一起來貢獻這份中文文件，只需要提交 Pull Request 至以下專案：

https://github.com/crystal-tw/docs

另外，目前所有的討論都會在 [GitHub Issue Tracker](https://github.com/crystal-tw/docs/issues) 以及 [Gitter](https://gitter.im/crystal-tw/crystal-tw.github.io) 上進行。

雖然目前沒有強制規範的規則，但為了確保閱讀順暢，翻譯前請先閱讀已經翻譯好的部分以熟悉慣例，部分規則可以參考[中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)。

### 如何建置

本文件使用 Markdown 語法編寫，並使用 [GitBook Toolchain](http://toolchain.gitbook.com) 輸出 HTML（請先安裝 [Node.js](https://nodejs.org) 及 [npm](https://www.npmjs.com)）。

Markdown 語法及規則可以參考 [Markdown 文件](http://markdown.tw)。

```
$ git clone https://github.com/crystal-tw/docs.git
$ cd docs
$ npm install -g gitbook-cli@2.3.0
$ npm install
$ gitbook install
$ gitbook serve
Live reload server started on port: 35729
Press CTRL+C to quit ...

info: 8 plugins are installed
info: loading plugin "ga"... OK
...
Starting server ...
Serving book on http://localhost:4000

```

產生的 HTML 將放置於 `_book` 目錄下。

我們也提供 Docker 環境來避免在本機安裝相依套件：

```
$ docker-compose up
...
gitbook_1  | Starting server ...
gitbook_1  | Serving book on http://localhost:4000
gitbook_1  | Restart after change in file node_modules/.bin
...
```

### 已知慣例

雖然慣例僅僅只是慣例，但這邊還是整理出一些大家比較容易掌握的要點：

* 文字中若需補充原文可以使用 `<small>` 標籤，如：

```
# 字串 <small>String</small>
```

* 儘量避免使用第二人稱，將 `You` 改以第一人稱複數表達，如：

```
In type restrictions, generic type arguments and other places where a type is expected, **you** can use a shorter syntax, as explained in the type:
```

會翻譯成：

```
當使用在型別限制時，於任何泛型型別參數或是其他需要填寫型別的地方，「我們」也可以使用簡短的語法來表示序組的型別，這在型別語法一章中會解釋：
```

* 使用相對路徑以及 .md 後綴來建立不同章節之間的連接。


十分感謝您的參與 <(\_ \_)>

### 翻譯清單

|  `○`  |   `△`   |  `☓`  |
|:-----:|:-------:|:-----:|
| 已完成 | 部分翻譯 | 未翻譯 |

| 檔案 | 狀態 | Owner |
|-----|:----:|-----|
| `introduction.md` | `○` | @david50407 |
| `getting_started/README.md` | `○` | @david50407 |
| `getting_started/http_server.md` | `○` | @david50407 |
| `getting_started/cli.md` | `○` | @david50407 |
| `the_shards_command/README.md` | `☓` |  |
| `using_the_compiler/README.md` | `△` | @david50407 |
| `syntax_and_semantics/README.md` | `△` | @david50407 |
| `syntax_and_semantics/comments.md` | `○` | @david50407 |
| `syntax_and_semantics/literals.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/nil.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/bool.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/integers.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/floats.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/char.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/string.md` | `△` | @david50407 |
| `syntax_and_semantics/literals/symbol.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/array.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/hash.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/range.md` | `△` | @david50407 |
| `syntax_and_semantics/literals/regex.md` | `△` | @david50407 |
| `syntax_and_semantics/literals/tuple.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/named_tuple.md` | `○` | @david50407 |
| `syntax_and_semantics/literals/proc.md` | `○` | @david50407 |
| `syntax_and_semantics/assignment.md` | `△` | @david50407 |
| `syntax_and_semantics/local_variables.md` | `○` | @david50407 |
| `syntax_and_semantics/control_expressions.md` | `☓` |  |
| `syntax_and_semantics/truthy_and_falsey_values.md` | `☓` |  |
| `syntax_and_semantics/if.md` | `☓` |  |
| `syntax_and_semantics/as_a_suffix.md` | `☓` |  |
| `syntax_and_semantics/as_an_expression.md` | `☓` |  |
| `syntax_and_semantics/ternary_if.md` | `☓` |  |
| `syntax_and_semantics/if_var.md` | `☓` |  |
| `syntax_and_semantics/if_varis_a.md` | `☓` |  |
| `syntax_and_semantics/if_varresponds_to.md` | `☓` |  |
| `syntax_and_semantics/if_var_nil.md` | `☓` |  |
| `syntax_and_semantics/not.md` | `☓` |  |
| `syntax_and_semantics/unless.md` | `☓` |  |
| `syntax_and_semantics/case.md` | `☓` |  |
| `syntax_and_semantics/while.md` | `☓` |  |
| `syntax_and_semantics/break.md` | `☓` |  |
| `syntax_and_semantics/next.md` | `☓` |  |
| `syntax_and_semantics/until.md` | `☓` |  |
| `syntax_and_semantics/and.md` | `☓` |  |
| `syntax_and_semantics/or.md` | `☓` |  |
| `syntax_and_semantics/requiring_files.md` | `☓` |  |
| `syntax_and_semantics/types_and_methods.md` | `☓` |  |
| `syntax_and_semantics/everything_is_an_object.md` | `☓` |  |
| `syntax_and_semantics/the_program.md` | `☓` |  |
| `syntax_and_semantics/classes_and_methods.md` | `☓` |  |
| `syntax_and_semantics/new_initialize_and_allocate.md` | `☓` |  |
| `syntax_and_semantics/methods_and_instance_variables.md` | `☓` |  |
| `syntax_and_semantics/type_inference.md` | `☓` |  |
| `syntax_and_semantics/union_types.md` | `☓` |  |
| `syntax_and_semantics/overloading.md` | `☓` |  |
| `syntax_and_semantics/default_and_named_arguments.md` | `☓` |  |
| `syntax_and_semantics/splats_and_tuples.md` | `☓` |  |
| `syntax_and_semantics/type_restrictions.md` | `☓` |  |
| `syntax_and_semantics/return_types.md` | `☓` |  |
| `syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.md` | `☓` |  |
| `syntax_and_semantics/operators.md` | `☓` |  |
| `syntax_and_semantics/visibility.md` | `☓` |  |
| `syntax_and_semantics/inheritance.md` | `☓` |  |
| `syntax_and_semantics/virtual_and_abstract_types.md` | `☓` |  |
| `syntax_and_semantics/class_methods.md` | `☓` |  |
| `syntax_and_semantics/class_variables.md` | `☓` |  |
| `syntax_and_semantics/finalize.md` | `☓` |  |
| `syntax_and_semantics/modules.md` | `☓` |  |
| `syntax_and_semantics/generics.md` | `☓` |  |
| `syntax_and_semantics/structs.md` | `☓` |  |
| `syntax_and_semantics/constants.md` | `☓` |  |
| `syntax_and_semantics/enum.md` | `☓` |  |
| `syntax_and_semantics/blocks_and_procs.md` | `☓` |  |
| `syntax_and_semantics/capturing_blocks.md` | `☓` |  |
| `syntax_and_semantics/proc_literal.md` | `☓` |  |
| `syntax_and_semantics/block_forwarding.md` | `☓` |  |
| `syntax_and_semantics/closures.md` | `☓` |  |
| `syntax_and_semantics/alias.md` | `☓` |  |
| `syntax_and_semantics/exception_handling.md` | `☓` |  |
| `syntax_and_semantics/type_grammar.md` | `☓` |  |
| `syntax_and_semantics/type_reflection.md` | `☓` |  |
| `syntax_and_semantics/is_a.md` | `☓` |  |
| `syntax_and_semantics/nil_question.md` | `☓` |  |
| `syntax_and_semantics/responds_to.md` | `☓` |  |
| `syntax_and_semantics/as.md` | `☓` |  |
| `syntax_and_semantics/as_question.md` | `☓` |  |
| `syntax_and_semantics/typeof.md` | `☓` |  |
| `syntax_and_semantics/macros.md` | `☓` |  |
| `syntax_and_semantics/macros/macro_methods.md` | `☓` |  |
| `syntax_and_semantics/macros/hooks.md` | `☓` |  |
| `syntax_and_semantics/macros/fresh_variables.md` | `☓` |  |
| `syntax_and_semantics/annotations.md` | `☓` |  |
| `syntax_and_semantics/annotations/built_in_annotations.md` | `☓` |  |
| `syntax_and_semantics/low_level_primitives.md` | `☓` |  |
| `syntax_and_semantics/pointerof.md` | `☓` |  |
| `syntax_and_semantics/sizeof.md` | `☓` |  |
| `syntax_and_semantics/instance_sizeof.md` | `☓` |  |
| `syntax_and_semantics/offsetof.md` | `☓` |  |
| `syntax_and_semantics/declare_var.md` | `☓` |  |
| `syntax_and_semantics/compile_time_flags.md` | `☓` |  |
| `syntax_and_semantics/cross-compilation.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/README.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/lib.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/fun.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/out.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/to_unsafe.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/struct.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/union.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/enum.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/variables.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/constants.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/type.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/alias.md` | `☓` |  |
| `syntax_and_semantics/c_bindings/callbacks.md` | `☓` |  |
| `syntax_and_semantics/unsafe.md` | `☓` |  |
| `conventions/README.md` | `○` | @imo-ininder |
| `conventions/coding_style.md` | `○` | @imo-ininder |
| `conventions/documenting_code.md` | `○` | @imo-ininder |
| `database/README.md` | `☓` |  |
| `database/connection.md` | `☓` |  |
| `database/connection_pool.md` | `☓` |  |
| `database/transactions.md` | `☓` |  |
| `guides/README.md` | `☓` |  |
| `guides/performance.md` | `☓` |  |
| `guides/concurrency.md` | `☓` |  |
| `guides/testing.md` | `☓` |  |
| `guides/writing_shards.md` | `☓` |  |
| `guides/hosting/github.md` | `☓` |  |
| `guides/hosting/gitlab.md` | `☓` |  |
| `guides/continuous_integration.md` | `☓` |  |
| `guides/ci/travis.md` | `☓` |  |
| `guides/ci/circleci.md` | `☓` |  |