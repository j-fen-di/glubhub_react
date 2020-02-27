import { Uniform, GlubEvent } from "../../../utils/models";

export interface EventForm {
  name: string;
  semester: string;
  type: string;
  callTime: string;
  callDate: string;
  releaseTime: string;
  releaseDate: string;
  points: number | null;
  comments: string;
  location: string;
  gigCount: boolean;
  defaultAttend: boolean;
}

export interface GigForm {
  performanceTime: string;
  uniform: Uniform | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  price: number | null;
  public: boolean;
  summary: string;
  description: string;
}

export const eventFormFromEvent = (event: GlubEvent): EventForm => ({
  name: event.name,
  semester: event.semester,
  type: event.type,
  callTime: twentyFourHourTimeFormatter(event.callTime),
  callDate: hyphenDateFormatter(event.callTime),
  releaseTime: event.releaseTime
    ? twentyFourHourTimeFormatter(event.releaseTime)
    : "",
  releaseDate: event.releaseTime ? hyphenDateFormatter(event.releaseTime) : "",
  points: event.points,
  comments: event.comments || "",
  location: event.location || "",
  gigCount: event.gigCount,
  defaultAttend: event.defaultAttend
});

export const emptyGigForm: GigForm = {
  performanceTime: "",
  uniform: null,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  price: null,
  public: false,
  summary: "",
  description: ""
};

export const gigFormFromEvent = (
  event: GlubEvent,
  allUniforms: Uniform[]
): GigForm => {
  if (!isGig(event)) {
    return emptyGigForm;
  }

  return {
    performanceTime: twentyFourHourTimeFormatter(event.performanceTime),
    uniform: allUniforms.find(u => u.id === event.uniform) || null,
    contactName: event.contactName || "",
    contactEmail: event.contactEmail || "",
    contactPhone: event.contactPhone || "",
    price: event.price,
    public: event.public,
    summary: event.summary || "",
    description: event.description || ""
  };
};

export const buildUpdateBody = (event: EventForm, gig: GigForm) => ({
  // -- event fields
  name: event.name,
  semester: event.semester,
  type: event.type,
  callTime: encodeDatetime(event.callDate, event.callTime),
  releaseTime: encodeDatetime(event.releaseDate, event.releaseTime),
  points: event.points || 5,
  comments: event.comments,
  location: event.location,
  gigCount: event.gigCount,
  defaultAttend: event.defaultAttend,

  // -- gig fields
  performanceTime: encodeDatetime(event.callDate, gig.performanceTime),
  uniform: gig.uniform?.id || null,
  contactName: gig.contactName,
  contactEmail: gig.contactEmail,
  contactPhone: gig.contactPhone,
  price: gig.price,
  public: gig.public,
  summary: gig.summary,
  description: gig.description
});