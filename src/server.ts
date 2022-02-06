import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
// import cors from "cors";
import router from "./routes";
import createError from "http-errors";

const app = express();

app.use(express.json());
// app.use(cors());
app.use("/floors", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "Requested data not found"));
});

const handleErrors: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
  });
};

app.use(handleErrors);

app.listen(4000, "localhost", () => {
  console.log("Did it worked?");
});
