# Database Security Auditing Tool

## 📌 Introduction
In today's digital era, databases are critical assets that hold sensitive organizational data. Ensuring their security is crucial to prevent unauthorized access, data breaches, privilege abuse, and performance degradation. 

Despite the importance of database security, many organizations lack effective tools to audit and monitor their databases regularly.  
This project presents a **web-based database security auditing tool** designed to simplify and automate database security checks, making it accessible to users without deep technical knowledge.

---

## 🎯 Objective
The primary goal of this project is to provide users with a simple, effective, and accessible platform to audit their databases.

### Key Objectives:
- 🔍 Analyze database configurations, user privileges, and security vulnerabilities.  
- 🛡️ Detect weak passwords, excessive privileges, dormant users, missing indexes, and outdated database versions.  
- 📊 Present results in a clear, actionable format for easy understanding.  
- ⚡ Ensure a smooth, real-time auditing experience through a web-based interface.

---

## 🛠️ Technology Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | React.js (TypeScript) |
| Backend      | Node.js (Express.js) |
| DB Libraries | Sequelize + `mysql2` |
| HTTP Client  | Axios                |
| Styling      | Tailwind CSS         |

---

## 🧱 System Architecture

The system follows a simple **client-server architecture**:

1. **Frontend**  
   - Provides a form where users input their database connection details (host, username, password, database name, database type).
2. **Backend**  
   - Receives this information securely via API calls.  
   - Connects to the provided database and performs a series of security audits.
3. **Results Display**  
   - After auditing, results are sent back to the frontend and displayed neatly in a **tabular format**.

---

## 🔒 Security Checks Performed

- **Weak Passwords**: Detects if users have weak or empty passwords.  
- **Excessive Privileges**: Lists users with dangerous or unnecessary privileges.  
- **Dormant Users**: Identifies accounts that haven’t been used recently.  
- **Missing Indexes**: Detects tables lacking indexes that may hinder performance.  
- **Outdated Database Version**: Checks database version and suggests updates.

---

## ✅ Conclusion

This project successfully demonstrates a **lightweight, web-based tool** that empowers users to audit their database security effectively — without needing specialized expertise.

By providing **instant feedback on security gaps**, the tool not only helps mitigate immediate risks but also promotes a **culture of proactive database management**.

Its **user-friendly experience**, combined with **real-time analysis** and **actionable results**, makes it a valuable resource for individuals, developers, and small organizations aiming to strengthen their database security posture.
