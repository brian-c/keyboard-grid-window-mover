on run (argv)
	tell application "System Events"
		-- Thanks, https://daringfireball.net/2006/12/display_size_applescript_the_lazy_way
		tell application "Finder"
			set screenBounds to bounds of window of desktop
		end tell

		set newLeft to (item 1 of argv as number) * (item 3 of screenBounds)
		set newTop to (item 2 of argv as number) * (item 4 of screenBounds)
		set newWidth to (item 3 of argv as number) * (item 3 of screenBounds)
		set newHeight to (item 4 of argv as number) * (item 4 of screenBounds)

		-- Thanks, https://robservatory.com/how-to-display-the-size-of-an-apps-frontmost-window/
		set appOfInterest to name of application processes whose frontmost is true
		set currentApplication to item 1 of appOfInterest
		set windowInFocus to window 1 of application process currentApplication

		set position of windowInFocus to {newLeft, newTop}
		set size of windowInFocus to {newWidth, newHeight}
	end tell
end run
