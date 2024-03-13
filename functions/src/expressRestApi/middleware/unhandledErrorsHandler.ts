import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  console.log(err);
  res.status(500).send(`${err} Internal Server Error`);
};

export default errorHandler;
