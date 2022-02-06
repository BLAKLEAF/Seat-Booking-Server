import axios from "axios";
import { RequestHandler } from "express";
import createError from "http-errors";

export default class Controller {
  GetListOfFloors: RequestHandler = async (req, res, next) => {
    try {
      const floors = await axios.get("http://localhost:3004/floors");
      if (!floors.data)
        throw createError(404, `No data found for available floors.`);
      res.status(200).send(floors.data);
    } catch (error) {
      next(error);
    }
  };
  GetSeatsByFloor: RequestHandler = async (req, res, next) => {
    try {
      const floor = await axios.get(
        `http://localhost:3004/floors/${req.params.floorID}`
      );
      if (!floor.data)
        throw createError(
          400,
          `Floor with this ID \"${req.params.id}"\ doesn't exist.
          Please confirm the ID.`
        );
      res.status(200).send({
        "Total Number of Seats": floor.data.seats.length,
        "Seats Info": floor.data.seats,
      });
    } catch (error) {
      next(error);
    }
  };
  BookUserSelectedSeat: RequestHandler = async (req, res, next) => {
    try {
      const floor = await axios.get(
        `http://localhost:3004/floors/${req.params.floorID}`
      );
      for (const seat of floor.data.seats) {
        if (seat.id === req.params.seatID && seat.seatBooked) {
          return "Seat is already Booked";
        } else {
          await axios.patch(
            `http://localhost:3004/floors/${req.params.floorID}`,
            {
              id: req.params.floorID,
              seats: [
                {
                  id: req.params.seatID,
                  seatBooked: true,
                },
              ],
            }
          );
        }
        break;
      }
    } catch (error) {
      next(error);
    }
  };
}
