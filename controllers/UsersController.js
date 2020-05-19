require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const path=require("path");
const fs = require("fs");
const { JVT_SECRET } = process.env;
class UsersController {


  static async getList(req, res, next) {
    try {
        const userFile = path.join(__dirname, '../data');

        const users=fs.readFileSync(path.join(userFile,"users.json"));
        const data=[];
        JSON.parse(users).map(user=>{
            data.push(user);
        });

      res.json({
        status: "ok",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
      try {
        const { email, password } = req.body;
        const userFile = path.join(__dirname, '../data');

        const users=fs.readFileSync(path.join(userFile,"users.json"));
          let token ="";
           JSON.parse(users).map(user=>{
          if (user.password === password && user.email===email) {
              token = jwt.sign({ id: user.id}, JVT_SECRET);
          }
        });
            res.send({
                status: 'ok',
                token
            })


      } catch (e) {
        next(e);
      }
  }
}

module.exports = UsersController;
