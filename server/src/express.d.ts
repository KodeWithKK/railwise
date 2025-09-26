import * as express from "express";
import { Server } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
