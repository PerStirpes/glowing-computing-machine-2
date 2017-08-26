//We look at the default Array.prototype.sort behavior and discuss how you can do case insensitive string sorting. This isn’t as straightforward as it seems, Javascript by default sorts capitalized words before lowercase.

const foo = ['Alpha', 'beta', 'Gamma', 'delta'];
foo.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

foo.forEach(x => console.log(x));

foo.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
