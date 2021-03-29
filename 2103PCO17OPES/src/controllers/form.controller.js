exports.instanceQuizz = (req, res) => {
    console.log(req.params.store);
    res.render('quizz.html');
}

exports.insertData = (req, res) => {
    console.log(req.body);
    res.render('reward.html');
    res.end();
};