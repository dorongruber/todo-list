const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.post('/newtask', async (req,res) => {
  try{
    console.log('newtask -> ', req.body);
    const {title, content,date,color,id, userid } = req.body;
    Task.findOne({id: id})
    .exec(user => {
      if(user) {
        res.status(404)
        .json({message: 'task all ready exists', flag: false});
      }
      const newtask = new Task({
        id,
        userid,
        title,
        content,
        date,
        color
      });
      const savedtask = newtask.save();
      res.status(201)
      .json({message: `task ${title} as added successfully to db`, flag: true});
    })
  }catch(err) {
    res.status(401).json(err);
  }
})

router.get('/todaystasks/:date/:uid', (req,res) =>{
  const {date,uid} = req.params;
  try {
    Task.find({date: date, userid: uid})
    .exec().then(tasks => {
      if (!tasks) {
        res.status(404)
        .json({message: `in ${date} there arent any task registered `, flag: false});
      }
      res.status(200).json(tasks);
    })
  }catch(err) {
    res.status(505).json(err);
  }
})

router.delete('/removetask/:id', (req,res) => {
  const {id} = req.params;
  // console.log('delete id -> ', id);
  try {

    Task.findOneAndDelete({id: id}, (err, task) => {
      // console.log('delete task -> ', task.title);
      if (task) {
            res.status(201).json({message: `task ${id} has been successfully deleted`})
          }
          else {
            res.status(404).json({message: `cant find task id -> ${id} `});
          }
    })
  }catch(err) {
    res.status(401).json(err);
  }
})

module.exports = router;
