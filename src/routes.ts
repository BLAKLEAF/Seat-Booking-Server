import { Router } from "express";
import Controller from "./controller";

const router = Router();

let controller = new Controller();

router.get("/", controller.GetListOfFloors);
router.get("/:floorID", controller.GetSeatsByFloor);
router.patch("/:floorID/:seatID", controller.BookUserSelectedSeat);

export default router;
