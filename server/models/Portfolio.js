const mongoose = require("mongoose");

const { Schema } = mongoose;
const str = { type: String, required: true, trim: true };

const profileSchema = new Schema(
  {
    name: str, initials: str, role: str, location: str, college: str, degree: str,
    educationPeriod: str, expectedGraduation: str, cgpa: str, linkedin: str,
    phone: str, phoneHref: str, experienceDuration: str, experienceCompany: str,
    experienceRole: str, experienceTitle: str, experiencePeriod: str,
    experienceHighlights: [String],
    about: [String],
  },
  { _id: false },
);

const previousEducationSchema = new Schema({ school: str, program: str, period: str, location: str }, { _id: false });
const valueSchema = new Schema({ number: str, title: str, description: str }, { _id: false });
const skillGroupSchema = new Schema({ title: str, subtitle: str, skills: [String] }, { _id: false });
const projectSchema = new Schema(
  {
    number: str, name: str,
    category: { type: String, required: true, enum: ["full-stack", "web"] },
    categoryLabel: str, status: str, description: str, technologies: [String], art: str,
  },
  { _id: false },
);
const journeySchema = new Schema(
  { date: str, type: str, title: str, subtitle: str, detail: str, highlights: { type: [String], default: undefined } },
  { _id: false },
);
const certificateSchema = new Schema({ issuer: str, title: str, detail: str, mark: str }, { _id: false });
const futureGoalSchema = new Schema({ number: str, title: str, description: str }, { _id: false });

// The portfolio is a single document, identified by `key`.
const portfolioSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },
    profile: { type: profileSchema, required: true },
    previousEducation: [previousEducationSchema],
    values: [valueSchema],
    skillGroups: [skillGroupSchema],
    projects: [projectSchema],
    journey: [journeySchema],
    certificates: [certificateSchema],
    futureGoals: [futureGoalSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
