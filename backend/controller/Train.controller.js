import Trainmodel from "../model/train.model.js";
import catchasynerror from "../middleware/catchasynerror.middleware.js";
import Errorhandler from "../utils/Errorhandler.utils.js";
import bookingmodel from "../model/Booking.model.js";
export const create_Train = catchasynerror(async (req, res, next) => {
  try {
    const {
      name,
      Train_no,
      category,
      origin,
      destination,
      intermediate_stations,
      coaches,
      price,
      date,
    } = req.body;

    let seatNumber = 1;
    function generateseatnumber() {
      let seatNumbers = [];
      for (let i = 1; i <= 60; i++) {
        seatNumbers.push({ seatNumber: i });
      }
      return seatNumbers;
    }
    coaches?.forEach((coach) => {
      coach.coachcategory.seats = [];

      coach.coachcategory.forEach((category) => {
        category.seats = generateseatnumber();
      });
    });

    const train = await Trainmodel.create({
      name,
      Train_no,
      category,
      origin,
      destination,
      intermediate_stations,
      coaches,
      price,
    });
    res.status(200).json({
      success: true,
      message: "Train created successfully",
      train,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});

export const searchtrainbyorigintodestination = catchasynerror(
  async (req, res, next) => {
    try {
      const { fromstation, tostation } = req.body;
      const train = await Trainmodel.findOne({
        intermediate_stations: {
          $all: [fromstation, tostation],
        },
      });
      if (!train) {
        return next(new Errorhandler("train not found ", 404));
      }
      const fromstation_index = train.intermediate_stations.findIndex(
        (station) => station === fromstation
      );
      const tostation_index = train.intermediate_stations.findIndex(
        (station) => station === tostation
      );
      if (fromstation_index >= tostation_index) {
        return next(new Errorhandler("train is not available ", 404));
      }
      res.status(200).json({
        success: true,
        train,
      });
    } catch (error) {
      next(new Errorhandler(error?.message, 500));
    }
  }
);

export const getAvailableSeatCountsForAllCoachTypes = catchasynerror(
  async (req, res, next) => {
    try {
      const { trainid, fromstation, tostation } = req.body;

      let { date, coachTypes } = req.body;
      coachTypes = coachTypes || [];
      // const date = new Date(Date.now());
      date = date ? new Date(date) : new Date(Date.now());
      console.log("this is date.now is :", date);
      //if we are creating frontend of this website then date is receving by the frontend

      const { previousdate, nextdate } = req.query;
      if (nextdate === "true") {
        date.setDate(date.getDate() + 1);
        console.log("this is a next date ", date);
      } else if (previousdate === "true") {
        date.setDate(date.getDate() - 1);
        console.log("this is previous date :", date);
      }
      const dateString = date.toISOString().split("T")[0] + "T08:00:00Z";
      console.log("Date:", dateString);
      const train = await Trainmodel.findById(trainid);
      if (!train) {
        return next(new Errorhandler("Train not found ", 404));
      }
      const availablecounts = {};
      //now we are using the for of loop
      for (const coach of train.coaches) {
        const coachType = coach.coachType;
        if (coachTypes.length > 0 && !coachTypes.includes(coachType)) {
          continue;
        }
        const totalseats = coach.coachcategory.reduce(
          (acc, category) => acc + category.seats.length,
          0
        );
        const bookedseats = await bookingmodel.find({
          trainid,
          date: dateString,
          from_station: fromstation,
          to_station: tostation,
          "seats.coachType": coachType,
        });
        const bookedseatscount = bookedseats.length;
        console.log("this is a length of booked seats:", bookedseatscount);
        const availableseatcountsforcoach = totalseats - bookedseatscount;
        availablecounts[coachType] = {
          totalseats,
          bookedSeats: bookedseatscount,
          availableSeat: availableseatcountsforcoach,
        };
      }
      res.status(200).json({
        success: true,
        availablecounts,
      });
    } catch (error) {
      return next(new Errorhandler(error?.message, 500));
    }
  }
);
