# Property Registration System

A simple property registration system built with Next.js 15, Prisma, and PostgreSQL.

## Features

- **Property Registration**: Complete form to register new properties with all required fields
- **Property Listing**: View all registered properties with detailed information
- **Database Integration**: Full integration with PostgreSQL using Prisma ORM
- **Clean UI**: Modern interface with proper form validation and user feedback

## Database Schema

The system uses the following Prisma schema structure:

- **Imovel**: Main property entity with basic information
- **Units**: Property unit types (studio, 1-3 bedrooms)
- **Address**: Property addresses (stand and site)
- **Media**: Property images and videos
- **Images**: Individual image records (optional)

## Components

### PropertyForm

- Comprehensive form for property registration
- Dynamic fields for highlights, amenities, and media
- Form validation and error handling
- Automatic form reset after successful submission

### PropertyList

- Displays all registered properties
- Shows property details, images, and metadata
- Responsive design with proper loading states
- Error handling and retry functionality

### API Routes

- `POST /api/properties`: Register new property
- `GET /api/properties`: Fetch all properties

## Usage

1. Navigate to `/dashboard`
2. Use the "Register Property" tab to add new properties
3. Use the "View Properties" tab to see all registered properties
4. The list automatically refreshes after successful registration

## Data Structure

Each property includes:

- Basic information (name, region, city, etc.)
- Unit types available
- Highlights and amenities
- Media (images and videos)
- Address information
- Region description

## Technical Stack

- **Frontend**: Next.js 15 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Custom components with Tailwind CSS
- **State Management**: React hooks for local state
- **API**: Next.js API routes

## File Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   └── api/
│       └── properties/
│           └── route.ts      # API endpoints
├── components/
│   ├── property-form.tsx     # Property registration form
│   ├── property-list.tsx     # Property listing component
│   └── ui/
│       └── badge.tsx         # Badge component
└── lib/
    └── prisma.ts            # Prisma client configuration
```

## Setup

1. Ensure PostgreSQL is running
2. Set up your `DATABASE_URL` in environment variables
3. Run Prisma migrations: `npx prisma migrate dev`
4. Start the development server: `npm run dev`

## Future Enhancements

- Property editing functionality
- Image upload with cloud storage
- Advanced filtering and search
- Property status management
- User authentication and authorization
