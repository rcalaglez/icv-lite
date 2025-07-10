import React from "react";
import type {
  ResumeData,
  ResumeWork,
  ResumeEducation,
  ResumeCertificate,
} from "../types/resume";
import "./HarvardMinimal.css";
import { formatDate, formatDateRange } from "@/utils/formatters";

interface HarvardMinimalProps {
  data: ResumeData;
}

// Sub-components
const ContactInfo: React.FC<{ basics: ResumeData["basics"] }> = ({
  basics,
}) => (
  <div className="contact-info">
    {basics.email && (
      <span className="contact-item">
        <a href={`mailto:${basics.email}`}>{basics.email}</a>
      </span>
    )}
    {basics.phone && <span className="contact-item">{basics.phone}</span>}
    {basics.url && (
      <span className="contact-item">
        <a href={basics.url} target="_blank" rel="noopener noreferrer">
          {basics.url}
        </a>
      </span>
    )}
    {basics.location && (
      <span className="contact-item">
        {basics.location.city}, {basics.location.region}
      </span>
    )}
  </div>
);

const ProfileLinks: React.FC<{
  profiles: NonNullable<ResumeData["basics"]["profiles"]>;
}> = ({ profiles }) => (
  <div className="profiles">
    {profiles.map((profile, index) => (
      <a
        key={index}
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="profile-link"
      >
        {profile.network}: {profile.username}
      </a>
    ))}
  </div>
);

const WorkExperience: React.FC<{ work: ResumeWork[] }> = ({ work }) => (
  <section className="section">
    <h2 className="section-title">Experiencia Laboral</h2>
    {work.map((job, index) => (
      <div key={index} className="work-item">
        <div className="work-header">
          <h3 className="position">{job.position}</h3>
          <span className="date-range">
            {formatDateRange(job.startDate, job.endDate)}
          </span>
        </div>
        <div className="company">
          {job.url ? (
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              {job.name}
            </a>
          ) : (
            job.name
          )}
        </div>
        {job.summary && <p className="work-summary">{job.summary}</p>}
        {job.highlights && job.highlights.length > 0 && (
          <ul className="highlights">
            {job.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </section>
);

const Education: React.FC<{ education: ResumeEducation[] }> = ({
  education,
}) => (
  <section className="section">
    <h2 className="section-title">Educación</h2>
    {education.map((edu, index) => (
      <div key={index} className="education-item">
        <div className="education-header">
          <h3 className="degree">
            {edu.studyType} en {edu.area}
          </h3>
          {edu.endDate && (
            <span className="date-range">
              {edu.startDate
                ? formatDateRange(edu.startDate, edu.endDate)
                : formatDate(edu.endDate)}
            </span>
          )}
        </div>
        <div className="institution">
          {edu.url ? (
            <a href={edu.url} target="_blank" rel="noopener noreferrer">
              {edu.institution}
            </a>
          ) : (
            edu.institution
          )}
        </div>
        {edu.score && <p className="score">Calificación: {edu.score}</p>}
      </div>
    ))}
  </section>
);

const Skills: React.FC<{ skills: NonNullable<ResumeData["skills"]> }> = ({
  skills,
}) => (
  <section className="section">
    <h2 className="section-title">Habilidades Técnicas</h2>
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <h4 className="skill-name">{skill.name}</h4>
          {skill.level && <span className="skill-level">({skill.level})</span>}
          {skill.keywords && skill.keywords.length > 0 && (
            <p className="skill-keywords">{skill.keywords.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);

const Languages: React.FC<{
  languages: NonNullable<ResumeData["languages"]>;
}> = ({ languages }) => (
  <section className="section">
    <h2 className="section-title">Idiomas</h2>
    <div className="languages-grid">
      {languages.map((lang, index) => (
        <div key={index} className="language-item">
          <span className="language-name">{lang.language}</span>
          <span className="language-fluency">({lang.fluency})</span>
        </div>
      ))}
    </div>
  </section>
);

const Certificates: React.FC<{ certificates: ResumeCertificate[] }> = ({
  certificates,
}) => (
  <section className="section">
    <h2 className="section-title">Certificaciones</h2>
    {certificates.map((cert, index) => (
      <div key={index} className="certificate-item">
        <div className="certificate-header">
          <h4 className="certificate-name">
            {cert.url ? (
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                {cert.name}
              </a>
            ) : (
              cert.name
            )}
          </h4>
          <span className="certificate-date">{formatDate(cert.date)}</span>
        </div>
        <p className="certificate-issuer">{cert.issuer}</p>
      </div>
    ))}
  </section>
);

const Interests: React.FC<{
  interests: NonNullable<ResumeData["interests"]>;
}> = ({ interests }) => (
  <section className="section">
    <h2 className="section-title">Intereses</h2>
    <div className="interests-grid">
      {interests.map((interest, index) => (
        <div key={index} className="interest-item">
          <h4 className="interest-name">{interest.name}</h4>
          {interest.keywords && interest.keywords.length > 0 && (
            <p className="interest-keywords">{interest.keywords.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);

// Main component
export const HarvardMinimal: React.FC<HarvardMinimalProps> = ({ data }) => {
  const {
    basics,
    work,
    education,
    skills,
    languages,
    certificates,
    interests,
  } = data;

  return (
    <div className="harvard-minimal">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1 className="name">{basics.name}</h1>
          {basics.label && <p className="label">{basics.label}</p>}

          <ContactInfo basics={basics} />

          {basics.profiles && basics.profiles.length > 0 && (
            <ProfileLinks profiles={basics.profiles} />
          )}
        </div>
      </header>

      {/* Summary Section */}
      {basics.summary && (
        <section className="section">
          <h2 className="section-title">Resumen Profesional</h2>
          <p className="summary">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience Section */}
      {work && work.length > 0 && <WorkExperience work={work} />}

      {/* Education Section */}
      {education && education.length > 0 && <Education education={education} />}

      {/* Skills Section */}
      {skills && skills.length > 0 && <Skills skills={skills} />}

      {/* Languages Section */}
      {languages && languages.length > 0 && <Languages languages={languages} />}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <Certificates certificates={certificates} />
      )}

      {/* Interests Section */}
      {interests && interests.length > 0 && <Interests interests={interests} />}
    </div>
  );
};
