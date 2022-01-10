const express = require("express");
const router = express.Router();
const Question = require("./models/Question");

//routes for all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//routes for one question
router.get("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await Question.findById(_id);
    if (!question) {
      return res.status(404).json("invalid id");
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//routes for create one question
router.post("/questions", async (req, res) => {
  try {
    const { description } = req.body;
    const { alternatives } = req.body;
    const question = await Question.create({
      description,
      alternatives,
    });
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});

//routes for update one question
router.put("/questions/:id", async (req, res) => {
  try {
    _id = req.params.id;

    const { description, alternatives } = req.body;

    const question = await Question.findById(_id);

    if (!question) {
      return res.status(404).json();
    } else {
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(201).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//routes for delete4 one question
router.delete("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const question = await Question.deleteOne({ _id });
    if (question.deletedCount === 0) {
      // check it does not exists
      return res.status(404).json();
    } else {
      return res.status(200).json("deleted successfully");
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
