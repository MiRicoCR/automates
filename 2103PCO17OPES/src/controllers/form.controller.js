exports.instanceQuizz = (req, res) => {
    console.log(req.params.store);
    res.render('quizz.html');
}