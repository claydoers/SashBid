import mongoose, { Document, Schema } from 'mongoose';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ContactPerson {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  address: Address;
  contactPersons: ContactPerson[];
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<Address>(
  {
    street: {
      type: String,
      required: [true, 'Street is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      default: 'USA',
    },
  },
  { _id: false }
);

const contactPersonSchema = new Schema<ContactPerson>(
  {
    name: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Contact person email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Contact person phone is required'],
      trim: true,
    },
  },
  { _id: false }
);

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Client phone is required'],
      trim: true,
    },
    address: {
      type: addressSchema,
      required: [true, 'Client address is required'],
    },
    contactPersons: {
      type: [contactPersonSchema],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model<IClient>('Client', clientSchema);

export default Client; 