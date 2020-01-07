## Part 1
## SCOPES

1. Core dirty-checking implementation: $watch, $digest.
2. Different ways of starting a digest: $eval, $apply, $evalAsync, and $applyAsync, and the $watchGroup implementation for watching multiple things at once.
3. Scope inheritance - the mechanism that makes it possible to create scope hierarchies for sharing data and events.
4. Efficient dirty checking for collections (arrays and objects)
5. The event system: $on, $emit, and $broadcast

#### Watching Object properties: $watch and $digest
`$watch` and `$digest` are two sides of the same coin. Together they form the core of what the *digest cycle* is all about: Reacting to changes in data.

With `$watch` you can attach what is called a watcher to a scope. A watcher is something that is notified when a change occurs on the scope. You can create a watcher by calling $watch with two arguments (functions):
  - A watch function, which specifies the piece of data you're interested in.
  - A listener function which will be called whenever the data changes.

The other side of the coin is the $digest function. It iterates over all the watchers that have been attached on the scope, and runs their watch and listener functions accordingly.

**Dirty-checking**: To check if the values specified by the watch function have actually changed, and only then call the respective listener function.

*General form watch functions usually take*: Pluck some value from the scope and return it.

#### Important performance characteristics that Angular scopes have:
- Attaching data to a scope does not by itself have an impact on performance. If no watcher is watching a property, it doesn't matter if it's on scope or not. Angular does not iterate over the properties of a scope. It iterates over the watches.

- Every watch function is called during every `$digest`. For this reason, it's a good idea to pay attention to the number of watches you have, as well as the performance of each individual watch function or expression.

*Destroying a watch*
The way Angular implements this is actually quite clever: The `$watch` function in Angular has a return value. It is a function, when invoked, destroys the watch
that was registered. If a user wants to be able to remove a watch later, they just need to keep hold of the function returned when they registered the watch, and then call it once the watch is no longer needed.

#### Summary: Scopes (Chapter 1)
- The two-sided process underlying Angular's dirty checking: `$watch` and `$digest`
- The dirty-checking loop and the TTL mechanism for short-circuiting it.
- The difference between reference-based and value-based comparison.
- Exception handling in the Angular digest.
- Destroying watches so they won't be executed again.  

## Scope Methods

*$eval*: Takes a function as an argument and immediately executes that function giving it the scope itself as an argument. It then returns whatever the function returned. `$eval` also takes an optional second argument, which it passes as-is to the function.

*$apply*: Takes a function as an argument. It executes that function using `$eval`, and then kick-starts the digest cycle by invoking `$digest`.
