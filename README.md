# eclipse-phase-character
Eclipse Phase Character Sheet
=============================

A simple character sheet rendered for the Eclipse Phase roleplaying game of Transhuman Conspiracy and Horror.

Project Setup
-------------
* Project is on github at: https://github.com/ledlogic/eclipse-phase-character
* License: [MIT License](http://en.wikipedia.org/wiki/MIT_License)
* Character sheet background from http://www.eclipsephase.com/resources: http://www.eclipsephase.com/downloads/eclipsephase_charactersheet.pdf
** Use governed by [NC-SA License](http://creativecommons.org/licenses/by-nc-sa/3.0/us/)
* Fonts from: http://ledlogic.blogspot.com/2015/01/eclipse-phase-fonts.html
** Uses Heliotype LET Plain Medium
** Uses Lato
** Uses Sabon LT Std

Character Sheets
----------------

Character sheets are set up in the js folder.  To add characters, change:

* ep-char-list.json - On a live site, this could be generated via a directory / database parsing. For this standalone project, we'll just build a list.
* ep-char-[key].json - This is the character sheet data.

Additional Tools
----------------

Need random motivations, try
* https://stackoverflow.com/a/15065490/987044
* on /eclipse-phase-character/data/ep-motivations.csv