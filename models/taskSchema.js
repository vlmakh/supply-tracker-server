const { Schema, model } = require("mongoose");
const Joi = require("joi");

const taskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    dateOrder: {
      type: Date,
      required: true,
    },
    supplier: {
      type: String,
    },
    dateInvoice: {
      type: Date,
    },
    datePayment: {
      type: Date,
    },
    freight: {
      type: String,
      required: true,
    },
    dateETD: {
      type: Date,
    },
    dateETA: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTaskSchema = Joi.object({
  name: Joi.string().required(),
  qty: Joi.number().required(),
  unit: Joi.string().required(),
  dateOrder: Joi.date().required(),
  supplier: Joi.string(),
  dateInvoice: Joi.date(),
  datePayment: Joi.date(),
  freight: Joi.string(),
  dateETD: Joi.date(),
  dateETA: Joi.date().required(),
  comments: Joi.string(),
});

const joiTaskStatusSchema = Joi.object({
  completed: Joi.boolean().required(),
});

const Task = model("task", taskSchema);

module.exports = {
  Task,
  joiTaskSchema,
  joiTaskStatusSchema,
};
