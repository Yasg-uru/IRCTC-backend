import Trainmodel from "../model/train.model.js";
import catchasynerror from "../middleware/catchasynerror.middleware.js";
import Errorhandler from "../utils/Errorhandler.utils.js";
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

    coaches?.forEach((coach) => {
      coach.coachcategory.seats = [];

      coach.coachcategory.forEach((category) => {
        category.seats = [];

        for (let i = 0; i < 60; i++) {
          category.seats.push({ seatNumber: seatNumber++ });
        }
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

