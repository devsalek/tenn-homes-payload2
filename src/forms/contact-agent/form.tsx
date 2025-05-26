"use client" // this is a Client Component

import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { Button } from "@/components/ui/button"
import { contactAgent } from "./action"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "./schema"
import { toast } from "sonner"

export function ContactAgentForm() {
  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    contactAgent,
    zodResolver(schema),
    {
      formProps: {
        mode: "onChange",
      },
      actionProps: {
        onSuccess: () => {
          toast("Message sent!", {
            description: "Your message has been sent to the agent.",
            duration: 3000,
          })
          resetFormAndAction()
        },
      },
    },
  )
  return (
    <form onSubmit={handleSubmitWithAction} className="flex flex-1 w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        {form.formState.errors.name ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.name.message}
          </p>
        ) : null}
        {form.formState.errors.email ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.email.message}
          </p>
        ) : null}
        {form.formState.errors.message ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>
      <Input placeholder="Enter your name" {...form.register("name")} />
      <Input placeholder="Enter your email" {...form.register("email")} />
      <Textarea placeholder="Enter your message" {...form.register("message")} />

      <Button type="submit" className="w-full">
        Send
      </Button>
    </form>
  )
}
