import { ContactModel } from "./contact/contact-model"
import { InquiryModel } from "./inquiry/inquiry-model"
import { LocationModel } from "./location/location-model"
import { PropertyModel } from "./property/property-model"

export const model = {
  property: new PropertyModel(),
  contact: new ContactModel(),
  inquiry: new InquiryModel(),
  location: new LocationModel(),
}
