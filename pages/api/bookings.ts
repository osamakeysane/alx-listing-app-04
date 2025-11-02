import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Received booking:", req.body);
    return res.status(200).json({ message: "Booking received successfully" });
  }
  res.status(405).json({ message: "Method not allowed" });
}
