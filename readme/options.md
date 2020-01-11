Option|Default|Description
---|---|---
trim|`true`|If `true`, extracted lines' left and right whitespace will be trimmed.
nonEmpty|`true`|If `true`, empty lines will be skipped. If option `trim` is `true`, any lines that only contain whitespace will be also skipped.
sort|`false`|If `true`, extracted lines will be sorted alphabetically.
unique|`false`|If `true`, there will not be any duplicates in extracted lines.
randomPick|`false`|If `true`, the exported value will be a function instead of a `string[]`. That function does not take any arguments an returns a random pick from the extracted lines.