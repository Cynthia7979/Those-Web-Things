# Tiny SCP CRPG Game
For (intended) story see `game_idea.md`.

## Structure
The code is pretty self-explanatory (I think).

Components at the top are basic HTML elements used for display.

`Game` is the most important component. It handles the whole game process. Below is a description of its `state` attribute:
1. Progress
    * Handles the game progress: The current plot location and any keys that are pressed.
    * `name` is the current plot location. It helps `play()` to recognize which record to push.
    * `xxxPressed` are pseudo KeyDown events. Progresses in `play()` "listens" for them to perform interactions with the user.
    * There might be other pseudo events in the future.
2. STR, INT, HP, and SAN
    * They are like the stats in any other RPG game.
3. record/newRecord
    * `record`: Lines displayed in the `ScrollBox`
    * `newRecord`: The last line added to the `ScrollBox`, which will be `highlighted`
4. Other things
    * Some attributes will be defined as the game proceeds. E.g. `playerName`. However, they must be set as `undefined` in `Game`'s `constructor()` to improve clarity