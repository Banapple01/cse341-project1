const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const apiKey = 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

const getData = async (req, res, next) => {
	const result = await mongodb.getDb().db().collection("todos").find();
	result.toArray().then((lists) => {
		// console.log(lists)
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(lists);
	});
};

const getSingleData = async (req, res, next) => {
	const userId = new ObjectId(req.params.id);
	const result = await mongodb
		.getDb()
		.db()
		.collection("todos")
		.find({ _id: userId });
	console.log(result)
	result.toArray().then((lists) => {
		// console.log(lists)
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(lists[0]); // we just need the first one (the only one)
	});
};

const createData = async (req, res) => {
	const newTodo = {
		todoTitle: req.body.todoTitle,
		todoDesc: req.body.todoDesc,
	};
	// I'm planning on adding todo affiliation
	// and users to connect them
    console.log(newTodo)
	const response = await mongodb
		.getDb()
		.db()
		.collection("todos")
		.insertOne(newTodo);
    console.log(response)
	if (response.acknowledged) {
		res.status(201).json(response);
	} else {
		res.status(500).json(
			response.error || "Some error occurred while creating the Todo."
		);
	}
};

const updateData = async (req, res) => {
	const userId = new ObjectId(req.params.id);
	const upTodo = {
		todoTitle: req.body.todoTitle,
		todoDesc: req.body.todoDesc,
	};
	const result = await mongodb
		.getDb()
		.db()
		.collection("todos")
		.replaceOne({ _id: userId }, upTodo);
    console.log(result)
	if (result.modifiedCount > 0) {
		res.status(204).send();
	} else {
		res.status(500).json(
			result.error || "Something went wrong with the update."
		);
	}
};

const deleteData = async (req, res) => {
	const userId = new ObjectId(req.params.id);
	const result = await mongodb
		.getDb()
		.db()
		.collection("todos")
		.deleteOne({ _id: userId }, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            result.error || "Something went wrong while deleting the data."
        );
    }
};

module.exports = { getData, getSingleData, createData, updateData, deleteData };
