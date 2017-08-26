You will create 2 classes: a Bank class and an Account class.  A Bank contains many Accounts.  A Bank should have the following functionality:

Bank

.createAccount( // takes a name, a secret and
                // optionally an initial deposit
                // returns an instance of an account)

.lookupAccount( // takes an account id )

.deposit( // takes account id and amount,
          // returns the new balance)

.withdraw( // take account id, a secret and amount
           // but does not allow over drafting.
           // In the case of an overdraw, null should be returned,
           // otherwise return the amount withdrawn)

Account

An account is created with a name, an account id (can be a large random number but should not be created by the caller), a secret and optionally an initial deposit.  If no initial deposit is given, the account starts at 0.

.deposit( // takes a dollar amount and returns a new balance)

.accountId() // returns the accountId

.withdraw( // takes a secret and an amount,
                  // only withdraws money if the secret is correct and
                  // the amount is less than or equal to the balance.
                  // if the withdraw is allowed, the amount withdrawn is returned
                 // otherwise null is returned)


function Bank() {
  this.accounts = {};
}

function Account(name, secret, balance = 0) {
  this.name = name;
  this.accId = Math.floor(Math.random() * 1000);
  this.secret = secret;
  this.balance = balance;
}

Bank.prototype.createAccount = function(name, secret, deposit = 0) {
  var account = new Account(name, secret, deposit);
  this.accounts[account.accountId()] = account;
  return account.accountId();
};

Bank.prototype.lookupAccount = function(accountId) {
  return this.accounts[accountId];
};

Bank.prototype.deposit = function(accountId, deposit) {
  if (this.accounts[accountId]) {
    return this.accounts[accountId].deposit(deposit);
  }
  return null;
};

Bank.prototype.withdraw = function(accountId, secret, withdraw) {
  if (this.accounts[accountId]) {
    return this.accounts[accountId].withdraw(secret, withdraw);
  }
  return null;
};

Account.prototype.deposit = function(deposit) {
  this.balance += deposit;
  return this.balance;
};

Account.prototype.withdraw = function(secret, withdraw) {
  if (secret === this.secret) {
    if (withdraw <= this.balance) {
      this.balance -= withdraw;
      return this.balance;
    }
  }
  return null;
};

Account.prototype.accountId = function() {
  return this.accId;
};
