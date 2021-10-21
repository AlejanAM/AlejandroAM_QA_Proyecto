const express = require('express');
const router = express.Router();
const status = require('http-status');

const firebase = require('firebase-admin')
const serviceAccount = require('../configFireBase/proyectodisenno2-78b51-firebase-adminsdk-ngcvl-6594304f46.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://fir-angular-auth-cdb4a-default-rtdb.firebaseio.com/'
});

function flatten(board) {
    return board.reduce((results, row) => {
        return results.concat(row)
    }, [])
}



router.get('/sendEmail', async (req, res) => {
    const email = req.query.email;
    const nodemailer = require("nodemailer");
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"qahandylist@gmail.com",
            pass: "Vcxz7890",
        },
    });
    let mailDetails = {
        from: "qahandylist@gmail.com",
        to: email,
        subject: "Welcome to HandyList",
        text: "Here you can manage your lists with your relatives, so they can see what is needed in the house.",
    };
    try {

        await mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).json({ error: err+" ", success:false});
            } else {
                res.status(status.OK).json({success:true});
            }
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

/*
function emailSender (){
    const nodemailer = require("nodemailer");

    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"alefirucho@gmail.com",
            pass: "morera123",
        },
    });
    let mailDetails = {
        from: "alefirucho@gmail.com",
        to: "moreraalejandro12@gmail.com",
        subject: "You Were Hacked 8)",
        text: "System failure !",
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs");
        } else {
            console.log("Email sent successfully");
        }
    });
        
}*/

function listGenerator() {
    const friendList = Array(0).fill(null).map(() => Array(0).fill(null))
    return flatten(friendList);
}

async function getPlayerInfo(uid) {

    var user;

    try {
        var pool = firebase.firestore();
        await pool.collection('registeredUsers').where('uid', "==", uid).
            get().then(snapshot => {
                snapshot.forEach(async doc => {
                    user = await doc.data()

                })
            });

        return user;
    } catch (err) {
        return undefined;
    }
}

async function getProductInfo(name) {

    var product;

    try {
        var pool = firebase.firestore();
        await pool.collection('Product').where('name', "==", name).
            get().then(snapshot => {
                snapshot.forEach(async doc => {
                    product = await doc.data()
                })
            });

        return product;
    } catch (err) {
        return undefined;
    }
}



async function saveInformation(uid, email, displayName) {

    try {

        var pool = firebase.firestore();
        await pool.collection('registeredUsers').add({
            uid: uid,
            email: email,
            displayName: displayName
        }).then(() => console.log())
            .catch(() => console.log())

    } catch {
        return false;
    }
}


router.post('/createProductList', async (req, res) => {
    const idListOwner = await getPlayerInfo(req.body.idListOwner)
    try {
        var alreadyExist = true;
        var db = firebase.firestore();
        var idList = '';

        await db.collection('productList')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().idListOwner.uid === idListOwner.uid) {
                        alreadyExist = false;
                        idList= doc.id;
                    }
                });
            });

        if (alreadyExist) {
          await db.collection('productList').add({
              idListOwner: idListOwner,
              products: listGenerator()
          }).then(data => {
                  res.status(status.OK).json({ data:data.id, success:true});
              }).catch(err => {
                  res.status(status.INTERNAL_SERVER_ERROR).json({ error: err+" ", success:false});
              });
        }
        res.status(status.OK).json({data:idList, success:true});
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err+" ", success:false});
    }
});



router.get('/getProductListId', async (req, res) => {

    const idListOwner = req.query.idListOwner;

    try {

        var db = firebase.firestore();

        var data = '';

        db.collection('productList').where('idListOwner.uid', "==", idListOwner).get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            data = doc.id;
          });
            res.status(status.OK).json({data:data, success:true});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
    }
});


