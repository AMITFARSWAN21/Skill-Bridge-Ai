import React, { useState } from 'react'
import './FAQ.css'

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqData = [
    {
      question: "How is Skill-Bridge different from traditional job portals?",
      answer: "Skill-Bridge is not just another job portal. It's an AI-powered job matching platform that learns from your profile, preferences, and feedback to deliver hyper-relevant job matches. Unlike traditional portals, Skill-Bridge focuses on quality over quantity, ensuring you see only the jobs that truly fit your skills and aspirations."
    },
    {
      question: "Who can use Skill-Bridge?",
      answer: {
        bold: "Anyone actively looking for a job",
        text: " — whether you're a fresher, mid-career professional, or switching industries, Skill-Bridge provides relevant jobs based on your unique profile and preferences."
      }
    },
    {
      question: "Will Skill-Bridge share my personal information?",
      answer: {
        bold: "Absolutely not.",
        text: " Your privacy is our top priority.\nSkill-Bridge will never share your data without your consent. Everything you share is used only to help you find relevant jobs — faster, smarter, and safer."
      }
    },
    {
      question: "How accurate are the job matches?",
      answer: {
        bold: "Very accurate — and always improving.",
        text: "\nSkill-Bridge learns from your preferences, skills, and feedback to deliver hyper-relevant matches. Unlike generic job boards, our AI gets sharper with every interaction, just like a buddy who knows your strengths."
      }
    },
    {
      question: "Is Skill-Bridge free to use?",
      answer: {
        bold: "Yes — and it always will be.",
        text: "\nSkill-Bridge is built for every job seeker. You get access to world-class AI tools, totally free — because finding relevant jobs on merit should be a right for all."
      }
    }
  ]

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FAQs</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <svg
                  className={`faq-arrow ${activeIndex === index ? 'expanded' : ''}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {activeIndex === index && item.answer && (
                <div className="faq-answer">
                  {typeof item.answer === 'string' ? (
                    <p>{item.answer}</p>
                  ) : (
                    <p>
                      <strong>{item.answer.bold}</strong>
                      {item.answer.text.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.answer.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}