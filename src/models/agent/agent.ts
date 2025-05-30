import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"
import { Agent } from "@/payload-types"

/**
 * Agent Model
 * This class represents the Agent model, extending the BaseModel.
 */
export class AgentModel extends ActiveRecord<Agent> {
  override collection: CollectionSlug = "inquiries"

  email!: Agent["email"]
}