router.post('/savePlayerInformation', async (req, res) => {

    const uid = req.body.uid;
    const displayName = req.body.displayName;
    const email = req.body.email;

    try {

        var pool = firebase.firestore();
        var alreadyExist = true;
        var idFamily;
        var listName;


        await pool.collection('registeredUsers')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().uid === uid) {
                        alreadyExist = false;
                    }
                });
            });

        await pool.collection('family')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().idFamilyOwner.uid === uid) {
                        idFamily = doc.id;
                        listName = doc.data().listName;
                    }
                });
            });

        if (alreadyExist) {
            await saveInformation(uid, email, displayName);
        }

        res.status(status.OK).json({ idFamily: idFamily, ListName: listName, success: 200 })

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

router.get('/getAllplayers', async (req, res) => {

    try {

        var pool = firebase.firestore();
        const usersRef = await pool.collection('registeredUsers');

        var users = [];
        await usersRef.get().then((snapshot) => {

            snapshot.forEach((doc) => {
                users.push(doc.data());
            })
        });

        res.status(status.OK).json({ users: users });

    } catch {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'Fail getting the players' });
    }
});

router.get('/getFamilyByUser', async (req, res) => {
    const uid = req.query.uid;
    try {

        var db = firebase.firestore();
        var list = [];
        var data = '';

        db.collection('family').get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            var {members} = doc.data();
            members.forEach( vari => {
                if (vari.uid === uid) {
                    list.push(doc.data())
                }
            })
          });

            res.status(status.OK).json({data:list, success:true});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
    }
});

//crea la familia sin el id de la lista
router.post('/createdF', async (req, res) => {
    const idFamilyOwner = await getPlayerInfo(req.body.idFamilyOwner)
    const listName = req.body.listName;
    const idProduct = req.body.idProduct;
    var alreadyExist = false;
    try {
        var db = firebase.firestore();
        await db.collection('family')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().idFamilyOwner.uid === idFamilyOwner.uid) {
                        alreadyExist = true;
                    }
                });
            });

        if (!alreadyExist) {
        await db.collection('family').add({
              idFamilyOwner: idFamilyOwner,
              familyName: listName,
              members: listGenerator(),
              idProductList: idProduct
          }).then(response => {
              res.status(status.OK).json({ success: 200});
          }).catch(err => {
              console.log(err);
              res.status(status.INTERNAL_SERVER_ERROR).json(err+" ");
          });
        }
        else
          res.status(status.OK).json({ message: 'Already Exist' });

    } catch (err) {
        console.log(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err+" " });
    }
});

//obtiene la lista en la info de la lista del dueño
router.get('/getFamilytByOwner', async (req, res) => {

    const idFamilyOwner = req.query.idFamilyOwner;

    try {

        var db = firebase.firestore();

        var data = '';

        db.collection('family').where('idFamilyOwner.uid', "==", idFamilyOwner).get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            data = doc.data();
          });
            res.status(status.OK).json({data:data, success:true});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
    }
});

//obtiene el id de la familia
router.get('/getFamilyId', async (req, res) => {

    const idFamilyOwner = req.query.idFamilyOwner;

    try {

        var db = firebase.firestore();

        var data = '';

        db.collection('family').where('idFamilyOwner.uid', "==", idFamilyOwner).get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            data = doc.id;
          });
            res.status(status.OK).json({data:data, success:true});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err+' ', success:false});
    }
});

