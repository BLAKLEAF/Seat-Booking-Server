import { Router } from "express";
import Controller from "./controller";

const router = Router();

let controller = new Controller();

router.get("/", controller.GetListOfFloors);
router.get("/:floorID", controller.GetSeatsByFloor);
router.patch("/:floorID/:seatID", controller.BookUserSelectedSeat);

// router.post("/", employee.createEmployee);

// router.get("/:id", employee.getEmployee);

// router.patch("/:id", employee.updateEmployee);

// router.delete("/:id", employee.deleteEmployee);

// router.get("/name/:name", employee.getEmployeeByName);

export default router;
