import * as z from "zod";

export const OtpSchema = z.object({
  otp: z.string(),
});
