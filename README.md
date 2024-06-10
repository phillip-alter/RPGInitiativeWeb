## Disclaimer

I am not the original author of this web application. The original software can be found here:

https://github.com/mlbryant25701/D-DScreen

However, I have decided to create it under a new GitHub repo because I have modified most of the javascript code to fix errors, make it more efficient, and make it more readable. 

mlbryant25701 is the original mastermind behind this; if you want to thank anyone, thank him.

## RPG Initiative Tracker
##### (with weather, time, and date tracking also)
### 'Installation'
1. Extract contents to a folder.
2. Open GameScreen.HTML.

### Usage

#### Adding Players

1. Type in a player's character name (or their actual name)
3. Click the "Add Players" button

#### For Monsters
1. (Optional) Type in a monster's name.
2. Click "Add Monster" button.
3. Multiple monsters can be added by continuing to click the "Add Monster" button. The site will append their names with numbers.

#### For NPCs
* As monsters, but click the "Add NPC" button instead.

#### Removing from Initiative
* Click the minus ('-') button next to a character's initiative value to remove them from the list.

#### Tracking Character Turns
* Click the "Next" or "Previous" button to move forward or backwards in initiative. Current turn is highlighted.
* When the bottom is reached, the top character will be highlighted and the round tracker will increase by one.

#### Resetting Everything
* Clicking "Clear List" will clear the list of all creatures and reset the Round counter to 1. 

#### Reordering
*  Click and drag to reorder characters based on their rolled inititative.

#### Death/Status Effects
* To kill a character, click the skull & crossbones next to their name.
* Status effects can be selected under the dropdown menu.

### Time
* Time can be added to, subtracted from, etc using the up and down arrows next to their specific area.
  * Long Rest: Adds 8 hours to the clock.
  * Start New Day: Sets the clock to midnight of a new day.
  * Add 10 Minutes: Usually used in dungeons to track how long the players have been muckin' about.

### Weather
* Weather will update randomly every:
  * Hour
  * Day
  * Week
  * Month
* Refreshing the page also generates a random weather.


## Theoretical roadmap, in no particular order:

* Add ability to change calendars to other popular settings, or add ability to make custom calendar
* Reorganize and change the HTML so I can feel less bad about having to use someone else's code
* Ability to change character portraits and have them save
* Save names
* Rudimentary character sheets (for DM tracking purposes)
* Dice rolling feature
* Add ability to change background
* Possibly add a music player? Or soundboard player?
* Add/remove dates/time from date/clock
* Automatic reordering based on their initiative #'s
* Ability to add multiple status effects
* +/- from round tracker
* Select specific character in initiative
* Important/relevant values for creatures in initiative
