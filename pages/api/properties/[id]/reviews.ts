import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const reviews = [
    {
      id: 1,
      reviewerName: "Alice",
      rating: 5,
      comment: "Amazing place! Very clean.",
    },
    {
      id: 2,
      reviewerName: "John",
      rating: 4,
      comment: "Nice location and great service.",
    },
  ];

  res.status(200).json(reviews);
}
