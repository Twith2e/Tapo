import * as z from "zod";

export const ProfileSchema = z.object({
  displayName: z.string().nonempty("Display name field can not be empty"),
});
