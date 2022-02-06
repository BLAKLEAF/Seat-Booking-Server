"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
let controller = new controller_1.default();
router.get("/", controller.GetListOfFloors);
router.get("/:floorID", controller.GetSeatsByFloor);
router.patch("/:floorID/:seatID", controller.BookUserSelectedSeat);
// router.post("/", employee.createEmployee);
// router.get("/:id", employee.getEmployee);
// router.patch("/:id", employee.updateEmployee);
// router.delete("/:id", employee.deleteEmployee);
// router.get("/name/:name", employee.getEmployeeByName);
exports.default = router;
