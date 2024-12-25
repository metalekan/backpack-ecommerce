import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Invalid object of : ${req.params.id}`);
  }
  next();
}

export default checkId;
