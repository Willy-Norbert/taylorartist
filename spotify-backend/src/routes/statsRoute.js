import { Router } from "express";
import { trackPlay, getSongStats, getArtistStats } from "../controllers/statsController.js";

const statsRouter = Router();

statsRouter.post("/track", trackPlay);
statsRouter.get("/song/:songId", getSongStats);
statsRouter.get("/artist", getArtistStats);

export default statsRouter;
