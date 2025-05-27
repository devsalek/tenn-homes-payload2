"use client" // this is a Client Component

import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { Button } from "@/components/ui/button"
import { propertyInquiryAction } from "./action"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "./schema"
import { toast } from "sonner"
import { useProperty } from "@/components/property/context"
import { faker } from "@faker-js/faker"
import { PropertyDecorator } from "@/models/property/property-decorator"
import { Agent } from "@/payload-types"

const getDefaultValues = (property: PropertyDecorator) => {
  const defaultMessage = `Hello,\n\nI am interested in the property "${property.get("address").full_address}".\n\nPlease let me know how I can proceed with the inquiry.\n\nThank you!`
  const agent = property.get("agent") as Agent
  return {
    name: faker.person.fullName(),
    email: (faker.internet.username() + "@example.com").toLocaleLowerCase(),
    message: defaultMessage,
    phone: faker.phone.number(),
    propertyId: property.get("id"),
    agentId: agent.id,
  }
}

export function PropertyInquiryForm() {
  const property = useProperty()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    propertyInquiryAction,
    zodResolver(schema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: getDefaultValues(property),
      },
      actionProps: {
        onSuccess: () => {
          toast("Message sent!", {
            description: "Your message has been sent to the agent.",
            duration: 3000,
          })
          resetFormAndAction()
          setTimeout(() => {
            form.reset(getDefaultValues(property))
          }, 1000)
        },
      },
    },
  )

  console.log(form.formState)
  return (
    <form onSubmit={handleSubmitWithAction} className="flex flex-1 w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        {form.formState.errors.propertyId ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.propertyId.message}
          </p>
        ) : null}
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
        {form.formState.errors.phone ? (
          <p className="text-red-500 bg-red-50 py-1 px-2 rounded text-sm">
            {form.formState.errors.phone.message}
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
      <Input placeholder="Enter your phone" {...form.register("phone")} />
      <Textarea placeholder="Enter your message" {...form.register("message")} />

      <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
        Send
      </Button>
    </form>
  )
}
