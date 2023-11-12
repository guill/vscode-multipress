# multipress README

## Features

Multipress allows you to bind multiple sequential presses of the same key to an action without affecting standard typing. This is particularly useful when using vscode-neovim in order to simulate bindings like `inoremap ;; Something`.

## Bindings

Here's an example config that I use to send `;;` through to be handled by neovim (which performs snippet expansion):

```json
[
    {
        "command": "multipress.trigger",
        "key": ";",
        "when": "(neovim.mode == 'insert' || neovim.mode == 'normal') && editorTextFocus",
        "args": {
            "timeout": 200,
            "key": ";",
            "command": "vscode-neovim.send-blocking",
            "extra": ";;"
        },
    },
]

```

