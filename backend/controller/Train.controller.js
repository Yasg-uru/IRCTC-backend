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
      const train = await Trainmodel.find({
        intermediate_stations: {
          $all: [fromstation, tostation],
        },
      });
      if (!train) {
        return next(new Errorhandler("train not found ", 404));
      }
      const resultarray = [];
      for (const Train of train) {
        const fromstation_index = Train.intermediate_stations.findIndex(
          (station) => station === fromstation
        );
        const tostation_index = Train.intermediate_stations.findIndex(
          (station) => station === tostation
        );
        if (fromstation_index >= tostation_index) {
          // return next(new Errorhandler("train is not available ", 404));
          continue;
        }
        resultarray.push(Train);
      }

      res.status(200).json({
        success: true,
        resultarray,
      });
    } catch (error) {
      next(new Errorhandler(error?.message, 500));
    }
  }
);
//creating controller for finding the cost of the ticket for particular train with their particular coach fromstation tostation

export const getcostofticket = catchasynerror(async (req, res, next) => {
  try {
    const { trainid, fromstation, tostation, coachType } = req.body;
    const train = await Trainmodel.findById(trainid);
    if (!train) {
      return next(new Errorhandler("train not found ", 404));
    }
    const isexistcoachtype = train.coaches.find((coach) => {
      return coach.coachType === coachType;
    });
    if (!isexistcoachtype) {
      return next(new Errorhandler("Invalid coachtype", 404));
    }

    //finding the indexes of the fromstation and tostation

    const fromindex = train.intermediate_stations.indexOf(fromstation);
    const tostationindex = train.intermediate_stations.indexOf(tostation);
    if (
      fromindex === -1 ||
      tostationindex === -1 ||
      fromindex >= tostationindex
    ) {
      return next(new Errorhandler("Invalid stations "));
    }
    let totalfare = 0;

    for (let i = fromindex; i <= tostationindex; i++) {
      console.log("this is inside loop ");
      const station = train.intermediate_stations[i];
      totalfare += train.price.get(station);
    }
    if (coachType === "AC") {
      totalfare *= 1.5;
    }
    res.status(200).json({
      success: true,
      totalfare,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
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
function getSeatType(seatNumber) {
  // Calculate theseatNumber when dividing seatNumber by 16

  // Determine the seat type based on theseatNumber
  if (
    seatNumber === 1 ||
    seatNumber === 4 ||
    seatNumber === 9 ||
    seatNumber === 12 ||
    seatNumber === 17 ||
    seatNumber === 20 ||
    seatNumber === 25 ||
    seatNumber === 28 ||
    seatNumber === 33 ||
    seatNumber === 36 ||
    seatNumber === 41 ||
    seatNumber === 44 ||
    seatNumber === 49 ||
    seatNumber === 52 ||
    seatNumber === 57 ||
    seatNumber === 60
  ) {
    return { seatNumber, seatType: "Lower" };
  } else if (
    seatNumber === 2 ||
    seatNumber === 5 ||
    seatNumber === 10 ||
    seatNumber === 13 ||
    seatNumber === 18 ||
    seatNumber === 21 ||
    seatNumber === 26 ||
    seatNumber === 29 ||
    seatNumber === 34 ||
    seatNumber === 37 ||
    seatNumber === 42 ||
    seatNumber === 45 ||
    seatNumber === 50 ||
    seatNumber === 53 ||
    seatNumber === 58
  ) {
    return { seatNumber, seatType: "Middle" };
  } else if (
    seatNumber === 3 ||
    seatNumber === 6 ||
    seatNumber === 11 ||
    seatNumber === 14 ||
    seatNumber === 19 ||
    seatNumber === 22 ||
    seatNumber === 27 ||
    seatNumber === 30 ||
    seatNumber === 35 ||
    seatNumber === 38 ||
    seatNumber === 43 ||
    seatNumber === 46 ||
    seatNumber === 51 ||
    seatNumber === 54 ||
    seatNumber === 59
  ) {
    return { seatNumber, seatType: "Upper" };
  } else if (
    seatNumber === 7 ||
    seatNumber === 15 ||
    seatNumber === 23 ||
    seatNumber === 31 ||
    seatNumber === 39 ||
    seatNumber === 47 ||
    seatNumber === 55 ||
    seatNumber === 63 ||
    seatNumber === 71
  ) {
    return { seatNumber, seatType: "Side Lower" };
  } else {
    return { seatNumber, seatType: "Side Upper" };
  }
}

export const assignseatsforallcoaches = catchasynerror(
  async (req, res, next) => {
    try {
      const { trainid } = req.body;
      const train = await Trainmodel.findById(trainid);
      if (!train) {
        return next(new Errorhandler("train not found ", 404));
      }
      const arrayofseats=[]
      train.coaches.forEach((coach) => {
        coach.coachcategory.forEach((category) => {
          category.seats.forEach((seat) => {
            // console.log(getSeatType(seat.seatNumber));
            const seattype = getSeatType(seat.seatNumber);
            arrayofseats.push(seattype)
            seat.seatType = seattype;
            // console.log("this is a seat type :",seat.seatType)
          });
        });
      });
      const savedtrain=await train.save();
      res.status(200).json({
        success: true,
        savedtrain,
        arrayofseats
      });
    } catch (error) {
      return next(new Errorhandler(error?.message, 500));
    }
  }
);

