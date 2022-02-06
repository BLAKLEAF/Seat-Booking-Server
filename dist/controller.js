"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
class Controller {
    constructor() {
        this.GetListOfFloors = async (req, res, next) => {
            try {
                const floors = await axios_1.default.get("http://localhost:3004/floors");
                if (!floors.data)
                    throw (0, http_errors_1.default)(404, `No data found for available floors.`);
                res.status(200).send(floors.data);
            }
            catch (error) {
                next(error);
            }
        };
        this.GetSeatsByFloor = async (req, res, next) => {
            try {
                const floor = await axios_1.default.get(`http://localhost:3004/floors/${req.params.floorID}`);
                if (!floor.data)
                    throw (0, http_errors_1.default)(400, `Floor with this ID \"${req.params.id}"\ doesn't exist.
          Please confirm the ID.`);
                res.status(200).send({
                    "Total Number of Seats": floor.data.seats.length,
                    "Seats Info": floor.data.seats,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.BookUserSelectedSeat = async (req, res, next) => {
            try {
                const floor = await axios_1.default.get(`http://localhost:3004/floors/${req.params.floorID}`);
                for (const seat of floor.data.seats) {
                    if (seat.id === req.params.seatID && seat.seatBooked) {
                        return "Seat is already Booked";
                    }
                    else {
                        await axios_1.default.patch(`http://localhost:3004/floors/${req.params.floorID}`, {
                            id: req.params.floorID,
                            seats: [
                                {
                                    id: req.params.seatID,
                                    seatBooked: true,
                                },
                            ],
                        });
                    }
                    break;
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = Controller;
