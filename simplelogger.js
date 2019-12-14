var app = Application.currentApplication()
app.includeStandardAdditions = true

// set defaults
var level = 6;
var path = defaultPath(); // ~/Library/Logs/

// logging levels
var levelLegend = {
	0 : 'ALL',
	1 : 'DEBUG',
	2 : 'INFO',
	3 : 'WARNING',
	4 :	'ERROR',
	5 :	'FATAL',
	6 : 'OFF'
}

// ------------ METHODS ------------ //

// -- Loggers -- //

// logger for all levels
function log(text, msgLevel) {
	try {
		// write the text to file if it meets the threshold
		if (level <= msgLevel) {
			text = getDateTime() + ' -- ' + levelLegend[msgLevel] + ' -- ' + text + '\n\n'
			return write(text, path, false)
		}
	}
	catch(error) {
		console.log('Couldn\'t log message: ${error}')
	}
}

// DEBUG
function debug(text) {
	// DEBUG is level 1
	return log(text, 1)
}

// INFO
function info(text) {
	// INFO is level 2
	return log(text, 2)
}

// WARNING
function warning(text) {
	// WARNING is level 3
	return log(text, 3)
}

// ERROR
function error(text) {
	// ERROR is level 4
	return log(text, 4)
}

// FATAL
function fatal(text) {
	// FATAL is level 5
	return log(text, 5)
}


// -- Setters/Getters -- //

// return the level
function getLevel() {
	return levelLegend[level]
}

// set the level
function setLevel(logLevel) {
	// if we're given a number between [0-6] inclusive, simply set to that number
	if (Number.isInteger(logLevel) && logLevel >=0 && logLevel <= 6) {
		level = logLevel
	}
	// if we're given a string (e.g. 'DEBUG' or 'error') set to the corresponding level
	if (typeof logLevel === 'string') {
		logLevel = logLevel.toUpperCase()
		for (key in levelLegend) {
			if (levelLegend[key] == logLevel) {
				level = key
				break
			}
		}
	}
	
	return levelLegend[level]
}

// return the path
function getPath() {
	return path
}

// set the path
function setPath(logPath) {
	path = logPath
	return path
}

// return default path
function defaultPath() {
	// set the default path to ~/Library/Logs/ so that it's easy to just add a file name at the end
	return app.pathTo("library folder", { from: "user domain" }).toString() + "/Logs/"
}

// -- Misc -- //

// return a nice formatted (current) date-time string
function getDateTime() {
	var d = new Date()
	var month = d.getMonth() + 1 // because it goes from 0-11
	var day = d.getDate()
	var hour = d.getHours()
	var minute = d.getMinutes()
	var second = d.getSeconds()
	var ms = d.getMilliseconds()

	// add leading zeros
	month = month < 10 ? '0' + month : month
	day = day < 10 ? '0' + day : day
	hour = hour < 10 ? '0' + hour : hour
	minute = minute < 10 ? '0' + minute : minute
	second = second < 10 ? '0' + second : second
	ms = ms < 10 ? '00' + ms : ms
	ms = 10 <= ms && ms < 100 ? '0' + ms : ms

	// YYYY-MM-DD HH:MM:SS:mmm
	return d.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ':' + ms
}

// generic write to file function (will create file if it doesn't exist)
function write(text, file, overwriteExistingContent) {
    try {

        // Convert the file to a string
        var fileString = file.toString()

        // Open the file for writing
        var openedFile = app.openForAccess(Path(fileString), { writePermission: true })

        // Clear the file if content should be overwritten
        if (overwriteExistingContent) {
            app.setEof(openedFile, { to: 0 })
        }

        // Write the new content to the file
        app.write(text, { to: openedFile, startingAt: app.getEof(openedFile) })

        // Close the file
        app.closeAccess(openedFile)

        // Return a boolean indicating that writing was successful
        return true
    }
    catch(error) {

		console.log('Couldn\'t write file: ${error}')

        try {
            // Close the file
            app.closeAccess(file)
        }
        catch(error) {
            // Report the error is closing failed
            console.log('Couldn\'t close file: ${error}')
        }

        // Return a boolean indicating that writing was unsuccessful
        return false
    }
}
