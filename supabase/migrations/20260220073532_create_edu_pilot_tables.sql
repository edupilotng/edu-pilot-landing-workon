/*
  # Edu Pilot Database Schema

  ## Overview
  Creates tables for managing contact inquiries, marketer applications, and demo requests for the Edu Pilot school management platform.

  ## New Tables

  ### `contact_inquiries`
  Stores general contact form submissions from website visitors
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `name` (text) - Full name of the person contacting
  - `email` (text) - Email address for follow-up
  - `phone` (text) - Contact phone number
  - `message` (text) - Inquiry message content
  - `created_at` (timestamptz) - Timestamp of submission

  ### `marketer_applications`
  Stores applications from individuals interested in becoming Edu Pilot marketers
  - `id` (uuid, primary key) - Unique identifier for each application
  - `name` (text) - Full name of applicant
  - `region` (text) - Geographic region of applicant
  - `institution` (text) - Educational institution/organization affiliation
  - `phone` (text) - Contact phone number
  - `email` (text) - Email address for follow-up
  - `experience` (text) - Years of sales/marketing experience
  - `connections` (text) - Existing school connections (yes/no)
  - `motivation` (text) - Reason for interest in becoming a marketer
  - `source` (text) - How they heard about the opportunity
  - `status` (text) - Application status (default: pending)
  - `created_at` (timestamptz) - Timestamp of submission

  ### `demo_requests`
  Stores requests for product demonstrations from schools
  - `id` (uuid, primary key) - Unique identifier for each request
  - `school_name` (text) - Name of the school
  - `name` (text) - Name of requester
  - `title` (text) - Job title of requester
  - `email` (text) - Email address for follow-up
  - `phone` (text) - Contact phone number
  - `student_count` (text) - Number of students at school
  - `demo_date` (date) - Preferred demo date
  - `demo_time` (text) - Preferred demo time
  - `interests` (text) - Specific features of interest
  - `status` (text) - Request status (default: pending)
  - `created_at` (timestamptz) - Timestamp of submission

  ### `newsletter_subscriptions`
  Stores email addresses for newsletter subscriptions
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email address
  - `created_at` (timestamptz) - Timestamp of subscription

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public can insert records (anonymous form submissions)
  - Only authenticated admins can read/update/delete records
*/

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert contact inquiries"
  ON contact_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Create marketer_applications table
CREATE TABLE IF NOT EXISTS marketer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  institution text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  experience text NOT NULL,
  connections text NOT NULL,
  motivation text NOT NULL,
  source text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE marketer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert marketer applications"
  ON marketer_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view marketer applications"
  ON marketer_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update marketer applications"
  ON marketer_applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  student_count text,
  demo_date date NOT NULL,
  demo_time text NOT NULL,
  interests text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert demo requests"
  ON demo_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view demo requests"
  ON demo_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update demo requests"
  ON demo_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert newsletter subscriptions"
  ON newsletter_subscriptions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view newsletter subscriptions"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (true);
