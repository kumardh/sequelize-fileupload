const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: '/tmp/'});

module.exports = (app, db) => {
    app.get( "/categories", (req, res) =>
        db.Category.findAll({raw: true})
            .then( (result) => res.json(result) )
    );

    app.post('/categories', upload.single('file'), (req,res) => {
        const file = global.appRoot + '/uploads/' + req.file.filename;
        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err);
                res.send(500);
            } 
            else {
                  db.Category.create({
                        name: req.body.name,
                        description: req.body.description,
                        poster : req.file.filename
                    })
                    .then(r =>  {
                    res.send(r.get({plain:true}));
                    });
            }
          });
    })
}