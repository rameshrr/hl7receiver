# hl7receiver (Alpha)
Node package to receive HL7 packets


# Installation
install via [NPM](https://www.npmjs.com/):
> npm install hl7receiver

# Usage
## Initializing:
```javascript

var Receiver = require('hl7receiver');
var receiver = new Receiver();

```

## Option 1: Default(Port: 1337)
```javascript

/// Default initialization
receiver.initialize();

```

## Option 2: User defined configuration
```javascript

/// User defined
/// options is a JSON object which can be used for Listener customization
receiver.initialize(options);

/// Example
receiver.initialize({
  port: 1337,
  encoding: 'utf8',
  emitRawMessage: false
});

```

## Option 3: Listener pool
```javascript

/// User defined
/// options is an array where one can define multiple listeners
receiver.initialize(optionsArray);

/// Example
receiver.initialize([{
  port: 1337,
  encoding: 'utf8',
  emitRawMessage: false
}, {
  port: 1338,
  encoding: 'utf8',
  emitRawMessage: false
});

```

# Events
## Receiving message in hl7js format:
```javascript

/// Basic Parsing
receiver.on('hl7', function (err, hl7Message) {
    //console.log(err);
    //console.log(hl7Message);

    if (!err) {
        /// Reading patient name
        console.log('Patient name: ', hl7Message.segments[1][5]);
    }
});

```

## Receiving message in raw format:
```javascript

/// Reading raw data
receiver.on('data', function (err, rawData) {
    console.log(rawData);
});

```


# Contributions
Contributions are welcome
    
# Issues 
Please file your issues [here](https://github.com/rameshrr/hl7receiver/issues):