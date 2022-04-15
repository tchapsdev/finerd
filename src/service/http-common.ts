import axios from "axios";
import { AuthorizationService } from "./AuthorizationService";
import { AccountService } from "./AccountService";

// const service = new AuthorizationService();

export default axios.create({
  baseURL: "http://finerd-api.tchapssolution.com/api",
  headers: {
    "Content-type": "application/json",
  }
});