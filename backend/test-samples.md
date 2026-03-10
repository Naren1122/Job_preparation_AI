# Sample Test Data for Interview Report Generation

## Self Description

I am a results-driven Full Stack Developer with 5 years of professional experience in building scalable web applications. I specialize in JavaScript technologies including React, Node.js, and modern web frameworks. Throughout my career, I have successfully delivered multiple high-impact projects, leading teams and implementing best practices in software development. I am passionate about clean code, performance optimization, and continuous learning. I have experience working in agile environments and collaborating with cross-functional teams to deliver quality products on time.

---

## Job Description

**Position: Senior Full Stack Developer**

**About Us:**
We are a fast-growing tech company specializing in innovative cloud-based solutions. Join our team to build cutting-edge applications that impact millions of users worldwide.

**Responsibilities:**

- Design and implement scalable microservices architecture
- Develop responsive front-end applications using React and TypeScript
- Build and maintain RESTful APIs and GraphQL endpoints
- Optimize application performance and ensure code quality
- Mentor junior developers and participate in code reviews
- Collaborate with product managers and designers

**Requirements:**

- 5+ years of experience in full-stack development
- Strong proficiency in React, Node.js, TypeScript
- Experience with cloud platforms (AWS preferred)
- Knowledge of database design (MongoDB, PostgreSQL)
- Familiarity with CI/CD pipelines and containerization
- Excellent problem-solving and communication skills

**Benefits:**

- Competitive salary and equity package
- Remote-first work environment
- Health, dental, and vision insurance
- Unlimited PTO
- Professional development budget

---

## Postman Test Request

**Endpoint:** `POST http://localhost:5000/api/interview/`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Body (form-data):**
| Key | Type | Value |
|-----|------|-------|
| resume | File | Select sample-resume.pdf |
| selfDescription | Text | (paste from above) |
| jobDescription | Text | (paste from above) |

---

## cURL Command

```bash
curl -X POST http://localhost:5000/api/interview/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -F "resume=@sample-resume.pdf" \
  -F "selfDescription=I am a results-driven Full Stack Developer with 5 years of professional experience in building scalable web applications. I specialize in JavaScript technologies including React, Node.js, and modern web frameworks. Throughout my career, I have successfully delivered multiple high-impact projects, leading teams and implementing best practices in software development. I am passionate about clean code, performance optimization, and continuous learning. I have experience working in agile environments and collaborating with cross-functional teams to deliver quality products on time." \
  -F "jobDescription=Position: Senior Full Stack Developer. About Us: We are a fast-growing tech company specializing in innovative cloud-based solutions. Join our team to build cutting-edge applications that impact millions of users worldwide. Responsibilities: Design and implement scalable microservices architecture, Develop responsive front-end applications using React and TypeScript, Build and maintain RESTful APIs and GraphQL endpoints, Optimize application performance and ensure code quality, Mentor junior developers and participate in code reviews, Collaborate with product managers and designers. Requirements: 5+ years of experience in full-stack development, Strong proficiency in React, Node.js, TypeScript, Experience with cloud platforms (AWS preferred), Knowledge of database design (MongoDB, PostgreSQL), Familiarity with CI/CD pipelines and containerization, Excellent problem-solving and communication skills. Benefits: Competitive salary and equity package, Remote-first work environment, Health, dental, and vision insurance, Unlimited PTO, Professional development budget"
```
