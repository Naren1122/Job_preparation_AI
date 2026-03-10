import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const doc = new PDFDocument();
const outputPath = path.join(process.cwd(), "sample-resume.pdf");

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

doc.fontSize(20).text("JOHN SMITH", { align: "center" });
doc.moveDown(0.5);
doc
  .fontSize(12)
  .text("Email: john.smith@email.com | Phone: (555) 123-4567", {
    align: "center",
  });
doc.text("LinkedIn: linkedin.com/in/johnsmith | Location: San Francisco, CA", {
  align: "center",
});

doc.moveDown(1);
doc.fontSize(14).text("PROFESSIONAL SUMMARY", { underline: true });
doc.moveDown(0.5);
doc
  .fontSize(11)
  .text(
    "Results-driven Full Stack Developer with 5 years of experience in building scalable web applications. Proficient in modern JavaScript frameworks, cloud services, and agile development methodologies. Passionate about creating efficient solutions and continuously learning new technologies.",
  );

doc.moveDown(1);
doc.fontSize(14).text("WORK EXPERIENCE", { underline: true });
doc.moveDown(0.5);

doc.fontSize(12).text("Senior Full Stack Developer", { bold: true });
doc.fontSize(11).text("Tech Solutions Inc. | San Francisco, CA");
doc.text("January 2021 - Present");
doc.moveDown(0.3);
doc.text(
  "• Led development of microservices architecture serving 100k+ daily active users",
);
doc.text("• Implemented CI/CD pipelines reducing deployment time by 40%");
doc.text("• Mentored junior developers and conducted code reviews");
doc.text(
  "• Optimized database queries improving application performance by 60%",
);

doc.moveDown(0.8);
doc.fontSize(12).text("Full Stack Developer", { bold: true });
doc.fontSize(11).text("Web Innovations LLC | Austin, TX");
doc.text("June 2018 - December 2020");
doc.moveDown(0.3);
doc.text("• Developed responsive web applications using React and Node.js");
doc.text(
  "• Collaborated with cross-functional teams to deliver features on time",
);
doc.text("• Integrated third-party APIs including Stripe and Twilio");
doc.text("• Maintained legacy systems while implementing new features");

doc.moveDown(1);
doc.fontSize(14).text("TECHNICAL SKILLS", { underline: true });
doc.moveDown(0.5);
doc
  .fontSize(11)
  .text("• Frontend: React, TypeScript, Next.js, HTML5, CSS3, Tailwind CSS");
doc.text("• Backend: Node.js, Express, Python, Django, REST APIs, GraphQL");
doc.text("• Databases: MongoDB, PostgreSQL, MySQL, Redis");
doc.text("• Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins, Git");
doc.text("• Tools: GitHub, Jira, VS Code, Postman, Figma");

doc.moveDown(1);
doc.fontSize(14).text("EDUCATION", { underline: true });
doc.moveDown(0.5);
doc
  .fontSize(12)
  .text("Bachelor of Science in Computer Science", { bold: true });
doc
  .fontSize(11)
  .text("University of California, Berkeley | Graduated May 2018");
doc.text("• GPA: 3.8/4.0 | Dean's List: All Semesters");
doc.text(
  "• Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development",
);

doc.moveDown(1);
doc.fontSize(14).text("CERTIFICATIONS", { underline: true });
doc.moveDown(0.5);
doc.fontSize(11).text("• AWS Certified Solutions Architect - Associate (2023)");
doc.text("• Meta Full Stack Developer Certificate (2022)");
doc.text("• MongoDB Certified Developer Associate (2021)");

doc.moveDown(1);
doc.fontSize(14).text("PROJECTS", { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text("E-commerce Platform", { bold: true });
doc
  .fontSize(11)
  .text(
    "• Built a full-stack e-commerce application with React, Node.js, and MongoDB",
  );
doc.text(
  "• Implemented payment processing with Stripe and real-time inventory management",
);
doc.text("• Deployed on AWS with auto-scaling and load balancing");

doc.end();

stream.on("finish", () => {
  console.log(`Sample resume PDF created at: ${outputPath}`);
});
