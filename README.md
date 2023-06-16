# nuts-and-itl-lookup

This package enables lookup of names by code under the NUTS and ITL geographical classification systems.

NUTS and ITL are hierarchical systems used to divide the territories
of the EU and UK, respectively. At present, ITL mirrors nuts, differing
only in the first two letters of its codes i.e. TL vs UK. 

This is expected to last until at least 2014 so this package should be good til then. If anyone uses it, I'll keep my eye on developments and update it as needed.

## How to use:

Install the package using:

> npm i nuts-and-itl-lookup

Require the package in your project:

> const nutsLookup = require("../nutsLookup");

### Syntax:

> nutsLookup("AL033")

The function accepts one paramater: a NUTS or ITL geography code as a string, e.g.:

- "AL033" - Expected result: { code: 'AL033', region: 'Gjirokastër' }

- "be31" - Expected result: { code :'31', region: 'Prov. Brabant Wallon' }

- "TLG21" - Expected result: { code: 'TLG21', region: 'Telford and Wrekin' }

It will work with either upper or lowercase letters.



