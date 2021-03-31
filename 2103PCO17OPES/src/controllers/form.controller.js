const randomizer = require("random-seed-weighted-chooser").default;

exports.instanceQuizz = (req, res) => {
    console.log(req.params.store);
    res.render('quizz.html');
}

exports.insertData = (req, res) => {
    console.log(req.body);
    res.json({data: 'reward'});
};

function generateID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

exports.showReward = (req, res) => {
    let iceCreamFlavors = [
        { flavor: "Bebida pupi gratis", weight: 0.15 },
        { flavor: "15% de descuento", weight: 0.725 },
        { flavor: "Topping gratis", weight:  9.125}
      ];

    let premio = randomizer.chooseWeightedObject(iceCreamFlavors);
    console.log(premio);

    res.render('reward.html', {reward: premio.flavor,code: generateID(6)});
};