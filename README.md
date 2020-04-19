This is a rule for [Karabiner-Elements](https://karabiner-elements.pqrs.org/) that positions the current window according to a grid formed (loosely) by the keys on the left side of the keyboard (the US layout, at least):

```
[1] [2] [3] [4] [5] [6]
 [Q] [W] [E] [R] [T] [Y]
  [A] [S] [D] [F] [G] [H]
   [Z] [X] [C] [V] [B] [N]
```

Hold shift and press the two character keys that map to opposite corners of the screen area at which you want to move the current window.

E.g. to move the window to the left half of the screen, hold `Shift` and the hit `1` and `C` keys simultaneously; for full-screen, it's `Shift+1+N`; the bottom right quarter would be `Shift+F+N`.

To install:

```
node ./apply-rule.js
```
