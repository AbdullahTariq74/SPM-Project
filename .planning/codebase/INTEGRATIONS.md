# Integrations

## Databases
- PostgreSQL database (`SPM_db`) running as a docker service (`db`).

## External APIs
- None explicitly mapped yet, application relies on REST APIs served from the backend service at port `5001`.

## File Storage
- Local file uploads configured at `./backend/uploads` volume mapping to `/app/uploads` in the container.
