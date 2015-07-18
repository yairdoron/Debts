var mongoose = require('mongoose'),
	// db = mongoose.connect('mongodb://admin:admin@localhost:27017/debts');
	db = mongoose.connect('mongodb://yairdoron:yairdoron@ds045632.mongolab.com:45632/debts');

var actionSchema = require('./actionSchema').actionSchema;
mongoose.model('actionM', actionSchema);
var debts;
var person = "yairrr";

mongoose.connection.once('open', function () {
	var temp = this.model('actionM');

	var query = temp.find();
	query.where('name').ne('PRIVATE');
	query.exec(function (err, docs) {
		debts = docs;
		mongoose.disconnect();
		return debts;
	});
});

exports.getData = function () {
	return debts;
}

exports.getDebtByName = function (name) {
	var temp = [];
	for (var i in debts) {
		if (debts[i].name == name)

			temp.push(debts[i]);
	}
  		return temp;
};

function extendDebt(debt) {
	debt.address = '';
	debt.atm = '';
	debt.box =  '';
	debt.date = new Date();
	
	// name: String,
	// info: String,
	// debt: Number,
	// address: String,
	// atm: Number,
	// box: Number,
	// date: String
}

exports.addDebt = function (debt) {
	extendDebt(debt);
	
	var dbDebt = new actionM(debt);
	
	dbDebt.save(function (err, d) {
		if (err) return console.error('dis is bad');
	});
};

exports.debtsSum = function () {
	var temp = [];
	var sum = 0;
	for (var i in debts) {
		sum += debts[i].debt;

	}
	temp.push(sum);
  		return temp;
};

