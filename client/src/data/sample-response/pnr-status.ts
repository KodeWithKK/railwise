export const pnrStatusSuccess = {
  success: true,
  data: {
    pnr: "6351738552",
    trainNumber: "12150",
    trainName: "DNR PUNE EXP",
    journeyDate: "07-06-2025",
    bookingDate: "25-04-2025",
    source: "DNR",
    destination: "PUNE",
    boardingPoint: "DNR",
    class: "3A",
    chartPrepared: true,
    trainStatus: "Status not available",
    departureTime: "23:15",
    arrivalTime: "04:00",
    duration: "28:45",
    passengers: [
      {
        number: 1,
        bookingStatus: "GNWL  180",
        currentStatus: "GNWL  17",
        coach: "N/A",
        berth: 17,
      },
      {
        number: 2,
        bookingStatus: "GNWL  181",
        currentStatus: "GNWL  18",
        coach: "N/A",
        berth: 18,
      },
    ],
    fare: {
      bookingFare: "3750",
      ticketFare: "3750",
    },
    ratings: {
      overall: 3.9,
      food: 3.5,
      punctuality: 4.1,
      cleanliness: 4,
      ratingCount: 2916,
    },
    hasPantry: true,
    isCancelled: false,
  },
};

export const pnrStatusError = {
  success: false,
  error: "Flushed PNR /PNR not yet generated",
};
