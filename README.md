# Datarock Tennis Challenge

Running the project will simulate a tennis match, triggering the pointWonBy method in a loop until one player wins the first set.

## Running the project

1. **Install the dependencies**:

```bash
   npm install
```

2. **Compile the TS solution**:

```bash
   npm run compile
```

3. **Simulate a game of tennis**:

```bash
   npm run simulate
```

## Testing

**Running the tests**:

```bash
npm run test
```

## Things to consider:

Due to time constraints, I have turned off strict type checking. Retrieving data out of the map collections could return undefined in theory, and bypassing it with nullish coalescing or non-null assertion operators is a poor way to deal with the issue IMO. Error handling and checking for undefined values with map's has method would be ideal, if time persisted.

The data structures would need to be altered if we ever needed to extend these classes to handle doubles tennis.
