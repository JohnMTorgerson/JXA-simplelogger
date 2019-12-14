# SimpleLogger

A JXA (Javascript for Automation) library for use with MacOS scripting
Provides (very) simple functionality for logging in your scripts

## Rationale:

In service of modularizing my Apple Scripts, I've created a few small libraries for my own use. I know there are various ways to hook up to well-developed Javascript libraries and use them for JXA, but I've decided to create a few of my own anyway, partly as a coding exercise, and partly because I only need to do a few simple things. Thus, figuring out how to import a bunch of NodeJS stuff for use in JXA simply seems like overkill for my use case. If you find yourself in a similar situation, perhaps this could be of some use.

## Usage:

* Place simplelogger.scpt into ~/Library/Script Libraries, and call from within your script as documented by Apple (i.e. *var logger = Library('simplelogger')*)
* See *example.scpt* for usage
* Current functionality:
  * Create a single logging handler to log to a file of your choice
  * Set log threshold (DEBUG, INFO, WARNING, ERROR, or FATAL) below which nothing is logged
* Future functionality may include the ability to create multiple handlers to log to different destinations, but I don't know if I'll bother yet.
