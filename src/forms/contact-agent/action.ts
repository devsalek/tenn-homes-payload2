"use server" // don't forget to add this!

import { actionClient } from "@/lib/safe-action"
import { schema } from "./schema"

export const contactAgent = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, name } }) => {
    // Simulate updating form submissions collection
    // In a real application, you would save this data to your database.
    console.log(`Contact form submitted by ${name} (${email})`)

    return { success: "Message sent successfully" }
  })
