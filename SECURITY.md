# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.4.x   | :white_check_mark: |
| < 0.4   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Digital Legacy, please report it by:

1. **Email**: Contact the maintainer directly (do not open a public issue)
2. **Expected Response**: You should receive a response within 48 hours
3. **Process**: We will investigate and release a patch if confirmed

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Considerations

This project handles sensitive personal data including:
- Journal entries and personal memories
- User authentication tokens
- Database credentials

Please ensure:
- Never commit `.env.local` or sensitive credentials
- Always use environment variables for API keys
- Report any exposed secrets immediately