import mongoose, { InferSchemaType } from 'mongoose'
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const MessageSchema = new Schema(
  {
    to: [{ type: ObjectId, ref: 'Users' }]!,
    from: { type: ObjectId, ref: 'Users' },
    message: String!
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
)

export const MessageGroupSchema = new Schema(
  {
    name: String,
    group: Boolean!,
    members: [{ type: ObjectId, ref: 'Users' }]!,
    messages: [MessageSchema]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
)

export const MessageGroup = mongoose.model('messages', MessageGroupSchema)
export type MessageGroupTS = InferSchemaType<typeof MessageGroupSchema>
