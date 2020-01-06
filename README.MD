## Part 1
## SCOPES

1. Core dirty-checking implementation: $watch, $digest.
2. Different ways of starting a digest: $eval, $apply, $evalAsync, and $applyAsync, and the $watchGroup implementation for watching multiple things at once.
3. Scope inheritance - the mechanism that makes it possible to create scope hierarchies for sharing data and events.
4. Efficient dirty checking for collections (arrays and objects)
5. The event system: $on, $emit, and $broadcast

#### Watching Object properties: $watch and $digest
$watch and $digest are two sides of the same coin. Together they form the core of what the digest cycle is all about: Reacting to changes in data.

With $watch you can attach what is called a watcher to a scope. A watcher is something that is notified when a change occurs on the scope. You can create a watcher by calling $watch with two arguments (functions):
-- A watch function, which specifies the piece of data you're interested in.
-- A listener function which will be called whenever the data changes.

The other side of the coin is the $digest function. It iterates over all the watchers that have been attached on the scope, and runs their watch and listener functions accordingly.

Dirty-checking: To check if the values specified by the watch function have actually changed, and only then call the respective listener function. 