//edita el nombre de la familia con el id
router.put('/editFamily', async (req, res) => {

    const idFamily = req.body.idFamily;
    const listName = req.body.listName;

    try {

        var db = firebase.firestore();

        db.collection('family').doc(idFamily).update({
            listName: listName

        }).then(response => {
            res.status(status.OK).json({ idFamily: response.id });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

//añade el id de la lista de productos al espacio de id de la familia
router.put('/addProductListId', async (req, res) => {
    try {

        const idFamily = req.body.idFamily;
        const idProductList = req.body.idProductList;

        var db = firebase.firestore();

        db.collection('family').doc(idFamily).update({
            idProductList: idProductList
        }
        ).then(response => {
            res.status(status.OK).json({ success: 200 });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        console.log(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

//añade un miembro a la familia
router.put('/addMember', async (req, res) => {
    try {

        const idFamily = req.body.idFamily;
        const member= await getPlayerInfo(req.body.member)

        var db = firebase.firestore();

        let ref = db.collection('family').doc(idFamily);

        let updateList = ref.update({
            members: firebase.firestore.FieldValue.arrayUnion(member)
        }).then(response => {
            res.status(status.OK).json({ success: 200 });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

//remueve un miembro de la familia
router.put('/removeMember', async (req, res) => {
    try {

        const idFamily = req.body.idFamilyList;
        const member= await getPlayerInfo(req.body.uid)

        var db = firebase.firestore();

        let ref = db.collection('family').doc(idFamily);

        let updateList = ref.update({
            members: firebase.firestore.FieldValue.arrayRemove(member)

        }).then(data => {
            res.status(status.OK).json({data:data, success:true});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
    }
});


//añade un producto a la lista de productos usando el id de la lista
router.put('/addProduct', async (req, res) => {
    try {

        const idList = req.body.idList;
        const proName = await getProductInfo(req.body.proName)

        var db = firebase.firestore();

        let ref = db.collection('productList').doc(idList);

        let updateList = ref.update({
            products: firebase.firestore.FieldValue.arrayUnion(proName)
        }).then(response => {
            res.status(status.OK).json({ success: 200 });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

//creacion de categorias
router.post('/createCategory', async (req, res) => {
    const name = req.body.name;
    var alreadyExist = false;
    try {
        var db = firebase.firestore();
        await db.collection('Category')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().name === name) {
                        alreadyExist = true;
                    }
                });
            });
        if (!alreadyExist) {
          db.collection('Category').add({
              name: name
          }).then(response => {
              res.status(status.OK).json({ success: 200 });
          }).catch(err => {
              console.log(err);
              res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
          });
        }
        else
          res.status(status.OK).json({ message: 'Already Exist' });
    } catch (err) {
        console.log(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
    }
});

//Obtener todas la categorias
router.get('/getAllCategory', async (req, res) => {

    try {

        var pool = firebase.firestore();
        const catRef = await pool.collection('Category');

        var categories = [];
        await catRef.get().then((snapshot) => {

            snapshot.forEach((doc) => {
                categories.push(doc.data());
            })
        });

        res.status(status.OK).json({ data:categories, success:true});

    } catch {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error:err+' ', success:false });
    }
});


router.get('/getAllProduct', async (req, res) => {

    try {

        var pool = firebase.firestore();
        const catRef = await pool.collection('Product');

        var products = [];
        await catRef.get().then((snapshot) => {

            snapshot.forEach((doc) => {
                products.push(doc.data());
            })
        });

        res.status(status.OK).json({ data:products, success:true});

    } catch {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error:err+' ', success:false });
    }
});


router.post('/createProduct', async (req, res) => {
    const img = req.body.img;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    var alreadyExist = false;
    try {
        var db = firebase.firestore();
        await db.collection('Product')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().name === name) {
                        alreadyExist = true;
                    }
                });
            });
        if (!alreadyExist) {
          db.collection('Product').add({
              img: img,
              name: name,
              description: description,
              price: price,
              category: category,
              cantidad: 1
          }).then(response => {
              res.status(status.OK).json({ success: 200 });
          }).catch(err => {
              console.log(err);
              res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
          });
        }
        else
          res.status(status.OK).json({ message: 'Already Exist' });
    } catch (err) {
        console.log(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({error:err + ' ', success:false});
    }
});


router.get('/getListMarket', async (req, res) => {

    try {

         const idListOwner = req.query.idListOwner;

          var listMarket;

          try {

              var pool = firebase.firestore();
              await pool.collection('productList')
              .get()
              .then(snapshot => {
                  snapshot.forEach(async doc => {
                      if (await doc.data().idListOwner.uid === idListOwner) {
                          listMarket = doc.data();
                      }
                  });
              });

          } catch (err) {
              res.status(status.OK).json({success:true});
          }

        res.status(status.OK).json({ data:listMarket, success:true});

    } catch {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error:err+' ', success:false });
    }
});





module.exports = router;
