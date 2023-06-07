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
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: false,
    },
    dateInvoice: {
      type: String,
      required: true,
    },
    datePayment: {
      type: String,
      required: false,
    },
    freight: {
      type: String,
      required: false,
    },
    dateETA: {
      type: String,
      required: false,
    },
    dateETD: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
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
  dateOrder: Joi.string().required(),
  supplier: Joi.string(),
  dateInvoice: Joi.string(),
  datePayment: Joi.string(),
  freight: Joi.string(),
  dateETA: Joi.string(),
  dateETD: Joi.string().required(),
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
