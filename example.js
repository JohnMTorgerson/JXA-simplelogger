// load library
var logger = Library('simplelogger')
// set path to log file
logger.setPath(logger.defaultPath() + 'myScriptLog.log') // will create ~/Library/Logs/myScriptLog.log 
// set level, below which nothing will be logged
logger.setLevel(2)	// 1 for DEBUG
					// 2 for INFO
					// 3 for WARNING
					// 4 for ERROR
					// 5 for FATAL

try {
	logger.debug('running some code') // since logger is set at level 2, this line will not be logged
	// some code
}
catch(error) {
	logger.error('Something went wrong: ' + error) // this will be logged

}
