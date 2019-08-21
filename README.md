## Upload file to REST endpoint and Store in Postgres DB using Sequelize and Express

This is demonstartion of File Upload eample to Rest Api using Express and Sequelize. I am using Multer which is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. The uploaded form data is being stored to PostGres DB.

I have also included swagger-ui into the project and wrote the documentation manually.

Packages used in this example

    "express": "^4.17.1",
    "multer": "^1.4.2",
    "pg": "^7.12.1",
    "sequelize": "^5.15.1",
    "swagger-ui-dist": "^3.23.5",
    "swagger-ui-express": "^4.0.7"

**app.js**

```
var app = express();
const port = process.env.PORT || 3000

global.appRoot = __dirname;

app.use(bodypareser.json()); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
categoryApi(app,db);

app.listen(port, ()=> console.log(`Application started on Port ${port}.`));
```

**controllers/category**

```
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
```

###Configure Sequelize and its model.

**models\sequelize.js**

```
const Sequelize = require('sequelize');
const CategoryModel = require('./category');

const sequelize = new Sequelize('testdb', 'postgres', 'Manav2020#', {
    host : 'localhost',
    dialect: 'postgres'
});

const Category = CategoryModel(sequelize, Sequelize);

//Pass { force: true } as option if you want to force delete and recreate.
sequelize.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Category
}
```

**models\category.js**

```
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
      },
      {
        freezeTableName: true // Model tableName will be the same as the model name
      }
    )
}
```

###Test Application using postman:

**Add a cateory**

![1]('media/1.JPG')

**Get categories**

![2]('media/2.JPG')
