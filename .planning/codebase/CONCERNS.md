# Concerns

## Technical Debt & Issues
- Unknown at this time. Project is marked as "done".
- File uploads are mapped directly to local volumes, which might not scale across multiple backend nodes without a shared storage volume or S3 bucket.
- Hardcoded database credentials (`admin123`) in `docker-compose.yml` should be moved to secure `.env` files for production deployments.
