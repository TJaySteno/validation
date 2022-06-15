# Setup

This requires Node.js be installed on your computer.
https://nodejs.org/en/download/

Once installed, you'll need to navigate to this folder in MS Command Prompt. Search 'CMD' in the Windows search bar and open the program. Navigate to the 'validation' folder that contains your 'test.js' file.
https://riptutorial.com/cmd/example/8646/navigating-in-cmd

Install the dependent packages by typing this command into CMD. Security note: This just installs the dependencies in the 'package.json' file which in this case is just Jest, a JavaScript testing platform.
https://www.npmjs.com/package/jest

	npm install

Once this is finished, you're ready to go!

# Example Rule Testing

Our goal: We want to require the proper signatures on EMS transport.
~~~
If eDisposition.12 is one of [Transport values],
then we need a patient signature
or we need a signature from a patient rep and a healthcare provider.
~~~

Simplify each line of your validation rule into a single variable.
- If eDisposition.12 is one of [Transport values] --> field A
- Signature where signer is Patient --> field B
- Signature where signer is Patient Rep --> field C
- Signature where signer is HC Provider --> field D

Use these to write out your first pass at the rule:

	Will flag if:
	A is one of [XYZ]
	AND
	(Signatures where signer is B is less than 1
	OR
	    (Signatures where signer is C is less than 1
	    AND
	    Signatures where signer is D is less than 1)
	)
## Write Your Tests First
> Reference: https://jestjs.io/docs/api

Using the fields you just created, write your tests by replacing everything in the < > brackets below.

	test('<Describe this test>', () => {
	  expect(rule(<pass in true/false values here separated by commas>)).toBe(<expectedresult>);
	});

You can use true/false or 1/0; these two are the same.

    test('Should flag if transported with no signatures', () => {
      expect(rule(true, false, false, false)).toBe(true);
    });
    test('Should flag if transported with no signatures', () => {
      expect(rule(1, 0, 0, 0)).toBe(1);
    });
Continue writing your test cases until your edge cases are covered.

### Write Your Rule
Using && (and), || (or), and parentheses, turn your rule into a true/false evaluation by replacing everything after 'return'.

Our first pass above...

	Will flag if:
	A is one of [XYZ]
	AND
	(Signatures where signer is B is less than 1
	OR
	    (Signatures where signer is C is less than 1
	    AND
	    Signatures where signer is D is less than 1)
    )

...becomes this in file 'test.js'.

	const rule = function (a,b,c,d) {
		return a & (b || (c & d));
	}
	A is one of [XYZ]
	AND
	(B is blank
	OR
	    (C is blank
	    AND
	    D IS blank)
	)

## Run Your Test

In your CMD, inside of the 'test' folder, type 'npm test' to run your tests. Once all tests pass, you have your rule. I tried my test and got this error:

	Should flag if transported with no signatures

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

      30 |
      31 | test('Should flag if transported with no signatures', () => {
    > 32 |   expect(rule(1, 0, 0, 0)).toBe(1);
         |                            ^
      33 | });
      34 |
      35 | test('Should not flag if transported with patient signature', () => {

      a
      t Object.<anonymous> (test.js:32:28)

Back to the drawing board, I update my rule. I believe it's an operator error so I update my rule, save 'test.js', and run 'npm test' again.

test.js

	const rule = function (a,b,c,d) {
	  return a && b && (c || d);
	}

Results

	PASS  ./test.js
	√ Should not flag if not transported (4 ms)
	√ Should flag if transported with no signatures (1 ms)
	√ Should not flag if transported with patient signature (1 ms)
	√ Should flag if transported with only patient rep signature (1 ms)
	√ Should flag if transported with only HC provider signature (1 ms)
	√ Should not flag if transported with PR and HCP signatures (1 ms)

	Test Suites: 1 passed, 1 total
	Tests:       6 passed, 6 total
	Snapshots:   0 total
	Time:        0.612 s, estimated 1 s
	Ran all test suites.

## Tips

Take a lot of care with your rules! Passing the wrong value in, or expecting the wrong value can cause a lot of headaches. Try to avoid double negatives and when in doubt, explain your tests to a rubber duck.

This takes a while to set up so it's best used on your trickier validation rules.
